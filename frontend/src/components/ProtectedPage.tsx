'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const allowedRoutes = {
  seller: [
    '/',
    '/dashboard',
    '/products',
    '/products/add',
    '/products/:id',
    '/products/edit/:id',
    '/orders',
    '/orders/:id',
  ],
  dealer: [
    '/',
    '/dashboard',
    '/products',
    '/products/add',
    '/products/:id',
    '/products/edit/:id',
    '/orders',
    '/orders/:id',
  ],
  user: [
    '/',
    '/dashboard',
    '/profile',
    '/settings',
  ],
};

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const userCookie = Cookies.get('user');

      if (!userCookie) {
        console.log('No user cookie found. Redirecting to login.');
        router.push('/auth/login');
        return;
      }
      try {
        const user = JSON.parse(decodeURIComponent(userCookie));
        console.log(user, "user from protected page");
        let { role_id } = user;
        if (!role_id) {
          console.log('No role found. Defaulting to "user" role.');
          role_id = 4;
          Cookies.set(
            'user',
            JSON.stringify({ ...user, role_id }),
            { expires: 7 }
          );
        }
        if (role_id === 1) {
          setLoading(false);
          return;
        }

        const roleKey =
          role_id === 2
            ? 'seller'
            : role_id === 3
              ? 'dealer'
              : role_id === 4
                ? 'user'
                : null;

        const allowedPaths = roleKey ? allowedRoutes[roleKey] : [];
        console.log(allowedPaths);
        if (!allowedPaths.includes(pathname)) {
          console.log('Access denied for this route. Redirecting to home.');
          router.push('/');
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        router.push('/auth/login');
      }
    };
    checkAccess();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedPage;
