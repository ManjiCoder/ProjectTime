import PageWrapper from '@/components/layout/PageWrapper';
import Timer from '@/components/Timer';
import {
  stopProjectTimer,
  updateProjectTime,
} from '@/redux/features/projects/projectsSlice';
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

  const stopTimer = (type: string) => {
    if (timerID) {
      clearInterval(timerID);
    }
    setTimerID(null);

    const payload: Payload = {
      projectName: slug,
      currentDate,
      cycleType: type,
    };
    dispatch(stopProjectTimer(payload));
  };

  const startTimer = (type: string, duration: number) => {
    if (timerID) {
      clearInterval(timerID);
    }
    const payload: Payload = {
      projectName: slug,
      currentDate,
      cycleType: type,
    };

    const newTimerID = setInterval(() => {
      const currentSec =
        document.getElementById(`${duration / 60}Sec`)?.innerText || '0';
      const currentMin =
        document.getElementById(`${duration / 60}Min`)?.innerText || '0';
      const totalTime = parseInt(currentMin) * 60 + parseInt(currentSec);
      // console.table(payload);
      dispatch(updateProjectTime(payload));
      if (totalTime >= duration - 1) {
        clearInterval(newTimerID);
        payload.increamentCount = true;
        dispatch(stopProjectTimer(payload));
        alert('Congrats');
      }
    }, 1000);
    setTimerID(newTimerID);
    // TODO: clearInterval with timer is over
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
