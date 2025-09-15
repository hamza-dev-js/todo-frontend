import { useState } from "react";
import api from "../../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      alert("تم التسجيل، سجل الدخول الآن");
      setUsername(""); setPassword("");
    } catch (err) {
      alert(err?.response?.data?.message || "خطأ");
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>تسجيل</h3>
      <input placeholder="اسم المستخدم" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="كلمة السر" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">تسجيل</button>
    </form>
  );
}
export default Register;
