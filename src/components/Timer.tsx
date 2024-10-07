import { updateProjectTime } from '@/redux/features/projects/projectsSlice';
import { setIsActive, updateTimer } from '@/redux/features/Timer/timerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

type TimerProps = {
  projectName: string | string[];
  name: string;
  duration: number;
};

export default function Timer({ projectName, name, duration }: TimerProps) {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const { min, sec, isActive } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const startTimer = () => {
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
    if (min >= duration && timerId) {
      // if (sec >= 3) {
      clearInterval(timerId);
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
    dispatch(setIsActive(true));
    const timerId = setInterval(startTimer, 1000);
    setTimerId(timerId);
  };

  useEffect(() => {
    if (isActive) {
      const timerId = setInterval(startTimer, 1000);
      setTimerId(timerId);
      return () => {
        clearInterval(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      key={name}
      className='relative mx-auto grid w-full max-w-72 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
    >
      <h2 className='scroll-m-20 capitalize text-xl font-semibold tracking-tight line-clamp-1'>
        {name} - {duration} min
      </h2>
      <h2 className='scroll-m-20 capitalize text-3xl font-semibold tracking-tight line-clamp-1'>
        <span>{min.toString().padStart(2, '0')}</span> :{' '}
        <span>{sec.toString().padStart(2, '0')}</span>
      </h2>

      {isActive ? (
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
