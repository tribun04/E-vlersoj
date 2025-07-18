import { useState } from 'react';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (userInput) => {
        if (!userInput) return;

        setLoading(true);
        setError(null);

        const userMessage = { role: 'user', content: userInput, id: Date.now() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        try {
            const response = await fetch('http://localhost:5000/api/ai/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Send the chat history in the correct format for the new server code
                body: JSON.stringify({
                    messages: newMessages.filter(m => m.role !== 'system'),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get a response from the void.');
            }

            const data = await response.json();

            // Handle the structured response from the new server code
            if (data.response) {
                setMessages(prev => [...prev, { ...data.response, id: Date.now() + 1 }]);
            } else {
                throw new Error("Received an unexpected response format from the server.");
            }

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { messages, loading, error, sendMessage };
};