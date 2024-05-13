'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./components/Firebase";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        router.push('/signin');
      }
    });

    return () => unsubscribe();
  }, [router]);


  return (
    <main className='w-full h-screen'>
      <ToastContainer hideProgressBar={true} />
      {user ? (
        <div className="relative antialiased h-screen bg-gradient-to-br from-green-100 to-green-50">
          <div className="darkOverlay"></div>
          <div className="relative h-full select-none">
            <Image 
                src="/photo-3.png"
                alt="Image"
                layout="fill"
                style={{ objectFit: 'cover' }}
                priority={true}
            />
          </div>
        </div>
      ) : (
        <div className='h-full w-full flex justify-center items-center'>
          <div className="relative h-40 w-40 select-none z-50">
            <div className="border-spinner"></div>
            <Image 
                src="/favicon.jpg"
                alt="Image"
                layout="fill"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                priority={true}
            />
          </div>
          <style jsx>{`
            .border-spinner {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: 50px solid transparent;
              border-radius: 50%;
              animation: spin 3s linear infinite;
            }

            @keyframes spin {
              0% { border-color: #FF0000; }
              25% { border-color: #00FF00; }
              50% { border-color: #0000FF; }
              75% { border-color: #FFFF00; }
              100% { border-color: #FF00FF; }
            }
          `}</style>
        </div>
      )}
    </main>  
  );
}
