require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const verifyUserRoute=require("./routers/verifyUser-route")


const app= express()
app.use(express.json())
app.use(cors({
    origin: process.env.Client_URL,
    credentials:true
}))

app.use("/api/check",verifyUserRoute)
const PORT=5000

app.listen(PORT,()=>{
    console.log("App is running on the port 5000")
})
