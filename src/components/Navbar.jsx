import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const Navbar = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div class="bg-gray-100 font-sans w-full m-0 mb-4">
      <div class="bg-white shadow">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <div className="text-3xl">
              🔧
            </div>

            <div class="hidden sm:flex sm:items-center">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-gray-800 text-m font-semibold mr-4 ${isActive
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "hover:text-teal-600"
                  }`
                }
              >
                🏡Inicio
              </NavLink>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  `text-gray-800 text-m font-semibold mr-4 ${isActive
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "hover:text-teal-600"
                  }`
                }
              >
                🌐Marcas
              </NavLink>
              <NavLink
                to="/motorcycles"
                className={({ isActive }) =>
                  `text-gray-800 text-m font-semibold mr-4 ${isActive
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "hover:text-teal-600"
                  }`
                }
              >
                🏍️Motocicletas
              </NavLink>
            </div>

            <div class="hidden sm:flex sm:items-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;