import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";
import { tracks } from "../data/tracks";

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
    const audioRef = useRef(null);
    const [activeTrackIndex, setActiveTrackIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState("");

    const playTrack = useCallback(async (index) => {
        const audio = audioRef.current;
        const track = tracks[index];
        if (!audio || !track) return;

        if (activeTrackIndex === index && !audio.paused) {
            audio.pause();
            return;
        }

        setError("");
        if (activeTrackIndex !== index) {
            audio.src = track.audioUrl;
            audio.load();
            setActiveTrackIndex(index);
            setCurrentTime(0);
            setDuration(0);
        }

        try {
            await audio.play();
            setIsPlaying(true);
        } catch (err) {
            setIsPlaying(false);
            setError(
                "Couldn't play this track. Check the public URL, file access, and browser support for Opus audio."
            );
        }
    }, [activeTrackIndex]);

    const togglePlay = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (activeTrackIndex === null) {
            await playTrack(3);
            return;
        }
        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
                setError("");
            } catch {
                setError("Couldn't resume playback. Check the audio URL and format.");
            }
        } else {
            audio.pause();
        }
    }, [activeTrackIndex, playTrack]);

    const playNext = useCallback(() => {
        const nextIndex = activeTrackIndex === null
            ? 0
            : (activeTrackIndex + 1) % tracks.length;
        void playTrack(nextIndex);
    }, [activeTrackIndex, playTrack]);

    const playPrevious = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            setCurrentTime(0);
            return;
        }

        const previousIndex = activeTrackIndex === null
            ? 0
            : (activeTrackIndex - 1 + tracks.length) % tracks.length;
        void playTrack(previousIndex);
    }, [activeTrackIndex, playTrack]);

    const seek = useCallback((time) => {
        const audio = audioRef.current;
        if (!audio || !Number.isFinite(time)) return;
        audio.currentTime = time;
        setCurrentTime(time);
    }, []);

    const value = useMemo(() => ({
        tracks,
        activeTrackIndex,
        activeTrack: activeTrackIndex === null ? null : tracks[activeTrackIndex],
        isPlaying,
        currentTime,
        duration,
        error,
        playTrack,
        togglePlay,
        playNext,
        playPrevious,
        seek,
    }), [
        activeTrackIndex, isPlaying, currentTime, duration, error,
        playTrack, togglePlay, playNext, playPrevious, seek,
    ]);

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}

            {/* Keep this single audio element mounted while routes change. */}
            <audio
                ref={audioRef}
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
                onEnded={() => {
                    const nextIndex = activeTrackIndex === null
                        ? 0
                        : (activeTrackIndex + 1) % tracks.length;
                    void playTrack(nextIndex);
                }}
                onError={() => {
                    if (audioRef.current?.src) {
                        setIsPlaying(false);

                    }
                }}
                className="hidden"
            />
        </AudioPlayerContext.Provider>
    );
}

export function useAudioPlayer() {
    const context = useContext(AudioPlayerContext);
    if (!context) {
        throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");
    }
    return context;
}
