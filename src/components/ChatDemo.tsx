import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Play, Pause, Send, Volume2, Mic, MicOff } from "lucide-react"
import nikhilAvatar from "@/assets/nikhil-avatar.png"
import { sendMessageToMockApi } from "@/services/mockChatApi"

// Speech Recognition API types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string
  content: string
  sender: 'user' | 'nikhil'
  timestamp: string
  audioUrl?: string
}

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-greeting',
      content: "Hello! 😊 I'm excited to chat with you.\n\nWhich character from the movie would you like to interact with today—Rajat, Nikhil, or Tanvi?\n\nJust let me know your choice, and we can dive right into their world together!",
      sender: 'nikhil',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [lastPlayedMessage, setLastPlayedMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const recognitionRef = useRef<any>(null)

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

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        const result = event.results[event.results.length - 1]
        const transcript = result.transcript
        
        if (result.isFinal) {
          setNewMessage(transcript)
          setIsRecording(false)
        } else {
          // Show interim results in the input
          setNewMessage(transcript)
        }
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser')
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      setNewMessage('')
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

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

  const handleSendMessage = async () => {
    if (newMessage.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        })
      }
      
      // Add user message immediately
      setMessages(prev => [...prev, userMessage])
      setNewMessage('')
      setIsLoading(true)
      
      try {
        // Get response from mock API
        const response = await sendMessageToMockApi(newMessage)
        
        const nikhilMessage: Message = {
          id: response.id,
          content: response.content,
          sender: 'nikhil',
          timestamp: response.timestamp,
          audioUrl: response.audioUrl
        }
        
        // Add Nikhil's response
        setMessages(prev => [...prev, nikhilMessage])
      } catch (error) {
        console.error('Failed to get response:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col border-0 shadow-none">

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-primary/60" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-montserrat font-semibold text-foreground">No messages yet</h3>
                  <p className="text-sm text-muted-foreground font-opensans">Start typing to begin the conversation!</p>
                </div>
              </div>
            </div>
          ) : (
            <>
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
                      
                    </div>
                    
                    {message.sender === 'nikhil' && (
                      <p className="text-xs text-muted-foreground text-left mt-2 font-medium">
                        {message.timestamp}
                      </p>
                    )}
                    
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
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <img 
                    src={nikhilAvatar} 
                    alt="Nikhil"
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="max-w-xs lg:max-w-md">
                    <div className="p-4 rounded-2xl shadow-sm backdrop-blur-sm bg-card/80 border border-primary/10 shadow-card/30">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>

        {/* Message Input */}
        <div className="p-4 border-t border-primary/20 bg-gradient-card">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isRecording ? "Listening..." : "Type your response or click mic to speak..."}
              className="flex-1 border-primary/20 focus:border-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isRecording}
            />
            <Button 
              onClick={toggleVoiceRecording}
              size="icon"
              variant={isRecording ? "destructive" : "outline"}
              className={`${isRecording ? "animate-pulse" : ""} hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-smooth`}
              disabled={isLoading}
              title={isRecording ? "Stop recording" : "Start voice recording"}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="bg-primary hover:bg-primary/90"
              disabled={isLoading || !newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-opensans">
            {isRecording 
              ? "🎤 Listening... Speak clearly and we'll convert it to text"
              : "Type or use voice input. Messages are automatically read aloud for both you and AI agent"
            }
          </p>
        </div>
      </Card>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}

export default ChatDemo