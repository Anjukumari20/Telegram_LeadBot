import { useState } from "react";
import axios from "axios";
import "./Bot.css";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    key: "name",
    question: "👋 Hi! What's your name?",
  },
  {
    key: "email",
    question: "📧 What's your email address?",
  },
  {
    key: "mobile",
    question: "📱 What's your mobile number?",
  },
  {
    key: "telegramId",
    question: "💬 What's your Telegram ID?",
  },
];

export default function Bot() {
  const [botStarted, setBotStarted] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "🤖 Type /start to begin",
    },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState("");

  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    mobile: "",
    telegramId: "",
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userInput,
      },
    ]);

    setInput("");

    // Start command
    if (!botStarted) {
      if (userInput === "/start") {
        setBotStarted(true);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: questions[0].question,
            },
          ]);
        }, 500);
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "⚠️ Please type /start to begin.",
            },
          ]);
        }, 300);
      }

      return;
    }

    if(botStarted) {
        if(userInput === "/stop") 
            {
                setBotStarted(false);
                setCurrentStep(0);
                setLeadData({
                    name: "",
                    email: "",
                    mobile: "",
                    telegramId: "",
                });
                setMessages([
                    {
                        sender: "bot",
                        text: "🤖 Type /start to begin",
                    },
                ]);
            }
    }
    // Existing lead collection logic
    const field = questions[currentStep].key;

    const updatedData = {
      ...leadData,
      [field]: userInput,
    };

    setLeadData(updatedData);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: questions[currentStep + 1].question,
          },
        ]);
      }, 500);
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/leads",
          updatedData,
        );

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "✅ Lead saved successfully! Type /start to add another lead or /stop to end the session.",
          },
        ]);

        console.log(res.data);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: error.response?.data?.message || "❌ Failed to save lead.",
          },
        ]);
      }
    }
  };
    const navigate = useNavigate();
  return (
    <>
    <button className="loginBtn"
        onClick={()=> navigate("/login")}
    >Login</button>
    <div className="page-container">
      <div className="chat-wrapper">
        <div className="chat-header">Lead Dashboard Bot</div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your reply..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
    </>
  );
}
