import express from "express"
import { auth } from "./auth.js"

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        console.log("ici");

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }

        // Création du compte
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password
            }
        })

        // Si l’API retourne une session immédiate
        if (response.session) {
            return res.json({
                message: "User registered successfully",
                token: response.session.token,
                user: response.user
            })
        }

        // Sinon (par ex. email confirmation required)
        res.json({
            message: "User created. Email verification required.",
            user: response.user
        })

    } catch (e) {
        console.error(e)
        res.status(400).json({ error: e.message })
    }
})


router.post("/login", async (req, res) => {
    try {

        console.log("ici test")
        const { email, password } = req.body

        const response = await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })

        res.json({
            token: response.session.token // Bearer token
        })
    } catch (e) {
        res.status(401).json({ error: e.message })
    }
})

router.get("/check/token", async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ valid: false })

    const token = authHeader.split(" ")[1]

    try {
        const session = await auth.api.getSession({
            headers: { Authorization: `Bearer ${token}` }
        })

        if (!session) return res.json({ valid: false })

        res.json({
            valid: true,
            user: session.user
        })

    } catch {
        res.status(401).json({ valid: false })
    }
})

router.delete("/delete/token", async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ message: "Token missing" })

    const token = authHeader.split(" ")[1]

    await auth.api.signOut({
        headers: { Authorization: `Bearer ${token}` }
    })

    res.json({ message: "Logged out" })
})

router.post("/reset/token", async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ message: "Token missing" })

    const token = authHeader.split(" ")[1]

    const newSession = await auth.api.refreshSession({
        headers: { Authorization: `Bearer ${token}` }
    })

    res.json({
        token: newSession.session.token
    })
})

export default router
