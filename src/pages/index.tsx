import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { appInfo } from '@/types';
import Link from 'next/link';

export default function Home() {
  return (
    <PageWrapper className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center md:text-balance '>
          <span className='text-primary'>{appInfo.title}</span> - Turn time into
          progress
        </h1>

        <Link href='/projects' className='mx-auto mt-7'>
          <Button variant='outline'>Go To Projects</Button>
        </Link>
      </main>
    </PageWrapper>
  );
}
