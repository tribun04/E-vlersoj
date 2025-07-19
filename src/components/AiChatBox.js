import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Spin, Avatar, Input, Space, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX } from 'react-icons/fi';
import { FaUser, FaRegStar } from 'react-icons/fa';
import { useChat } from '../hooks/useChat'; // Assuming this hook exists and works

const { Text } = Typography;

// --- Theme & Asset Configuration ---
const theme = {
    primary: '#00B67A',
    primaryDark: '#00A36D',
    botAvatarUrl: 'https://void.shigjeta.com/images/voidwhite.png',
};

// --- Custom Hooks (Unchanged, already well-written) ---
const useTypewriter = (text, speed = 20) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        setDisplayText('');
        if (text) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [text, speed]);
    return displayText;
};

const useChatScroll = (dep) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [dep]);
    return ref;
};

// --- Sub-Components ---

// Cosmic background pattern, memoized for performance
const CosmicBackground = React.memo(() => (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <FaRegStar
                key={i}
                className="absolute text-white"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 10 + 5}px`,
                    opacity: Math.random() * 0.5 + 0.1
                }}
            />
        ))}
    </div>
));

// Styled message component, memoized for performance
const Message = React.memo(({ message, isTyping }) => {
    const isUser = message.role === 'user';

    const textToType = !isUser && isTyping ? message.content : null;
    const typedText = useTypewriter(textToType);
    const displayText = isUser ? message.content : (isTyping ? typedText : message.content);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            {!isUser && (
                <Avatar
                    src={theme.botAvatarUrl}
                    // FIX: Corrected typo from "object-conatiner" to "object-contain"
                    className="flex-shrink-1 bg-gray-800 border-2 object-contain"
                />
            )}
            <div
                className={`py-3 px-4 rounded-2xl max-w-[80%] whitespace-pre-wrap shadow-lg ${isUser
                    ? 'bg-gray-700 text-white rounded-br-none'
                    : 'bg-gray-900 text-gray-100 rounded-bl-none border border-gray-700'
                    }`}
            >
                {displayText || (
                    <Space>
                        <Spin size="small" />
                        <Text className="text-gray-400">Void is thinking...</Text>
                    </Space>
                )}
            </div>
            {isUser && (
                <Avatar icon={<FaUser />} className="flex-shrink-0 bg-gray-600" />
            )}
        </motion.div>
    );
});


// --- The Main Chat Component ---
const VoidChatBot = () => {
    const [input, setInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { messages, loading, error, sendMessage } = useChat();

    const chatContainerRef = useChatScroll(messages);
    const inputRef = useRef(null);

    // Auto-focus the input when the modal opens for better UX
    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isModalOpen]);

    const messagesToDisplay = messages.filter(msg => msg.role !== 'system');

    const handleSendMessage = () => {
        if (input.trim() && !loading) {
            sendMessage(input);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Welcome screen when there are no messages
    const WelcomeScreen = () => (
        <div className="text-center py-12 px-4 flex flex-col items-center h-full justify-center">
            {/* FIX: Cleaned up styling for this Avatar */}
            <img 
                src={theme.botAvatarUrl}
                className="mx-auto mb-5  p-2   object-container  flex items-center justify-center" width={100} alt="Void AI Avatar"
            />
            <Text className="text-2xl text-white font-medium" style={{ color: theme.primary }}>
                Void AI Assistant
            </Text>
            <Text  className="block mt-2 text-gray-400 max-w-sm">
                I am a Cosmic Knowledge Engine. Ask me anything about technology, science, or the universe.
            </Text>
        </div>
    );

    return (
        <>
            <Button
                type="primary" classNames="flex items-center"
                onClick={() => setIsModalOpen(true)}
                icon={<img src={theme.botAvatarUrl} className="mx-auto mb-5 p-2   object-container  flex items-center justify-center" width={100} alt="Void AI Avatar" />}
                size="large"
                className="font-semibold"
                style={{
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                    boxShadow: `0 4px 14px rgba(0, 182, 122, 0.4)`,
                }}
            >
                Chat with Void AI
            </Button >

            <Modal
                title={
                    <div className="flex  items-center p-2 gap-1 ">
                        <img src={theme.botAvatarUrl} className="  w-[100px] object-container " alt="Void AI Avatar" /> 
                        <div>
                            <div className="text-xs text-gray-400 flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></span>
                                {loading ? 'Typingg...' : 'Online'}
                            </div>
                        </div>
                    </div>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={650}
                closeIcon={<FiX className="text-gray-400 hover:text-white" />}
                destroyOnClose
                styles={{
                    content: { backgroundColor: '#111827', border: '1px solid #1f2937', padding: 0, position: 'relative', overflow: 'hidden' },
                    header: { backgroundColor: '#111827', borderBottom: '1px solid #1f2937' },
                    body: { height: '70vh', padding: 0 },
                }}
            >
                <div className="flex flex-col h-full bg-gray-900 relative">
                    <CosmicBackground />

                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto z-10" role="log" aria-live="polite">
                        {messagesToDisplay.length === 0 ? (
                            <WelcomeScreen />
                        ) : (
                            <div className="space-y-6 p-6">
                                <AnimatePresence>
                                    {messagesToDisplay.map((msg, i) => {
                                        const isLastMessage = i === messagesToDisplay.length - 1;
                                        const isAssistantMessage = msg.role === 'assistant';
                                        const isTyping = isLastMessage && isAssistantMessage && loading;

                                        return (
                                            <Message
                                                key={msg.id || i}
                                                message={msg}
                                                isTyping={isTyping}
                                            />
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="p-4 pt-0 z-10">
                            <div className="bg-red-900/30 text-red-400 text-sm p-3 rounded-lg border border-red-900/50">
                                <strong>Cosmic Interference:</strong> {error.message || 'An unknown anomaly occurred.'}
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 z-10">
                        <div className="flex items-center gap-3">
                            <Input.TextArea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Send a message into the void..."
                                disabled={loading}
                                autoSize={{ minRows: 1, maxRows: 4 }}
                                className="bg-gray-700 text-black border-gray-600 focus:ring-0 rounded-lg placeholder-gray-500"
                                style={{ resize: 'none', borderColor: 'transparent', '--tw-ring-color': theme.primary }}
                            />
                            <Button
                                aria-label="Send message"
                                type="primary"
                                onClick={handleSendMessage}
                                loading={loading}
                                disabled={!input.trim()}
                                className="w-[40px]   flex items-center justify-center"
                                icon={<FiSend size={18} />}
                                style={{
                                    backgroundColor: theme.primary,
                                    borderColor: theme.primary,
                                    boxShadow: `0 4px 14px rgba(0, 182, 122, 0.3)`,
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default VoidChatBot;