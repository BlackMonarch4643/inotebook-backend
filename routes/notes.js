const express = require("express");
const router = express.Router();
const jwtauth = require("../middleware/jwtauth");
const Notes = require("../models/notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: fetches all notes of a user using: POST "/api/notes/fetchnotes". Requires Auth
router.get("/fetchnotes", jwtauth, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: create notes of a user using: POST "/api/notes/createnotes". Requires Auth
router.post(
  "/createnotes",
  jwtauth,
  [
    body("title", "Title must be minimum 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be minimum 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: update notes of a user using: POST "/api/notes/updatenotes". Requires Auth
router.put("/updatenotes/:id", jwtauth, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  try {
    // find the note to be updated and update it
    console.log(req.params.id);
    let findNote = await Notes.findById(req.params.id);
    console.log(findNote);
    if (!findNote) {
      return res.status(404).send("Note not found");
    }
    if (findNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    const getNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    console.log(getNote);
    res.json(getNote);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete notes of a user using: POST "/api/notes/deletenotes". Requires Auth
router.delete("/deletenotes/:id", jwtauth, async (req, res) => {
  try {
    // find the note to be deleted and delete it
    let findNote = await Notes.findById(req.params.id);
    if (!findNote) {
      return res.status(404).send("Note not found");
    }

    // Allow deletion if the user is the owner of the note
    if (findNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    const deleteNode = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been successfully deleted" });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
