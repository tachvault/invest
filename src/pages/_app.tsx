

// Import global CSS styles
import '@/styles/globals.css'

// Import necessary types of hooks from Next.js and React Redux
import type { AppProps } from 'next/app';
import { Provider, useSelector } from "react-redux";

// Import the Redux store
import store from "@/store/store";

// Import a specific font from Google Fonts
import { Teko } from 'next/font/google';

// Import the router hook for client-side navigation
import { useRouter } from 'next/router';

// Import the useEffect hook for side effects
import { useEffect } from 'react';

// Define the main App component
export default function App({ Component, pageProps }: AppProps) {
  // Log a message to the console (for debugging purposes)
  console.log('email');

  // Get the router instance for client-side navigation
  const router = useRouter();

  // Use the useEffect hook for perform side effects
  // - Check if the user is authenticated (based on the presence of an email in local storage)
  // - If not authenticated and not on the login page, redirect to the login page
  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    // if (typeof window !== 'undefined' && !userEmail && router.pathname !== '/auth/login') {
    //   router.push('/auth/login');
    // }
  }, [router.pathname]);

  // Render the Provider component to wrap the entire application and provide access to the Redux store
  return <Provider store={store}>
      <Component {...pageProps} />
  </Provider>
}
