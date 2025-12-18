import { Metadata } from 'next';
import { titleFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Register - Watchly',
  description: 'Create a new account to start your watchly journey!',
};

function RegisterPage() {
  return (
    <div className={`${titleFont.className} mb-4 ml-4 mt-16 font-bold`}>
      <h1>Register page</h1>
    </div>
  );
}

export default RegisterPage;
