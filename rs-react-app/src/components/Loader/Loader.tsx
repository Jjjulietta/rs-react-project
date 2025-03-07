import { useRouter } from 'next/compat/router';
import { useState, useEffect } from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader_body}>
      <div data-testid="loader" className={styles.loader}></div>
    </div>
  );
};

function RouteLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return loading ? <Loader /> : null;
}

export default RouteLoader;
