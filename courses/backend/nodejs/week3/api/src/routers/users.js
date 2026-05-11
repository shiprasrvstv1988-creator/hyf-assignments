import express from "express";
import db from "../../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//POST/api/users/register
router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await db("users").insert({
      email,
      password_hash: hash,
      first_name,
      last_name,
    });
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

//POST/api/users/login
router.post("/login", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  const { email, password } = req.body;

  try {
    //Look up user by email
    const user = await db("users").where({ email }).first();

    //Check if user exists and compare password
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //Issue JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //Send response
    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// validation to check for positive integers
const isValidId = (id) => !isNaN(Number(id)) && Number(id) > 0;

// GET/api/users
router.get("/", async (req, res) => {
  try {
    const users = await db("users").select(
      "id",
      "first_name",
      "last_name",
      "email"
    );
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET/api/users/:id/snippets
router.get("/:id/snippets", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res
      .status(400)
      .json({ error: "Invalid User ID format. Must be a positive number." });
  }

  try {
    const userSnippets = await db("snippets").where("user_id", id);

    if (userSnippets.length === 0) {
      // Check if user exists or just has no snippets
      const userExists = await db("users").where({ id }).first();
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }
    }

    res.status(200).json({
      message: `Snippets for user ${id} fetched successfully`,
      data: userSnippets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
