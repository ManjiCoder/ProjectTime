import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export default function Projects() {
  return (
    <PageWrapper>
      <h2 className='scroll-m-20 border-b border-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Projects
      </h2>

      <section>{/* All Projects will shown here */}</section>

      <Button
        variant={'outline'}
        className='h-10 w-10 p-0 fixed bottom-24 right-5'
      >
        <PlusIcon />
      </Button>
    </PageWrapper>
  );
}
