import AddProject from '@/components/AddProject';
import PageWrapper from '@/components/layout/PageWrapper';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppSelector } from '@/redux/hooks/hooks';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

export default function Projects() {
  const projects = useAppSelector((state) => state.projects);
  console.log(projects);
  return (
    <PageWrapper className=''>
      <h2 className='scroll-m-20 border-b border-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Projects
      </h2>

      <section className='grid min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center pb-16'>
        {/* All Projects will shown here */}

        {Object.keys(projects).length !== 0 &&
          Object.keys(projects).map((key) => {
            return (
              <Link
                href={`/projects/${key}`}
                key={key}
                className='relative grid w-full max-w-60 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
              >
                <Avatar>
                  {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                  <AvatarFallback className='flex place-items-center p-5 text-3xl font-semibold tracking-tight'>
                    {key.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h4 className='scroll-m-20 text-xl font-semibold tracking-tight line-clamp-1'>
                  {key}
                </h4>

                {/* Action Btn */}
                <Popover>
                  <PopoverTrigger className='absolute right-0 top-2'>
                    <EllipsisVertical />
                  </PopoverTrigger>
                  <PopoverContent>
                    Place content for the popover here.
                  </PopoverContent>
                </Popover>
              </Link>
            );
          })}
      </section>

      <AddProject />
    </PageWrapper>
  );
}
