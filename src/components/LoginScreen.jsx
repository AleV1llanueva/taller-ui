import { use, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validatePassword } from "../utils/validators";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    //Validación de contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("error:", error);
      //alert(`Error al iniciar sesion : ${error.message} ` )
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div class="bg-gray-100 flex h-screen items-center justify-center p-4">
    //     <div class="w-full max-w-md">
    //         <div class="bg-white shadow-md rounded-md p-8">

    //             <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

    //             <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
    //                 Hello, to Motorcycles System, Sign in to your account
    //             </h2>
    //             {/*Parte del error*/}
    //             {error && (
    //                 <div className={`mb-4 p-3 rounded-md border ${
    //                     error.includes('email ya está registrado') || error.includes('usuario ya existe')
    //                         ? 'bg-orange-100 border-orange-400 text-orange-700'
    //                         : 'bg-red-100 border-red-400 text-red-700'
    //                 }`}>
    //                     <div className="flex items-center">
    //                         <span className="mr-2">
    //                             {error.includes('email ya está registrado') || error.includes('usuario ya existe')
    //                                 ? '⚠️'
    //                                 : '❌'
    //                             }
    //                         </span>
    //                         <span>{error}</span>
    //                     </div>
    //                     {(error.includes('email ya está registrado') || error.includes('usuario ya existe')) && (
    //                         <div className="mt-2 text-sm">
    //                             <Link to="/login" className="text-pink-600 hover:text-pink-700 underline">
    //                                 ¿Ya tienes cuenta? Inicia sesión aquí
    //                             </Link>
    //                         </div>
    //                     )}
    //                 </div>
    //         )}

    //             {/*Formulario*/}
    //             <form class="space-y-6 mt-4" action="#" method="POST" onSubmit={handleSubmit}>
    //                 <div>
    //                     <label for="password" class="block text-sm font-medium text-gray-700">Email</label>
    //                     <div class="mt-1">
    //                         <input name="email" type="email-address" autocomplete="email-address" required
    //                             class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" placeholder="tu@email.com" value={email} onChange={(e)=> setEmail(e.target.value)} />
    //                     </div>
    //                 </div>

    //                 <div>
    //                     <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
    //                     <div class="mt-1">
    //                         <input id="password" name="password" type="password" autocomplete="password" required
    //                             class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" placeholder="*********" value={password}  onChange={(e)=> setPassword(e.target.value)} />
    //                     </div>
    //                 </div>

    //                 <div>
    //                     <button type="submit"
    //                         class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2" disabled={loading}>
    //                             {loading? "Iniciando sesion..." : "Iniciar sesion"}
    //                     </button>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // </div>

    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-blue-900 pb-2" > Hola! Bienvenido a tu taller favorito</h2>
        {/*Parte del error*/}
        {error && (
          <div
            className={`mb-4 p-3 rounded-md border ${
              error.includes("email ya está registrado") ||
              error.includes("usuario ya existe")
                ? "bg-orange-100 border-orange-400 text-orange-700"
                : "bg-red-100 border-red-400 text-red-700"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2">
                {error.includes("email ya está registrado") ||
                error.includes("usuario ya existe")
                  ? "⚠️"
                  : "❌"}
              </span>
              <span>{error}</span>
            </div>
            {(error.includes("email ya está registrado") ||
              error.includes("usuario ya existe")) && (
              <div className="mt-2 text-sm">
                <Link
                  to="/login"
                  className="text-pink-600 hover:text-pink-700 underline"
                >
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </Link>
              </div>
            )}
          </div>
        )}

        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          Iniciar Sesion
        </h2>

        <form
          class="space-y-4"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Correo
            </label>
            <input
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? "Iniciando sesion..." : "Iniciar sesion"}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-600">
          No tienes una cuenta?
          <a href="/signup" class="text-blue-700 hover:text-blue-800 font-medium">
            {" "}
            Registrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
