import axiosInstance from "../utils/axiosInstance";

async function sendMessage() {
  if (!input.trim()) return;

  const userMsg = { role: "user", content: input };
  setMessages(prev => [...prev, userMsg]);
  setInput("");
  setLoading(true);

  const res = await axiosInstance.post("/api/chat", {
    messages: [{ role: "user", content: userText }],
    cart: [],
    currentProduct: {},
    userId: "123"
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
if (!res.ok) {
  const text = await res.text();
  console.log("API ERROR RESPONSE:", text);
  return;
}

const data = await res.json();
console.log("AI RESPONSE:", data)

// handle AI actions

if (data.actions) {
  if (data.action === "add_to_cart") {
    addToCart(data.data.productId);
    setMessages(prev => [...prev, { role: "assistant", content: "Item added to content" }])
  }

  if (data.action === "apply_coupon") {
    applyCoupon(data.data.code);
    setMessages(prev => [...prev, { role: "assistant", content: "coupon applied" }])
  }
} else {
  setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
}
setLoading(false);



