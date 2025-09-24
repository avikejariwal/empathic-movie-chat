interface ChatResponse {
  id: string
  content: string
  audioUrl?: string
  timestamp: string
}

const mockResponses = [
  "That's a really thoughtful question. Let me think about that for a moment...",
  "I understand how you're feeling. It's completely normal to have those emotions.",
  "You know, that reminds me of something that happened to me last week...",
  "I think you're being really brave by talking about this. How did that make you feel?",
  "That's so interesting! I never thought about it that way before.",
  "Sometimes the hardest part is just taking the first step. What do you think?",
  "I can see why that would be challenging. Have you tried talking to someone about it?",
  "You're really growing and learning from these experiences. That's amazing!",
  "I think you should trust your instincts on this one. What does your gut tell you?",
  "That sounds like a really difficult situation. I'm here to listen if you want to share more."
]

export const sendMessageToMockApi = async (userMessage: string): Promise<ChatResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
  
  // Get random response
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
  
  // Generate real audio using ElevenLabs
  const audioUrl = await generateElevenLabsAudio(randomResponse)
  
  return {
    id: Date.now().toString(),
    content: randomResponse,
    audioUrl: audioUrl,
    timestamp: new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }
}

const generateElevenLabsAudio = async (text: string): Promise<string> => {
  try {
    // Import supabase client
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    )

    console.log('Calling ElevenLabs speech generation...')
    
    const { data, error } = await supabase.functions.invoke('generate-speech', {
      body: { text }
    })

    if (error) {
      console.error('Error calling speech generation:', error)
      throw error
    }

    if (!data.audioContent) {
      throw new Error('No audio content received')
    }

    // Convert base64 to blob and create URL
    const binaryString = atob(data.audioContent)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    
    const audioBlob = new Blob([bytes], { type: 'audio/mpeg' })
    const audioUrl = URL.createObjectURL(audioBlob)
    
    console.log('ElevenLabs audio generated successfully')
    return audioUrl

  } catch (error) {
    console.error('ElevenLabs audio generation failed:', error)
    // Return empty string to gracefully handle failures
    return ''
  }
}