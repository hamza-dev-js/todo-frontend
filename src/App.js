import { useEffect, useState } from "react";
import api from "./services/api";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch {
      setTodos([]);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // ممكن لاحقاً نضيف API profile
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 space-y-4">
        {!user ? (
          <div className="space-y-6">
            <Login onLogin={(u) => { setUser(u); fetchTodos(); }} />
            <Register />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">مرحبا، {user.username}</h2>
              <button
                onClick={() => { localStorage.removeItem("token"); setUser(null); setTodos([]); }}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                خروج
              </button>
            </div>

            <TodoForm onAdd={(newTodo) => setTodos(prev => [...prev, newTodo])} />
            <button
              onClick={fetchTodos}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              تحديث المهام
            </button>
            <TodoList todos={todos} setTodos={setTodos} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
