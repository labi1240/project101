// components/TodoList.js or TodoList.tsx
"use client"
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm'; // Adjust path as necessary

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todo');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      // Handle error (e.g., show toast notification)
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {editingTodo && <TodoForm existingTodo={editingTodo} fetchTodos={fetchTodos} />}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            {/* Button to trigger edit mode */}
            <button onClick={() => setEditingTodo(todo)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
