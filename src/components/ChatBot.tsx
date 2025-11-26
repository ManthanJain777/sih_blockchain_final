import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface KnowledgeBase {
  keywords: string[];
  response: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hard-coded knowledge base
  const knowledgeBase: KnowledgeBase[] = [
    {
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      response: "Hello! I'm your Polkadot File Verifier assistant. I can help you with uploading files, verifying media, connecting your wallet, and understanding how the platform works. What would you like to know?",
    },
    {
      keywords: ['upload', 'file', 'how to upload', 'add file'],
      response: "To upload a file:\n1. Navigate to the Upload page using the navigation menu\n2. Click 'Connect Wallet' to connect your Polkadot wallet\n3. Click 'Choose File' or 'Select' to pick your file\n4. The system will automatically generate SHA256 hash and metadata\n5. Click 'Submit to Polkadot Blockchain' to permanently record it",
    },
    {
      keywords: ['verify', 'check', 'verification', 'how to verify'],
      response: "To verify a file:\n1. Go to the Verify page from the navigation menu\n2. Enter the SHA256 hash of the file you want to verify\n3. Click the 'Verify' button\n4. The system will retrieve and display:\n   - File hash\n   - Timestamp\n   - Geolocation data\n   - File name\nThis proves the file's authenticity and ownership.",
    },
    {
      keywords: ['wallet', 'metamask', 'connect wallet', 'connection'],
      response: "To connect your wallet:\n1. Make sure you have MetaMask installed in your browser\n2. Go to the Upload page\n3. Click the 'Connect Wallet' button in the MetaMask Connection card\n4. Your wallet address will be displayed once connected\n5. You can now upload files and submit to blockchain\n\nNote: In this demo, wallet connection is simulated.",
    },
    {
      keywords: ['polkadot', 'what is polkadot', 'blockchain'],
      response: "Polkadot is a multi-chain network that enables different blockchains to transfer messages and value in a trust-free fashion. Benefits:\n\n• Interoperability - different blockchains can communicate seamlessly\n• Security - shared security model across connected chains\n• Scalability - multiple chains processing transactions in parallel\n• Governance - on-chain governance for network upgrades\n\nYour file hashes are permanently recorded on the Polkadot blockchain network.",
    },
    {
      keywords: ['hash', 'sha256', 'what is hash'],
      response: "SHA256 is a cryptographic hash function that creates a unique 64-character fingerprint for your file. Key features:\n\n• Unique - even tiny changes create completely different hashes\n• One-way - impossible to reverse engineer the original file\n• Deterministic - same file always produces the same hash\n• Secure - used for verifying file integrity\n\nWe use SHA256 to prove your file hasn't been tampered with.",
    },
    {
      keywords: ['blockchain', 'what is blockchain', 'immutable'],
      response: "Blockchain provides immutable proof of your file's existence and ownership. Here's how:\n\n• Your file hash is recorded on the blockchain\n• Timestamp proves when you registered the file\n• Geolocation adds where it was registered\n• Records cannot be altered or deleted\n• Anyone can verify but only you control the original\n\nThis creates permanent, tamper-proof evidence of ownership.",
    },
    {
      keywords: ['geo', 'geolocation', 'location', 'gps'],
      response: "Geolocation data (latitude/longitude) is automatically captured when you upload a file. This:\n\n• Adds geographical proof of where the file was registered\n• Helps establish authenticity and context\n• Is stored alongside your file hash on the blockchain\n• Can be used as additional evidence of ownership\n\nYour browser will request location permission when you select a file.",
    },
    {
      keywords: ['cost', 'price', 'fee', 'payment'],
      response: "This is a demonstration platform. In production:\n\n• Polkadot blockchain transactions require fees (DOT tokens)\n• Polkadot.js wallet is free to use\n• Transaction costs vary by network congestion\n\nFor this demo, all operations are simulated and free.",
    },
    {
      keywords: ['safe', 'secure', 'security', 'privacy'],
      response: "Security features:\n\n• Files are hashed locally in your browser\n• Private keys never leave your wallet\n• Polkadot blockchain provides tamper-proof records\n• SHA256 hashing ensures content integrity\n• No central server stores your credentials\n\nImportant: This is a demo. Don't upload sensitive or personal information.",
    },
    {
      keywords: ['error', 'problem', 'issue', 'not working', 'help'],
      response: "Common issues and solutions:\n\n• Can't connect wallet: Ensure MetaMask is installed and unlocked\n• File not uploading: Check wallet connection first\n• Verification failed: Make sure you entered the correct hash\n• Page not loading: Try refreshing the browser\n\nStill having issues? Make sure you're following the upload steps in order.",
    },
    {
      keywords: ['start', 'begin', 'getting started', 'tutorial'],
      response: "Quick Start Guide:\n\n1. Explore the Home page to understand the platform\n2. Read the About page for technical details\n3. Go to Upload page and connect your wallet\n4. Select a file to hash and upload\n5. Submit to blockchain for permanent record\n6. Use the Verify page to check any file's authenticity\n\nReady to start? Just say 'go to upload' or navigate using the menu!",
    },
    {
      keywords: ['navigate', 'go to', 'page', 'menu'],
      response: "You can navigate using the menu at the top:\n\n• Home - Overview and features\n• Upload - Upload and hash files\n• Verify - Verify file authenticity\n• About - Learn about the technology\n\nJust click on any menu item to go to that page!",
    },
    {
      keywords: ['cid', 'content identifier', 'hash'],
      response: "File hash is a unique identifier for your file. Format: A 64-character hexadecimal string.\n\n• Generated using SHA256 algorithm from your file's content\n• Same file = same hash always\n• Used to verify your file's authenticity\n• Stored permanently on the Polkadot blockchain\n• Provides tamper-proof proof of existence",
    },
    {
      keywords: ['timestamp', 'time', 'date', 'when'],
      response: "Timestamps are recorded when you submit to blockchain:\n\n• Uses UTC ISO 8601 format\n• Proves when the file was registered\n• Cannot be backdated or modified\n• Useful for copyright and ownership disputes\n• Displayed in verification results\n\nThe current time is shown at the top of the Upload page.",
    },
  ];

  // Initialize welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        text: "Welcome! I'm your Polkadot File Verifier assistant. How can I help you today? You can ask me about uploading files, verifying media, connecting wallets, or general platform guidance.",
        isBot: true,
        timestamp: new Date(),
      }]);
    }
  }, [isOpen, messages.length]);

  const findBestResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching knowledge base entry
    for (const entry of knowledgeBase) {
      if (entry.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return entry.response;
      }
    }
    
    // Default response if no match found
    return "I'm not sure about that. I can help you with:\n\n• Uploading files to Polkadot blockchain\n• Verifying file authenticity\n• Connecting your wallet\n• Understanding Polkadot blockchain\n• Platform navigation\n\nWhat would you like to know more about?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#2DD4BF] hover:scale-110 text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center transition-all z-50 animate-pulse"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl border-2 border-primary/30 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#2DD4BF] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageCircle size={22} />
              </div>
              <div>
                <h3 className="font-bold text-lg uppercase tracking-wide">Polkadot Assistant</h3>
                <p className="text-white/90 text-xs font-semibold">
                  Online - Here to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-xl p-2 transition-colors"
              aria-label="Close chat"
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-card">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                    message.isBot
                      ? 'bg-card-foreground/5 border-2 border-border/50 text-card-foreground'
                      : 'bg-gradient-to-r from-[#8B5CF6] to-[#2DD4BF] text-white'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-2 font-semibold ${
                      message.isBot ? 'text-card-foreground/50' : 'text-white/70'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-card border-t-2 border-border/50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 border-2 border-border/50 bg-card-foreground/5 rounded-xl"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] hover:opacity-90 text-background rounded-full px-4 shadow-lg"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-card-foreground/60 mt-2 font-semibold">
              Ask about uploads, verification, wallets, or platform features
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
