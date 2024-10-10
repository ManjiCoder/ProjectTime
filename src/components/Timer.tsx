import {
  Payload,
  stopProjectTimer,
  updateProjectTimer,
} from '@/redux/features/projects/projectsSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useState } from 'react';
import { Button } from './ui/button';

type TimerProps = {
  name: string;
  projectName: string;
  currentDate: string;
  type: string;
  duration: number;
  isRunning: boolean;
  sec: number;
};

export default function Timer({
  name,
  projectName,
  currentDate,
  type,
  duration,
  isRunning,
  sec,
}: TimerProps) {
  const [timerID, setTimerID] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();

  const stopTimer = () => {
    if (timerID) {
      const payload: Payload = {
        projectName: name,
        currentDate,
        cycleType: type,
      };
      clearInterval(timerID);
      dispatch(stopProjectTimer(payload));
    }
  };

  const startTimer = () => {
    if (timerID) {
      clearInterval(timerID);
    }
    let currentSec = sec;
    const newTimerID = setInterval(() => {
      currentSec += 1;
      const payload: Payload = {
        projectName,
        currentDate,
        cycleType: type,
      };
      console.table({ ...payload, sec: currentSec });
      dispatch(updateProjectTimer(payload));

      if (currentSec >= duration) {
        const payload: Payload = {
          projectName,
          currentDate,
          cycleType: type,
        };
        clearInterval(newTimerID);
        dispatch(stopProjectTimer(payload));
        alert('Success');
      }
    }, 1000);

    setTimerID(newTimerID);
  };
  return (
    <div
      key={duration}
      className='relative mx-auto grid w-full max-w-72 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
    >
      <h2 className='scroll-m-20 capitalize text-xl font-semibold tracking-tight line-clamp-1'>
        {name} - {duration / 60} min
      </h2>
      <h2 className='scroll-m-20 capitalize text-3xl font-semibold tracking-tight line-clamp-1'>
        <span id={`${duration / 60}Min`}>
          {Math.round(Math.floor(sec / 60))
            .toString()
            .padStart(2, '0')}
        </span>{' '}
        :{' '}
        <span id={`${duration / 60}Sec`}>
          {(sec % 60).toString().padStart(2, '0')}
        </span>
      </h2>

      {isRunning ? (
        <Button variant={'secondary'} onClick={stopTimer}>
          Pause
        </Button>
      ) : (
        <Button onClick={startTimer}>Start</Button>
      )}
    </div>
  );
}
