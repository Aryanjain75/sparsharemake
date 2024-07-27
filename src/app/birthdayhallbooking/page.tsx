"use client"
import { useGSAP } from "@gsap/react";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";
import {toast} from "react-toastify";

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
      <div className='w-full overflow-x-hidden' style={{ backgroundImage: "url('https://media.ouest-france.fr/v1/pictures/2bb85adbe40d6722b19d55f599d7df56-144654.jpg?width=1400&client_id=eds&sign=9fea0896b3b4f8a398415aa43263bd9b7cbfa176f0eeda7a07859ac9f7265af6')", backgroundSize: "cover", backgroundPosition: "center" }}>
         <div className='flex justify-center text-white text-5xl'>
            <form ref={ref} className="relative border-2 border-white w-[50rem] p-8 flex flex-col" onSubmit={validateAndSend} style={{left:"1500px", margin: "20rem 0rem", background: "#7c6b6b6b", backdropFilter: "blur(10px)" }}>
               <h1 className='p-2 font-bold'>Birthday Hall Booking</h1>
               <div className='grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-1 text-xl'>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" placeholder='Your Name' onChange={(e) => setName(e.target.value)} className='bg-transparent border-2 p-2'/>
                  {errorName && <span className="text-red-500">{errorName}</span>}

                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} className='bg-transparent border-2 p-2'/>
                  {errorEmail && <span className="text-red-500">{errorEmail}</span>}

                  <label htmlFor="phone">Phone</label>
                  <input type="text" name="phone" placeholder='Your Phone' onChange={(e) => setPhone(e.target.value)} className='bg-transparent border-2 p-2'/>
                  {errorPhone && <span className="text-red-500">{errorPhone}</span>}

                  <label htmlFor="date">Date</label>
                  <input type="text" name="date" placeholder='Date' onChange={(e) => setDate(e.target.value)} className='bg-transparent border-2 p-2'/>
                  {errorDate && <span className="text-red-500">{errorDate}</span>}

                  <label htmlFor="time">Time</label>
                  <input type="text" name="time" placeholder='Time' onChange={(e) => setTime(e.target.value)} className='bg-transparent border-2 p-2'/>
                  {errorTime && <span className="text-red-500">{errorTime}</span>}

                  <label htmlFor="noOfPeople">Number of People</label>
                  <input type="text" name="noOfPeople" placeholder='Number of People' onChange={(e) => setNoOfPeople(e.target.value)} className='bg-transparent border-2 p-2'/>
                  {errorNoOfPeople && <span className="text-red-500">{errorNoOfPeople}</span>}
               </div>

               <label htmlFor="message" className='text-xl'>Message</label>
               <input type="text" name="message" placeholder='Message' onChange={(e) => setMessage(e.target.value)} className='bg-transparent border-2 p-2'/>
               {errorMessage && <span className="text-red-500">{errorMessage}</span>}

               <button type="submit" className='mt-4 rounded-sm p-2 text-xl w-auto border-2 border-red bg-red-500'>Send Message</button>
            </form>
         </div>
      </div>
   );
}

export default Page;
