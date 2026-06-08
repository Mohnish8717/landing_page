import sys

file_path = "/Users/mohnish/Downloads/tsc architecture/neobrutalist_landing/src/App.tsx"

with open(file_path, "r") as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if line.startswith("const VideoHero = () => {"):
        start_idx = i
    if line.startswith("};") and start_idx != -1 and i > start_idx and i < start_idx + 400:
        if "/* ─── MAIN PAGE ─── */" in lines[i+2]:
            end_idx = i
            break

if start_idx == -1 or end_idx == -1:
    print(f"Could not find VideoHero component. start: {start_idx}, end: {end_idx}")
    sys.exit(1)

new_hero = """const VideoHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;

    let played = false;
    const attemptPlay = () => {
      if (played || !vid) return;
      vid.play()
        .then(() => { setIsPlaying(true); played = true; removeListeners(); })
        .catch((err) => console.warn("Autoplay failed:", err));
    };

    const removeListeners = () => {
      window.removeEventListener("click", attemptPlay);
      window.removeEventListener("touchstart", attemptPlay);
      window.removeEventListener("scroll", attemptPlay);
      window.removeEventListener("keydown", attemptPlay);
    };

    attemptPlay();
    window.addEventListener("click", attemptPlay);
    window.addEventListener("touchstart", attemptPlay);
    window.addEventListener("scroll", attemptPlay);
    window.addEventListener("keydown", attemptPlay);

    return () => removeListeners();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative w-full min-h-[100dvh] flex flex-col lg:flex-row bg-[#050505] border-b-[4px] border-brand"
    >
      {/* ── LEFT PANEL: EDITORIAL TYPOGRAPHY ── */}
      <div className="w-full lg:w-[55%] xl:w-[60%] flex-shrink-0 relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20 border-r-0 lg:border-r-[2px] border-white/10 bg-[#050505]">
        
        {/* Structural Grid Overlay for Left Panel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-3xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 border-[2px] border-brand/40 bg-brand/5 shadow-[4px_4px_0px_0px_rgba(255,69,0,0.2)]">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.25em] font-bold uppercase text-brand">
                Simulation Engine Live
              </span>
            </div>
          </motion.div>

          {/* Main headline - Rigid Editorial Stack */}
          <div className="mb-12 flex flex-col gap-1">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase tracking-tighter text-white leading-[0.85] text-[clamp(4rem,8vw,8rem)]"
            >
              Simulate
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase tracking-tighter text-white leading-[0.85] text-[clamp(4rem,8vw,8rem)]"
            >
              The
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden my-2 bg-brand inline-block self-start px-4 py-1 -rotate-1 border-[3px] border-white"
            >
              <span
                className="block font-black uppercase tracking-tighter leading-[0.85] text-black"
                style={{ fontSize: "clamp(4.5rem, 9vw, 9.5rem)" }}
              >
                <AnimatedTextCycle
                  words={["Market", "Future", "Users", "Backlash"]}
                  interval={3000}
                />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase tracking-tighter text-white leading-[0.85] text-[clamp(4rem,8vw,8rem)] mt-2"
            >
              Before You
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase tracking-tighter text-white leading-[0.85] text-[clamp(4rem,8vw,8rem)]"
            >
              Build
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg font-semibold text-white/70 max-w-[48ch] leading-relaxed mb-12 pl-6 border-l-[4px] border-brand bg-white/5 py-4 pr-4"
          >
            Validate product-market fit, predict regulatory friction, and generate engineering-ready specs using autonomous AI simulation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-5"
          >
            <a
              href="https://github.com/mohnish8717/tsc-archite"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-black font-mono font-black text-sm tracking-widest uppercase border-[3px] border-brand hover:-translate-y-1 hover:-translate-x-1 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none transition-all"
            >
              <IconBolt size={18} stroke={2.5} />
              Run Simulation
            </a>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-mono font-bold text-sm tracking-widest uppercase border-[3px] border-white/20 hover:border-brand hover:text-brand transition-colors"
            >
              <IconArrowRight size={18} stroke={2} />
              See Pipeline
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL: VIDEO CONTAINER ── */}
      <div className="w-full lg:w-[45%] xl:w-[40%] relative min-h-[50vh] lg:min-h-full bg-black overflow-hidden group border-t-[2px] lg:border-t-0 border-white/10 flex flex-col">
        
        {/* Top vignette for Nav text legibility */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent z-10 pointer-events-none" />

        <video
          ref={videoRef}
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.7] transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0 ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/Untitled design (1).mp4" type="video/mp4" />
        </video>

        {/* Brutalist Dot Grid Texture over Video */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Video Controls & Telemetry */}
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-20 flex items-end gap-6">
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-black/60 backdrop-blur-md border-[2px] border-white/20 text-white flex items-center justify-center hover:border-brand hover:text-brand transition-colors hover:bg-black"
            >
              {isPlaying ? <IconPlayerPause size={18} stroke={2} /> : <IconPlayerPlay size={18} stroke={2} />}
            </button>
            <button
              onClick={toggleMute}
              className="w-12 h-12 bg-black/60 backdrop-blur-md border-[2px] border-white/20 text-white flex items-center justify-center hover:border-brand hover:text-brand transition-colors hover:bg-black"
            >
              {isMuted ? <IconVolumeOff size={18} stroke={2} /> : <IconVolume size={18} stroke={2} />}
            </button>
          </div>
        </div>

        {/* Corner Telemetry Badge covering watermark */}
        <div className="absolute bottom-0 right-0 z-10 bg-[#050505] border-t-[2px] border-l-[2px] border-brand px-4 py-2 font-mono text-[10px] tracking-[0.2em] font-bold text-brand uppercase">
          SYS // OK
        </div>
      </div>
    </section>
  );
};
"""

lines[start_idx:end_idx+1] = [new_hero]

with open(file_path, "w") as f:
    f.writelines(lines)

print("Replaced VideoHero with editorial layout successfully.")
