import { Button } from './ui/button';

type TimerProps = {
  name: string;
  duration: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  sec: number;
};

export default function Timer({
  name,
  duration,
  isRunning,
  startTimer,
  stopTimer,
  sec,
}: TimerProps) {
  return (
    <div
      key={duration}
      className='relative mx-auto grid w-full max-w-72 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
    >
      <h2 className='scroll-m-20 capitalize text-xl font-semibold tracking-tight line-clamp-1'>
        {name} - {duration / 60} min
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
        <Button onClick={startTimer}>Start</Button>
      )}
    </div>
  );
}
