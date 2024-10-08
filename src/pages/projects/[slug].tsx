import PageWrapper from '@/components/layout/PageWrapper';
import Timer from '@/components/Timer';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from 'next/router';

const cycles = [
  { name: 'work', duration: 25 },
  { name: 'intensive Focus', duration: 45 },
  { name: 'deep Work', duration: 60 },
];

export default function Project() {
  const router = useRouter();
  const slug = (router.query.slug as string | undefined) || '';
  const projects = useAppSelector((state) => state.projects);
  console.log(projects[slug]);

  return (
    <PageWrapper className=''>
      <h1 className='scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        <span className='text-primary'>{slug}</span>
      </h1>
      {/* {JSON.stringify(projects)} */}
      {/* All Timers */}

      <section className='grid items-center justify-evenly sm:grid-cols-2 md:grid-cols-3 gap-5 pb-16'>
        {/* All Projects will shown here */}

        {cycles.map(({ name, duration }) => {
          return (
            <Timer
              projectName={slug}
              key={duration}
              name={name}
              duration={duration}
            />
          );
        })}
      </section>
    </PageWrapper>
  );
}
