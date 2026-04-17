import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, Star, ExternalLink, ChevronRight, Heart, MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products, Product } from './data/products';
import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "undefined" && apiKey !== '""') {
      aiInstance = new GoogleGenAI({ apiKey });
    }
  }
  return aiInstance;
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: string, text: string}>>([
    { role: 'assistant', text: 'Hi! I am your AI assistant for our Store. How can I help you pick the right product today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const categories = ['All', 'Tech', 'Lifestyle', 'Home', 'Outdoors'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const systemPrompt = `You are a helpful customer service AI for this affiliate store.
Here are the products currently available in the shop:
${JSON.stringify(products, null, 2)}
Your job is to answer user questions about these products, compare them, and help them make purchasing decisions. Always be polite, concise, and reference the specific products in the shop when relevant.`;

      const ai = getAI();
      if (!ai) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: "⚠️ Note: The Gemini API Key is missing. Please add the `GEMINI_API_KEY` to your Vercel Project Settings > Environment Variables, then do a new deployment to enable AI features!" }]);
        setIsChatLoading(false);
        return;
      }

      // Construct up conversation history (excluding the very first greeting to save tokens if we want, but it's fine to include)
      const formattedHistory = chatMessages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n');
      const prompt = `${systemPrompt}\n\nChat History:\n${formattedHistory}\nUser: ${userMessage}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      if (response.text) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: response.text! }]);
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChatMessages(prev => [...prev, { role: 'assistant', text: "I'm sorry, I encountered an error connecting to the server. Please try again later." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#FAFAFB] min-h-screen relative shadow-[0_24px_48px_rgba(0,0,0,0.12)] font-sans flex flex-col text-[#1A1A1B]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#EEE] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 text-[#1A1A1B]" />
          <h1 className="text-[20px] font-[800] tracking-[-0.5px] text-[#2563EB] uppercase">Store</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-[#1A1A1B]" />
          </div>
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#1A1A1B]" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              2
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <div className="px-4 pb-4 mt-4">
          <h3 className="text-[12px] uppercase tracking-[1px] text-[#6B7280] font-bold mb-3 px-1 mt-2">
            Trending Now
          </h3>
          
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#FFFFFF] border-t border-[#EEE] h-[70px] px-6 flex justify-around items-center z-40">
        <NavItem 
          icon={<MessageCircle className="w-[20px] h-[20px]" />} 
          label="AI Chat" 
          onClick={() => setIsChatOpen(true)}
        />
        <NavItem 
          icon={<ShoppingBag className="w-[20px] h-[20px]" />} 
          label="Shop" 
          active 
        />
        <NavItem 
          icon={<Menu className="w-[20px] h-[20px]" />} 
          label="Categories" 
        />
      </nav>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col bg-white max-w-md mx-auto"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEE]">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-[16px] font-bold text-[#1A1A1B]">AI Product Assistant</h2>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#FAFAFB]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-[14px] ${
                    msg.role === 'user' 
                      ? 'bg-[#2563EB] text-white rounded-br-none' 
                      : 'bg-white border border-[#E5E7EB] text-[#1A1A1B] rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#EEE] p-4 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about a product..."
                  className="w-full bg-[#F3F4F6] border-transparent focus:border-[#2563EB] focus:bg-white focus:ring-0 rounded-full py-3.5 pl-5 pr-12 text-[14px] outline-none transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isChatLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#2563EB] text-white rounded-full disabled:opacity-50 disabled:bg-gray-400"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const isAvailable = product.isAvailable !== false;

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      className={`bg-[#FFF] rounded-[20px] p-4 border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.02)] flex flex-col group relative ${!isAvailable ? 'opacity-70 grayscale-[0.5]' : ''}`}
    >
      <div className="relative mb-3">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-[160px] object-cover rounded-[12px] bg-[#E5E7EB]"
          referrerPolicy="no-referrer"
        />
        <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-md rounded-[8px] flex items-center justify-center text-[#6B7280] border border-[#E5E7EB] shadow-sm hover:text-[#1A1A1B]">
          <Heart className="w-4 h-4" />
        </button>
        {!isAvailable && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-[12px] flex items-center justify-center">
            <span className="bg-[#1A1A1B] text-white text-[12px] font-bold px-3 py-1.5 rounded-full shadow-md">
              Not Available
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="text-[18px] font-bold text-[#1A1A1B] leading-tight">{product.title}</h3>
          <span className={`font-bold whitespace-nowrap ${isAvailable ? 'text-[#2563EB]' : 'text-gray-500'}`}>{isAvailable ? product.price : '---'}</span>
        </div>
        
        <div className={`flex items-center gap-1 mb-2 ${isAvailable ? 'text-[#F59E0B]' : 'text-gray-400'}`}>
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-[14px] font-bold">{product.rating}</span>
          <span className="text-[11px] text-[#6B7280] ml-1">({product.reviewCount} Reviews)</span>
        </div>

        <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-[12px] p-3 mb-4">
          <div className="flex gap-2 items-start">
            <div className={`text-[20px] font-serif leading-none opacity-50 mt-1 ${isAvailable ? 'text-[#2563EB]' : 'text-gray-400'}`}>"</div>
            <p className="text-[13px] text-[#4B5563] leading-[1.4] m-0 italic">
              {product.reviewExcerpt}
            </p>
          </div>
        </div>
        
        {isAvailable ? (
          <a
            href={product.affiliateLink}
            className="w-full bg-[#2563EB] text-white text-[14px] font-semibold py-3 rounded-[10px] flex items-center justify-center gap-2 mt-auto hover:bg-[#1D4ED8] transition-colors"
          >
            Check Latest Price <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 text-[14px] font-semibold py-3 rounded-[10px] flex items-center justify-center gap-2 mt-auto cursor-not-allowed"
          >
            Currently Unavailable
          </button>
        )}
      </div>
    </motion.article>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 ${active ? 'text-[#2563EB]' : 'text-[#9CA3AF] hover:text-[#4B5563]'}`}
    >
      {icon}
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}
