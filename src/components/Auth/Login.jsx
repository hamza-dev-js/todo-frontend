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
      alert(err?.response?.data?.message || "فشل التسجيل");
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>دخول</h3>
      <input placeholder="اسم المستخدم" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="كلمة السر" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">دخول</button>
    </form>
  );
}
export default Login;
