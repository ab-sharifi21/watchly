import Link from 'next/link';
import { Logo } from '../../components/Logo';
import { TfiEmail } from 'react-icons/tfi';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';
import { titleFont } from '@/lib/fonts';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/5 bg-gradient-to-b from-transparent to-black/20">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo width={40} height={40} classes="text-4xl text-white mb-4" />
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Built to expand my web development skills and to offer you a
              seamless movie experience. Discover, explore, and keep track of
              your favorite movies and series.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="mailto:ab.sharifi19@gmail.com"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:scale-110 hover:bg-primary-color"
                title="Email"
              >
                <TfiEmail className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white" />
              </Link>
              <Link
                target="_blank"
                href="https://github.com/ab-sharifi21"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:scale-110 hover:bg-primary-color"
                title="Github"
              >
                <SiGithub className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white" />
              </Link>
              <Link
                target="_blank"
                href="https://linkedin.com/in/abdullahsharifi"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:scale-110 hover:bg-primary-color"
                title="Linkedin"
              >
                <FaLinkedin className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white" />
              </Link>
              <Link
                target="_blank"
                href="https://abdullah-sharifi.vercel.app"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:scale-110 hover:bg-primary-color"
                title="Portfolio"
              >
                <BsGlobe className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Technologies Section */}
          <div>
            <h3
              className={`${titleFont.className} mb-4 text-sm font-semibold uppercase tracking-wider text-white`}
            >
              Built With
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="transition-colors hover:text-white">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary-color"></span>
                TypeScript
              </li>
              <li className="transition-colors hover:text-white">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary-color"></span>
                React.js
              </li>
              <li className="transition-colors hover:text-white">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary-color"></span>
                Next.js
              </li>
              <li className="transition-colors hover:text-white">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary-color"></span>
                TailwindCSS
              </li>
              <li className="transition-colors hover:text-white">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary-color"></span>
                TMDB API
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3
              className={`${titleFont.className} mb-4 text-sm font-semibold uppercase tracking-wider text-white`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-primary-color"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="transition-colors hover:text-primary-color"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/series"
                  className="transition-colors hover:text-primary-color"
                >
                  TV Series
                </Link>
              </li>
              <li>
                <Link
                  href="/watchlist"
                  className="transition-colors hover:text-primary-color"
                >
                  Watchlist
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="transition-colors hover:text-primary-color"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
            <p>
              © {currentYear} Watchly. Built with ❤️ by{' '}
              <Link
                href="https://abdullah-sharifi.vercel.app"
                target="_blank"
                className="text-primary-color transition-colors hover:text-white"
              >
                Abdullah Sharifi
              </Link>
            </p>
            <p className="text-xs">
              Powered by{' '}
              <Link
                href="https://www.themoviedb.org/"
                target="_blank"
                className="text-primary-color transition-colors hover:text-white"
              >
                TMDB
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
