'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { poppins, titleFont } from '@/lib/fonts';
import { Button, Logo } from '@/components';
import toast from 'react-hot-toast';

function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      // Registration successful, redirect to login
      router.push('/login');
      toast.success('Registration successful! Please log in.', {
        position: 'bottom-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch {
      toast.error('Something went wrong', {
        position: 'bottom-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center ${poppins.className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/cenima.jpg)' }}
      >
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.9), transparent), linear-gradient(to bottom, rgba(0,0,0), transparent)',
          }}
        />
      </div>

      <div className="absolute left-4 top-4">
        <Logo height={40} width={40} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8 px-3 lg:flex-row lg:items-start lg:gap-20">
        <div className="mt-20 flex-1 text-center lg:mt-0 lg:text-left">
          <h1
            className={`${titleFont.className} mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl`}
          >
            Welcome to Watchly
          </h1>
          <p className="text-gray-400 md:text-lg">
            Register to start your cinematic journey
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-md flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="animate-slideIn rounded-lg border border-primary-color/50 bg-primary-color/10 p-4 text-center text-sm text-primary-color">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-white/10 bg-primary-bg-color px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-white/10 bg-primary-bg-color px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color/20"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-white/10 bg-primary-bg-color px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="repeat-password"
                className="block text-sm font-medium text-gray-300"
              >
                Repeat Password
              </label>
              <input
                id="repeat-password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.repeatPassword}
                onChange={(e) =>
                  setFormData({ ...formData, repeatPassword: e.target.value })
                }
                className="w-full rounded-lg border border-white/10 bg-primary-bg-color px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color/20"
              />
            </div>

            {/* Submit Button */}
            <Button
              buttonText=""
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing Up...
                </span>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary-color transition-colors hover:scale-110 hover:text-primary-color/80 hover:underline"
            >
              Sign In
            </Link>
          </p>

          {/* Footer Text */}
          <p className="mt-8 text-center text-sm text-gray-500"></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
