import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
import userImage from "../images/name.svg";
import  emailImage  from "../images/email.svg";
import  passwordImage  from "../images/password.svg";

export function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password, user.username);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto text-black">
      {error && <Alert message={error} />}
      <div className="flex items-center justify-center">
        <img
          src="./favicon.ico"
          alt="Favicon"
          className="w-10 h-10"
          style={{ marginRight: "5px" }}
        />
        <h1 className="text-3xl text-center p-8 text-yellow-500 font-bold underline hoverEffect">
          Mundo Electro
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-6 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm rounded-md font-bold mb-2"
          >
          <img src={userImage} alt="User Icon" className="mr-2 inline-block w-6 h-6" />
          
            Usuario
          </label>
          <input
            type="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Usuario"
          />
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm rounded-md font-bold mb-2"
          >
          <img src={emailImage} alt="User Icon" className="mr-2 inline-block w-6 h-6" />
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="tu@email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm rounded-md font-bold mb-2"
          >
          <img src={passwordImage} alt="User Icon" className="mr-2 inline-block w-6 h-6" />
            Contraseña
          </label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
          Registrate
        </button>
      </form>
      <p className="my-4 text-white flex justify-between px-3">
        No tienes una cuenta?
        <Link to="/login" className="text-blue-700 hover:text-blue-900">
          Login
        </Link>
      </p>
    </div>
  );
}
