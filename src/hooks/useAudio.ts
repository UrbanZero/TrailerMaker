import * as Tone from 'tone';
import { useEffect, useState, useRef } from 'react';

export const useAudio = () => {
    // States
    const [tension, setTension] = useState(0);
    const [loadingStab, setLoadingStab] = useState(false);
    // SFXs
    const sfxLowStab: string[] = ["stab1.ogg", "braam1.ogg", "slam1.ogg", "boom1.ogg"];
    const sfxHighStab: string[] = ["alert1.ogg", "alert2.ogg", "alert3.ogg", "signal1.ogg", "hit1.ogg"];
    const sfxRise: string[] = ["riser1.ogg", "riser2.ogg", "riser3.ogg", "riser4.ogg", "riser5.ogg"]
    // Refs
    const riseGainRef = useRef(new Tone.Gain(1).toDestination());
    const riserPlayerRef = useRef<Tone.Player | undefined>(undefined);
    const stabGainRef = useRef(new Tone.Gain(0.4).toDestination());

    useEffect(() => {
        Tone.start(); // Ensure the audio context is started when the component mounts
        return () => {
            // Cleanup when the component is unmounted
            riserPlayerRef.current?.dispose();
        };
    }, []);

    const playStab = (sfx: string[]) => {
        const random = Math.floor(Math.random() * sfx.length);
        const player = new Tone.Player({
            url: "../../public/sfx/" + sfx[random],
            onload: () => {
                player.connect(stabGainRef.current);
                player.autostart = true;
                player.onstop = () => player.dispose(); // Cleanup after playback
            }
        });
    };

    const click = () => {
        if (tension < 0.45) playStab(sfxLowStab)
        else playStab(sfxHighStab)
    }
    const playRiser = () => {
        const random = Math.floor(Math.random() * sfxRise.length);
        const riserPlayer = new Tone.Player({
            url: "../../public/sfx/" + sfxRise[random],
            onload: () => {
                riserPlayer.connect(riseGainRef.current);
                riserPlayer.autostart = true;
                // Cleanup
                riserPlayer.onstop = () => {
                    riserPlayer.dispose();
                    riserPlayerRef.current = undefined;
                };
                riserPlayerRef.current = riserPlayer; // Store the player in the ref
            }
        });
    };

    const setAmbienceVolume = (intensity: { x: number, y: number }) => {
        if (riserPlayerRef.current) {
            if (intensity.y < 0.01) riserPlayerRef.current.stop();
            // Ramp the gain to the intensity value (adjusting volume smoothly)
            riseGainRef.current.gain.rampTo(intensity.y - 0.01, 0.2);
            // Allow next riser load
            setLoadingStab(false)
        } else if (!loadingStab && intensity.y > 0.01) {
            setLoadingStab(true)
            playRiser(); // If not loading or loaded yet, trigger playRiser to load it
        }
        // Update the tension (not necessarily related to volume)
        setTension(intensity.y);
    };

    return { click, setAmbienceVolume };
};
