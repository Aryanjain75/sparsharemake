import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { DarkModeContextProvider } from "@/context/darkModeContext";
import React,{useState,useEffect} from "react";
import { ToastContainer } from "react-toastify";
import { Cartprovider  } from '@/context/MoviesFoodContext';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return <>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
        <DarkModeContextProvider>
      <UserProvider>
        <Cartprovider>
         <CartProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </CartProvider>
      </Cartprovider>
      </UserProvider>
      </DarkModeContextProvider>

  </>
    ;
}