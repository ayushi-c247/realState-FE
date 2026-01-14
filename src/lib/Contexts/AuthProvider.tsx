"use client";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

import { useCurrentUserQuery } from "@/hooks/auth/index";
import {
  IAPIUser,
  IAuthAction,
  IAuthContextType,
  IAuthState,
} from "@/types/Login";
import { getInitialState } from "@/utils/tools/token-service";
import { USER_ROLE } from "@/constants";

const initialState: IAuthState = {
  isAuthorized: !!getInitialState("token"),
  token: getInitialState("token"),
  email: getInitialState("email"),
  full_name: getInitialState("full_name"),
  role: getInitialState("role"),
};

export const AuthContext = createContext<IAuthContextType | null>(null);
AuthContext.displayName = "AuthContext";

const mapUserData = (userData: IAPIUser): Partial<IAuthState> => ({
  role: userData.role,
  email: userData.email,
  full_name: userData.full_name,
});

function authReducer(state: IAuthState, action: IAuthAction): IAuthState {
  switch (action.type) {
    case "SET_AUTHORIZED":
      return {
        ...state,
        isAuthorized: true,
        ...mapUserData(action.userData),
        userData: action.userData,
      };
    case "SET_UNAUTHORIZED":
      return {
        ...state,
        isAuthorized: false,
        token: null,
        email: null,
        full_name: null,
        role: null,
        userData: undefined,
      };
    case "UPDATE_USER":
      return {
        ...state,
        role: action.userData.role,
        userData: action.userData,
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const { data: currentUser, isLoading } = useCurrentUserQuery();

  useEffect(() => {
    if (currentUser?.data) {
      const userData: IAPIUser = {
        role: currentUser.data.role || "",
        id: currentUser.data?.id,
        email: currentUser.data?.email || "",
        full_name: currentUser.data?.full_name,
        first_name: currentUser.data?.first_name,
        last_name: currentUser.data?.last_name,
        status: currentUser.data?.status ?? "",
        ...(currentUser.data?.role === USER_ROLE.AGENT && {
          agent_profile: currentUser?.data?.agent_profile,
        }),
        ...(currentUser.data?.role === USER_ROLE.INVESTOR && {
          investor_profile: currentUser?.data?.investor_profile,
        }),
      };
      dispatch({ type: "SET_AUTHORIZED", userData });
    }

    prevPathname.current = pathname;
  }, [currentUser?.data, pathname]);

  const authorize = (userData: IAPIUser) =>
    dispatch({ type: "SET_AUTHORIZED", userData });
  const unauthorize = () => dispatch({ type: "SET_UNAUTHORIZED" });

  const value = useMemo(
    () => ({
      ...state,
      authorize,
      unauthorize,
      isLoading,
    }),
    [state, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
