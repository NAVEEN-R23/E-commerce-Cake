import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const Voiceinput = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      sendToAI(text);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const startVoice = () => {
    setListening(true);
    recognitionRef.current?.start();
  };

  async function sendToAI(userText) {
    if (!userText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText }
    ]);

    try {
      const res = await axiosInstance.post(
        "/api/chat",
        {
          messages: [{ role: "user", content: userText }],
          cart: [],
          currentProduct: {},
          userId: "123"
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await res.data;

      console.log("AI RESPONSE:", data); // 👈 CHECK THIS FIRST

      // 🛒 CASE 1: PRODUCTS FOUND
      if (data.products && data.products.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            type: "products",
            products: data.products
          }
        ]);
        return;
      }

      // 💬 CASE 2: NORMAL TEXT RESPONSE  
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "No response"
        }
      ]);

    } catch (err) {
      console.log("chat error:", err.message);
    }
  }
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* 💬 CHAT WINDOW (ONLY WHEN OPEN) */}
      {open && (
        <div className="w-[350px] h-[500px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col mb-3 transition-all duration-300">

          {/* HEADER */}
          <div className="bg-black text-white px-3 py-2 flex justify-between items-center">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">

            {messages.map((m, i) => (
              <div key={i} className="flex justify-start">
                <div className="max-w-[85%]">

                  {/* TEXT */}
                  {m.type !== "products" && (
                    <div className="px-3 py-2 bg-gray-100 rounded-xl text-sm">
                      {m.content}
                    </div>
                  )}

                  {/* PRODUCTS */}
                  {m.type === "products" && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {m.products.map((p) => (
                        <div key={p._id} className="border p-2 rounded-lg shadow bg-white">
                          <img
                            src={p.image}
                            className="h-16 w-full object-cover rounded"
                          />
                          <p className="text-xs font-semibold">{p.name}</p>
                          <p className="text-green-600 text-xs">₹{p.price}</p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}

          </div>

          {/* VOICE BUTTON INSIDE CHAT */}
          <div className="p-2 border-t flex justify-center">
            <button
              onClick={startVoice}
              className={`px-4 py-2 rounded-full text-white ${listening ? "bg-red-500 animate-pulse" : "bg-black"
                }`}
            >
              🎤 Speak
            </button>
          </div>
        </div>
      )}

      {/* 🔘 FLOATING CHAT BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center text-xl"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Voiceinput;