import express from "express";
import { authenticateJWT, authToken } from "../middleware/auth.js";
import db from "../../../db.js";

const router = express.Router();

// validation to check for positive integers
const isValidId = (id) => !isNaN(Number(id)) && Number(id) > 0;

// PART B Public Feed endpoint
router.get("/public", async (req, res) => {
  try {
    const data = await db.select("*").from("snippets").where("is_private", 0);

    res.status(200).json({
      message: "Public feed fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.use(authenticateJWT);

//GET /api/snippets/:id
router.get("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  // Validation: Path parameter must be a number
  if (!isValidId(id)) {
    return res
      .status(400)
      .json({ error: "Invalid ID format. ID must be a positive number." });
  }

  try {
    const snippetId = await db("snippets")
      .join("users", "snippets.user_id", "=", "users.id")
      .where({ "snippets.id": id })
      .select(
        "snippets.*",
        "users.id as userId",
        "users.first_name",
        "users.last_name"
      )
      .first(); //select single object

    if (!snippetId) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    const formattedSnippetId = {
      id: snippetId.id,
      created_at: snippetId.created_at,
      title: snippetId.title,
      contents: snippetId.contents,
      is_private: !!snippetId.is_private,
      user: {
        id: snippetId.userId,
        first_name: snippetId.first_name,
        last_name: snippetId.last_name,
      },
    };

    res.status(200).json(formattedSnippetId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// POST /api/snippets
router.post("/", authToken, async (req, res) => {
  const { user_id, contents, title, is_private = 0 } = req.body;

  if (!title || !contents || !user_id) {
    return res.status(400).json({
      error: "Missing required field",
    });
  }

  if (!isValidId(user_id)) {
    return res.status(400).json({ error: "user_id must be a valid number." });
  }

  try {
    const [id] = await db("snippets").insert({
      user_id,
      contents,
      title,
      is_private,
    });

    res.status(201).json({
      id,
      message: "Snippet created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// PUT /api/snippets/:id
router.put("/:id", authToken, async (req, res) => {
  const { id } = req.params;
  const { title, contents, is_private } = req.body;

  if (!isValidId(id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (contents !== undefined) updates.contents = contents;
  if (is_private !== undefined) updates.is_private = is_private ? 1 : 0;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      error: "Missing required field",
    });
  }

  try {
    const updated = await db("snippets").where({ id }).update(updates);

    if (!updated) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json({ message: "Snippet updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE /api/snippets/:id
router.delete("/:id", authToken, authorizeRole("admin"), async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }

  try {
    const deletedRows = await db("snippets").where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json({ message: "Deleted snippet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error while deleting snippet" });
  }
});

// PART A (1 & 2) GET/api/snippets
router.get("/", authenticateJWT, async (req, res) => {
  let query = db.select("*").from("snippets");

  const allowedColumns = ["created_at", "title"];

  if ("sort" in req.query) {
    const sortParam = req.query.sort.toString().trim();

    if (sortParam.length > 0) {
      const parts = sortParam.split(" ");
      const column = parts[0];
      const direction = (parts[1] || "asc").toLowerCase();

      const validColumn = allowedColumns.includes(column);
      const validDirection = direction === "asc" || direction === "desc";

      if (validColumn && validDirection) {
        query = query.orderBy(column, direction);
      }
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ message: "Hello from Week 2!", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
