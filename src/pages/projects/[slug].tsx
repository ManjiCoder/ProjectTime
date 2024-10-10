import PageWrapper from '@/components/layout/PageWrapper';
import Timer from '@/components/Timer';
import { useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function Project() {
  const router = useRouter();
  const slug = (router.query.slug as string | undefined) || '';
  const currentDate = format(new Date(), 'dd-MM-yyyy');

  const projects = useAppSelector((state) => state.projects);
  const isProject = projects[slug];
  const project = useMemo(() => {
    if (isProject) {
      try {
        return projects[slug][currentDate].cycles;
      } catch (error) {
        console.log(error);
        return {};
      }
    }
  }, [currentDate, isProject, projects, slug]);
  // console.log({ isProject, project });

  return (
    <PageWrapper className=''>
      <h1 className='scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        <span className='text-primary'>{slug}</span>
      </h1>
      {/* {JSON.stringify(projects)} */}
      {/* All Timers */}

      <section className='grid items-center justify-evenly sm:grid-cols-2 md:grid-cols-3 gap-5 pb-16'>
        {/* All Projects will shown here */}

        {isProject &&
          project &&
          Object.values(project).map(({ name, duration, isRunning, sec }) => {
            const type = `${duration / 60}min`;
            return (
              <Timer
                projectName={slug}
                currentDate={currentDate}
                key={duration}
                name={name}
                type={type}
                duration={duration}
                isRunning={isRunning}
                sec={sec}
              />
            );
          })}
      </section>
    </PageWrapper>
  );
}
