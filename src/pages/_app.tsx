import DynamicHead from '@/components/DynamicHead';
import Footer from '@/components/layout/Footer';
import { ThemeBtn } from '@/components/layout/ThemeBtn';
import { ThemeProvider } from '@/components/ThemeProvider';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <div
          className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
        >
          <ThemeBtn />
          <Component {...pageProps} />
          <DynamicHead />
          <Footer />
        </div>
      </Provider>
    </ThemeProvider>
  );
}
