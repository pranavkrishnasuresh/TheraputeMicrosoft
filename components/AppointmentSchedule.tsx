'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { db } from '../app/firebase';
import { getFirestore, collection, addDoc, getDoc, setDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";

interface Schedule {
    date: string;
    link: string;
}

export default function AppointmentSchedule() {
    const router = useRouter();
    const [schedule, setSchedule] = useState<Schedule[]>([]);

    async function fetchData() {
        const q = query(collection(db, 'appointments'));
        const querySnapshot = await getDocs(q);
        // Convert each DocumentData object to Slide
        const scheduleData: Schedule[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Assuming the structure of data in Firestore matches Slide interface
            return {
            date: data.date.toDate().toLocaleString(),
            link: data.link,
            };
        });
        setSchedule(scheduleData);
    }
    useEffect(() => {
        fetchData()
    }, [])

    function handleClick(link: string) {
        const url = `${link}`;
        const win = window.open(url, '_blank');
        if (win) {
            win.focus();
        } else {
            router.push(url);
        }
    }

    return (
        <div className="flex flex-col items-center px-7 pt-5 rounded-xl bg-blue-600 ">
            <h2 className="text-white mb-6 text-2xl">Appointment Schedule</h2>
            <div className="max-h-60 overflow-auto w-full max-w-lg ">
                {schedule.map((s, index) => (
                    <div key={index} className="flex flex-row justify-between p-3 mb-4 rounded-xl bg-white text-gray-800 shadow-md">
                        <h3 className="text-lg ">{s.date}</h3>
                        <button className="ml-10 px-3 py-2 rounded-full text-sm bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                            onClick={() => handleClick(s.link)}>
                            Reschedule/Cancel
                        </button>
                    </div>
                ))}
            </div>
            <button className="mt-5 mb-5 px-6 py-3 rounded-full text-sm font-semibold bg-blue-500 text-white"
                onClick={() => handleClick("https://engageware.com/")}>
                Book New Appointment
            </button>
        </div>
    );
}
