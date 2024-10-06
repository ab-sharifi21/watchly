import { useEffect, useState } from 'react';

function useDevice() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const currentWidth: number = window.innerWidth;
      setDeviceType(currentWidth < 900 ? 'mobile' : 'desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile: deviceType === 'mobile',
    isDesktop: deviceType === 'desktop',
  };
}

export default useDevice;
