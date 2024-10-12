import PageWrapper from '@/components/layout/PageWrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { projectState } from '@/redux/features/projects/projectsSlice';
import { useAppSelector } from '@/redux/hooks/hooks';
import { appInfo } from '@/types';
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  secondsToMinutes,
  startOfWeek,
} from 'date-fns';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
export const description = 'A bar chart with a label';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateWeeklyData = (data: projectState, today: any) => {
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const days = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  });

  const payload: { day: string; timeSpend: number }[] = [];

  days.map((date) => {
    const day = format(date, 'EEEE');
    date = format(date, 'dd-MM-yyyy');
    const newPayload = {
      day,
      date,
      timeSpend: 0,
    };
    Object.keys(data).map((projectKey) => {
      const project = data[projectKey][date];
      if (project) {
        let time = 0;
        Object.keys(project.cycles).map((cyclesKey) => {
          time +=
            project.cycles[cyclesKey].duration *
              project.cycles[cyclesKey].count +
            project.cycles[cyclesKey].sec;
        });
        newPayload.timeSpend = secondsToMinutes(time);
      }
    });
    payload.push(newPayload);
  });
  return payload;
};
export default function Analytics() {
  const today = format(new Date(), 'dd-MMM-yy');

  const projects = useAppSelector((state) => state.projects);
  const chartData = useMemo(
    () => generateWeeklyData(projects, today),
    [projects, today]
  );
  console.table(chartData);
  const chartConfig = {
    timeSpend: {
      label: 'TimeSpend',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;
  return (
    <PageWrapper>
      <h2 className='scroll-m-20 border-b border-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Analytics
      </h2>

      {/* Charts For Weekly */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly {appInfo.title} Data</CardTitle>
          <CardDescription>{today}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='day'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey='timeSpend' fill='var(--color-timeSpend)' radius={8}>
                <LabelList
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                  values='flsk'
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          {/* <div className='flex gap-2 font-medium leading-none'>
            Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            Showing total visitors for the last 6 months
          </div> */}
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
