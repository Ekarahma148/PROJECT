import { useState } from "react";
import { registerUser } from "../services/userService";

function Register() {
  const [form, setForm] = useState({
    fullnameReq: "",
    emailReq: "",
    usernameReq: "",
    passwordReq: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);

      alert("Register Berhasil");

      window.location.href = "/login";
    } catch (error) {
      alert("Register Gagal");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-96 shadow p-5 rounded">
        <h1 className="text-2xl font-bold mb-5">Register</h1>

        <input
          placeholder="Fullname"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              fullnameReq: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              emailReq: e.target.value,
            })
          }
        />

        <input
          placeholder="Username"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              usernameReq: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              passwordReq: e.target.value,
            })
          }
        />

        <button className="bg-green-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
}

export default Register;
