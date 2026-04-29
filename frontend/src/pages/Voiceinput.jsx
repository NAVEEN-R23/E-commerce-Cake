import React, { useState, useRef, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setAiproducts } from "../redux/aiSlice";

const VoiceInput = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // ✅ STEP 1: Define sendToAI FIRST, wrapped in useCallback
  const sendToAI = useCallback(async (userText) => {
    if (!userText.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    try {
      const res = await axiosInstance.post("/api/chat", {
        messages: [{ role: "user", content: userText }],
        cart: [],
        currentProduct: {},
        userId: "123",
      });

      const data = res.data;
      console.log("✅ AI RESPONSE:", data);

      if (Array.isArray(data.products) && data.products.length > 0) {
        dispatch(setAiproducts(data.products));
      }

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (err) {
      console.error("❌ FULL ERROR:", err);
    }
  }, [dispatch]); // ✅ dispatch is a dependency

  // ✅ STEP 2: useEffect AFTER sendToAI, with sendToAI in deps
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log("🎤 YOU SAID:", text);
      sendToAI(text); // ✅ now always gets the latest sendToAI
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, [sendToAI]); // ✅ re-runs if sendToAI changes

  const startVoice = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {open && (
        <div className="w-[350px] h-[500px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col mb-3">
          <div className="bg-black text-white px-3 py-2 flex justify-between items-center">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className="flex flex-col">
                {m.type !== "products" && (
                  <div className="px-3 py-2 bg-gray-100 rounded-xl text-sm">
                    {m.content}
                  </div>
                )}
                {m.type === "products" && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {m.products.map((p) => (
                      <div key={p._id} className="border p-2 rounded-lg shadow bg-white">
                        <img
                          src={`http://localhost:5000/uploads/${p.thumbnail}`}
                          className="h-16 w-full object-cover rounded"
                        />
                        <p className="text-xs font-semibold">{p.title}</p>
                        <p className="text-green-600 text-xs">₹{p.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex justify-center">
            <button
              onClick={startVoice}
              className={`px-4 py-2 rounded-full text-white ${listening ? "bg-red-500 animate-pulse" : "bg-black"}`}
            >
              🎤 Speak
            </button>
          </div>
        </div>
      )}

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




export default VoiceInput;
