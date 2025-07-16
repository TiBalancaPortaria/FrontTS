import { ModeToggle } from "@/components/mode-toggle";
import { Helmet } from "react-helmet-async";
import logoMoreno from "@/assets/logo_moreno.png"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function LoginPage(){
    const {signIn} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            await signIn ({email, password});
            
            navigate('/menu')
        } catch (err){
            setError('Email ou senha invalidos');
        }
    }
    

    return(
        <main>
            <Helmet>Login</Helmet>
            <div className="flex flex-row">
                <div className="relative w-1/2 h-screen bg-slate-300 dark:bg-slate-700 pl-3 pt-3">
                    <div className="absolute top-0 left-0 m-3">
                        <ModeToggle/>
                    </div>
                    <div className="flex items-center justify-center h-full">
                        <img src={logoMoreno} alt="Logo" />
                    </div>
                </div>

                <div
                className="w-1/2 flex flex-col justify-center items-center gap-5
                        h-screen bg-gray-300 dark:bg-slate-800">
                <label className="text-4xl font-mono font-bold">Login</label>
                    <form
                        className="flex flex-col justify-center items-center gap-5"
                        onSubmit={handleSubmit}
                    >
                        <Input
                        type="email"
                        placeholder="Email"
                        className="w-[20rem] h-[3.125rem] font-mono text-xl focus:border-red-800"
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                        type="password"
                        placeholder="Senha"
                        className="w-[20rem] h-[3.125rem] font-mono text-xl focus:border-red-800"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        

                        <Button
                        className="font-mono text-xl font-bold"
                        type="submit"
                        >
                            Entrar
                        </Button>
                        {error && <p className="text-red-600">{error}</p>}
                    </form>
                </div>
            </div>
        </main>
    )
}