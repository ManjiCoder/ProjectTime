import { useRef } from 'react';
import { clearInterval } from 'timers';
import { Button } from './ui/button';

type TimerProps = {
  name: string;
  duration: number;
};

export default function Timer({ name, duration }: TimerProps) {
  const minRef = useRef<HTMLSpanElement>(null);
  const secRef = useRef<HTMLSpanElement>(null);
  const timer = useRef(false);

  const handlerTimer = () => {
    timer.current = true;
    const minsElemt = minRef.current;
    const secsElemt = minRef.current;
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
      }, 1000);
      if (min >= duration) {
        clearInterval(timerId);
        timer.current = false;
      }
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

      <Button onClick={handlerTimer}>Start</Button>
      {/* <Button variant={'outline'}>Pause</Button> */}
      {/* Action Btn */}
    </div>
  );
}
