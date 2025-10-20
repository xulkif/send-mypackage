require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const verifyUserRoute=require("./routers/verifyUser-route")


const app= express()

// Middleware
app.use(express.json())
 
// CORS configuration
app.use(cors({
    origin: process.env.Client_URL, // Allow all origins if Client_URL not set
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Logging middleware
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
    console.log(`📥 Headers:`, req.headers);
    console.log(`📥 Body:`, req.body);
    next();
});

// Test endpoint
app.get("/api/test", (req, res) => {
    console.log("🧪 Test endpoint called");
    res.json({ ok: true, message: "Server is working!", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/check",verifyUserRoute)
 

// ✅ FIX: Use '/*' to catch all remaining routes
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ ok: false, error: 'Route not found' });
});

const PORT=5000

app.listen(PORT,()=>{
    console.log("🚀 App is running on the port 5000")
   
    console.log("🌍 Client URL:", process.env.Client_URL || 'Not set')
})
