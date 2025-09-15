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
    } catch (err) {
      setTodos([]);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // optional: decode token or request user profile
    }
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {!user ? (
        <div>
          <Login onLogin={(u) => { setUser(u); fetchTodos(); }} />
          <Register />
        </div>
      ) : (
        <div>
          <h2>مرحبا، {user.username}</h2>
          <button onClick={() => { localStorage.removeItem("token"); setUser(null); setTodos([]); }}>تسجيل خروج</button>

          <TodoForm onAdd={(newTodo) => setTodos(prev => [...prev, newTodo])} />
          <button onClick={fetchTodos}>جلب المهام</button>
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      )}
    </div>
  );
}

export default App;
