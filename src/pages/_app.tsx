import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider, useSelector } from "react-redux";
import store from "@/store/store";
import { Teko } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  console.log('email');
  const router = useRouter();
  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    // if (typeof window !== 'undefined' && !userEmail && router.pathname !== '/auth/login') {
    //   router.push('/auth/login');
    // }
  }, [router.pathname]);
  return <Provider store={store}>
      <Component {...pageProps} />
  </Provider>
}
