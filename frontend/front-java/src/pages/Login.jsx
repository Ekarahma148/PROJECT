import { useState } from "react";
import {
  loginJwt,
  getUserByUsername,
} from "../services/authService";
function Login() {
  const [form, setForm] = useState({
    usernameReq: "",
    passwordReq: "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const loginResponse =
      await loginJwt(form);

    localStorage.setItem(
      "token",
      loginResponse.data
    );

    const userResponse =
      await getUserByUsername(
        form.usernameReq
      );

    localStorage.setItem(
      "userId",
      userResponse.data.idRes
    );

    localStorage.setItem(
      "username",
      userResponse.data.usernameRes
    );

    alert("Login Berhasil");

    window.location.href =
      "/dashboard";

  } catch (error) {

    console.log(error);

    alert("Login Gagal");

  }
};

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-96 shadow p-5 rounded">
        <h1 className="text-2xl font-bold mb-5">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          value={form.usernameReq}
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
          value={form.passwordReq}
          onChange={(e) =>
            setForm({
              ...form,
              passwordReq: e.target.value,
            })
          }
        />

        <button className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;
