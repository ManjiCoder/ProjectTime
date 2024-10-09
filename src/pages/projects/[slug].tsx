import PageWrapper from '@/components/layout/PageWrapper';
import Timer from '@/components/Timer';
import {
  setProjectState,
  stopProjectTimer,
  updateProjectTime,
} from '@/redux/features/projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';

export default function Project() {
  const router = useRouter();
  const slug = (router.query.slug as string | undefined) || '';
  const projects = useAppSelector((state) => state.projects);
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const projectInfo = projects[slug];

  useLayoutEffect(() => {
    const payload = {
      name: slug,
      date: currentDate,
    };
    dispatch(setProjectState(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [timerID, setTimerID] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  const stopTimer = (type: string) => {
    if (timerID) {
      clearInterval(timerID);
    }
    setTimerID(null);

    const payload = {
      projectInfo,
      currentDate,
      cycleType: type,
    };
    dispatch(stopProjectTimer(payload));
  };

  const startTimer = (type: string, duration: number, sec: number) => {
    if (timerID) {
      clearInterval(timerID);
    }
    const payload = {
      projectName: slug,
      currentDate,
      cycleType: type,
    };
    const newTimerID = setInterval(() => {
      // console.table(payload);
      console.time(type, duration, sec);
      dispatch(updateProjectTime(payload));
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

        {projectInfo &&
          projectInfo[currentDate] &&
          Object.values(projectInfo[currentDate].cycles).map(
            ({ name, duration }) => {
              const type = `${duration / 60}min`;
              const sec =
                projectInfo[currentDate]?.cycles[type]?.timeSpent?.sec || 0;
              const isRunning =
                projectInfo[currentDate]?.cycles[type]?.isRunning || false;

              return (
                <Timer
                  key={duration}
                  name={name}
                  duration={duration}
                  isRunning={isRunning}
                  startTimer={() => startTimer(type, duration, sec)}
                  stopTimer={() => stopTimer(type)}
                  sec={sec}
                />
              );
            }
          )}
      </section>
    </PageWrapper>
  );
}
