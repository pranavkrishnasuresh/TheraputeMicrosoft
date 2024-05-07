"use client"

import { Avatar, Badge, Card, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

const ProfilePage: React.FC = () => {
const router = useRouter();
  const [userProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Function to handle logout
  const handleLogout = () => {
    router.push("/")
  };

  // Function to toggle editing modal
  const toggleEditModal = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle profile editing
  const handleEditProfile = () => {
    toggleEditModal();
    // Implement your profile editing logic here
    console.log("Edit profile logic goes here");
  };

  return (
    <div style={{ backgroundColor: "#dedcff" }} className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Avatar size="lg" src="/avatar.jpg" alt="Profile Picture" />
              <div>
                <h3 className="text-xl text-black font-semibold">{userProfile.name}</h3>
                <p className="text-gray-600">{userProfile.email}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button color="primary" onClick={toggleEditModal}>Edit Profile</Button>
              <Button color="secondary" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal isOpen={isEditing} onClose={toggleEditModal} 
      classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-#2563eb bg-white dark:bg-[#19172c] text-black",
          header: "border-b-[1px] border-[#2563eb]",
          footer: "border-t-[1px] border-[#2563eb]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}>
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Bio"></textarea>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleEditProfile}>Save Changes</Button>
            <Button onClick={toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfilePage;
