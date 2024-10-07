import { startTimer } from '@/redux/features/projects/projectsSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import { Button } from './ui/button';

type TimerProps = {
  projectName: string | string[];
  name: string;
  duration: number;
};

export default function Timer({ projectName, name, duration }: TimerProps) {
  const minRef = useRef<HTMLSpanElement>(null);
  const secRef = useRef<HTMLSpanElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  const handlerTimer = () => {
    setIsActive(true);
    const minsElemt = minRef.current;
    const secsElemt = secRef.current;
    const isMin = minsElemt && minsElemt.innerText;
    const isSec = secsElemt && secsElemt.innerText;
    if (isMin && isSec) {
      let sec = parseInt(secsElemt.innerText);
      let min = parseInt(minsElemt.innerText);
      const timerId = setInterval(() => {
        sec += 1;
        if (sec === 60) {
          min += 1;
          minsElemt.innerText = min.toString().padStart(2, '0');
          sec = 0;
        }
        secsElemt.innerText = sec.toString().padStart(2, '0');

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
        dispatch(startTimer(payload));
        if (min >= duration) {
          clearInterval(timerId);
          setIsActive(false);
        }
      }, 1000);
      setTimerId(timerId);
    }
  };

  return (
    <div
      key={name}
      className='relative mx-auto grid w-full max-w-72 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
    >
      <h2 className='scroll-m-20 capitalize text-xl font-semibold tracking-tight line-clamp-1'>
        {name} - {duration} min
      </h2>
      <h2 className='scroll-m-20 capitalize text-3xl font-semibold tracking-tight line-clamp-1'>
        <span ref={minRef}>{(0o0).toString().padStart(2, '0')}</span> :{' '}
        <span ref={secRef}>{(0o0).toString().padStart(2, '0')}</span>
      </h2>

      {isActive ? (
        <Button
          variant={'secondary'}
          onClick={() => {
            if (timerId) {
              clearInterval(timerId);
              setIsActive(false);
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
