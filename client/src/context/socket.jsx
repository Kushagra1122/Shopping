import { useState, useEffect, useContext, createContext } from "react";

const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const [Socket, setSocket] = useState({});

  return (
    <SocketContext.Provider value={[Socket, setSocket]}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export { useSocket, SocketProvider };
