import { ReactNode } from 'react';

type PageWrapperProps = {
  children: ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      {children}
    </div>
  );
}
