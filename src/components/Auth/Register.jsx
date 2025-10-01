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
    <form onSubmit={submit} className="space-y-3">
      <h3 className="text-lg font-semibold">تسجيل</h3>
      <input
       className="w-full border rounded-lg p-2"
       placeholder="اسم المستخدم"
       value={username} 
       onChange={e => setUsername(e.target.value)} 
       />
      <input 
      className="w-full border rounded-lg p-2"
      placeholder="كلمة السر" 
      type="password" 
      value={password} 
      onChange={e => setPassword(e.target.value)} 
      />
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">تسجيل</button>
    </form>
  );
}
export default Register;
