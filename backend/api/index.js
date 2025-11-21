import express from "express";
import cors from "cors";
import { RAGSystem } from "../RAG.js";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { runIngestion } from "../injest.js";
const app = express();

const allowedOrigins = [process.env.FRONTEND_BASE_URL, "http://127.0.0.1:5500"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const requestLogger = (req, res, next) => {
  const origin = req.headers.origin || "N/A (e.g., Postman, server-side)";
  console.log(`[REQUEST] --> ${req.method} ${req.originalUrl} from ${origin}`);
  // console.log(process.env.FRONTEND_BASE_URL)
  next();
};

app.use(requestLogger);
app.use(cors(corsOptions));

app.use(express.json());

const ragSystem = new RAGSystem();

// --- Your API Routes ---
app.post("/api/query", async (req, res) => {
  try {
    const { query, history } = req.body;
    console.log(process.env.SUPABASE_URL);

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const chat_history = (history || [])
      .map((msg) => {
        if (msg.type === "human") return new HumanMessage(msg.content);
        if (msg.type === "ai") return new AIMessage(msg.content);
        return null;
      })
      .filter(Boolean);

    // --- START OF CHANGES ---

    // 1. Set headers for a streaming response (Server-Sent Events)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // Send headers to the client immediately

    // 2. Get the stream object from your RAG system
    const stream = await ragSystem.query(query, chat_history);

    // 3. Loop through each chunk in the stream
    for await (const chunk of stream) {
      // The stream returns objects, we only care about the 'answer' part for streaming
      if (chunk.answer) {
        // 4. Write each answer chunk in the SSE format
        res.write(`data: ${JSON.stringify({ token: chunk.answer })}\n\n`);
      }
    }

    // 5. End the response when the stream is done
    res.end();

    // --- END OF CHANGES ---
  } catch (error) {
    console.error("API Error:", error);
    // If headers were not yet sent, we can send a proper error
    if (!res.headersSent) {
      res.status(500).json({ error: "An internal server error occurred" });
    } else {
      // Otherwise, just end the connection
      res.end();
    }
  }
});

app.get("/api", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the RAG API. The server is running." });
});


app.get("/api", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the RAG API. The server is running." });
});

app.get("/", (req, res) =>
  res.status(200).json({
    message: "Server is working fine on Vercel",
  })
);

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
  });
});

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  res.status(500).json({
    error: "Internal server error",
  });
});
const startServer = async () => {
  try {
    console.log("Attempting to initialize RAG System...");
    // 3. AWAIT the initialization before starting the server
    await ragSystem.initialize();

    // This part is for local development. Vercel handles the listening part.
    // If you are not deploying to Vercel, you can add this back.
    /*
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    */
  } catch (error) {
    console.error("FATAL: Failed to initialize RAG System.", error);
    process.exit(1); // Exit the process if initialization fails
  }
};

// 4. Call the startup function
startServer();

export default app;
