import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  checkUserExists,
  registerUser,
  getUserForLogin,
} from "./queries/usersQuery.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!["admin", "customer"].includes(role)) {
    return res.status(400).json({ error: "Role must be admin or customer" });
  }

  try {
    const userExists = await checkUserExists(email);

    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await registerUser(email, hashedPassword, role);

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    const user = await getUserForLogin(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const roleCapitalized =
      user.role.charAt(0).toUpperCase() + user.role.slice(1);
    return res.json({
      message: `Welcome ${roleCapitalized}`,
      role: user.role,
      email: user.email,
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

export default app;
