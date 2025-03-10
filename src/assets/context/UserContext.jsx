import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    // When the component mounts, check if userData exists as a state.
    // If not, then check if userData ecists in sessionStorage.
    // If it does, change state to the content in sessionStorage.
    if (!userData) {
      if (sessionStorage.getItem("userData")) {
        setUserData(JSON.parse(sessionStorage.getItem("userData")));
      }
    }
    //If the user data access token exists, put userData in sessionStorage
    if (userData?.access_token) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};