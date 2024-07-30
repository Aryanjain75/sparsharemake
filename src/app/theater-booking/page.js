/* eslint-disable @next/next/no-img-element */
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
import "./productable.scss";
import Link from "next/link"; // Correct import for Link
import axios from "axios";
import {useCart} from "@/context/MoviesFoodContext";
import Image from "next/image";
const TheaterBooking = () => {
  const { adddata } = useCart();
  const [Data,setdata] = useState([{
    "data": [
        {
            "_id": "66a50e385d477c13932a38d8",
            "titleText": "The Boys",
            "titleType": "TV Series",
            "originalTitleText": "The Boys",
            "primaryImage": "https://m.media-amazon.com/images/M/MV5BYTY2ZjYyNGUtZGVkZS00MDNhLWIwMjMtZDk4MmQ5ZWI0NTY4XkEyXkFqcGdeQXVyMTY3MDE5MDY1._V1_.jpg",
            "heros": [
                "Laz Alonso",
                " Jeffrey Dean Morgan",
                "Karl Urban",
                "Antony Starr",
                " Erin Moriarty",
                " Jack Quaid",
                " Tomer Capone",
                " Karen Fukuhara"
            ],
            "releaseYear": "2019",
            "ratingsSammary": "8.7",
            "runtime": 3600,
            "certificateratting": "TV-MA",
            "canRate": true,
            "titleGenres": [
                "Action",
                "Comedy",
                "Crime"
            ],
            "__v": 0
        }
    ],
    "totalItems": 1,
    "totalPages": 1,
    "currentPage": 1
}]);

  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    bookingId: "",
    movieName: "",
    dateTime: "",
    duration: "",
    theaterNumber: "",
    customerName: "",
    contactNumber: "",
    email: "",
    address: "",
    paymentMethod: "",
    totalAmount: "",
    paymentStatus: "",
    transactionId: "",
    numberOfSeats: "",
    seatNumbers: "",
    seatingArrangement: "",
    foodAndBeverageOrders: "",
    specialRequests: "",
    additionalEquipment: "",
    confirmationStatus: "",
    notificationPreferences: "",
    staffHandling: "",
    notes: "",
    movieprice:""
  });
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [searchValue, setSearchValue] = useState("");
  const [Tags, setTags] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [quantities, setQuantities] = useState({});


  const refresh = (e) => {
    e.preventDefault();
    setData(oldData);
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get("/api/tags");
      setTags(response.data);
      console.log(Tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchData = async (
    page = 1,
    search = "",
    rating = null,
    tags = [],
    cuisine = "",
    minPrice = 0,
    maxPrice = 300
  ) => {
    try {
      const response = await axios.get("/api/getMenu", {
        params: {
          page,
          limit: itemsPerPage,
          search,
          rating,
          tags: tags.join(","),
          cuisine,
          minPrice,
          maxPrice,
        },
      });
      const resp = await axios.get("/api/movies");
      setdata(resp.data.res);
      console.log(Data);
      setData(response.data.data);
      setOldData(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(
      currentPage,
      searchValue,
      selectedRating,
      selectedTags,
      selectedCuisine,
      priceRange[0],
      priceRange[1]
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags, selectedRating, selectedCuisine, priceRange, currentPage]);

  const handleRatingChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setSelectedRating(value);
    setCurrentPage(1); // Reset to first page
    fetchData(
      1,
      searchValue,
      value,
      selectedTags,
      selectedCuisine,
      priceRange[0],
      priceRange[1]
    );
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
    setCurrentPage(1); // Reset to first page
    fetchData(
      1,
      searchValue,
      selectedRating,
      selectedTags,
      e.target.value,
      priceRange[0],
      priceRange[1]
    );
  };

  const handlePriceRangeChange = (e) => {
    
    const value = parseInt(e.target.value);
    const newRange =
      e.target.name === "min" ? [value, priceRange[1]] : [priceRange[0], value];
    setPriceRange(newRange);
    setCurrentPage(1); // Reset to first page
    fetchData(
      1,
      searchValue,
      selectedRating,
      selectedTags,
      selectedCuisine,
      newRange[0],
      newRange[1]
    );
  };

  const sortDataBy = (key,e) => {
    e.preventDefault();
    setCurrentPage(1);
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      })
    );
  };

  const handlePageChange = (page,e) => {
    e.preventDefault();
    setCurrentPage(page);
    fetchData(
      page,
      searchValue,
      selectedRating,
      selectedTags,
      selectedCuisine,
      priceRange[0],
      priceRange[1]
    );
  };

  const handleSelect = (id,e) => {
    e.preventDefault();
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    setQuantities((prev) => ({ ...prev, [id]: 1 }));
  };

  const handleIncrement = (id,e) => {
    e.preventDefault();
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };
  const handleDecrement = (id, e) => {
    e.preventDefault();
    if (quantities[id] === 1) {
      setSelectedRows((prev) => {
        const newRows = { ...prev };
        delete newRows[id];
        return newRows;
      });
    } else {
      setQuantities((prev) => ({
        ...prev,
        [id]: prev[id] > 1 ? prev[id] - 1 : 1,
      }));
    }
  };

  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (id) => {
    setSelectedFeature(id);
    const selectedMovie = Data.find((movie) => movie._id === id);
    setFormData((prevState) => ({
      ...prevState,
      movieName: selectedMovie.titleText,
      duration: `${Math.floor(selectedMovie.runtime / 3600)}h ${Math.floor(
        (selectedMovie.runtime % 3600) / 60
      )}m`,
      movieprice:selectedMovie.price,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
    const data={
      additionalEquipment:formData.additionalEquipment,
      address:formData.address,
      contactNumber:formData.contactNumber,
      customerName:formData.contactNumber,
      dateTime:formData.dateTime,
      duration:formData.duration,
      email:formData.email,
      movieName:formData.movieName,
      movieprice:formData.movieprice,
      notes:formData.notes,
      numberOfSeats:formData.numberOfSeats,
      seatingArrangement:formData.seatingArrangement,
      specialRequests:formData.specialRequests,
      staffHandling:formData.staffHandling,
      quantities:quantities,
      selectedRows:selectedRows
    }
    console.log(data);
    const res=axios.post("/api/calculatemovieamount",data);
    console.log(res);
    adddata(res);
    toast.success("Form submitted successfully!");
    // Handle form submission logic
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <div
      className="bg-gradient-radial from-background via-secondary to-background min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/devj7oonz/image/upload/v1721467461/th_izzrnh.jpg")',
          backgroundPosition:"center",
          backgroundRepeat:"repeat",
          backgroundSize:"cover"
      }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative w-full max-w-4xl mx-auto p-6 overflow-x-hidden bg-background rounded-lg shadow-neon bg-transparent text-white border-2 border-white"
        style={{
          marginTop: "5rem",
          backgroundColor: "#ffffff5c",
          backdropFilter: "blur(2px)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-accent font-anime text-white">
          Private Theater Booking
        </h2>
        <div className="flex flex-row overflow-x-auto gap-2">
        {Data.map((movie) => (
          <div
            key={movie._id}
            className="w-full md:w-2/3 lg:w-1/2 xl:w-[34rem] mx-auto mb-4 p-4 rounded-lg border-2 border-black bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.primaryImage})`,
            }}
            onClick={() => handleRadioChange(movie._id)}
          >
            <div className="w-full h-90 p-4 flex flex-col justify-evenly bg-transparent bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-lg">
              <input
                type="radio"
                className="form-radio"
                name="feature"
                value={movie._id}
                checked={selectedFeature === movie._id}
                onChange={() => handleRadioChange(movie._id)}
                required
              />
              <div className="font-extrabold text-5xl text-black">{movie.titleText}</div>
              <div className="flex justify-between">
                <div className="border-2 border-black text-black p-1 rounded-lg bg-opacity-40 bg-blue-100 font-bold">
                  {movie.titleType}
                </div>
                <div className="flex flex-wrap w-fit bg-black text-white p-2 rounded-full font-bold">
                  {movie.titleGenres ? movie.titleGenres.join(",") : ""}
                </div>
              </div>
              <div className="flex flex-wrap border-2 border-black p-2 rounded-lg font-bold">
                <div className="font-extrabold mr-2">Heros:</div>
                {movie.heros ? movie.heros.join(",") : ""}
              </div>
              <div className="flex justify-evenly text-red-800 font-extrabold justify-between">
                <div>
                  {movie.runtime
                    ? `${Math.floor(movie.runtime / 3600)}h ${Math.floor(
                        (movie.runtime % 3600) / 60
                      )}m`
                    : "N/A"}{" "}
                  hrs
                </div>
                <div>{movie.releaseYear}</div>
              </div>
              <div>
                <Rating name="customized-10" value={Number(movie.ratingsSammary)} max={10} />
              </div>
              <div className="flex justify-between">
                <div className="border-2 border-black p-1 rounded-lg font-bold">
                  {movie.certificateratting}
                </div>
                <div className="ml-2">{movie.price}/-</div>
              </div>
            </div>
          </div>
        ))}
        </div>
        <Input
          label="Date & Time"
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
        />
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
        <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
          Additional Services
        </h3>
        <div className="productable">
          <div className="shadow-lg flex flex-wrap p-4 gap-4 bg-white">
            <button
              onClick={(e) => refresh(e)}
              className="border border-black rounded p-2 mb-2 hover-animation"
            >
              Refresh
            </button>
            <button
              onClick={(e) => sortDataBy("FOODNAME", e)}
              className="border border-black rounded p-2 mb-2 hover-animation bg-white"
            >
              Sort by Food Name
            </button>
            <button
              onClick={(e) => sortDataBy("CUSSINE", e)}
              className="border border-black rounded p-2 mb-2 hover-animation bg-white"
            >
              Sort by Cuisine
            </button>
            <button
              onClick={(e) => sortDataBy("DISCOUNT", e)}
              className="border border-black rounded p-2 mb-2 hover-animation bg-white"
            >
              Sort by Discount
            </button>
            <button
              onClick={(e) => sortDataBy("PRICE", e)}
              className="border border-black rounded p-2 mb-2 hover-animation bg-white"
            >
              Sort by Price
            </button>
            <div className="border border-black rounded p-2 mb-2">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-900 bg-white"
              >
                Filter by Rating
              </label>
              <select
                id="rating"
                className="mt-1 block w-full bg-blue-100 backdrop:blur-md rounded-3xl bg-white"
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
                <input
                  type="number"
                  name="max"
                  className="w-full ml-2 backdrop:blur-md rounded-3xl bg-blue-100"
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                  placeholder="Max Price"
                />
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
                          <button
                            data-action="decrement"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                            onClick={(e) => handleDecrement(row._id,e)}
                          >
                            <span className="m-auto text-2xl font-thin">−</span>
                          </button>
                          <input
                            type="number"
                            className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-900 outline-none custom-input-number"
                            name="custom-input-number"
                            value={quantities[row._id]}
                            readOnly
                          />
                          <button
                            data-action="increment"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                            onClick={(e) => handleIncrement(row._id,e)}
                          >
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
          <button
            onClick={(e) => handlePageChange(currentPage - 1,e)}
            disabled={currentPage === 1}
            className="border border-black rounded p-2 mr-2"
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={(e) => handlePageChange(currentPage + 1,e)}
            disabled={currentPage === totalPages}
            className="border border-black rounded p-2 ml-2"
          >
            Next
          </button>
        </div>  
        </div>
        <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
        Special Requests
      </h3>
      <Input
        label="Special Requests"
        type="text"
        name="specialRequests"
        value={formData.specialRequests}
        onChange={handleChange}
        required
      />
      <Input
        label="Additional Equipment"
        type="text"
        name="additionalEquipment"
        value={formData.additionalEquipment}
        onChange={handleChange}
        required
      />
      <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
        Internal Use
      </h3>
      <Input
        label="Staff Handling"
        type="text"
        name="staffHandling"
        value={formData.staffHandling}
        onChange={handleChange}
        required
      />
      <Input
        label="Notes"
        type="text"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        required
      />
      <div className="flex justify-center">
        <Button className="bg-red-500 m-2 rounded-3xl w-[23rem]" text="Submit" type="submit" />
      </div>
      <ToastContainer />
      </form>
    </div>
  );
}  

export default TheaterBooking;