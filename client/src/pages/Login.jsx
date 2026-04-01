import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apicall from "../utils/api";
import { roleContext } from "../constext/userRole.context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loding, setLoding] = useState(false)
  const { setRole } = useContext(roleContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email){
      alert("Email must not be empty!")
      return
    }
    if(!password){
      alert("Password must not be empty!")
      return
    }
    try {
      setLoding(true)
      const res = await apicall("/login", "POST", { email, password });

      const data = res.user;
      setRole(data.role);
      setLoding(false)
      if (data.role === "SuperAdmin") navigate("/superadmin");
      if (data.role === "Admin") navigate("/admin");
      if (data.role === "User") navigate("/user");
    } catch (err) {
      alert(err.message);
      setLoding(false)
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-center items-center mb-5">
        <h1 className="text-2xl font-bold">Login here...</h1>
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <input
              name="email"
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="w-full border p-2 mb-3 rounded"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />

            <div className="flex justify-center gap-2">

            <button
              className="px-3 py-1 bg-blue-500 text-white cursor-pointer rounded"
              onClick={handleLogin}
            >
              Login
            </button>
            { loding && <h1 className="text-xl font-bold">LogingIn...</h1>}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
