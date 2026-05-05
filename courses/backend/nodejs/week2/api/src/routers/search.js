// PART B : search engine

import express from "express";
import db from "../../../db.js";

const router = express.Router();

//GET /search
router.get("/", async (req, res) => {
  const { q } = req.query;

  try {
    let query = db("snippets").select("*");

    if (q) {
      query = query
        .where("title", "like", `%${q}%`)
        .orWhere("contents", "like", `%${q}%`);
    }

    const results = await query;
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//  POST /search
router.post("/", async (req, res) => {
  const { q } = req.query;
  const { fields } = req.body;

  if (q && fields) {
    return res.status(400).json({
      error: "Provide either q or fields, not both",
    });
  }

  try {
    let query = db("snippets").select("*");

    if (q) {
      query = query
        .where("title", "like", `%${q}%`)
        .orWhere("contents", "like", `%${q}%`);
    }

    if (fields) {
      Object.entries(fields).forEach(([key, value]) => {
        query = query.where(key, value);
      });
    }

    const results = await query;

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
