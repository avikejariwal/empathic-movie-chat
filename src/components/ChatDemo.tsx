import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Play, Pause, Send, Volume2, Mic, MicOff } from "lucide-react"
import nikhilAvatar from "@/assets/nikhil-avatar.png"
import { sendMessageToMockApi } from "@/services/mockChatApi"


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

  const [newMessage, setNewMessage] = useState<string>('')
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [lastPlayedMessage, setLastPlayedMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [voiceResponsesEnabled, setVoiceResponsesEnabled] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [recognition, setRecognition] = useState<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'en-US';
      
      speechRecognition.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript;
        setNewMessage(transcriptText);
        setTranscript(transcriptText);
        setIsRecording(false);
      };
      
      speechRecognition.onerror = () => {
        setIsRecording(false);
      };
      
      speechRecognition.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(speechRecognition);
    }
  }, []);

  // Auto-play latest AI message when messages change (excluding user messages and initial greeting)
  useEffect(() => {
    if (!voiceResponsesEnabled) return // Don't auto-play if voice responses are disabled
    
    const latestMessage = messages[messages.length - 1]
    // Only auto-play for AI responses, exclude user messages and initial greeting
    if (latestMessage && 
        latestMessage.sender === 'nikhil' && 
        latestMessage.id !== 'initial-greeting' &&
        latestMessage.id !== lastPlayedMessage) {
      setLastPlayedMessage(latestMessage.id)
      setTimeout(() => {
        playTextToSpeech(latestMessage.content, latestMessage.id, latestMessage.sender)
      }, 500) // Small delay to allow UI to update
    }
  }, [messages, lastPlayedMessage, voiceResponsesEnabled])

  // Auto-send message when recording stops and transcript is available
  useEffect(() => {
    if (!isRecording && transcript && transcript.trim()) {
      handleSendMessage();
      setTranscript(''); // Clear transcript after sending
    }
  }, [isRecording, transcript]);

  const playTextToSpeech = async (text: string, messageId: string, sender?: 'user' | 'nikhil') => {
    if (!voiceResponsesEnabled) return // Don't play if voice responses are disabled
    if (playingAudio === messageId) {
      setPlayingAudio(null)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      return
    }

    try {
      setPlayingAudio(messageId)
      
      // Use browser speech synthesis (no API key needed)
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Wait for voices to load
      let voices = speechSynthesis.getVoices()
      if (voices.length === 0) {
        await new Promise(resolve => {
          speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices()
            resolve(voices)
          }
        })
      }
      
      // Configure voice based on sender
      if (voices.length > 0) {
        // Try to find appropriate voices
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('victoria') ||
          voice.name.toLowerCase().includes('susan')
        )
        const maleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('male') || 
          voice.name.toLowerCase().includes('man') ||
          voice.name.toLowerCase().includes('daniel') ||
          voice.name.toLowerCase().includes('alex') ||
          voice.name.toLowerCase().includes('fred')
        )
        
        if (sender === 'user' && femaleVoice) {
          utterance.voice = femaleVoice
        } else if (sender === 'nikhil' && maleVoice) {
          utterance.voice = maleVoice
        } else {
          // Use default voice or first available
          utterance.voice = voices[0]
        }
      }
      
      // Configure speech settings
      utterance.rate = 0.9
      utterance.pitch = sender === 'user' ? 1.1 : 0.9
      utterance.volume = 0.8
      
      utterance.onend = () => setPlayingAudio(null)
      utterance.onerror = () => setPlayingAudio(null)
      
      speechSynthesis.speak(utterance)
      
    } catch (error) {
      console.log('Speech synthesis error:', error)
      setPlayingAudio(null)
    }
  }


  const startRecording = () => {
    if (recognition && !isRecording) {
      setIsRecording(true);
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage?.trim() && !isLoading) {
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
      <Card className="h-[600px] md:h-[600px] h-[calc(100vh-120px)] flex flex-col border-0 shadow-none">

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto py-6 px-2 md:p-6 space-y-6 bg-background">
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

        {/* Enhanced Message Input Section */}
        <div className="p-6 border-t border-primary/10 bg-white md:bg-gradient-to-t md:from-card/50 md:to-background backdrop-blur-sm md:relative fixed bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto">
          {/* Voice Response Toggle - Enhanced */}
          <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-gradient-to-r from-card/80 to-card/60 border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-full bg-primary/10">
                <Volume2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Voice Responses</span>
                <p className="text-xs text-muted-foreground">Auto text-to-speech</p>
              </div>
            </div>
            <Switch 
              checked={voiceResponsesEnabled}
              onCheckedChange={setVoiceResponsesEnabled}
            />
          </div>

          {/* Enhanced Input Area */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message or use voice..."
                  className="h-12 pr-4 pl-4 border-primary/20 focus:border-primary shadow-sm hover:shadow-md transition-all duration-200 bg-card/50 backdrop-blur-sm text-base rounded-xl"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              
              {/* Voice Recording Button */}
              <Button 
                onClick={isRecording ? stopRecording : startRecording}
                size="icon"
                variant={isRecording ? "destructive" : "outline"}
                className="h-12 w-12 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:bg-secondary hover:text-secondary-foreground"
                disabled={isLoading || !recognition}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              {/* Send Button */}
              <Button 
                onClick={handleSendMessage}
                size="icon"
                className="h-12 w-12 rounded-xl bg-secondary hover:bg-secondary/90 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                disabled={isLoading || !newMessage?.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Enhanced Status Text */}
            <div className="flex items-center justify-center">
              <p className="text-xs text-muted-foreground font-medium text-center px-4 py-2 rounded-full bg-muted/30 backdrop-blur-sm">
                💬 {voiceResponsesEnabled ? 'Voice responses enabled' : 'Voice responses disabled'} • 
                {isRecording ? '🎤 Recording...' : '🎤 Tap mic to record'} • Press Enter to send
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}

export default ChatDemo