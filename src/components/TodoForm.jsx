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
    } catch (err) {
      alert("خطأ في الإضافة");
    }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="أضف مهمة..." value={title} onChange={e => setTitle(e.target.value)} />
      <button type="submit">إضافة</button>
    </form>
  );
}

export default TodoForm;
