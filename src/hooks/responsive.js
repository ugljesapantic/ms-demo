import { useState, useEffect } from 'react';
import { deviceSizes } from '../utils/consts';

const devices = Object.entries(deviceSizes).sort((a,b) => b[1] - a[1]);

const getDevice = width => {
    for(let i = 0; i < devices.length; i++) {
        if (devices[i][1] < width) return devices[i][0];
    }
}

const getWidth = ()  => window.innerWidth;

export const useDevice = () => {

    const [device, setDevice] = useState(getDevice(getWidth()));

    useEffect(() => {
        const handleResize = () => {
            const newDevice = getDevice(getWidth());
            if (device !== newDevice) setDevice(newDevice);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [device]);



    return {
        isMobile: device === 'mobile',
    };
}

export default useDevice;