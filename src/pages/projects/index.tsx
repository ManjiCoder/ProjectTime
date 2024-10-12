import AddProject from '@/components/AddProject';
import PageWrapper from '@/components/layout/PageWrapper';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { setProjectState } from '@/redux/features/projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';

import { useRouter } from 'next/router';

export default function Projects() {
  const projects = useAppSelector((state) => state.projects);
  const router = useRouter();
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const dispatch = useAppDispatch();

  const handleRoute = (key: string) => {
    dispatch(setProjectState({ projectName: key, currentDate }));
    setTimeout(() => {
      router.push(`/projects/${key}`);
    }, 100);
  };
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
              <button
                onClick={() => handleRoute(key)}
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
              </button>
            );
          })}
      </section>

      <AddProject />
    </PageWrapper>
  );
}
