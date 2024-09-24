// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface AuthContextType {
  isAuthenticated: boolean | null;
  login: (
    email: string,
    userId: string,
    accessToken: string,
    refreshTokenKey: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // 비동기 함수로 로그인 상태를 체크
    const checkAuth = async () => {
      const loginEmail = localStorage.getItem("email");
      if (loginEmail) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = (
    email: string,
    userId: string,
    accessToken: string,
    refreshTokenKey: string
  ) => {
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshTokenKey", refreshTokenKey);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("email");
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
