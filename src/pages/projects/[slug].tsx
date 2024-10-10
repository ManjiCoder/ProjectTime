import PageWrapper from '@/components/layout/PageWrapper';
import Timer from '@/components/Timer';
import { TimerKeys, updateTimer } from '@/redux/features/Timer/timerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Payload {
  projectName: string;
  currentDate: string;
  cycleType: string;
  increamentCount?: boolean;
}

export default function Project() {
  const router = useRouter();
  const slug = (router.query.slug as string | undefined) || '';
  const projects = useAppSelector((state) => state.projects);
  const timer = useAppSelector((state) => state.timer);
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const projectName = projects[slug];

  const [timerID, setTimerID] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  const stopTimer = (type: TimerKeys) => {
    if (timerID) {
      clearInterval(timerID);
    }
    setTimerID(null);
    dispatch(updateTimer({ key: type, type: 'stop' }));
  };

  const startTimer = (type: TimerKeys, duration: number) => {
    if (timerID) {
      clearInterval(timerID);
    }

    const newTimerID = setInterval(() => {
      // console.table(payload);
      dispatch(updateTimer({ key: type, type: 'increment' }));
    }, 1000);
    setTimerID(newTimerID);

    // TODO: clearInterval with timer is over
    setTimeout(() => {
      dispatch(updateTimer({ key: type, type: 'stop' }));
    }, 5000);
  };

  return (
    <PageWrapper className=''>
      <h1 className='scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        <span className='text-primary'>{slug}</span>
      </h1>
      {/* {JSON.stringify(projects)} */}
      {/* All Timers */}

      <section className='grid items-center justify-evenly sm:grid-cols-2 md:grid-cols-3 gap-5 pb-16'>
        {/* All Projects will shown here */}

        {Object.values(timer).map(({ name, duration, isRunning, sec }) => {
          const type = `${duration / 60}min`;
          return (
            <Timer
              key={duration}
              name={name}
              duration={duration}
              isRunning={isRunning}
              startTimer={() => startTimer(type, duration)}
              stopTimer={() => stopTimer(type)}
              sec={sec}
            />
          );
        })}
      </section>
    </PageWrapper>
  );
}
