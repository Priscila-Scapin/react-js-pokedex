import {createContext, ReactNode, useEffect, useState} from 'react'

interface User {
    email: string;
    password: string;
  }

interface AuthContextType {
    user?: User;
    signed: boolean;
    signIn: (email: string, password: string) => string | void;
    signUp: (email: string, password: string) => string | void;
    signOut: () => void;
  }
  
  const defaultAuthContext: AuthContextType = {
    signed: false,
    signIn: () => {},
    signUp: () => {},
    signOut: () => {}
  };
  
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
    children: ReactNode;
  }

  
const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const token = localStorage?.getItem("user_token");
        const usersData = localStorage?.getItem('users_data');

        if (!token || !usersData) {
            return;
        }

        const parsedToken = JSON?.parse(token);
        const parsedUserLoginData = JSON?.parse(usersData);

        const userExists = parsedUserLoginData.find((user: { email: string }) => user?.email === parsedToken?.email);

        if (userExists) {
            setUser(userExists);
        }
    }, [])

    const signIn = (email: string, password: string): string | void => {

    const usersStorage: User[] = JSON.parse(localStorage.getItem("users_data") || "[]");
    const user = usersStorage.find(user => user.email === email);


    if (user) {
        if (user?.password === password) {
            const token = Math.random().toString(36).substring(2); 
            localStorage.setItem("user_token", JSON.stringify({ email, token }));
            
            setUser(user); 
        return;
        } else {
            return "E-mail ou senha incorretos";
        }

    } else {
        return "Usuário não cadastrado";
    }
    };

    const signUp = (email: string, password: string): string | void=> {
        const usersStorage = JSON.parse(localStorage.getItem("users_data") || "[]");
        const hasUser = usersStorage?.filter((user: User) => user.email === email);

        if (hasUser?.length) {
            return "Já existe uma conta cadastrada com esse email.";
        }

        let newUser;

        if (usersStorage) {
            newUser = [...usersStorage, { email, password }];
        } else {
            newUser = [{ email, password }];
        }

        localStorage.setItem("users_data", JSON.stringify(newUser));

        return;
    };


    const signOut = () => {
        setUser(undefined);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider  value={{ user, signed: !!user, signIn, signUp, signOut }}> 
         {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;