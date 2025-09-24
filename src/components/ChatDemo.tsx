import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Play, Pause, Send, Volume2, Mic, MicOff } from "lucide-react"

import { sendMessageToMockApi } from "@/services/mockChatApi"


interface Message {
  id: string
  content: string
  sender: 'user' | 'nikhil'
  timestamp: string
  audioUrl?: string
}

interface ChatDemoProps {
  onTalkingStateChange?: (isTalking: boolean) => void
}

const ChatDemo = ({ onTalkingStateChange }: ChatDemoProps) => {
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
  const [audioUnlocked, setAudioUnlocked] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [hasUnplayedResponse, setHasUnplayedResponse] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Detect iOS devices
  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsIOS(isIOSDevice)
  }, [])

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

  // Auto-play latest AI message when messages change (Android/Desktop only)
  useEffect(() => {
    if (!voiceResponsesEnabled || !audioUnlocked || isIOS) return // Don't auto-play on iOS
    
    const latestMessage = messages[messages.length - 1]
    // Auto-play for AI responses including initial greeting
    if (latestMessage && 
        latestMessage.sender === 'nikhil' && 
        latestMessage.id !== lastPlayedMessage) {
      setLastPlayedMessage(latestMessage.id)
      const delay = latestMessage.id === 'initial-greeting' ? 1500 : 500
      setTimeout(() => {
        playTextToSpeech(latestMessage.content, latestMessage.id, latestMessage.sender)
      }, delay) // Longer delay for initial greeting
    }
  }, [messages, lastPlayedMessage, voiceResponsesEnabled, audioUnlocked, isIOS])

  // Track unplayed responses for iOS
  useEffect(() => {
    if (!isIOS) return
    
    const latestMessage = messages[messages.length - 1]
    if (latestMessage && 
        latestMessage.sender === 'nikhil' && 
        latestMessage.id !== lastPlayedMessage) {
      setHasUnplayedResponse(true)
    }
  }, [messages, lastPlayedMessage, isIOS])

  // Auto-scroll to latest message (excluding initial greeting)
  useEffect(() => {
    // Only scroll if there are messages beyond the initial greeting
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])


  // Auto-send message when recording stops and transcript is available
  useEffect(() => {
    if (!isRecording && transcript && transcript.trim()) {
      handleSendMessage();
      setTranscript(''); // Clear transcript after sending
    }
  }, [isRecording, transcript]);

  const unlockAudio = () => {
    if (!audioUnlocked) {
      // Initialize audio context with user gesture
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContext.resume().then(() => {
        setAudioUnlocked(true)
        setHasUserInteracted(true)
        console.log('Audio unlocked through user interaction')
      }).catch(err => {
        console.log('Audio unlock failed:', err)
      })
    }
  }

  const playLatestMessageDirectly = async () => {
    if (!voiceResponsesEnabled) return
    
    console.log('iOS: playLatestMessageDirectly called')
    
    const latestMessage = messages[messages.length - 1]
    if (latestMessage && 
        latestMessage.sender === 'nikhil' && 
        latestMessage.id !== lastPlayedMessage) {
      
      console.log('iOS: Playing message:', latestMessage.content.substring(0, 50))
      setLastPlayedMessage(latestMessage.id)
      setHasUnplayedResponse(false)
      
      // Wait for voices to load on iOS
      let voices = speechSynthesis.getVoices()
      if (voices.length === 0) {
        console.log('iOS: Waiting for voices to load...')
        await new Promise(resolve => {
          speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices()
            console.log('iOS: Voices loaded:', voices.length)
            resolve(voices)
          }
        })
      }
      
      // Create utterance immediately in click handler
      const utterance = new SpeechSynthesisUtterance(latestMessage.content)
      
      // Configure voice with fallback
      if (voices.length > 0) {
        const maleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('male') || 
          voice.name.toLowerCase().includes('man') ||
          voice.name.toLowerCase().includes('daniel') ||
          voice.name.toLowerCase().includes('alex') ||
          voice.name.toLowerCase().includes('fred')
        )
        utterance.voice = maleVoice || voices[0]
        console.log('iOS: Using voice:', utterance.voice?.name || 'default')
      } else {
        console.log('iOS: No voices available, using default')
      }
      
      utterance.rate = 0.9
      utterance.pitch = 0.9
      utterance.volume = 0.8
      
      utterance.onstart = () => {
        console.log('iOS: Speech started')
        setPlayingAudio(latestMessage.id)
        onTalkingStateChange?.(true)
      }
      utterance.onend = () => {
        console.log('iOS: Speech ended')
        setPlayingAudio(null)
        onTalkingStateChange?.(false)
      }
      utterance.onerror = (event) => {
        console.error('iOS: Speech error:', event)
        setPlayingAudio(null)
        onTalkingStateChange?.(false)
      }
      
      // Call speak immediately without any delays
      try {
        speechSynthesis.speak(utterance)
        console.log('iOS: speechSynthesis.speak() called')
      } catch (error) {
        console.error('iOS: Error calling speechSynthesis.speak():', error)
      }
    } else {
      console.log('iOS: No message to play or already played')
    }
  }

  const playTextToSpeech = async (text: string, messageId: string, sender?: 'user' | 'nikhil') => {
    if (!voiceResponsesEnabled || !audioUnlocked) return // Don't play if voice responses are disabled or audio not unlocked
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
      
      utterance.onstart = () => onTalkingStateChange?.(true)
      utterance.onend = () => {
        setPlayingAudio(null)
        onTalkingStateChange?.(false)
      }
      utterance.onerror = () => {
        setPlayingAudio(null)
        onTalkingStateChange?.(false)
      }
      
      speechSynthesis.speak(utterance)
      
    } catch (error) {
      console.log('Speech synthesis error:', error)
      setPlayingAudio(null)
    }
  }


  const startRecording = () => {
    // On iOS, first click plays latest response if available
    if (isIOS && hasUnplayedResponse) {
      console.log('iOS: First click - playing latest message')
      // Set user interaction immediately and play
      setHasUserInteracted(true)
      playLatestMessageDirectly()
      return
    }
    
    // Unlock audio on first user interaction with voice button
    if (!hasUserInteracted) {
      unlockAudio()
    }
    
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
        <CardContent className="flex-1 overflow-y-auto py-6 px-2 pb-36 md:p-6 md:pb-6 space-y-6 bg-background">
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
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-center md:justify-start'}`}
                >
                  
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
                <div className="flex gap-3 justify-center md:justify-start">
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
          {/* Invisible div to enable auto-scrolling */}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Press-to-Talk Section */}
        <div className="p-6 border-t border-primary/10 bg-white md:bg-gradient-to-t md:from-card/50 md:to-background backdrop-blur-sm md:relative fixed bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Recording Animation Rings */}
            <div className="relative">
              {/* Animated rings when recording */}
              {isRecording && (
                <>
                  <div className="absolute inset-0 w-16 h-16 bg-destructive/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 w-16 h-16 bg-destructive/20 rounded-full animate-pulse"></div>
                  <div className="absolute -inset-2 w-20 h-20 bg-destructive/10 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </>
              )}
              
              {/* Circular Press-to-Talk Button */}
              <Button 
                onClick={isRecording ? stopRecording : startRecording}
                size="icon"
                variant={isRecording ? "destructive" : "default"}
                className={`relative w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 ${
                  isRecording 
                    ? 'bg-destructive hover:bg-destructive/90' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
                disabled={isLoading || !recognition}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </Button>
            </div>
            
            {/* Status Text */}
            <p className="text-sm text-muted-foreground font-medium text-center">
              {isRecording ? 'Recording... Release to send' : 
               isIOS && hasUnplayedResponse ? 'Tap to hear response' :
               !hasUserInteracted ? 'Tap to start voice chat' : 'Press and hold to talk'}
            </p>
            
            {/* Audio Status Indicator */}
            {hasUserInteracted && (
              <p className="text-xs text-primary/70 font-medium text-center">
                {audioUnlocked ? '🎵 Audio ready' : '🔇 Audio initializing...'}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}

export default ChatDemo