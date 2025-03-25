"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Define the Todo type
type Todo = {
  id: number;
  title: string;
  is_complete: boolean;
  created_at: string;
};

export default function Home() {
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  // State variables
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from Supabase
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ title: newTodo.trim() }])
        .select();

      if (error) throw error;

      // Add the new todo to the state
      if (data) {
        setTodos([...data, ...todos]);
      }

      // Clear the input
      setNewTodo("");
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo");
    }
  };

  // Function to toggle todo completion status
  const toggleTodoCompletion = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ is_complete: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      // Update the state
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !currentStatus } : todo
        )
      );
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Failed to update todo");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-md">
        <h1 className="text-2xl font-bold">Supabase Todo App</h1>

        {/* Add new todo form */}
        <form onSubmit={addTodo} className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="w-full p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && <p className="text-gray-500">Loading todos...</p>}

        {/* Todos list */}
        <ul className="w-full space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.is_complete}
                  onChange={() =>
                    toggleTodoCompletion(todo.id, todo.is_complete)
                  }
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={
                    todo.is_complete ? "line-through text-gray-500" : ""
                  }
                >
                  {todo.title}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(todo.created_at).toLocaleDateString()}
              </span>
            </li>
          ))}
          {!loading && todos.length === 0 && (
            <p className="text-center text-gray-500">
              No todos yet. Add one above!
            </p>
          )}
        </ul>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://supabase.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Supabase Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js Docs
        </a>
      </footer>

      {/* Add this style tag for the shake animation */}
      <style jsx>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          50% {
            transform: translateX(5px);
          }
          75% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
