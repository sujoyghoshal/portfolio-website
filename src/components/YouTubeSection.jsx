import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { SiYoutube } from 'react-icons/si';

const VIDEO_ID      = '6x109irlA1A';
const CHANNEL_URL   = 'https://www.youtube.com/@AICodeLab26';
const CHANNEL_NAME  = 'AICodeLab';
const CHANNEL_HANDLE = '@AICodeLab26';
const SUBSCRIBERS   = '58';

export default function YouTubeSection() {
  const playerRef   = useRef(null);
  const [playing,   setPlaying]   = useState(false);
  const [muted,     setMuted]     = useState(true);
  const [ready,     setReady]     = useState(false);
  const [started,   setStarted]   = useState(false);

  const onReady = useCallback((e) => {
    playerRef.current = e.target;
    e.target.mute();
    setReady(true);
  }, []);

  const onStateChange = useCallback((e) => {
    // 1 = playing, 2 = paused, 0 = ended
    setPlaying(e.data === 1);
    if (e.data === 1) setStarted(true);
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else         playerRef.current.playVideo();
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) { playerRef.current.unMute();   setMuted(false); }
    else       { playerRef.current.mute();     setMuted(true);  }
  };

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay:       0,
      controls:       0,
      modestbranding: 1,
      rel:            0,
      showinfo:       0,
      iv_load_policy: 3,
      mute:           1,
      fs:             0,
      disablekb:      1,
      origin:         window.location.origin,
    },
  };

  return (
    <section id="youtube" className="py-20 px-4 sm:px-6">
      <div className="section-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-shell"
        >
          <p className="section-sub">YouTube Channel</p>
          <h2 className="section-title">Watch Me <span className="gradient-text">Code</span></h2>
          <p className="section-copy">AI, full-stack projects, and engineering tutorials — subscribe for more.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card overflow-hidden"
            style={{ border: '1px solid rgba(255,0,0,0.2)' }}
          >
            {/* Channel info bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#FF0000,#cc0000)' }}>
                  <SiYoutube size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[var(--text)] font-bold text-sm leading-tight">{CHANNEL_NAME}</p>
                  <p className="text-[var(--muted)] text-xs">{CHANNEL_HANDLE} · {SUBSCRIBERS} subscribers</p>
                </div>
              </div>
              <motion.a
                href={CHANNEL_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all"
                style={{ background: 'linear-gradient(135deg,#FF0000,#cc0000)' }}
              >
                <SiYoutube size={14} />
                Subscribe
              </motion.a>
            </div>

            {/* Video Player */}
            <div className="relative" style={{ paddingBottom: '56.25%', background: '#000' }}>
              {/* YouTube iframe fills the container */}
              <div className="absolute inset-0">
                <YouTube
                  videoId={VIDEO_ID}
                  opts={opts}
                  onReady={onReady}
                  onStateChange={onStateChange}
                  className="w-full h-full"
                  iframeClassName="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              {/* Overlay — shown before first play */}
              {!started && (
                <motion.div
                  initial={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                  style={{ background: 'rgba(0,0,0,0.45)' }}
                  onClick={togglePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                    style={{ background: 'linear-gradient(135deg,#FF0000,#cc0000)' }}
                  >
                    <Play size={32} className="text-white ml-1.5" fill="white" />
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Custom Controls */}
            <div className="flex items-center justify-between px-5 py-3"
              style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

              <div className="flex items-center gap-3">
                {/* Play / Pause */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={togglePlay}
                  disabled={!ready}
                  className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all"
                  style={{ background: playing ? 'rgba(255,255,255,0.12)' : 'linear-gradient(135deg,#FF0000,#cc0000)' }}
                  title={playing ? 'Pause' : 'Play'}
                >
                  {playing
                    ? <Pause size={16} className="text-white" fill="white" />
                    : <Play  size={16} className="text-white ml-0.5" fill="white" />
                  }
                </motion.button>

                {/* Mute / Unmute */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={toggleMute}
                  disabled={!ready}
                  className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  title={muted ? 'Unmute' : 'Mute'}
                >
                  {muted
                    ? <VolumeX size={16} className="text-white/60" />
                    : <Volume2 size={16} className="text-white" />
                  }
                </motion.button>

                <span className="text-[var(--muted)] text-xs">
                  {!ready ? 'Loading…' : playing ? 'Playing' : started ? 'Paused' : 'Click to play'}
                </span>
              </div>

              <motion.a
                href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-[var(--muted)] text-xs hover:text-[#FF0000] transition-colors"
              >
                <ExternalLink size={12} />
                Watch on YouTube
              </motion.a>
            </div>

          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-5"
          >
            {[
              { label: 'Channel', value: 'AICodeLab' },
              { label: 'Focus',   value: 'AI & Full Stack' },
              { label: 'Handle',  value: '@AICodeLab26' },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card px-5 py-3 text-center" style={{ border: '1px solid rgba(255,0,0,0.12)' }}>
                <p className="text-[var(--text)] font-bold text-sm">{value}</p>
                <p className="text-[var(--muted)] text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
