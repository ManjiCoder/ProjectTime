import AddProject from '@/components/AddProject';
import PageWrapper from '@/components/layout/PageWrapper';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppSelector } from '@/redux/hooks/hooks';
import Link from 'next/link';

export default function Projects() {
  const projects = useAppSelector((state) => state.projects);
  console.table(projects);
  return (
    <PageWrapper className=''>
      <h2 className='scroll-m-20 border-b border-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Projects
      </h2>

      <section className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center'>
        {/* All Projects will shown here */}

        {Object.keys(projects).length !== 0 &&
          Object.keys(projects).map((key) => {
            return (
              <Link
                href={`/projects/${key}`}
                key={key}
                className='grid w-full max-w-60 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
              >
                <Avatar>
                  {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                  <AvatarFallback className='flex place-items-center p-5 text-3xl font-semibold tracking-tight'>
                    {key.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                  {key}
                </h4>
              </Link>
            );
          })}
      </section>

      <AddProject />
    </PageWrapper>
  );
}
