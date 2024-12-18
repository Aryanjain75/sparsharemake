import React from 'react'
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
import CustomerInfo from "../../components/TheaterComponent/CustomerInfo";
function MenuItems({currentPage,totalPages,handlePageChange,handleIncrement,handleDecrement,handleSelect,handleRatingChange,handleCuisineChange,priceRange,handlePriceRangeChange,refresh,sortDataBy,Paper,data,selectedRows}) {
  return (
    <div className="productable">
          <div className="shadow-lg flex flex-wrap p-4 gap-4 bg-white">
            <button
              onClick={(e) => refresh(e)}
              className="border border-black rounded p-2 mb-2 " style={{
                border: '2px solid black',
    color: "black",
    background: "aliceblue"}} 
            >
              Refresh
            </button>
            <button
              onClick={(e) => sortDataBy("FOODNAME", e)}
              className="border border-black rounded p-2 mb-2 hover-animation bg-white"
              style={{
                border: '2px solid black',
    color: "black",
    background: "aliceblue"}} 
            >
              Sort by Food Name
            </button>
            <button
              onClick={(e) => sortDataBy("CUSSINE", e)}
              className="border border-black rounded p-2 mb-2 hover-animation bg-white"
              style={{
                border: '2px solid black',
    color: "black",
    background: "aliceblue"}} 
            >
              Sort by Cuisine
            </button>
            <button
              onClick={(e) => sortDataBy("DISCOUNT", e)}
              className="border border-black rounded p-2 mb-2 hover-animation bg-white"
              style={{
                border: '2px solid black',
    color: "black",
    background: "aliceblue"}} 
            >
              Sort by Discount
            </button>
            <button
              onClick={(e) => sortDataBy("PRICE", e)}
              className="border border-black rounded p-2 mb-2 hover-animation bg-white hover:scale-[1.2] hover:drop-shadow-md"
              style={{
                border: '2px solid black',
    color: "black",
    background: "aliceblue"}} 
            >
              Sort by Price
            </button>
            <div className="border border-black rounded p-2 mb-2">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-900 bg-white"
                style={{
                  border: '2px solid black',
      color: "black",
      background: "aliceblue"}} 
              >
                Filter by Rating
              </label>
              <select
                id="rating"
                className="mt-1 block w-full bg-blue-100 backdrop:blur-md rounded-3xl bg-white"
                style={{
                  border: '2px solid black',
      color: "black",
      background: "aliceblue"}} 
                onChange={handleRatingChange}
              >
                <option value="">All Ratings</option>
                <option value="1">1 Star & Up</option>
                <option value="2">2 Stars & Up</option>
                <option value="3">3 Stars & Up</option>
                <option value="4">4 Stars & Up</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="border border-black rounded p-2 mb-2 bg-white">
              <label
                htmlFor="cuisine"
                className="block text-sm font-medium text-gray-900 "
              >
                Filter by Cuisine
              </label>
              <select
                id="cuisine"
                className="mt-1 block w-full backdrop:blur-md rounded-3xl bg-blue-100 bg-white"
                onChange={handleCuisineChange}
              >
                <option value="">All Cuisines</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
              </select>
            </div>
            <div className="border border-black rounded p-2 mb-2 bg-white">
              <label className="block text-sm font-medium text-gray-900 bg-white">
                Filter by Price Range
              </label>
              <div className="flex items-center justify-between bg-white">
                <input
                  type="number"
                  name="min"
                  className="w-full mr-2 backdrop:blur-md rounded-3xl bg-blue-100"
                  value={priceRange[0]}
                  onChange={handlePriceRangeChange}
                  placeholder="Min Price"
                />
                <input  type="number"  name="max"  className="w-full ml-2 backdrop:blur-md rounded-3xl bg-blue-100"  value={priceRange[1]}  onChange={handlePriceRangeChange}  placeholder="Max Price"/>
              </div>
            </div>
          </div>
          <TableContainer component={Paper} className="tablecontainer">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">FOODNAME</TableCell>
                <TableCell className="tableCell">PRICE</TableCell>
                <TableCell className="tableCell">RATINGS</TableCell>
                <TableCell className="tableCell">TAGS</TableCell>
                <TableCell className="tableCell">Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={row.CloudanaryImageId} alt="" className="image" />
                      {row.FOODNAME}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{row.PRICE}</TableCell>
                  <TableCell className="tableCell">{row.RATINGS}</TableCell>
                  <TableCell className="tableCell">{row.TAGS}</TableCell>
                  <TableCell className="tableCell">
                    {!selectedRows[row._id] ? (
                      <button onClick={(e) => handleSelect(row._id,e)}>Select</button>
                    ) : (
                      <div className="w-24">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                          <button   data-action="decrement"   className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"   onClick={(e) => handleDecrement(row._id,e)} >
                            <span className="m-auto text-2xl font-thin">−</span>
                          </button>
                          <input  type="number"  className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-900 outline-none custom-input-number"  name="custom-input-number"  value={quantities[row._id]}  readOnly/>
                          <button  data-action="increment"  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"  onClick={(e) => handleIncrement(row._id,e)}>
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-center  bg-white">
          <button  onClick={(e) => handlePageChange(currentPage - 1,e)}  disabled={currentPage === 1}  className="border border-black rounded p-2 mr-2">  Previous</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={(e) => handlePageChange(currentPage + 1,e)} disabled={currentPage === totalPages} className="border border-black rounded p-2 ml-2"> Next</button>
        </div>  
        </div>
  )
}

export default MenuItems;