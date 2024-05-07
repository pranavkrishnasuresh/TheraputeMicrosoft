

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";
import { db } from '../app/firebase';
import { getFirestore, collection, addDoc, getDoc, setDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";

interface Comments {
    name: string;
    link: string;
    date: string;
    therapist: string;
    image: string;
}

export default function PTComments() {
    const router = useRouter();
    const [comments, setComments] = useState<Comments[]>([]);
    
    async function fetchData() {
        const q = query(collection(db, 'comments'));
        const querySnapshot = await getDocs(q);
        // Convert each DocumentData object to Slide
        const data: Comments[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
            name: data.name,
            image: data.image,
            link: data.link,
            date: data.date,
            therapist: data.therapist,
            };
        });
        setComments(data);
    }
    useEffect(() => {
        fetchData()
    }, [])

    function handleClick(link: string) {
        router.push(`/history?param1=${link}`)
    }

    return (
        <div className="max-h-[53vh] overflow-y-auto p-6 w-full rounded-xl bg-blue-600">
            <h2 className="text-white mb-6 text-2xl font-bold text-center">Therapist Comments</h2>
            {comments.map((c, index) => (
                <div key={index} className="flex items-center justify-between mb-6 p-4 rounded-xl bg-white shadow-lg">
                    <div className="flex items-center">
                        <Image src={c.image} alt="Therapist picture" height='60px' width='60px' className="rounded-full mr-15" />
                        <div className='pl-3'>
                            <h4 className="text-gray-800 font-semibold">{c.therapist}</h4>
                            <p className="text-gray-600">{c.date}</p>
                            <p className="text-gray-700">{c.name}</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-300"
                        onClick={() => handleClick(c.link)}>
                        View Comments
                    </button>
                </div>
            ))}
        </div>
    );
}
