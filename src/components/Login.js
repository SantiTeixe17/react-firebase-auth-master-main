import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
import userImage from "../images/name.svg";
import  emailImage  from "../images/email.svg";
import  passwordImage  from "../images/password.svg";
import { firestore } from "../firebase/firestore/firebase";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { login, loginWithGoogle ,resetPassword, } = useAuth();
  const [error, setError] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountResult, setDiscountResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password, user.username);
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

    const handleGoogleSignin = async () => {
      try {
        await loginWithGoogle();
      } catch (error) {
        setError(error.message);
      }
    };
    
    const handleApplyDiscount = async () => {
      if (discountCode === "DESCUENTO123") {
        try {
          // Guarda el código de descuento en Firebase Firestore
          await firestore.collection("discounts").add({
            code: discountCode,
            timestamp: new Date() // Ahora 'firebase' está definido
          });
  
          // Actualiza el estado para mostrar el mensaje de resultado
          setDiscountResult("Descuento aplicado correctamente");
  
     
        } catch (error) {
          console.error("Error al guardar en Firebase:", error);
          setDiscountResult("Descuento aplicado correctamente");
        }
      } else {
        setDiscountResult("Código de descuento inválido");
      }
    }
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
        
      <input
      type="text"
      placeholder="Código de descuento"
      value={discountCode}
      onChange={(e) => setDiscountCode(e.target.value)}
      className="border border-gray-300 mt-2 rounded px-3 py-2 w-full"
    />

    {/* Botón de aplicación de descuento */}
    <button
      onClick={handleApplyDiscount}
      className="bg-slate-50 hover:bg-slate-200 text-black bg-blue-500 mt-2 p-4 shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
    >
      Aplicar Código
    </button>

    {/* Mensaje de resultado del descuento */}
    {discountResult && <p className="text-center text-white mt-2">{discountResult}</p>}

      <p className="my-4 text-white text-black flex justify-between px-3">
        No tienes una cuenta?
        <Link to="/register" className="text-blue-700 hover:text-blue-900">
          Registrarse
        </Link>
      </p>
    </div>
  );
}