// TodoForm.js
import { useState } from "react";
import api from "../services/api";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await api.post("/todos", { title });
      onAdd(res.data);
      setTitle("");
    } catch {
      alert("خطأ في الإضافة");
    }
  };

  return (
    <form onSubmit={submit} className="flex space-x-2">
      <input
        className="flex-1 border rounded-lg p-2"
        placeholder="أضف مهمة..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        إضافة
      </button>
    </form>
  );
}

export default TodoForm;
