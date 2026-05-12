import express from "express";
import db from "../../../db.js";

const router = express.Router();

// GET /api/snippets
router.get("/", async (request, response) => {
  try {
    const userSnippets = await db("snippets")
      .join("users", "snippets.user_id", "=", "users.id")
      .where("snippets.is_private", 0)
      .select(
        "snippets.*",
        "users.id as userId",
        "users.first_name",
        "users.last_name"
      );

    // Transform flat rows into nested JSON
    const formattedSnippets = userSnippets.map((row) => {
      return {
        id: row.id,
        created_at: row.created_at,
        title: row.title,
        contents: row.contents,
        is_private: !!row.is_private,
        user: {
          id: row.userId,
          first_name: row.first_name,
          last_name: row.last_name,
        },
      };
    });
    response.json(formattedSnippets);
  } catch (error) {
    console.error(error);
    response.status(500).send("Database error");
  }
});

//GET /api/snippets/:id
router.get("/:id", async (req, res) => {
  try {
    const snippetId = await db("snippets")
      .join("users", "snippets.user_id", "=", "users.id")
      .where({ "snippets.id": req.params.id })
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

    res.json(formattedSnippetId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// POST /api/snippets
router.post("/", async (req, res) => {
  const { user_id, contents, title, is_private = 0 } = req.body;

  if (!title || !contents || !user_id) {
    return res.status(400).json({
      error: "Missing required field",
    });
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// PUT /api/snippets/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents, is_private } = req.body;

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

    res.json({ message: "Snippet updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE /api/snippets/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await db("snippets").where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.json({ message: "Deleted snippet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error while deleting snippet" });
  }
});

export default router;
