"use client"


import Image from "next/image";
import { Button } from "@nextui-org/button";
import TodayExercise from "../../components/TodayExercise";
import Carousel from '../../components/ImageCarousel';
import History from "../../components/ExerciseHistory";
import Schedule from "../../components/AppointmentSchedule";
import Comments from "../../components/PTComments";
import ActivityGraph from "../../components/ActivityGraph";
import Navbar from "../../components/Navbar";
import "../globals.css";

interface HomePageProps {
  name: string;
}

const Home: any  = (props: HomePageProps) =>{
  return (
    <div className="flex flex-col" style={{backgroundColor: '#dedcff'}}>
      <Navbar />

      <div className="HomePageTopDiv flex justify-between mt-5">
        <div className="w-1/3 p-4 flex flex-col items-center justify-start">
          <TodayExercise />
        </div>
        <div className="w-1/3 p-4 flex flex-col items-center justify-start">
          <History />
        </div>
        <div className="w-1/3 p-4 flex flex-col items-center justify-start">
          <Schedule />
        </div>
      </div>
      <div className="flex justify-between mr-10 mt-20 mb-10">
        <div className="w-1/2 mt-10">
          <div className=" flex flex-col p-9 items-center justify-start rounded-xl" style={{ width: '80%', margin: '0 auto', backgroundColor: '#0165e5' }}>
            <h2 className="text-white mb-3" style={{ fontSize: '1.2rem' }}>Activity Graph:</h2>
            <ActivityGraph />
          </div>
        </div>
        <div className="w-1/2 p-5 flex flex-col items-center justify-start">
          <Comments />
        </div>
      </div>
    </div>
  );
}


export default Home;
