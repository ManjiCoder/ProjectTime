import { ChartNoAxesCombined, Cog, House } from 'lucide-react';
import Link from 'next/link';

const footerOption = [
  {
    name: 'Home',
    icon: <House />,
    href: '/',
  },
  {
    name: 'Analytics',
    icon: <ChartNoAxesCombined />,
    href: '/analytics',
  },
  {
    name: 'Settings',
    icon: <Cog />,
    href: '/settings',
  },
];

export default function Footer() {
  return (
    <footer className=''>
      <ol className='fixed bottom-0 w-full border-t-[1px] border-slate-600 flex justify-evenly py-3 gap-3'>
        {footerOption.map(({ name, href, icon }) => (
          <Link key={href + name} href={href}>
            <li className='grid gap-y-1 place-items-center'>
              <span>{icon}</span>
              <span className='text-xs'>{name}</span>
            </li>
          </Link>
        ))}
      </ol>
    </footer>
  );
}
