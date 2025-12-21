'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { titleFont, poppins } from '@/lib/fonts';
import { Logo } from '@/components';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      // Success! Redirect to home
      router.push('/');
      router.refresh();
    } catch (error) {
      setError('Something went wrong');
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
        <div className="flex-1 text-center lg:text-left">
          <h1
            className={`${titleFont.className} mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl`}
          >
            Welcome Back
          </h1>
          <p className="text-gray-400 md:text-lg">
            Sign in to continue your cinematic journey
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-md flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="animate-slideIn rounded-lg border border-primary-color/50 bg-primary-color/10 p-4 text-center text-sm text-primary-color">
                {error}
              </div>
            )}

            {/* Email Input */}
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
                className="w-full rounded-lg border border-white/10 bg-primary-bg-color px-4 py-3 placeholder-gray-500 transition-all duration-200 focus:border-primary-color focus:outline-none"
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
                className="w-full rounded-lg border border-white/10 bg-primary-bg-color px-4 py-3 placeholder-gray-500 transition-all duration-200 focus:border-primary-color focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary-color px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary-color/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-primary-color transition-colors hover:text-primary-color/80 hover:underline"
            >
              Create one now
            </Link>
          </p>

          {/* Footer Text */}
          <p className="mt-8 text-center text-sm text-gray-500"></p>
        </div>
      </div>
    </div>
  );
}
