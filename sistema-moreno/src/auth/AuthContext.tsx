import type { SignInRequest, User } from "@/@types/auth"
import { signInRequest } from "@/services/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContextData ={
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: SignInRequest) => Promise<void>
    signOut : () =>void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: {children: ReactNode }) =>{
    const [user, setUser] = useState<User |null>(null);
    const isAuthenticated = !!user;

    useEffect(() =>{
        //carrega o user se ja estiver salvo
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    }, []);

    const signIn = async (data: SignInRequest) => {
        const response = await signInRequest(data);
        setUser(response.user)

        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        localStorage.setItem('user', JSON.stringify(response.user));
    };

    const signOut = () =>{
        localStorage.clear();
        setUser(null)
    }

    return(
        <AuthContext.Provider
            value={{user, isAuthenticated, signIn, signOut}}
        >
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth =() => useContext(AuthContext)