import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apicall from "../utils/api";
import { roleContext } from "../constext/userRole.context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRole } = useContext(roleContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await apicall("/login", "POST", { email, password });
      
      const data = res.user;
      setRole(data.role);
      if (data.role === "SuperAdmin") navigate("/superadmin");
      if (data.role === "Admin") navigate("/admin");
      if (data.role === "User") navigate("/user");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="text"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>
    </div>
  );
}
