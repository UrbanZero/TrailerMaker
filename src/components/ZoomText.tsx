import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ZoomTextProps {
    text: string;
    setText: CallableFunction;
}

const ZoomText = ({ text, setText }: ZoomTextProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const texts = text.split("\n"); // The texts to display
    // Vars
    const [currentIndex, setCurrentIndex] = useState(0);
    const [duration, setDuration] = useState(1);
    const [easeIn, setEaseIn] = useState(1);

    useEffect(() => {
        if (isVisible) {
            const timer1 = setTimeout(() => {
                setIsVisible(false)
            }, 5000 * duration); // Adjust the duration to match your animation time
            return () => clearTimeout(timer1);
        } else {
            const timer2 = setTimeout(() => {
                if (currentIndex < texts.length - 1) {
                    setCurrentIndex(currentIndex + 1); // Move to the next text after each animation
                    setIsVisible(true)
                    if (currentIndex == texts.length - 2) {
                        setDuration(2)
                        setEaseIn(0)
                    } else {
                        setDuration(0.5 + Math.random())
                        setEaseIn(1)
                    }
                } else {
                    setText("")
                }
            }, 3000 * duration); // Adjust the duration to match your animation time
            return () => clearTimeout(timer2);
        }
    }, [isVisible]);
    return (
        <motion.div
            className='text-center text-4xl font-bold text-white'
            initial="start"
            animate={isVisible ? 'visible' : 'start'}
            // Transitions
            variants={{
                start: { scale: 0.8, opacity: 0 },
                visible: { scale: 2 - easeIn, opacity: 1 },
                exit: { scale: 2 - easeIn, opacity: 0 },
            }}
            transition={{
                opacity: { duration: 2 * duration * easeIn, ease: 'easeInOut', },
                scale: { duration: 4 * duration, ease: 'easeOut', },
            }}
            // Resizing text
            style={{ fontSize: (0.5 + 50 / texts[currentIndex].length).toString() + "vw" }}
        >
            {texts[currentIndex]}
        </motion.div>
    );
};

export default ZoomText;
