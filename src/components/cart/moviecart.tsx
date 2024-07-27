"use client";

import React, { useContext } from "react";
import { CartContext } from "@/context/MoviesFoodContext";
import Link from "next/link";

function MovieCart() {
  const {showdata}= useContext(CartContext);
  showdata();
};

export default MovieCart;
