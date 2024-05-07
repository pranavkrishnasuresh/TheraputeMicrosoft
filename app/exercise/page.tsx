"use client"

//test
import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import Navbar from "../../components/Navbar";

export default function App() {
  const router = useRouter();

  const handleClick = (title: string, press: boolean) => {
    if (press == true ){
      router.push(`/uploadExercise?param1=${title}`);
    } 
  }

  const list = [
    {
      title: "Deadlift",
      img: "/deadlift.png",
      press: false
    },
    {
      title: "Dumbell Thrust",
      img: "/dumbellThrust.jpeg",
      press: true
    },
    {
      title: "Internal Rotation",
      img: "/internalExternal.png",
      press: false,

    },
    {
      title: "Knee Extensions",
      img: "/kneeExtension.png",
      press: false,
    },
    {
      title: "Rotator Cuff",
      img: "/lying.png",
      press: false,
    }
  ];

  return (
    <div>
      <Navbar />
      <div style={{backgroundColor: '#dedcff'}} className="gap-10 grid grid-cols-2 sm:grid-cols-4 p-10 min-h-screen">
        {list.map((item, index, press) => (
          <Card style={{backgroundColor: "rgb(37 99 235)"}} shadow="sm" key={index} onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[320px]"
                src={item.img}
                onClick={() => handleClick(item.title, press)}
              />
            </CardBody>
            <CardFooter className="text-small justify-center">
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    
  );
}
