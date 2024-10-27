import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (loading) return; // If loading, do nothing
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    // Log the access and refresh tokens
    console.log('Access_token:', accessToken);
    console.log('Refresh_token:', refreshToken);

    if (!isAuthenticated) {
      // Show toast notification and redirect to login page if not authenticated
      toast.warn('Please log in to access this page.');
      router.push('/auth/login');
    }
  }, [isAuthenticated, router, loading]);

  // Update loading state once the component mounts
  useEffect(() => {
    setLoading(false); // Set loading to false after the component mounts
  }, []);

  // Render nothing or a spinner while loading
  if (loading) return null; // Or you can return a loading spinner here

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
