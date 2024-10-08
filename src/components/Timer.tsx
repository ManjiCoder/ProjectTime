import { updateProjectTime } from '@/redux/features/projects/projectsSlice';
import {
  setActiveName,
  setIsActive,
  setTimerId,
  updateTimer,
} from '@/redux/features/Timer/timerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { Button } from './ui/button';

type TimerProps = {
  projectName: string | string[];
  name: string;
  duration: number;
};

export default function Timer({ projectName, name, duration }: TimerProps) {
  const { min, sec, isActive, timerId, activeType } = useAppSelector(
    (state) => state.timer
  );
  const isCurrentActive = duration === activeType;
  const dispatch = useAppDispatch();

  const startTimer = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    dispatch(updateTimer());

    // For redux
    const payload = {
      key: projectName,
      value: {
        totalTime: min * 60 + sec,
        date: format(new Date(), 'dd-MM-yyyy'),
        cycleType: `${duration}min`,
        duration,
      },
    };

    dispatch(updateProjectTime(payload));
    if (min >= duration) {
      // if (sec >= 3) {
      dispatch(setIsActive(false));
      const payload = {
        key: projectName,
        value: {
          totalTime: min * 60 + sec,
          date: format(new Date(), 'dd-MM-yyyy'),
          cycleType: `${duration}min`,
          duration,
          count: 1,
        },
      };
      dispatch(updateProjectTime(payload));
    }
  };

  const handlerTimer = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    dispatch(setIsActive(true));
    dispatch(setActiveName(duration));
    const newTimerId = setInterval(startTimer, 1000);
    dispatch(setTimerId(newTimerId));
  };

  useEffect(() => {
    if (isActive) {
      const newTimerId = setInterval(startTimer, 1000);
      dispatch(setTimerId(newTimerId));
      dispatch(setActiveName(duration));
      return () => {
        clearInterval(newTimerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newMin = isCurrentActive ? min : 0o0;
  const newSec = isCurrentActive ? sec : 0o0;
  return (
    <div
      key={duration}
      className='relative mx-auto grid w-full max-w-72 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
    >
      <h2 className='scroll-m-20 capitalize text-xl font-semibold tracking-tight line-clamp-1'>
        {name} - {duration} min
      </h2>
      <h2 className='scroll-m-20 capitalize text-3xl font-semibold tracking-tight line-clamp-1'>
        <span>{newMin.toString().padStart(2, '0')}</span> :{' '}
        <span>{newSec.toString().padStart(2, '0')}</span>
      </h2>

      {isActive && isCurrentActive ? (
        <Button
          variant={'secondary'}
          onClick={() => {
            if (timerId) {
              clearInterval(timerId);
              dispatch(setIsActive(false));
            }
          }}
        >
          Pause
        </Button>
      ) : (
        <Button onClick={handlerTimer}>Start</Button>
      )}
    </div>
  );
}
