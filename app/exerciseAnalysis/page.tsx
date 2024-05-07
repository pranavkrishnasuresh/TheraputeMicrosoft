"use client"
// exerciseAnalysis.tsx
import React from "react";
import ReactPlayer from 'react-player';
import MyTabs from '@/components/Tabs';
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";

interface TimestampEvent {
  time: number;
  description: string;
}

const ExerciseAnalysis: React.FC = () => {
  const [accuracyScore, setAccuracyScore] = useState<string>('94.2%');
  const [events, setEvents] = useState<TimestampEvent[]>([
    { time: 2, description: 'Yo leg bent' },
    { time: 5, description: 'Fix ur back bruh' },
    { time: 6, description: 'LMAOO u weak' },
    { time: 12, description: 'Eat less food' },
    { time: 22, description: 'touch grass' },
    { time: 28, description: 'whats ur number bbg?' },
    { time: 2, description: 'Yo leg bent' },
    { time: 5, description: 'Fix ur back bruh' },
    { time: 6, description: 'LMAOO u weak' },
    { time: 12, description: 'Eat less food' },
    { time: 22, description: 'touch grass' },
    { time: 28, description: 'whats ur number bbg?' },
    { time: 6, description: 'LMAOO u weak' },
    { time: 12, description: 'Eat less food' },
    { time: 22, description: 'touch grass' },
    { time: 28, description: 'whats ur number bbg?' },
    { time: 2, description: 'Yo leg bent' },
    { time: 5, description: 'Fix ur back bruh' },
    { time: 6, description: 'LMAOO u weak' },
    { time: 12, description: 'Eat less food' },
    { time: 22, description: 'touch grass' },
    { time: 28, description: 'whats ur number bbg?' },
  ]);
  const videoRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [selectedTime, setSelectedTime] = useState<number | null>(null); // New state to track selected time
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null); // New state to track selected description

  const jumpToTime = (event: TimestampEvent) => {
    if (videoRef.current) {
      videoRef.current.seekTo(event.time, 'seconds');
      setPlaying(true);
      setSelectedTime(event.time); // Update selected time
      setSelectedDescription(event.description); // Update selected description
    }
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    console.log(progress)
    const currentTime = Math.floor(progress.playedSeconds);
    const matchingEvent = events.find(event => event.time === currentTime);
    if (matchingEvent) {
      setSelectedTime(matchingEvent.time); // Automatically select timestamp when video hits the time
      setSelectedDescription(matchingEvent.description); // Update selected description
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <Navbar />
      <div style={{backgroundColor: '#dedcff'}} className="flex h-screen">
        <div className="flex flex-col w-2/3 mx-12 my-4">
          <div className="relative rounded-xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
            <ReactPlayer
              ref={videoRef}
              url="/test.mp4"
              playing={playing}
              controls
              width="100%"
              height="100%"
              onProgress={handleProgress} // Handle video progress
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
          <div className="bg-gray-700 rounded-xl p-4 mt-4 text-white text-center">
            Accuracy Score: {accuracyScore}
          </div>
        </div>
        <div className='w-1/4'>
          <div className="overflow-y-auto max-h-[50vh] bg-gray-800 p-4 rounded-xl" style={{ marginTop: '1rem' }}> 
            <h2 className="text-white text-lg font-bold mb-4">Timestamps</h2>
            <div className="overflow-y-auto bg-blue-500 rounded-xl p-4 my-4 ">
              {events.map(event => (
                <button
                  key={event.time}
                  onClick={() => jumpToTime(event)}
                  className={`text-white rounded-lg p-2 block w-full mb-2 ${
                    selectedTime === event.time ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  {formatTime(event.time)}
                </button>
              ))}
            </div>
          </div>
          {selectedDescription && selectedDescription.length > 0 &&
            <MyTabs selectedDescription={selectedDescription} />}
        </div>
      </div>
    </div>

  );
};

export default ExerciseAnalysis;
