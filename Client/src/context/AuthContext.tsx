import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { CostumJwtPayload, IUsers } from "../interfaces/UserInterfaces";
import { doGetUserById, doSignInUser } from "../Services/UserService";

interface AuthContextType {
  isSignedIn: boolean;
  isAdmin: boolean;
  userDetails: IUsers | undefined;
  signIn: (email: string, password: string) => Promise<void | string>;
  signOut: () => void;
  loadUserFromLS: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSignedIn, setIsSignIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userDetails, SetUserDetails] = useState<IUsers | undefined>(undefined);

  const getUserById = async (userId: string) => {
    let { error, result } = await doGetUserById(userId);
    if (result) {
      SetUserDetails(result.data);
    }
    if (error) {
      return error;
    }
  };

  const signIn = async (email: string, password: string) => {
    let { error, result } = await doSignInUser(email, password);
    if (result) {
      const parsedResult = JSON.parse(result);
      const token = parsedResult.token;
      const decoded = jwtDecode<CostumJwtPayload>(token);

      setIsSignIn(true);
      setIsAdmin(decoded.isAdmin);
      localStorage.setItem("userId", `${decoded._id}`);
      localStorage.setItem("userToken", `${token}`);
    }
    if (error) {
      return error;
    }
  };

  const signOut = () => {
    setIsSignIn(false);
    setIsAdmin(false);
    localStorage.removeItem("userToken");
  };

  const loadUserFromLS = () => {
    if (isAdmin) {
      const userIdForAdmin = localStorage.getItem("userProfileByAdmin");
      if (userIdForAdmin) {
        getUserById(userIdForAdmin);
      }
    } else {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) return null;

      const user = jwtDecode<CostumJwtPayload>(userToken);
      setIsSignIn(true);
      setIsAdmin(user.isAdmin);
      getUserById(user._id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        isAdmin,
        userDetails,
        signIn,
        signOut,
        loadUserFromLS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
