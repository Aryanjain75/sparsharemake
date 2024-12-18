/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import axios from "axios";
import { useCart } from "@/context/MoviesFoodContext";
import SpecialRequests from "@/components/TheaterComponent/SpecialRequests";
import CustomerInfo from "@/components/TheaterComponent/CustomerInfo";
import  MenuItems  from "@/components/TheaterComponent/MenuItems";
import "./productable.scss";

export default function TheaterBooking ()  {
  const { adddata, cleardata } = useCart();
  const [moviesData, setMoviesData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    movieId: "",
    movieName: "",
    dateTime: "",
    duration: "",
    customerName: "",
    contactNumber: "",
    email: "",
    numberOfSeats: "",
    specialRequests: "",
    selectedFoods: [],
    totalAmount: "",
  });

  const [filters, setFilters] = useState({
    searchValue: "",
    selectedTags: [],
    selectedRating: null,
    selectedCuisine: "",
    priceRange: [0, 300],
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const itemsPerPage = 6;
  const formRef = useRef(null);

  const fetchTags = async () => {
    try {
      const response = await axios.get("/api/tags");
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchData = async (page = 1) => {
    try {
      const [menuResponse, movieResponse] = await Promise.all([
        axios.get("/api/getMenu", {
          params: {
            page,
            limit: itemsPerPage,
            search: filters.searchValue,
            rating: filters.selectedRating,
            tags: filters.selectedTags.join(","),
            cuisine: filters.selectedCuisine,
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
          },
        }),
        axios.get("https://movieapi-rook.onrender.com/getmovies"),
      ]);
      console.log((await axios.get("https://movieapi-rook.onrender.com/getmovies")).data.data);
      setMenuData(menuResponse.data.data || []);
      setPagination((prev) => ({
        ...prev,
        totalPages: menuResponse.data.size || 1,
      }));
      setMoviesData(movieResponse.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [filters, pagination.currentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (movieId) => {
    const selectedMovie = moviesData.find((movie) => movie._id === movieId);
    if (selectedMovie) {
      setFormData((prev) => ({
        ...prev,
        movieId: selectedMovie._id,
        movieName: selectedMovie.titleText,
        duration: `${Math.floor(selectedMovie.runtime / 3600)}h ${Math.floor(
          (selectedMovie.runtime % 3600) / 60
        )}m`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        selectedFoods: menuData.filter((item) => item.selected),
      };

      const response = await axios.post("/api/calculatemovieamount", payload);
      adddata(response.data.data);
      toast.success("Booking successful!");
      formRef.current?.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to book theater. Please try again.");
    }
  };

  return (
    <div
      className="bg-gradient-radial from-background via-secondary to-background min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/devj7oonz/image/upload/v1721467461/th_izzrnh.jpg")',
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative w-full max-w-4xl mx-auto p-6 bg-background rounded-lg shadow-neon text-white border-2 border-white"
        style={{
          marginTop: "5rem",
          backgroundColor: "#ffffff5c",
          backdropFilter: "blur(2px)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-accent text-white">
          Private Theater Booking
        </h2>
        <div className="overflow-x-auto gap-2 flex flex-row overflow-y-auto">
        {moviesData.map((movie) => (
          <div
            key={movie.id}
            className="  rounded-lg border-2 border-gray-300 bg-gray-100 shadow-lg flex flex-row sm:flex-row gap-4 overflow-scroll"
          style={{width:"282px",height: "220px"}}
            >
            {/* Movie Image */}
            <div
              className=" sm:w-1/6 h-32 rounded-md bg-cover bg-center w-fit font-black"
              style={{ backgroundImage: `url(${movie.movieImage})` }}
            >
             {/* Movie Content */}
             <div className="flex flex-col flex-grow p-4 text-[#48bfe3] ">
             <h2 className="text-lg font-bold text-gray-800">{movie.title}</h2>
             <p className="text-gray-600 text-sm">{movie.imageCaption}</p>
             <div className="flex justify-between mt-2 text-gray-700">
               <div>
                 <p>
                   <strong>Release Year:</strong> {movie.releaseYear.year}
                 </p>
                 <p>
                   <strong>Runtime:</strong> {movie.runtime?.seconds / 60} mins
                 </p>
               </div>
               <div>
                 <p>
                   <strong>Rating:</strong> {movie.ratingsSummary.aggregateRating} ⭐
                 </p>
                 <p>
                   <strong>Votes:</strong> {movie.ratingsSummary.voteCount}
                 </p>
               </div>
             </div>
       
             {/* Tags */}
             <div className="mt-2 flex gap-2">
               {movie.tags.map((tag) => (
                 <span
                   key={tag}
                   className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs"
                 >
                   {tag}
                 </span>
               ))}
             </div>
           </div>
            </div>
        
           
          </div>
        ))}
          
        </div>
        <CustomerInfo formData={formData} onChange={handleChange} />
        <SpecialRequests formData={formData} onChange={handleChange} />
        <Button type="submit" text="Book Theater" />
        <ToastContainer />
      </form>
    </div>
  );
};

