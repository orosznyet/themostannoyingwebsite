import {useMemo, useEffect, useState} from "react";

/**
 * Allows to play audio files after the first user interaction has happened
 * othwerwise the audio will not be played and an exception will be thrown.
 *   NotAllowedError: The play method is not allowed by the user agent or
 *   the platform in the current context, possibly because the user denied
 *   permission.
 */
const useAudio = (url: string) => {
  const audio = useMemo(() => new Audio(url), []);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);
  const play = () => setPlaying(true);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return {playing, toggle, play};
};

export default useAudio;
