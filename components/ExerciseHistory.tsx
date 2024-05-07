"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { db } from '../app/firebase';
import { getFirestore, collection, addDoc, getDoc, setDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";

interface Exercise {
    name: string;
    link: string;
    date: string;
}

export default function ExerciseHistory() {
    const router = useRouter();
    const [history, setHistory] = useState<Exercise[]>([])
    async function fetchData() {
        const q = query(collection(db, 'history'));
        const querySnapshot = await getDocs(q);
        // Convert each DocumentData object to Slide
        const historyData: Exercise[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            //convert date timestamp to mm/dd/yy
            const dateObject = data.date.toDate();
            const month = dateObject.getMonth() + 1; // Month is zero-based, so add 1
            const day = dateObject.getDate();
            const year = dateObject.getFullYear() % 100; // Get last two digits of the year
            // Format date in mm/dd/yy format
            const dateString = `${month}/${day}/${year}`;

            // Assuming the structure of data in Firestore matches Slide interface
            return {
            name: data.name,
            date: dateString,
            link: data.link,
            };
        });
        setHistory(historyData);
    }
    useEffect(() => {
        fetchData();
    }, []);

    function handleClick(link: string) {
        router.push(`/history?param1=${link}`)
    }

    return (
        <div className="flex flex-col items-center px-7 pt-5 pb-4 rounded-xl" style={{ backgroundColor: '#0165e5' }}>
            <h2 className="text-white text-2xl mb-4">Exercise History</h2>
            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 rounded-2xl">
                {history.map((exercise, index) => (
                    <div key={index} className="flex justify-between items-center p-4 mb-4 rounded-2xl bg-white text-black">
                        <h4 className="pr-5 pl-3 text-lg">{exercise.date}</h4>
                        <h4 className="pr-5 text-lg">{exercise.name}</h4>
                        <button className="px-6 py-2 rounded-full text-sm font-semibold bg-blue-400"
                            onClick={() => handleClick(exercise.link)}>
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
