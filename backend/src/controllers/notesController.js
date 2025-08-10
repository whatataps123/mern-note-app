import Note from "../models/Note.js"

// GET REQUEST
export async function getAllNotes(req, res)  {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal service error"});
    }
}

// GET REQUEST BY ID
export async function getNoteById(req, res)  {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) { 
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        res.status(500).json({ message: "Internal service error" });
    }
}

// POST REQUEST
export async function createNote(req, res)  {
    try {
        const { title, content } = req.body;
        console.log(title, content);
        const note = new Note({ title, content });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal service error" });
    }
}

// PUT REQUEST
export async function updateNote(req, res)  {
    try {
        const {title, content} =req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, 
            {
                new: true, 
            }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller:", error);
        res.status(500).json({ message: "Internal service error" });
    }
}

// DELETE REQUEST
export async function deleteNote(req, res)  {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal service error" });
    }
}