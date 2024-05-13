'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [sentMail, setSentMail] = useState(false);
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
  .then(() => {
    setLoadingBtn(false);
    setSentMail(true);
    setTimeout(() => {
      setLoadingBtn(false);
      router.push('/signin');
    }, 20000);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    setLoadingBtn(false);

    switch (errorCode) {
      case 'auth/invalid-email':
        toast.error('Invalid email address. Please check the email format.');
        break;
      case 'auth/user-not-found':
        toast.error('User not found. Please check your email address.');
        break;
      default:
        toast.error(errorMessage);
        break;
    }
  });

  };

  return (
    <motion.div 
        initial={{
          opacity: 0,
      }}
      transition={{
          duration: .5,
      }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative antialiased h-screen bg-white sm:bg-gradient-to-br sm:from-green-100 sm:to-green-50 select-none">
      <div className="darkOverlay hidden sm:block"></div>
      <div className="hidden sm:block relative h-full select-none">
        <Image 
            src="/photo-3.png"
            alt="Image"
            layout="fill"
            style={{ objectFit: 'cover' }}
            priority={true}
        />
      </div>
      <div className="overlayDiv container px-3 sm:px-6 mx-auto hidden sm:block">
        <div className="flex flex-col text-start md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="w-full md:w-4/5 lg:w-[560px] mx-auto md:mx-0 hidden sm:block">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left">
                Reset Password
              </h2>
              <form onSubmit={handleResetPassword} className="w-full">
                <div className="flex flex-col w-full my-5">
                  {!sentMail &&<p className="text-gray-500 mb-2">
                    An email with a password reset link will be sent to your registered email address.
                  </p>}
                  {sentMail && (
                    <div className="flex items-center text-green-500">
                      Password reset email sent. Please check your email including spam/junk folder.
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full my-4">
                  <label htmlFor="email" className="text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your registered email address."
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                <div className="flex flex-col w-full my-5">
                  {!loadingBtn && <button
                    type="button"
                    className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-lg text-green-100"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="font-bold text-base sm:text-xl tracking-wide">Reset Password</div>
                    </div>
                  </button>}
                  {loadingBtn && <button
                    type="submit"
                    className="w-full py-3 bg-green-600 rounded-lg text-green-100"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div role="status">
                          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>
                          <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </button>}
                </div>
                <div className="flex justify-between mt-6 px-2">
                    <Link href="/signin" className="text-center font-semibold text-green-500 pr-3">
                      Already have an account? Sign in
                    </Link>
                    <Link href="/register" className="text-center font-semibold text-green-500 pr-3">
                        Singup
                    </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*Small Screens*/}
      <div className="w-full h-full flex justify-center items-center sm:hidden z-50 overflow-y-auto">
        <div className="bg-white p-3 flex flex-col w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-left">
            Reset Password
          </h2>
          <form onSubmit={handleResetPassword} className="w-full">
            <div className="flex flex-col w-full my-5">
              {!sentMail &&<p className="text-gray-500 mb-2">
                An email with a password reset link will be sent to your registered email address.
              </p>}
              {sentMail && (
                <div className="flex items-center text-green-500">
                  Password reset email sent. Please check your email including spam/junk folder.
                </div>
              )}
            </div>
            <div className="flex flex-col w-full my-5">
              <label htmlFor="email" className="text-gray-500 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your registered email address."
                className="appearance-none border-2 border-gray-100 rounded-lg px-2 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
              />
            </div>
            <div className="flex flex-col w-full my-5">
              {!loadingBtn && <button
                type="submit"
                className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-lg text-green-100"
              >
                <div className="flex flex-row items-center justify-center">
                  <div className="font-bold text-base sm:text-xl tracking-wide">Reset Password</div>
                </div>
              </button>}
              {loadingBtn && <button
                type="button"
                className="w-full py-3 bg-green-600 rounded-lg text-green-100"
              >
                <div className="flex flex-row items-center justify-center">
                  <div role="status">
                      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </button>}
            </div>
            <div className="flex justify-between mt-6 px-2">
                <Link href="/signin" className="text-center font-semibold text-green-500 pr-3">
                  Already have an account? Sign in
                </Link>
                <Link href="/register" className="text-center font-semibold text-green-500 pr-3">
                    Singup
                </Link>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
