import express from "express";
import db from "../../../db.js";

const router = express.Router();

// GET /api/tags
router.get("/", async (request, response) => {
  try {
    const allTags = await db("tags").select("*");
    response.json(allTags);
  } catch (error) {
    console.error(error);
    response.status(500).send("Database error");
  }
});

//GET /api/tags/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await db("tags").where({ id }).first();
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

//POST /api/tags
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Tag name is required" });
  }

  try {
    const [newId] = await db("tags").insert({ name });
    res
      .status(201)
      .json({ id: newId, name, message: "Tag created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error while creating tag" });
  }
});

//PUT /api/tags/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Tag name is required for update" });
  }

  try {
    const updatedRows = await db("tags").where({ id }).update({ name });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json({ message: "Tag updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

//DELETE /api/tags/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await db("tags").where({ id }).del();
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json({ message: "Deleted tag" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error while deleting tag" });
  }
});

export default router;
