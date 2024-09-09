"use client"

import { useEffect, useState } from 'react';
import { query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";
import db from '../../../utils/firestore';
import { notFound } from "next/navigation";
import Loading from "../../loading";
import SessionDetails from '@/app/ui/components/SessionDetails';
import Link from 'next/link';

const SingleSession = ({ params }) => {
    const [session, setSession] = useState(null);  // Use null to handle session not found
    const [loading, setLoading] = useState(true);  // Track loading state

    const refresh = async () => {
        const sessionsRef = doc(db, "jeopardy-sessions", session.id)
        const querySnapshot = await getDoc(sessionsRef);

        console.log('query', querySnapshot);

        if (querySnapshot.exists()) {
            console.log("Document data:", querySnapshot.data());
            setSession({...querySnapshot.data(), id: querySnapshot.id})
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

    }

    useEffect(() => {
        const getTicket = async () => {
            const id = params.id;

            try {
                const sessionsRef = collection(db, "jeopardy-sessions");

                // Create a query against the collection based on the session code.
                const q = query(sessionsRef, where("code", "==", id));

                // Execute the query and get the documents
                const querySnapshot = await getDocs(q);

                // Check if session exists and update the state
                const sessionsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (sessionsData.length > 0) {
                    setSession(sessionsData[0]);  // Set session data
                } else {
                    notFound();  // Redirect to 404 page if session is not found
                }
                setLoading(false);  // Stop loading
            } catch (error) {
                console.error('Error fetching session data:', error);
                setLoading(false);  // Stop loading even if there's an error
                notFound();  // Redirect to 404 page if there's an error
            }
        };

        getTicket();
    }, [params.id]);  // Ensure the effect runs when the "id" param changes

    if (loading) {
        return <Loading />;  // Show a loading spinner while fetching data
    }

    return (
        <main className="font-sans">
            {session ?
                <SessionDetails id={params.id} session={session} refresh={() => refresh()} /> :
                 <main className="text-center h-screen text-white bg-black flex w-full flex-col items-center justify-center">
                    <h2 className="text-3xl">We Hit a Brick Wall.</h2>
                    <p>We could not find the game you were looking for.</p>
                    <p>Go back to <Link href="/">home</Link>.</p>
                </main>
                }
        </main>
    );
};

export default SingleSession;
