import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export const CartContext = createContext();

export const Cartprovider = ({ children }) => {
  const [moviedata, setmoviedata] = useState([]);

  const loaddata = () => {
    const storedData = localStorage.getItem("MovieItems");
    if (storedData) {
      setmoviedata(JSON.parse(storedData));
    }
  };

  const savedata = () => {
    localStorage.setItem("MovieItems", JSON.stringify(moviedata));
  };

  const adddata = (res) => {
    setmoviedata((prevData) => {
      const newData = [...prevData, res];
      localStorage.setItem("MovieItems", JSON.stringify(newData));
      return newData;
    });
  };

  const showdata = () => {
    console.log(moviedata);
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <CartContext.Provider value={{ moviedata, setmoviedata, showdata, savedata, loaddata, adddata }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
