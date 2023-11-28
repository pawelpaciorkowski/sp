import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { AuthUser } from "../../_types";
import { AuthAPI } from "../../_services/api/authAPI";

const UserContext = createContext<any>({} as any);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<AuthUser>(
    localStorage.getItem("authData")
      ? JSON.parse(localStorage.getItem("authData") || "")
      : {}
  );
  const authApi = new AuthAPI();

  useEffect(() => {
    if (
      authData &&
      Object.keys(authData).length > 0 &&
      authData.token.length > 0
    ) {
      localStorage.setItem("authData", JSON.stringify(authData));
    }
  }, [authData]);

  useEffect(() => {
    if (authData.exp) {
      const nowTimestamp = new Date();
      const expireTimestamp = new Date(authData.exp * 1000);
      if (expireTimestamp <= nowTimestamp) {
        logout();
      }
    }
  });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await authApi.loginUser(email, password);
    const jwtDecoded: AuthUser = jwt_decode(res.token);
    jwtDecoded.token = res.token;
    jwtDecoded.refreshToken = res.refresh_token;
    setAuthData(jwtDecoded);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setAuthData({ exp: 0, iat: 0, roles: [], token: "", username: "", refreshToken: ""});
    navigate("/login");
  };

  const refreshToken = async () => {
    const refreshedAuthData = await authApi.refreshToken(authData.refreshToken)
    const jwtDecoded: AuthUser = jwt_decode(refreshedAuthData.token);
    jwtDecoded.token = refreshedAuthData.token;
    jwtDecoded.refreshToken = refreshedAuthData.refresh_token;
    setAuthData(jwtDecoded);
  }

  const resetPassword = async (email: string) => {
    try {
      await authApi.resetPassword(email);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      authData,
      refreshToken,
      login,
      logout,
      resetPassword,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authData]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
