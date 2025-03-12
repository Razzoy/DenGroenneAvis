import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        // Check sessionStorage, if not available, return null
        const storedUserData = sessionStorage.getItem("userData");
        return storedUserData ? JSON.parse(storedUserData) : null;
    });
    const [userToken, setUserToken] = useState(() => {
        // Check sessionStorage, if not available, return null
        const storedUserToken = sessionStorage.getItem("userToken");
        return storedUserToken || null;
    });

    useEffect(() => {
        // Only set sessionStorage when userData or userToken is present
        if (userData && userToken) {
            sessionStorage.setItem("userData", JSON.stringify(userData));
            sessionStorage.setItem("userToken", userToken);
        } else {
            // Ensure we clear sessionStorage when logged out
            sessionStorage.removeItem("userData");
            sessionStorage.removeItem("userToken");
        }
    }, [userData, userToken]);

    return (
        <UserContext.Provider value={{ userData, setUserData, userToken, setUserToken }}>
            {children}
        </UserContext.Provider>
    );
};