import {
    createContext
    , useContext
    , useState
    , useEffect
} from "react"

//import {authService} from "../services" 
import { authService } from "../services/authService"

//Logica de autenticaion
const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){ //AuthPRovider manera como le vamos a insertar a las rutas
        throw new Error ("useAuth debe usarse dentro de AuthProvider")
    }
    return context
}
//EL que da el componente el cual estare inyectare el contexto y que los hijos lo puedan utilizar (el contexto)
export const AuthProvider = ({children}) => {
    //user, setUser la informacion del usuario que vamos a manejar luego de que se autentique
    const [user, setUser] = useState(null)
    //Infromacion de autenticacion
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)

    //La manera en la que vamos a quere que cambie la informacion de nuestro estado de manera dinamica, o a traves de alteracion de variables
    useEffect( () => {
        const checkAuth = () => {
            if (authService.isAuthenticated()){
                const currentUser = authService.getCurrentUser()
                if (currentUser){
                    setUser(currentUser)
                    setIsAuthenticated(true)
                }
            }
            setLoading(false)

        };
        checkAuth();
    }, [])
    
    const login = async (email, password) => {
        // eslint-disable-next-line no-useless-catch
        try {
            setLoading(true)
            await authService.login(email, password) //Lo ponemos asincrono porque esperamos esta llamada
            const currentUser = authService.getCurrentUser()
            if (currentUser) {
                setUser(currentUser);
                setIsAuthenticated(true);
            }
            return true;
        // eslint-disable-next-line no-useless-catch
        }catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    };



    const register = async (name, lastname, email, password) => {
        try {
            setLoading(true);
            const result = await authService.register(name, lastname, email, password);
            return result;
        // eslint-disable-next-line no-useless-catch
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
      authService.logout()
      setUser(null);
      setIsAuthenticated(false)

    }

    const validateToken = () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            logout();
            return false;
        }

        try {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;

            if (tokenPayload.exp < currentTime) {
                logout();
                return false;
            }

            return true;
        } catch (error) {
            logout();
            return false;
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        validateToken
    }

    return (
        <AuthContext.Provider value= {value}>
            {children}
        </AuthContext.Provider>
    )

}