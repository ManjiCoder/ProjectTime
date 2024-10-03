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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon } from 'lucide-react';

export default function AddProject() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={'outline'}
          className='h-10 w-10 p-0 fixed bottom-24 right-5'
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-sm:w-11/12 max-sm:rounded-lg'>
        <DialogHeader>
          {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
          <DialogDescription>
            <Card className='bg-transparent border-none'>
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>
                  Create your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className='grid w-full items-center gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='name' className='max-sm:text-left'>
                        Project Name
                      </Label>
                      <Input id='name' placeholder='Name of your project' />
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
                </form>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button variant='outline'>Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
