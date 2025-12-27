'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaRegUser,
  FaEnvelope,
  FaCalendarAlt,
  FaHeart,
  FaBookmark,
} from 'react-icons/fa';
import Button from './Button';
import { signOut } from 'next-auth/react';

interface ProfileClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    _count: {
      favorites: number;
      watchlist: number;
    };
  };
}

export const ProfileClient = ({ user }: ProfileClientProps) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(user.name);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === user.name) {
      setIsEditingName(false);
      return;
    }

    setIsUpdating(true);
    setUpdateMessage('');

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateMessage('Name updated successfully!');
        setIsEditingName(false);
        router.refresh();
      } else {
        setUpdateMessage(data.error || 'Failed to update name');
      }
    } catch {
      setUpdateMessage('An error occurred');
    } finally {
      setIsUpdating(false);
      setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMessage('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters');
      return;
    }

    setIsUpdating(true);
    setPasswordMessage('');

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsChangingPassword(false);
      } else {
        setPasswordMessage(data.error || 'Failed to change password');
      }
    } catch {
      setPasswordMessage('An error occurred');
    } finally {
      setIsUpdating(false);
      setTimeout(() => setPasswordMessage(''), 3000);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    setDeleteMessage('');

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sign out and redirect to home
        await signOut({ callbackUrl: '/' });
      } else {
        setDeleteMessage(data.error || 'Failed to delete account');
      }
    } catch {
      setDeleteMessage('An error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-white md:text-4xl">
        Profile
      </h1>

      {/* Profile Info Card */}
      <div className="mb-6 rounded-lg bg-secondary-bg-color p-6 shadow-lg">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl text-white">
            <FaRegUser />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
            <p className="text-slate-400">{user.email}</p>
          </div>
        </div>

        <div className="grid gap-4 border-t border-slate-700 pt-6 md:grid-cols-3">
          <div className="flex items-center gap-3 text-slate-300">
            <FaCalendarAlt className="text-lg text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Member since</p>
              <p className="text-sm font-medium">
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <FaHeart className="text-lg text-red-400" />
            <div>
              <p className="text-xs text-slate-500">Favorites</p>
              <p className="text-sm font-medium">{user._count.favorites}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <FaBookmark className="text-lg text-blue-400" />
            <div>
              <p className="text-xs text-slate-500">Watchlist</p>
              <p className="text-sm font-medium">{user._count.watchlist}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Name Section */}
      <div className="mb-6 rounded-lg bg-secondary-bg-color p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Account Information
        </h3>

        {!isEditingName ? (
          <div className="flex items-center justify-between">
            <div>
              <label className="mb-1 block text-sm text-slate-400">
                Display Name
              </label>
              <p className="text-white">{user.name}</p>
            </div>
            <button
              onClick={() => setIsEditingName(true)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
            >
              Edit Name
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdateName}>
            <label className="mb-2 block text-sm text-slate-400">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-3 w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              required
              minLength={2}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isUpdating}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditingName(false);
                  setName(user.name);
                }}
                className="rounded-md bg-slate-600 px-4 py-2 text-sm text-white transition-colors hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
            {updateMessage && (
              <p
                className={`mt-2 text-sm ${updateMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}
              >
                {updateMessage}
              </p>
            )}
          </form>
        )}

        <div className="mt-4 border-t border-slate-700 pt-4">
          <label className="mb-1 block text-sm text-slate-400">Email</label>
          <div className="flex items-center gap-2 text-slate-300">
            <FaEnvelope className="text-slate-500" />
            <p>{user.email}</p>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mb-6 rounded-lg bg-secondary-bg-color p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold text-white">Security</h3>

        {!isChangingPassword ? (
          <div className="flex items-center justify-between">
            <div>
              <label className="mb-1 block text-sm text-slate-400">
                Password
              </label>
              <p className="text-slate-300">••••••••</p>
            </div>
            <button
              onClick={() => setIsChangingPassword(true)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
            >
              Change Password
            </button>
          </div>
        ) : (
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-slate-400">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-slate-400">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                required
                minLength={6}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-slate-400">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                required
                minLength={6}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isUpdating}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {isUpdating ? 'Changing...' : 'Change Password'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setPasswordMessage('');
                }}
                className="rounded-md bg-slate-600 px-4 py-2 text-sm text-white transition-colors hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
            {passwordMessage && (
              <p
                className={`mt-2 text-sm ${passwordMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}
              >
                {passwordMessage}
              </p>
            )}
          </form>
        )}
      </div>

      {/* Delete Account Section */}
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold text-red-400">Danger Zone</h3>
        <p className="text slate-400 mb-4 text-sm">
          Once you delete your account, there is no going back. This will delete
          your profile, your watchlist and your favorites.
        </p>
        <Button
          onClick={() => setIsConfirmingDelete(true)}
          buttonText="Delete Account"
        />
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-lg bg-secondary-bg-color p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-semibold text-red-400">
              Delete Account
            </h3>
            <p className="mb-4 text-sm text-slate-300">
              This action cannot be undone. Please enter your password to
              confirm.
            </p>

            <form onSubmit={handleDeleteAccount}>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter your password"
                className="mb-4 w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                required
              />

              {deleteMessage && (
                <p className="mb-4 text-sm text-red-500">{deleteMessage}</p>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isDeleting}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsConfirmingDelete(false);
                    setDeletePassword('');
                    setDeleteMessage('');
                  }}
                  className="rounded-md bg-slate-600 px-4 py-2 text-sm text-white transition-colors hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
