import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import "../app/globals.css"

interface Slide {
  name: string;
  img: string;
  desc: string;
}

interface CarouselProps {
  slides: Slide[];
}

export default function ImageCarousel({ slides }: CarouselProps) {
  let [current, setCurrent] = useState(0);

  // Ensure slides is initialized and not null or undefined
  const slidesToDisplay = slides ?? [];

  let previousSlide = () => {
    if (current === 0) setCurrent(slidesToDisplay.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slidesToDisplay.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="CarouselHolder">
      <div className="overflow-hidden relative rounded-2xl w-full h-full">
        <div className={`flex transition ease-out duration-40`} style={{ transform: `translateX(-${current * 100}%)`, width: "100%", height: "100%" }}>
          {slidesToDisplay.map((s, index) => (
            <div key={index} style={{ flex: '0 0 100%', maxWidth: '100%', width: "100%", height: "100%" }}>
              <Card className="TodayExerciseCard" shadow="sm" isPressable onPress={() => console.log("item pressed")} style={{ width: "100%", height: "100%", backgroundColor: "#dedcff"  }}>
                <CardBody className="TodayExerciseCard overflow-visible p-0" style={{ width: "100%", height: "100%" }}>
                  <Image
                    shadow="sm"
                    radius="none"
                    width="300px"
                    height="auto"
                    alt={s.name}
                    className="w-full h-full object-cover"
                    src={s.img}
                    onClick={() => console.log("item clicked")}
                  />
                </CardBody>
                <CardFooter className="text-small justify-center">
                  <div className="mb-5">
                    <p className="text-black">{s.name}</p>
                    <p className="text-black">{s.desc}</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className="buttonsCarousel absolute top-0 h-full w-full justify-between px-2 items-center flex text-black text-3xl">
          <button onClick={previousSlide}>
            <BsFillArrowLeftCircleFill />
          </button>
          <button onClick={nextSlide}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
        <div className="absolute bottom-0 py-4 flex justify-center mt-10 gap-3 w-full">
          {slidesToDisplay.map((s, i) => (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-2 h-2 cursor-pointer  ${i === current ? "bg-black" : "bg-gray-500"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
