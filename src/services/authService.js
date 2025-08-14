import {API_BASE_URL, handleResponse} from "./api.js"

export const authService = { //Definir atributos (funciones) que exportaremos

        login: async (email, password) => {
            try {
                const response = await fetch( `${API_BASE_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                    , body : JSON.stringify({
                        email, password
                    })
                })
                const data = await handleResponse(response);

                if (data.idToken){
                    localStorage.setItem( "authToken", data.idToken)
                    const userInfo = decodeToken( data.idToken)
                    localStorage.setItem("userInfo", JSON.stringify(userInfo))
                }
                return data
            }catch(error) {
                console.error("Error en login", error)
                throw error
            }
            
        },

        //Registrar usuario
        register: async (name, lastname, email, password) => {
            try {
                const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                    password
                })
                });
                
                const data = await handleResponse(response);
                return data;
            } catch (error) {
                console.error('Error en registro', error);
                throw error;
            }
        },

        //Cerrar sesion (remueve de localstorage)
        logout: () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userInfo");
        },

        //Valida si el token no expira
        isAuthenticated: () => {
            const token = localStorage.getItem("authToken");
            if (!token) return false;

            //Validar si el token sigue vigente
            try {
                const userInfo = decodeToken(token);
                return userInfo.exp * 1000 > Date.now()
            } catch (error) {
                return false;
            }
        },

        //Retorna la informacion del usuario

        getCurrentUser: () => {
            try {
                const userInfo = localStorage.getItem("userInfo");
                return userInfo ? JSON.parse(userInfo) : null;
            }catch(error) {
                return null;
            }
        },

        //Retornar el token del usuario
        getToken: () => {
            return localStorage.getItem("authToken")
        }
}


const decodeToken = (token) => { //Decodificar el JWT que recibiremos como respuesta
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando token:', error);
    throw new Error('Token inválido');
  }
};