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
  accessToken: string | null;
  refreshToken: string | null;
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // 비동기 함수로 로그인 상태를 체크
    const checkAuth = async () => {
      const loginEmail = localStorage.getItem("email");
      if (loginEmail) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setAccessToken(accessToken);
      } else {
        setAccessToken(null);
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
    setAccessToken(accessToken);
    setRefreshToken(refreshTokenKey);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, refreshToken, login, logout }}
    >
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
