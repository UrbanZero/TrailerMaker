import { useEffect, useState } from 'react';
import { useAudio } from '../hooks/useAudio';

const AudioController = () => {
    const { click, setAmbienceVolume } = useAudio();
    const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent) => {
        const newX = event.clientX;
        const newY = event.clientY;
        setRelativePosition({ x: Math.max(newX / window.innerWidth - 0.1, 0), y: Math.max(1 - newY / window.innerHeight - 0.1, 0) });
    };

    useEffect(() => {
        setAmbienceVolume(relativePosition)
    }, [relativePosition]);

    const handleClick = () => {
        click();
    };

    return (
        <div className="w-full h-full"
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        >
            <p className="text-white text-center absolute bottom-0 w-full">Click and move the mouse to control tension.</p>
        </div>
    );
};

export default AudioController;
