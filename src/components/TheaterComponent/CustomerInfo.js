"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRef } from "react";
import { useState,useEffect ,useContext} from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Rating from '@mui/material/Rating';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link"; // Correct import for Link
import axios from "axios";
import {useCart} from "@/context/MoviesFoodContext";
import Image from "next/image";
import SpecialRequests from "../../components/TheaterComponent/SpecialRequests";
function CustomerInfo({formData,handleChange}) {
  return (
    <div>
    <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
    Customer Information
  </h3>
  <Input
    label="Name"
    type="text"
    name="customerName"
    value={formData.customerName}
    onChange={handleChange}
  />
  <Input
    label="Contact Number"
    type="text"
    name="contactNumber"
    value={formData.contactNumber}
    onChange={handleChange}
  />
  <Input
    label="Email"
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
  />
  <Input
    label="Address"
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
  />
  <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
    Seating Details
  </h3>
  <Input
    label="Number of Seats"
    type="number"
    name="numberOfSeats"
    value={formData.numberOfSeats}
    onChange={handleChange}
  />
  <Input
    label="Seating Arrangement"
    type="text"
    name="seatingArrangement"
    value={formData.seatingArrangement}
    onChange={handleChange}
    required
  />
    </div>
  )
}

export default CustomerInfo;
