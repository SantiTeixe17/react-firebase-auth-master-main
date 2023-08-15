import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
import userImage from "../images/name.svg";
import  emailImage  from "../images/email.svg";
import  passwordImage  from "../images/password.svg";
import telephoneImage from "../images/llamada-telefonica.png";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    telephone: "",
  });
  const { login, loginWithGoogle, loginWithFacebook ,resetPassword, } = useAuth();
  const [error, setError] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password, user.username, user.telephone);
      window.location.replace("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      window.location.replace("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookSignin = async () => {
    try {
      await loginWithFacebook();
      window.location.replace("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Escribe un email para cambiar tu contraseña");
    try {
      await resetPassword(user.email);
      setError('Te enviamos un email. Chekea tu buzón')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <div className="flex items-center justify-center">
        <img
          src="./favicon.ico"
          alt="Favicon"
          className="w-10 h-10"
          style={{ marginRight: "5px" }}
        />
        <h1 className="text-3xl text-center  text-yellow-500 p-4 font-bold underline hoverEffect">
          Mundo Electro
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
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
            name="email"
            id="email"
            onChange={handleChange}
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
            name="password"
            id="password"
            onChange={handleChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="telephone"
            className="block text-gray-700 text-sm rounded-md font-bold mb-2"
          >
          <img src={telephoneImage} alt="User Icon" className="mr-2 inline-block w-6 h-6" />
            Teléfono
          </label>
          <input
            type="telephone"
            onChange={(e) => setUser({ ...user, telephone: e.target.value })}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="+541191638454"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#!"
            onClick={handleResetPassword}
          >
            Olvidaste tu contraseña?
          </a>
        </div>
      </form>
      <button
        onClick={handleGoogleSignin}
        className="bg-slate-50 hover:bg-slate-200 text-black bg-red-500  p-4 shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Google Login
      </button>
        
      <button
        onClick={handleFacebookSignin}
        className="bg-slate-50 hover:bg-slate-200 text-black bg-sky-900 mt-2 p-4 shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Facebook Login
      </button>

      <p className="my-4 text-white text-black flex justify-between px-3">
        No tienes una cuenta?
        <Link to="/register" className="text-blue-700 hover:text-blue-900">
          Registrarse
        </Link>
      </p>
    </div>
  );
}