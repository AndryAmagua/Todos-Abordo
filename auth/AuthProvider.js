import React, { createContext, useState, useReducer } from 'react'
import AuthReducer, { initialUser } from './AuthReducer';

const AuthContext = createContext();
const initialValue = useState(null)

const AuthProvider = ({ children }) => {
    // const [user, dispatch] = useReducer(AuthReducer, initialUser)
    const [user, setUser] = useEffect(initialValue)
    const login = () => {
        setUser({
            correo: "andry@gmail.com",
            contraseña: "1234"
        })
    }
    const logout = () => {
        setUser(null)
    }

    const data = {user, login, logout}

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default AuthProvider