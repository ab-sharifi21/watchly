import Link from 'next/link';
import { Logo } from './Logo';
import { TfiEmail } from 'react-icons/tfi';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 items-center justify-around px-4 py-8 md:flex-row text-slate-400">
      <div className="flex flex-col gap-2 items-center md:items-start order-3">
        <Logo width={35} height={35} classes="text-3xl text-white" />
        <p className="max-w-[22rem] text-center md:text-left">
          Built to expand my web development skills and to offer you a seamless
          movie experience. I hope you enjoy it!
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-white">Contacts</h3>
        <ul className='flex gap-3'>
          <li>
            <Link href="mailto:ab.sharifi19@gmail.com" className='hover:text-primary-color'>
              <TfiEmail className='h-7 w-7 hover:scale-110 duration-300' />
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://github.com/ab-sharifi21" className='hover:text-primary-color'>
              <SiGithub className='h-7 w-7 hover:scale-110 duration-300' />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://linkedin.com/in/abdullahsharifi" className='hover:text-primary-color'
            >
              <FaLinkedin className='h-7 w-7 hover:scale-110 duration-300' />
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
      <h3 className="text-xl font-semibold text-white">Technologies</h3>
      <ul className='text-center md:text-left'>
        <li>TypeScript</li>
        <li>React.js</li>
        <li>Next.js</li>
        <li>TailwindCSS</li>
        <li>TMDB</li>
      </ul>
      </div>
    </footer>
  );
};
