import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "./server";

function App() {
  let [isLoading, setIsLoading] = useState(true);
  let [isSaving, setIsSaving] = useState(false);
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewTodo] = useState("");
  let inputEl = useRef(null);

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(json => {
        setIsLoading(false);
        setTodos(json);
      });
  }, []);

  function handleChange(event) {
    setNewTodo(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);

    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ todo: { text: newTodo } })
    })
      .then(res => res.json())
      .then(newTodo => {
        setIsSaving(false);
        setTodos([...todos, newTodo]);
        setNewTodo("");
        inputEl.current.focus();
      });
  }

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Todos</h1>

      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodo}
            onChange={handleChange}
            className={`w-full shadow rounded px-3 py-2 focus:outline-none focus:shadow-outline ${isSaving &&
              "opacity-75"}`}
            autoFocus
            placeholder="What needs to be done?"
            ref={inputEl}
            disabled={isSaving}
          />
        </form>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div>
            {todos.map(todo => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
