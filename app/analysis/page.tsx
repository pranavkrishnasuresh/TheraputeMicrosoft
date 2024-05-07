"use client"
import { useState } from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import { Card, Button } from '@nextui-org/react';
import Chatbot from "@/components/Chatbot"
import Navbar from "@/components/Navbar"

interface CardButtonProps {
  exerciseName: string;
  completionTime: string;
  accuracyScore: number;
  isPending: boolean;
  onClick: () => void;
}

const Dashboard: React.FC = () => {
  const [cardContent, setCardContent] = useState<JSX.Element | null>(null);

  const openCard = (content: JSX.Element) => {
    setCardContent(content);
  };

  // Example JSON data structure
  const cardButtonData: CardButtonProps[] = [
    {
      "exerciseName": "Dumbell Thrusts",
      "completionTime": "2024-05-01",
      "accuracyScore": 45,
      "isPending": true,
      "onClick": () => openCard(<ChatbotModal />)
    },
    {
      "exerciseName": "Exercise 1",
      "completionTime": "2024-05-01",
      "accuracyScore": 95,
      "isPending": false,
      "onClick": () => openCard(<StatsModal />)
    },
    // Rest of your data
  ];

  return (
    <div>
      <Navbar/>
      <div style={{backgroundColor: '#dedcff'}} className='flex min-h-screen'>
        <Tabs placement="top" style={{ marginLeft: '110px', marginTop: '30px' }}>
          <Tab title="Pending Analysis">
            <div className="overflow-auto mt-3 ml-7 mr-7" style={{ height: '650px' }}>
              {cardButtonData.filter(item => item.isPending).map((cardButton, index) => (
                <CardButton
                  key={index}
                  {...cardButton}
                />
              ))}
            </div>
          </Tab>

          <Tab title="Completed">
            <div className="overflow-auto mt-3 ml-7 mr-7" style={{ height: '400px' }}>
              {cardButtonData.filter(item => !item.isPending).map((cardButton, index) => (
                <CardButton
                  key={index}
                  {...cardButton}
                />
              ))}
            </div>
          </Tab>
        </Tabs>

        {/* Big card on the right side */}
        <div className="w-1000 p-8">
          {cardContent && (
            <Card style={{ width: "950px", height: "630px"}} >
              <div className="p-4">
                <span className="absolute top-0 right-0 p-4 pr-6  cursor-pointer" onClick={() => setCardContent(null)}>×</span>
                {cardContent}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const CardButton: React.FC<CardButtonProps> = ({ exerciseName, completionTime, accuracyScore, isPending, onClick }) => {
  return (
    <Card style={{ backgroundColor : "rgb(37 99 235)", width: '400px', height: '170px', marginBottom: '10px' }}>
      <div className="p-6">
        <h2 className="text-lg text-white font-semibold mb-2">{exerciseName}</h2>
        <p className="text-sm text-white mb-4">{completionTime}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-white">Accuracy Score: {accuracyScore}</p>
          <Button style={{backgroundColor : "rgb(96 165 250)"}} onClick={onClick}>{isPending ? 'Complete Analysis' : 'View History'}</Button>
        </div>
      </div>
    </Card>
  );
};

const ChatbotModal: React.FC = () => {
  // Chatbot modal content goes here
  return (
    <div>
      <Chatbot showingStats={false} />
    </div>
  );
};

const StatsModal: React.FC = () => {
  // Stats modal content goes here
  return (
    <div>
      <Chatbot showingStats={true} />
    </div>
  );
};

export default Dashboard;
