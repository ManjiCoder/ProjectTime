import { updateProjectTime } from '@/redux/features/projects/projectsSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from './ui/button';

type TimerProps = {
  projectName: string | string[];
  name: string;
  duration: number;
};

export default function Timer({ projectName, name, duration }: TimerProps) {
  const [timerID, setTimerID] = useState<NodeJS.Timeout | null>(null);
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const type = `${duration}min`;

  const dispatch = useAppDispatch();

  const startTimer = () => {
    const payload = {
      projectName,
      cycleType: type,
      currentDate,
    };
    // console.table(payload);
    dispatch(updateProjectTime(payload));
  };
  const handlerTimer = () => {
    if (timerID) {
      clearInterval(timerID);
    }
    const newTimerID = setInterval(startTimer, 1000);
    setTimerID(newTimerID);
    setTimeout(() => {
      clearInterval(newTimerID);
    }, 4000);
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
        <span>{(0o0).toString().padStart(2, '0')}</span> :{' '}
        <span>{(0o0).toString().padStart(2, '0')}</span>
      </h2>

      <Button onClick={handlerTimer}>Start</Button>
    </div>
  );
}
