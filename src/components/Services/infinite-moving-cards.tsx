"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faFilm, faUtensils, faTruck, faGlassCheers, faConciergeBell } from '@fortawesome/free-solid-svg-icons';

function getIconByTopic(topic: string) {
  switch (topic) {
    case 'Birthday hall':
      return faBirthdayCake;
    case 'Theater':
      return faFilm;
    case 'Restaurant':
      return faUtensils;
    case 'Delivery':
      return faTruck;
    case 'Private Dining':
      return faGlassCheers;
    case 'Catering':
      return faConciergeBell;
    default:
      return null;
  }
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    Service: string;
    quot: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] m-auto",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, index) => (
          <li key={item.Service}>
            <CardContainer key={index} className="inter-var">
              <CardBody className="items-center flex flex-col text-center gap-5 bg-gray-50 gap-2 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[19rem] h-auto rounded-xl p-6 border">
                <CardItem translateZ="100" className="w-full mt-4">
                  <FontAwesomeIcon icon={getIconByTopic(item.Service)!} className="text-2xl" />
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {item.Service}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  &quot{item.quot}&quot
                </CardItem>
              </CardBody>
            </CardContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};