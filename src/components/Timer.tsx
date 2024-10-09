import { Button } from './ui/button';

type TimerProps = {
  projectName: string | string[];
  name: string;
  duration: number;
};

export default function Timer({ projectName, name, duration }: TimerProps) {
  const type = `${duration}min`;
  const handlerTimer = () => {
    console.table({ projectName, name, duration, type });
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
