"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import json from "@/dataset/data.json";
import { InfiniteMovingCards } from "@/components/Services/infinite-moving-cards";

function Discount() {
  const Services = json.data[3].services!;

  return (
    <>      
      <div className="justify-center items-center py-20">
        <InfiniteMovingCards items={Services} direction="right" speed="fast" />
      </div>
    </>
  );
}

export default Discount;