// pages/_app.tsx

import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { useState,useEffect } from 'react';
// Prevent FontAwesome from adding its CSS since we did it manually above
config.autoAddCss = false;

import '@/lib/fontawsome'; // Import the FontAwesome library configuration

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
