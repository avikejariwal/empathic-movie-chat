import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Play, Pause, Send, Volume2 } from "lucide-react"
import nikhilAvatar from "@/assets/nikhil-avatar.png"

interface Message {
  id: string
  content: string
  sender: 'user' | 'nikhil'
  timestamp: string
  audioUrl?: string
}

const ChatDemo = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey there! I'm Nikhil. I've been thinking about what happened in class today... Want to talk about it?",
      sender: 'nikhil',
      timestamp: '2:30 PM'
    },
    {
      id: '2', 
      content: "I want to understand better. Can you tell me how it felt when that happened?",
      sender: 'user',
      timestamp: '2:32 PM'
    },
    {
      id: '3',
      content: "You know, at first I thought it was just fun... but seeing Rajat's face made me realize I might have hurt him. I never thought about how my jokes could make someone feel small.",
      sender: 'nikhil', 
      timestamp: '2:35 PM'
    },
    {
      id: '4',
      content: "That's really mature of you to recognize that. What do you think you could do differently next time?",
      sender: 'user',
      timestamp: '2:37 PM'
    },
    {
      id: '5',
      content: "I think I should apologize to Rajat first. And maybe... think before I speak? I want to be someone who makes people feel good, not bad.",
      sender: 'nikhil',
      timestamp: '2:40 PM'
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [lastPlayedMessage, setLastPlayedMessage] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Auto-play latest message when messages change
  useEffect(() => {
    const latestMessage = messages[messages.length - 1]
    if (latestMessage && latestMessage.id !== lastPlayedMessage) {
      setLastPlayedMessage(latestMessage.id)
      setTimeout(() => {
        playTextToSpeech(latestMessage.content, latestMessage.id, latestMessage.sender)
      }, 500) // Small delay to allow UI to update
    }
  }, [messages, lastPlayedMessage])

  const playTextToSpeech = async (text: string, messageId: string, sender?: 'user' | 'nikhil') => {
    if (playingAudio === messageId) {
      setPlayingAudio(null)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      return
    }

    try {
      setPlayingAudio(messageId)
      
      // Use different voices for different senders
      const voiceId = sender === 'user' ? 'EXAVITQu4vr4xnSDxMaL' : '9BWtsMINqrJLrRacOk9x' // Sarah for user, Aria for Nikhil
      
      // Mock audio generation - in real implementation this would use ElevenLabs API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY || ''
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl
          audioRef.current.play()
          audioRef.current.onended = () => setPlayingAudio(null)
        }
      } else {
        // Fallback to browser speech synthesis for demo
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.onend = () => setPlayingAudio(null)
        speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.log('Using fallback speech synthesis')
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onend = () => setPlayingAudio(null)
      speechSynthesis.speak(utterance)
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real implementation, this would add the message and get AI response
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col border-primary/20 shadow-glow">

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-background/50 to-background backdrop-blur-sm">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'nikhil' && (
                <img 
                  src={nikhilAvatar} 
                  alt="Nikhil"
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                />
              )}
              
              <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`p-4 rounded-2xl shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto shadow-primary/20'
                      : 'bg-card/80 border border-primary/10 shadow-card/30'
                  }`}
                >
                  <p className="text-sm font-opensans leading-relaxed">{message.content}</p>
                  
                  {message.sender === 'nikhil' && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-primary/10">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 rounded-full hover:bg-primary/10 transition-colors"
                        onClick={() => playTextToSpeech(message.content, message.id, message.sender)}
                      >
                        {playingAudio === message.id ? (
                          <Pause className="w-3 h-3 text-primary" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-primary" />
                        )}
                      </Button>
                      <span className="text-xs text-muted-foreground font-medium">
                        {message.timestamp}
                      </span>
                    </div>
                  )}
                </div>
                
                {message.sender === 'user' && (
                  <p className="text-xs text-muted-foreground text-right mt-2 font-medium">
                    {message.timestamp}
                  </p>
                )}
              </div>

              {message.sender === 'user' && (
                <div className="w-11 h-11 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-white">You</span>
                </div>
              )}
            </div>
          ))}
        </CardContent>

        {/* Message Input */}
        <div className="p-4 border-t border-primary/20 bg-gradient-card">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 border-primary/20 focus:border-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-opensans">
            Click the volume icon to hear Nikhil's messages spoken aloud
          </p>
        </div>
      </Card>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}

export default ChatDemo