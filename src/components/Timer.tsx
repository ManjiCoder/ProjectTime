import {
  ProjectData,
  stopProjectTimer,
  updateProjectTime,
} from '@/redux/features/projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useRef } from 'react';
import { Button } from './ui/button';

type TimerProps = {
  projectName: string | string[];
  name: string;
  duration: number;
};

export default function Timer({ projectName, name, duration }: TimerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerID = useRef();
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const type = `${duration}min`;
  const projects = useAppSelector((state) => state.projects);
  const currentProject: ProjectData = projects[projectName];

  const { sec, isRunning } = (() => {
    {
      try {
        return {
          sec: currentProject[currentDate].cycles[type].timeSpent.sec,
          isRunning: currentProject[currentDate].cycles[type].isRunning,
        };
      } catch (error) {
        console.log(error);
        return { sec: 0, isRunning: false };
      }
    }
  })();

  const dispatch = useAppDispatch();

  const stopTimer = () => {
    clearInterval(timerID.current);
    const payload = {
      projectName,
      currentDate,
      cycleType: type,
    };
    dispatch(stopProjectTimer(payload));
  };

  const startTimer = () => {
    const payload = {
      projectName,
      currentDate,
      cycleType: type,
    };
    dispatch(updateProjectTime(payload));
    // TODO: clearInterval with timer is over
  };

  const handlerTimer = () => {
    if (timerID.current) {
      clearInterval(timerID.current);
    }
    const newTimerID = setInterval(startTimer, 1000);
    timerID.current = newTimerID;
  };

  return (
    <div
      key={duration}
      className='relative mx-auto grid w-full max-w-72 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
    >
      <h2 className='scroll-m-20 capitalize text-xl font-semibold tracking-tight line-clamp-1'>
        {name} - {duration} min
      </h2>
      <h2 className='scroll-m-20 capitalize text-3xl font-semibold tracking-tight line-clamp-1'>
        <span>
          {Math.round(Math.floor(sec / 60))
            .toString()
            .padStart(2, '0')}
        </span>{' '}
        : <span>{(sec % 60).toString().padStart(2, '0')}</span>
      </h2>

      {isRunning ? (
        <Button variant={'secondary'} onClick={stopTimer}>
          Pause
        </Button>
      ) : (
        <Button onClick={handlerTimer}>Start</Button>
      )}
    </div>
  );
}
