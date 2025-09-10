"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Note = {
  id: number;
  title: string;
  description: string;
  bg: string;
  date: any;
};

const colors = ["FBBF24", "FB923C", "C084FC", "A3E635", "34D399"];

export default function App() {
  const [title] = useState("");
  const [description] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  // const [isCancelButton, setIsCancelButton] = useState(false);

  // Add Note
  const addNote = (bg: string) => {
    const timestamp = Date.now();
    const date = new Date(timestamp).toLocaleDateString();

    const newNote = {
      id: timestamp,
      title,
      description,
      bg,
      date,
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };

  // Update single note
  const updateNote = (id: number, field: keyof Note, value: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, [field]: value } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));
  };

  // Delete all notes
  const deleteNotes = () => {
    setNotes([]);
    localStorage.removeItem("Notes");
  };

  // Delete single note
  const deleteSingle = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id != id));
  };

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("Notes") || "[]");
    setNotes(storedNotes);
  }, []);

  return (
    <>
      <div className="p-4 pb-0 flex justify-center">
        <div className="w-[90vw] min-h-[90vh] bg-white p-8 pt-0 rounded-t-3xl">
          {/* add button */}
          <div className="sticky top-0 z-60 flex py-4 border-b border-black/15 bg-white justify-between items-center">
            <h1 className="font-bold">Notes</h1>
            <div>
              <div className="flex gap-2 items-end">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    className="h-6 w-6 rounded-full hover:ring-1 ring-black/30 cursor-pointer transition-all duration-150"
                    style={{ backgroundColor: `#${color}` }}
                    onClick={() => addNote(color)}
                  ></button>
                ))}
              </div>
            </div>
            <div>
              <button
                onClick={deleteNotes}
                className="p-1 py-2 rounded-full hover:bg-zinc-900/15 transition-all duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Display Notes */}
          <div className="w-full">
            <div className="mt-2 flex flex-wrap gap-6">
              <AnimatePresence>
                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    className="min-h-[16rem] min-w-[16rem] md:max-w-[17rem] flex flex-col justify-between px-6 py-6 rounded-3xl font-medium leading-[1.4]"
                    style={{ backgroundColor: `#${note.bg}` }}
                  >
                    <header className="mb-2">
                      <input
                        type="text"
                        className="w-full text-2xl bg-transparent focus:outline-none text-zinc-900/90 placeholder:text-zinc-900/60 font-bold"
                        placeholder="Add Note"
                        value={note.title}
                        onChange={(e) =>
                          updateNote(note.id, "title", e.target.value)
                        }
                      />
                    </header>
                    <textarea
                      className="resize-none focus:outline-none text-zinc-900/70 w-full h-full bg-transparent"
                      placeholder="Description here!"
                      value={note.description}
                      onChange={(e) =>
                        updateNote(note.id, "description", e.target.value)
                      }
                    ></textarea>
                    <div className="flex justify-between">
                      <div className="mt-2 text-xs text-zinc-900 flex items-center">
                        {note.date}
                      </div>
                      <div className="flex items-end">
                        <button
                          className="text-xs italic font-light hover:bg-black/15 p-2 rounded-full transition-all duration-150 cursor-pointer"
                          onClick={() => deleteSingle(note.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="18px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000"
                            opacity={0.6}
                          >
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {notes.length === 0 ? (
            <div className="h-[70vh] flex justify-center items-center">
              <p>You don&apos;t have any notes.</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
