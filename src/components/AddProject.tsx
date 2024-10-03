import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addProject } from '@/redux/features/projects/projectsSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { PlusIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function AddProject() {
  const [isOpen, setIsOpen] = useState(false);
  // const [projects, setProjects] = useState<string[] | never>([]);
  const [projectName, setProjectName] = useState('');
  const closeModal = () => setIsOpen(false);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(addProject([projectName, { name: projectName, value: 30 }]));
      setProjectName('');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        variant={'outline'}
        className='h-10 w-10 p-0 fixed bottom-24 right-5'
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger hidden></DialogTrigger>
        <DialogContent className='max-sm:w-11/12 max-sm:rounded-lg'>
          <DialogHeader>
            <DialogTitle hidden>Create project</DialogTitle>
            <DialogDescription>
              <Card className='bg-transparent border-none'>
                <CardHeader>
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>
                    Create your new project in one-click.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <div className='grid w-full items-center gap-4'>
                      <div className='flex flex-col space-y-1.5'>
                        <Label htmlFor='name' className='max-sm:text-left'>
                          Project Name
                        </Label>
                        <Input
                          id='name'
                          placeholder='Name of your project'
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </div>
                      {/* <div className='flex flex-col space-y-1.5'>
      <Label htmlFor='framework'>Framework</Label>
      <Select>
        <SelectTrigger id='framework'>
          <SelectValue placeholder='Select' />
        </SelectTrigger>
        <SelectContent position='popper'>
          <SelectItem value='next'>Next.js</SelectItem>
          <SelectItem value='sveltekit'>SvelteKit</SelectItem>
          <SelectItem value='astro'>Astro</SelectItem>
          <SelectItem value='nuxt'>Nuxt.js</SelectItem>
        </SelectContent>
      </Select>
    </div> */}
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-between'>
                    <Button variant='outline' onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type='submit'>Submit</Button>
                  </CardFooter>
                </form>
              </Card>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
