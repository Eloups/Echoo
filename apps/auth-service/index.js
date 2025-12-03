import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(router)

// Start le serveur publicement accessible par le tel (sinon il tape sur le localhost du tel et ça marche pas)
// app.listen(3000, "0.0.0.0", () => {
//     console.log("Auth service running on 0.0.0.0:3000")
// })

// Avec le local 
// app.listen(8000, () => {
app.listen(3000, () => {
    console.log("✅ Better Auth service running on http://localhost:8000")
})
