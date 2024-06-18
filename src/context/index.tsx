import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface IAuthContext {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;

  authenticating: boolean;
  setAuthenticating: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},

  authenticating: false,
  setAuthenticating: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [authenticating, setAuthenticating] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const userData = currentUser ? JSON.parse(currentUser) : null;
    setUser(userData);
    const currentUsers = localStorage.getItem("users");
    currentUsers && currentUsers.length
      ? JSON.parse(currentUsers)
      : localStorage.setItem(
          "users",
          JSON.stringify([
            {
              id: 1,
              name: "Dennis Nderitu",
              role: "admin",
              email: "dknderitu@gmail.com",
              password: "1234",
            },
          ]),
        );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        authenticating,
        setAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
