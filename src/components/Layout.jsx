import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import Navbar from "./Navbar"


const Layout = ({ children }) => {
    const navigate = useNavigate()
    const { user, logout, validateToken } = useAuth()

    useEffect(() => {
        const interval = setInterval(() => {
            if (!validateToken()) {
                clearInterval(interval);
            }
        }, 60000);

        validateToken();

        return () => clearInterval(interval);
    }, [validateToken]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-teal-50">
            <Navbar/>
            <div className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex justify-center items-center py-4 border-b border-gray-200">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">¡Bienvenido a tu Sistema de Motos! 🏍️</h1>
                            <p className="text-gray-600 mt-1">Hola {`${user.firstname} ${user.lastname}`}</p>
                        </div>
                        {/* <button 
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button> */}
                    </div>

                    <nav className="py-4">
                        <ul className="flex space-x-8 items-center justify-center">
                            <li>
                                <button 
                                    className="flex flex-col px-5 py-7 text-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium w-64 h-72 ring-2 ring-gray-100"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    <span className="mr-2">🏠</span>
                                    Inicio
                                    <span className="text-sm mt-7 font-medium text-gray-400">Donde estas justo ahora!!!</span>
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="flex flex-col px-5 py-7 text-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium w-64 h-72 ring-2 ring-gray-100"
                                    onClick={() => navigate('/brands')}
                                >
                                    <span className="mr-2">🌐</span>
                                    Marcas
                                    <span className="text-sm mt-7 font-medium text-gray-400">Aqui encontraras las marcas de motocicletas mas reconocidas mundialmente</span>
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="flex flex-col px-5 py-7 text-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium w-64 h-72 ring-2 ring-gray-100"
                                    onClick={() => navigate('/motorcycles')}
                                >
                                    <span className="mr-2">🏍️</span>
                                    Motocicletas
                                    <span className="text-sm mt-7 font-medium text-gray-400">Aqui encontraras motocicletas del todo el mundo</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    )
}

export default Layout