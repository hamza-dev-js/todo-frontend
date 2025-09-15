import api from "../services/api";

function TodoList({ todos, setTodos }) {
  const remove = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      alert("خطأ في الحذف");
    }
  };

  return (
    <ul>
      {todos.map(t => (
        <li key={t.id}>
          {t.title}
          <button onClick={() => remove(t.id)}>حذف</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
