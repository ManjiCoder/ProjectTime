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

  const dispatch = useAppDispatch();

  const handleStop = () => {};
  const handlerTimer = () => {
    setIsActive(true);
    const minsElemt = minRef.current;
    const secsElemt = secRef.current;
    const isMin = minsElemt && minsElemt.innerText;
    const isSec = secsElemt && secsElemt.innerText;
    if (isMin && isSec) {
      let sec = 0;
      let min = 0;
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
            sec,
            totalTime: min,
            date: format(new Date(), 'dd-MM-yyyy'),
            cycleType: `${duration}min`,
          },
        };
        dispatch(startTimer(payload));
        if (min >= duration) {
          console.table({ timerId, sec });
          clearInterval(timerId);
          setIsActive(false);
        }
      }, 1000);
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

      {!isActive ? (
        <Button onClick={handlerTimer}>Start</Button>
      ) : (
        <Button variant={'secondary'} onClick={handleStop}>
          Stop
        </Button>
      )}
      {/* <Button variant={'outline'}>Pause</Button> */}
      {/* Action Btn */}
    </div>
  );
}
