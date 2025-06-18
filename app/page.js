"use client"
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');

  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toLocaleDateString()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Start editing a todo
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited todo
  const saveEdit = () => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  // Handle Enter key press
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Header */}
        <div className="app-header">
          <h1 className="app-title">My Tasks</h1>
          <p className="app-subtitle">Stay organized and productive</p>
        </div>

        {/* Add Todo Section */}
        <div className="add-todo-section">
          <div className="add-todo-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, addTodo)}
              placeholder="What needs to be done?"
              className="add-todo-input"
            />
            <button
              onClick={addTodo}
              className="add-todo-button"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number total">{todos.length}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-item">
              <div className="stat-number active">{activeCount}</div>
              <div className="stat-label">Active</div>
            </div>
            <div className="stat-item">
              <div className="stat-number completed">{completedCount}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          {['all', 'active', 'completed'].map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-button ${filter === filterType ? 'active' : ''}`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-message">
                {filter === 'all' ? 'No tasks yet. Add one above!' :
                 filter === 'active' ? 'No active tasks!' :
                 'No completed tasks!'}
              </div>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <div className="todo-content">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                  >
                    {todo.completed && <Check size={16} />}
                  </button>

                  {/* Todo Content */}
                  <div className="todo-text-container">
                    {editingId === todo.id ? (
                      <div className="todo-edit-form">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                          className="todo-edit-input"
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="edit-button save"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="edit-button cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                          {todo.text}
                        </div>
                        <div className="todo-date">
                          Created: {todo.createdAt}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {editingId !== todo.id && (
                    <div className="todo-actions">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="action-button edit"
                        title="Edit task"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="action-button delete"
                        title="Delete task"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="app-footer">
          Built with React • Stay productive! 🚀
        </div>
      </div>
    </div>
  );
}