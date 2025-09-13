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
  const [isDarkMode, setIsDarkMode] = useState(false);
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
      behavior: "smooth",
    });
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
      <div className={` ${isDarkMode && "dark"} `}>
        <div className="p-4 pb-0 flex flex-col bg-[#f4f4f5] dark:bg-neutral-950 items-center">
          <div className="w-[90vw] min-h-[92vh] bg-white dark:bg-neutral-900 p-8 pt-0 rounded-t-3xl">
            {/* add button */}
            <div className="sticky top-0 z-60 flex py-4 border-b border-black/15 dark:border-white/15 bg-white dark:bg-neutral-900 justify-between items-center">
              <div className="flex items-center">
                <h1 className="font-bold dark:text-white pe-2 lg:pe-4 hidden lg:flex">Notes</h1>
                <button
                  onClick={() => setIsDarkMode((prev) => !prev)}
                  className="p-2 rounded-full hover:bg-zinc-900/15 dark:hover:bg-zinc-400/15"
                >
                  {isDarkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#fff"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#000"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div>
                <div className="flex gap-2 items-end">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      className="h-6 w-6 rounded-full hover:opacity-70 cursor-pointer transition-all duration-200"
                      style={{ backgroundColor: `#${color}` }}
                      onClick={() => addNote(color)}
                    ></button>
                  ))}
                </div>
              </div>
              <div>
                <button
                  onClick={deleteNotes}
                  className="p-1 py-2 rounded-full hover:bg-zinc-900/15 dark:hover:bg-zinc-400/15 transition-all duration-150"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill={isDarkMode ? "#fff" : "000"}
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
              <div className="h-[70vh] dark:text-white flex justify-center items-center">
                <p>You don&apos;t have any notes.</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="h-[6vh] flex items-center">
            <span className="text-xs text-zinc-900/60 dark:text-white/60">
              An open-source project by{" "}
            </span>
            &nbsp;
            <a
              href="https://github.com/harsh-varun/notes-app"
              target="_target"
              className="text-xs text-zinc-900/60 dark:text-white/60 underline underline-offset-2"
            >
              Harsh Varun
            </a>
            <span className="text-xs text-zinc-900/60 dark:text-white/60">
              .
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
