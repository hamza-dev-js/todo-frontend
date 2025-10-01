// src/components/Auth/Login.js
import { useState } from "react";
import api from "../../services/api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      alert(err?.response?.data?.message || "فشل الدخول");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <h3 className="text-lg font-semibold">تسجيل الدخول</h3>
      <input
        className="w-full border rounded-lg p-2"
        placeholder="اسم المستخدم"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full border rounded-lg p-2"
        placeholder="كلمة السر"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
        دخول
      </button>
    </form>
  );
}

export default Login;
