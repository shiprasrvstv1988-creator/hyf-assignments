import express from "express";
import db from "../../../db.js";

const router = express.Router();

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
