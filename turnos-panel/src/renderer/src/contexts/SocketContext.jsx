import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {

    const { socket, online, connectSocket, disconnectSocket } = useSocket('http://127.0.0.1:3100');
    const { status } = useContext(AuthContext);

    useEffect(() => {
        if (status === 'authenticated') { connectSocket() }
    }, [status]);

    useEffect(() => {
        if (status === 'not-authenticated') { disconnectSocket() }
    }, [status]);

    return (
        <SocketContext.Provider
            value={{
                socket,
                online
            }}
        >
            { children }
        </SocketContext.Provider>
    )
}