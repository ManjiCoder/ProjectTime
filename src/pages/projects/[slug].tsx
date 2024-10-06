import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from 'next/router';

const cycles = [
  { name: 'work', duration: 25 },
  { name: 'intensive Focus', duration: 45 },
  { name: 'deep Work', duration: 60 },
];

export default function Project() {
  const router = useRouter();
  const { slug } = router.query || {};
  const projects = useAppSelector((state) => state.projects);
  console.log(projects);

  return (
    <PageWrapper className=''>
      <h1 className='scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        <span className='text-primary'>{slug}</span>
      </h1>
      {/* {JSON.stringify(projects)} */}
      {/* All Timers */}

      <section className='flex justify-center items-center flex-wrap gap-5 pb-16'>
        {/* All Projects will shown here */}

        {cycles.length !== 0 &&
          cycles.map(({ name, duration }) => {
            return (
              <div
                key={name}
                className='relative grid w-full max-w-60 md:min-w-36 p-5 gap-5 place-items-center border border-primary/50 shadow shadow-primary/60 rounded-xl'
              >
                <h2 className='scroll-m-20 capitalize text-xl font-semibold tracking-tight line-clamp-1'>
                  {name} - {duration}
                </h2>

                <Button>Start</Button>
                {/* <Button variant={'outline'}>Pause</Button> */}
                {/* Action Btn */}
              </div>
            );
          })}
      </section>
    </PageWrapper>
  );
}
