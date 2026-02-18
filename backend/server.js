import express from "express"
import dotenv from "dotenv"
import path from "path"
dotenv.config()
import registerRoutes from "./routes/registerroute.js"
import loginRoutes from "./routes/loginroute.js"
import patientRoutes from "./routes/patientroute.js"
import userRoutes from "./routes/userroute.js"
import { connectDB } from "./config/db.js" 
const app = express()
import cors from "cors"

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()
app.use(express.json())
app.use(cors())



app.use("/api/register",registerRoutes)
app.use("/api/login",loginRoutes)
app.use("/api/patient",patientRoutes)
app.use("/api/user",userRoutes)

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "frontend", "dist");
  console.log("DIST PATH:", distPath);

  app.use(express.static(distPath));

  // Catch-all route for SPA (React)
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port 5000");
  });
}).catch(err => {
  console.error("Failed to connect to database:", err);
});
