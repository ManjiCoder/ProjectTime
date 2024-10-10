import PageWrapper from '@/components/layout/PageWrapper';
import Timer from '@/components/Timer';
import { useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

export default function Project() {
  const router = useRouter();
  const slug = (router.query.slug as string | undefined) || '';
  const currentDate = format(new Date(), 'dd-MM-yyyy');

  // const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects);

  // const [timerID, setTimerID] = useState<NodeJS.Timeout | null>(null);
  const project = {};
  console.log(projects[slug].hasOwnProperty(currentDate));

  return (
    <PageWrapper className=''>
      <h1 className='scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        <span className='text-primary'>{slug}</span>
      </h1>
      {/* {JSON.stringify(projects)} */}
      {/* All Timers */}

      <section className='grid items-center justify-evenly sm:grid-cols-2 md:grid-cols-3 gap-5 pb-16'>
        {/* All Projects will shown here */}

        {project &&
          Object.values(project).map(({ name, duration, isRunning, sec }) => {
            const type = `${duration / 60}min`;
            return (
              <Timer
                key={duration}
                name={name}
                duration={duration}
                isRunning={isRunning}
              />
            );
          })}
      </section>
    </PageWrapper>
  );
}
