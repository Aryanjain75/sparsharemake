import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export const CartContext = createContext();

export const Birthdayhall = ({ children }) => {
  const [Birthdayhalldata, setBirthdayhalldata] = useState([]);

  const loaddata = () => {
    const storedData = localStorage.getItem("BirthdayhallItems");
    if (storedData) {
      setBirthdayhalldata(JSON.parse(storedData));
    }
  };
  useEffect(()=>{console.log(Birthdayhalldata)},[Birthdayhalldata]);
  const savedata = () => {
    localStorage.setItem("BirthdayhallItems", JSON.stringify(Birthdayhalldata));
  };
  function cleardata(){
    localStorage.removeItem("BirthdayhallItems");
    setBirthdayhalldata([])
  }
  const adddata = (res) => {
    setBirthdayhalldata((prevData) => {
      const newData = [...prevData, res];
      localStorage.setItem("MovieItems", JSON.stringify(newData));
      return newData;
    });
  };

  const showdata = () => {
    console.log(Birthdayhalldata);
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <CartContext.Provider value={{ Birthdayhalldata, setBirthdayhalldata, showdata, savedata, loaddata, adddata ,cleardata}}>
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
