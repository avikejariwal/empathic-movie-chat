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
  
  // Create mock audio URL (this would be from ElevenLabs in real implementation)
  const mockAudioUrl = await generateMockAudio(randomResponse)
  
  return {
    id: Date.now().toString(),
    content: randomResponse,
    audioUrl: mockAudioUrl,
    timestamp: new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }
}

const generateMockAudio = async (text: string): Promise<string> => {
  // In a real implementation, this would call ElevenLabs API
  // For now, we'll create a mock audio blob using Web Audio API
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const duration = Math.max(2, text.length * 0.1) // Rough estimate based on text length
    
    const sampleRate = audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    // Generate simple tone as placeholder
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1
    }
    
    // Convert to blob
    const audioBlob = new Blob([data], { type: 'audio/wav' })
    return URL.createObjectURL(audioBlob)
  } catch (error) {
    console.log('Mock audio generation failed, using speech synthesis')
    return ''
  }
}