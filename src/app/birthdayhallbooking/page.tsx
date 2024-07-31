"use client"
import { useGSAP } from "@gsap/react";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
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
import { AnyNode } from "postcss";
import { AnyARecord } from "dns";

function Page() {
   const ref = useRef(null);

   const [name, setName] = useState(""); 
   const [errorName, setErrorName] = useState("");
   const [email, setEmail] = useState("");
   const [errorEmail, setErrorEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [errorPhone, setErrorPhone] = useState("");
   const [date, setDate] = useState("");
   const [errorDate, setErrorDate] = useState("");
   const [time, setTime] = useState("");
   const [errorTime, setErrorTime] = useState("");
   const [noOfPeople, setNoOfPeople] = useState("");
   const [errorNoOfPeople, setErrorNoOfPeople] = useState("");
   const [message, setMessage] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
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
  const [selectedRows, setSelectedRows] = useState<any>({});
  const [quantities, setQuantities] = useState<any>({});

  const [formData, setFormData] = useState({
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
  const refresh = (e:any) => {
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

  const handleRatingChange = (e:any) => {
    const value:any = e.target.value ? parseInt(e.target.value) : null;
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

  const handleCuisineChange = (e:any) => {
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

  const handlePriceRangeChange = (e:any) => {
    
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

  const sortDataBy = (key:any,e:any) => {
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

  const handlePageChange = (page:any,e:any) => {
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

  const handleSelect = (id:any,e:any) => {
    e.preventDefault();
    setSelectedRows((prev:any) => ({ ...prev, [id]: !prev[id] }));
    setQuantities((prev:any) => ({ ...prev, [id]: 1 }));
  };

  const handleIncrement = (id:any,e:any) => {
    e.preventDefault();
    setQuantities((prev:any) => ({ ...prev, [id]: prev[id] + 1 }));
  };
  const handleDecrement = (id:any, e:any) => {
    e.preventDefault();
    if (quantities[id] === 1) {
      setSelectedRows((prev:any) => {
        const newRows:any = { ...prev };
        delete newRows[id];
        return newRows;
      });
    } else {
      setQuantities((prev:any) => ({
        ...prev,
        [id]: prev[id] > 1 ? prev[id] - 1 : 1,
      }));
    }
  };

  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  
   const nameRegex = /^[a-zA-Z\s]+$/;
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const phoneRegex = /^[6789]{1}[0-9]{9}$/;

   useEffect(() => {
      gsap.to(ref.current, {
         scale: 1,
         x:-1500,
         duration: 1
      });
   }, []);

   async function validateAndSend(event:any) {
      event.preventDefault();
      let isValid = true;

      if (name.trim() === "" || !nameRegex.test(name)) {
          setErrorName("Please enter a valid name.");
          isValid = false;
      } else {
          setErrorName("");
      }

      if (email.trim() === "" || !emailRegex.test(email)) {
          setErrorEmail("Please enter a valid email.");
          isValid = false;
      } else {
          setErrorEmail("");
      }

      if (phone.trim() === "" || !phoneRegex.test(phone)) {
          setErrorPhone("Please enter a valid phone number.");
          isValid = false;
      } else {
          setErrorPhone("");
      }

      if (date.trim() === "") {
          setErrorDate("Please enter a date.");
          isValid = false;
      } else {
          setErrorDate("");
      }

      if (time.trim() === "") {
          setErrorTime("Please enter a time.");
          isValid = false;
      } else {
          setErrorTime("");
      }

      if (noOfPeople.trim() === "" || parseInt(noOfPeople) <= 0) {
          setErrorNoOfPeople("Please enter a valid number of people.");
          isValid = false;
      } else {
          setErrorNoOfPeople("");
      }

      if (message.trim() === "") {
          setErrorMessage("Please enter a message.");
          isValid = false;
      } else {
          setErrorMessage("");
      }

      if (isValid) {
        try{
        const data={"name":name,"email":email,"phone":phone,"date":date,"time":time,"noOfPeople":noOfPeople,"message":message};
        const response=await axios.post("/api/birthdayhallbooking",data);
        console.log(response);        
    }catch(e:any){
        toast.error(e.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0.1,
            theme: "colored",
            });
        }

      }
   }

   return (
    <div className="w-full overflow-x-hidden" style={{ backgroundImage: "url('https://media.ouest-france.fr/v1/pictures/2bb85adbe40d6722b19d55f599d7df56-144654.jpg?width=1400&client_id=eds&sign=9fea0896b3b4f8a398415aa43263bd9b7cbfa176f0eeda7a07859ac9f7265af6')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="flex justify-center text-white text-5xl">
        <form ref={ref} className="relative border-2 border-white w-full max-w-3xl p-8 flex flex-col mx-4" onSubmit={validateAndSend} style={{ margin: "4rem 0", background: "#7c6b6b6b", backdropFilter: "blur(10px)" }}>
          <h1 className="p-2 font-bold">Birthday Hall Booking</h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xl">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Your Name" onChange={(e) => setName(e.target.value)} className="bg-transparent border-2 p-2" />
            {errorName && <span className="text-red-500">{errorName}</span>}
  
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-2 p-2" />
            {errorEmail && <span className="text-red-500">{errorEmail}</span>}
  
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" placeholder="Your Phone" onChange={(e) => setPhone(e.target.value)} className="bg-transparent border-2 p-2" />
            {errorPhone && <span className="text-red-500">{errorPhone}</span>}
  
            <label htmlFor="date">Date</label>
            <input type="text" name="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} className="bg-transparent border-2 p-2" />
            {errorDate && <span className="text-red-500">{errorDate}</span>}
  
            <label htmlFor="time">Time</label>
            <input type="text" name="time" placeholder="Time" onChange={(e) => setTime(e.target.value)} className="bg-transparent border-2 p-2" />
            {errorTime && <span className="text-red-500">{errorTime}</span>}
  
            <label htmlFor="noOfPeople">Number of People</label>
            <input type="text" name="noOfPeople" placeholder="Number of People" onChange={(e) => setNoOfPeople(e.target.value)} className="bg-transparent border-2 p-2" />
            {errorNoOfPeople && <span className="text-red-500">{errorNoOfPeople}</span>}
          </div>
  
          <label htmlFor="message" className="text-xl">Message</label>
          <input type="text" name="message" placeholder="Message" onChange={(e) => setMessage(e.target.value)} className="bg-transparent border-2 p-2" />
          {errorMessage && <span className="text-red-500">{errorMessage}</span>}
  
          <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">Additional Services</h3>
          <div className="productable">
            <div className="shadow-lg flex flex-wrap p-4 gap-4 bg-white">
              <button onClick={(e) => refresh(e)} className="border border-black rounded p-2 mb-2 bg-aliceblue">Refresh</button>
              <button onClick={(e) => sortDataBy("FOODNAME", e)} className="border border-black rounded p-2 mb-2 bg-aliceblue">Sort by Food Name</button>
              <button onClick={(e) => sortDataBy("CUSSINE", e)} className="border border-black rounded p-2 mb-2 bg-aliceblue">Sort by Cuisine</button>
              <button onClick={(e) => sortDataBy("DISCOUNT", e)} className="border border-black rounded p-2 mb-2 bg-aliceblue">Sort by Discount</button>
              <button onClick={(e) => sortDataBy("PRICE", e)} className="border border-black rounded p-2 mb-2 bg-aliceblue">Sort by Price</button>
              <div className="border border-black rounded p-2 mb-2">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-900 bg-white">Filter by Rating</label>
                <select id="rating" className="mt-1 block w-full bg-blue-100 backdrop:blur-md rounded-3xl bg-white" onChange={handleRatingChange}>
                  <option value="">All Ratings</option>
                  <option value="1">1 Star & Up</option>
                  <option value="2">2 Stars & Up</option>
                  <option value="3">3 Stars & Up</option>
                  <option value="4">4 Stars & Up</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <div className="border border-black rounded p-2 mb-2 bg-white">
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-900">Filter by Cuisine</label>
                <select id="cuisine" className="mt-1 block w-full backdrop:blur-md rounded-3xl bg-blue-100 bg-white" onChange={handleCuisineChange}>
                  <option value="">All Cuisines</option>
                  <option value="Italian">Italian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
              <div className="border border-black rounded p-2 mb-2 bg-white">
                <label className="block text-sm font-medium text-gray-900 bg-white">Filter by Price Range</label>
                <div className="flex items-center justify-between bg-white">
                  <input type="number" name="min" className="w-full mr-2 backdrop:blur-md rounded-3xl bg-blue-100" value={priceRange[0]} onChange={handlePriceRangeChange} placeholder="Min Price" />
                  <input type="number" name="max" className="w-full ml-2 backdrop:blur-md rounded-3xl bg-blue-100" value={priceRange[1]} onChange={handlePriceRangeChange} placeholder="Max Price" />
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
                  {data.map((row: any) => (
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
                          <button onClick={(e) => handleSelect(row._id, e)}>Select</button>
                        ) : (
                          <div className="w-24">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                              <button data-action="decrement" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none" onClick={(e) => handleDecrement(row._id, e)}>
                                <span className="m-auto text-2xl font-thin">−</span>
                              </button>
                              <input type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-900 outline-none custom-input-number" name="custom-input-number" value={quantities[row._id]} readOnly />
                              <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer" onClick={(e) => handleIncrement(row._id, e)}>
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
            <div className="flex justify-center bg-white">
              <button onClick={(e) => handlePageChange(currentPage - 1, e)} disabled={currentPage === 1} className="border border-black rounded p-2 mr-2">Previous</button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button onClick={(e) => handlePageChange(currentPage + 1, e)} disabled={currentPage === totalPages} className="border border-black rounded p-2 ml-2">Next</button>
            </div>
          </div>
  
          <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">Special Requests</h3>
          <Input label="Special Requests" type="text" name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
          <Input label="Additional Equipment" type="text" name="additionalEquipment" value={formData.additionalEquipment} onChange={handleChange} />
          
          <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">Internal Use</h3>
          <Input label="Staff Handling" type="text" name="staffHandling" value={formData.staffHandling} onChange={handleChange} />
          <Input label="Notes" type="text" name="notes" value={formData.notes} onChange={handleChange} />
          
          <div className="flex justify-center">
            <button className="bg-red-500 m-2 rounded-3xl w-full max-w-md" type="submit">SUBMIT</button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
  
}

export default Page;
