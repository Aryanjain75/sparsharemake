"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import json from "@/dataset/data.json";
import { InfiniteMovingCards } from "@/components/Services/infinite-moving-cards";

function Services() {
  const Services = json.data[3].services!;

  return (
    <>
      <div className="mx-auto text-6xl justify-center text-center flex font-bold mt-12 flex-col">
        <span className="text-yellow-700">Services</span>
        <div className="justify-center flex">
        <p className="mt-3 text-sm w-[70vw] flex justify-center">Experience the epitome of convenience and exclusivity with our comprehensive services. From savoring gourmet dishes delivered hot and fresh to your doorstep, to indulging in intimate private dining experiences tailored to perfection, and hosting memorable events with our exceptional catering services, we bring the finest culinary delights and personalized attention right to you, ensuring every moment is extraordinary.</p>
        </div>
        </div>
      
      <div className="justify-center items-center py-20">
        <InfiniteMovingCards items={Services} direction="right" speed="fast" />
      </div>
    </>
  );
}

export default Services;