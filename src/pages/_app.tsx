import DynamicHead from '@/components/DynamicHead';
import Footer from '@/components/layout/Footer';
import { ThemeBtn } from '@/components/layout/ThemeBtn';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ThemeBtn />
      <Component {...pageProps} />
      <DynamicHead />
      <Footer />
    </ThemeProvider>
  );
}
