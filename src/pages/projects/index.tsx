import AddProject from '@/components/AddProject';
import PageWrapper from '@/components/layout/PageWrapper';

export default function Projects() {
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
