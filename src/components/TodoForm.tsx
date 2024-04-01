// components/TodoForm.js or TodoForm.tsx
"use client"
import React, { useState, useEffect } from 'react';

const TodoForm = ({ existingTodo, fetchTodos }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    // If an existing todo is passed, set it as the initial value
    if (existingTodo) {
      setTitle(existingTodo.title);
    }
  }, [existingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = existingTodo ? 'PATCH' : 'POST';
    const apiUrl = existingTodo ? `/api/todo/${existingTodo.id}/update` : '/api/todo/create';

    try {
      await fetch(apiUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      setTitle(''); // Reset form
      fetchTodos(); // Refresh todo list
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show toast notification)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
      />
      <button type="submit">{existingTodo ? 'Update Todo' : 'Add Todo'}</button>
    </form>
  );
};
