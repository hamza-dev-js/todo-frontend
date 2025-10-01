import { useState } from "react";
import api from "../services/api";
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';

function TodoList({ todos, setTodos }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // حذف مهمة
  const remove = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch {
      alert("خطأ في الحذف");
    }
  };

  // بدء التعديل
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  // إلغاء التعديل
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  // حفظ التعديل
  const saveEdit = async (todo) => {
    try {
      const res = await api.put(`/todos/${todo.id}`, { title: editTitle, completed: todo.completed });
      setTodos(todos.map(t => t.id === todo.id ? res.data : t));
      cancelEdit();
    } catch {
      alert("خطأ في التعديل");
    }
  };

  // تبديل حالة Completed
  const toggleComplete = async (todo) => {
    try {
      const res = await api.put(`/todos/${todo.id}`, { title: todo.title, completed: !todo.completed });
      setTodos(todos.map(t => t.id === todo.id ? res.data : t));
    } catch {
      alert("خطأ في تحديث الحالة");
    }
  };

  return (
    <ul className="space-y-2">
      {todos.map(t => (
        <li
          key={t.id}
          className={`flex justify-between items-center p-2 rounded-lg shadow-sm ${t.completed ? "bg-green-50 line-through" : "bg-gray-50"}`}
        >
          {editingId === t.id ? (
            <>
              <input
                className="flex-1 border rounded-lg p-1 mr-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <div className="flex space-x-1">
                <button onClick={() => saveEdit(t)} className="text-green-600">
                  <CheckIcon className="w-5 h-5" />
                </button>
                <button onClick={cancelEdit} className="text-red-600">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <span>{t.title}</span>
              <div className="flex space-x-2">
                <button onClick={() => toggleComplete(t)} className="text-blue-500">
                  <CheckIcon className="w-5 h-5" />
                </button>
                <button onClick={() => startEdit(t)} className="text-yellow-500">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button onClick={() => remove(t.id)} className="text-red-500">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
