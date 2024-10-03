import AddProject from '@/components/AddProject';
import PageWrapper from '@/components/layout/PageWrapper';
import { useAppSelector } from '@/redux/hooks/hooks';

export default function Projects() {
  const projects = useAppSelector((state) => state.projects);
  console.table(projects);
  return (
    <PageWrapper>
      <h2 className='scroll-m-20 border-b border-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Projects
      </h2>

      <section>{/* All Projects will shown here */}</section>

      <AddProject />
    </PageWrapper>
  );
}
