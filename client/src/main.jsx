import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './context/auth.jsx';
import "antd/dist/reset.css";
import { SocketProvider } from './context/socket.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <App />
        <Toaster />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
