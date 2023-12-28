
import { useState, useEffect } from "react";
import { firebaseCloudMessaging } from "../components/firebase/firebase.js";

import '../styles/globals.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toastify.css';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  if (mounted) {
    firebaseCloudMessaging.onMessage();
  }

  useEffect(() => {
    firebaseCloudMessaging.init();
    const setToken = async () => {
      const token = await firebaseCloudMessaging.tokenInlocalforage();
      if (token) {
        setMounted(true);
      }
    };
    const result = setToken();
    console.log("result", result);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer 
        position="top-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  )
}

export default MyApp
