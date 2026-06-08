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
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const reduce = useReducedMotion();

  // Parallax: text moves slower than scroll
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Autoplay with interaction fallback
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
      ref={heroRef}
      id="hero"
      aria-label="Hero section"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-black"
    >
      {/* ── FULL-BLEED BACKGROUND VIDEO ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.9] transition-opacity duration-1000 ease-out ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ transform: "translateZ(0)" }}
        >
          <source src="/Untitled design (1).mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays: stronger left-to-right fade to protect text, plus top fade for nav */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent w-[75%] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent pointer-events-none"
        />
        {/* Bottom fade for smooth transition to next section */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
        />
      </div>

      {/* ── DOT GRID TEXTURE OVERLAY ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
          backgroundSize: "6px 6px",
        }}
      />

      {/* ── HUD ELEMENTS (Detailistic overlays) ── */}
      <div className="absolute inset-6 z-0 pointer-events-none border border-white/5 hidden md:block" />
      <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-brand z-10 hidden md:block" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-brand z-10 hidden md:block" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-brand z-10 hidden md:block" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-brand z-10 hidden md:block" />

      {/* ── LEFT-ALIGNED TYPOGRAPHY ── */}
      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : opacity }}
        className="relative z-10 min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 w-full max-w-[1400px] mx-auto"
      >
        <div className="max-w-[700px]">
          {/* Status badge - Brutalist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-block"
          >
            <div className="flex items-center gap-3 px-4 py-2 border-[2px] border-white/20 bg-black/60 backdrop-blur-md font-mono text-[11px] tracking-[0.2em] font-bold uppercase text-white shadow-[4px_4px_0px_0px_#FF4500]">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-3 h-3 bg-brand rounded-full animate-ping opacity-50" />
                <span className="relative w-2 h-2 bg-brand rounded-full" />
              </div>
              Simulation Engine Live
            </div>
          </motion.div>

          {/* Main headline */}
          <div className="mb-8 relative">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,6vw,5.5rem)] font-black uppercase tracking-tighter text-white leading-[0.95] drop-shadow-2xl"
            >
              Simulate The
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="my-2"
            >
              <span
                className="block text-[clamp(3.5rem,7vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.95]"
                style={{
                  WebkitTextStroke: "2px #FF4500",
                  color: "transparent",
                  filter: "drop-shadow(4px 4px 0px rgba(0,0,0,0.8))"
                }}
              >
                <AnimatedTextCycle
                  words={["Future", "Market", "Users", "Backlash", "Friction", "Adoption"]}
                  interval={3000}
                />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,6vw,5.5rem)] font-black uppercase tracking-tighter text-white leading-[0.95] drop-shadow-2xl"
            >
              Before You Build
            </motion.h1>
          </div>

          {/* Subtext in a brutalist glass box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 relative"
          >
            {/* Decorative background box for brutalist offset effect */}
            <div className="absolute inset-0 bg-brand translate-x-2 translate-y-2" />
            <div className="relative bg-black/80 backdrop-blur-md border-[2px] border-white/20 p-6 sm:p-8">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand" />
              <p className="text-base md:text-lg font-medium text-white/90 leading-relaxed font-mono">
                Validate product-market fit, predict regulatory friction, and generate engineering-ready specs using autonomous AI simulation.
              </p>
            </div>
          </motion.div>

          {/* CTAs - Reverted to Brutalist Squares */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-6"
          >
            <a
              href="https://github.com/mohnish8717/tsc-archite"
              target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand text-black font-mono font-black text-sm tracking-widest uppercase border-[3px] border-brand transition-all hover:-translate-y-1 hover:-translate-x-1"
            >
              <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-white/50 transition-colors" />
              <div className="absolute -inset-[3px] border-[3px] border-transparent group-hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] transition-shadow" />
              <IconBolt size={18} stroke={2.5} className="relative z-10" />
              <span className="relative z-10">Run Simulation</span>
            </a>
            <a
              href="#capabilities"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-black/60 backdrop-blur-md text-white font-mono font-bold text-sm tracking-widest uppercase border-[3px] border-white transition-all hover:bg-white hover:text-black hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_rgba(255,69,0,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(255,69,0,1)]"
            >
              <IconArrowRight size={18} stroke={2} />
              <span className="relative z-10">See Pipeline</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── VIDEO CONTROLS - Brutalist Sharp Boxes ── */}
      <div className="absolute bottom-10 right-10 z-30 flex gap-4">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="w-14 h-14 bg-brand text-black border-[3px] border-brand flex items-center justify-center transition-all hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)]"
        >
          {isPlaying ? <IconPlayerPause size={20} stroke={2.5} /> : <IconPlayerPlay size={20} stroke={2.5} />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="w-14 h-14 bg-black/60 backdrop-blur-md text-white border-[3px] border-white flex items-center justify-center transition-all hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_rgba(255,69,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(255,69,0,1)] hover:bg-white hover:text-black"
        >
          {isMuted ? <IconVolumeOff size={20} stroke={2} /> : <IconVolume size={20} stroke={2} />}
        </button>
      </div>

      {/* ── WATERMARK COVER — Brutalist Corner Accent ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 z-20 font-mono text-brand bg-[#050505] border-t-[3px] border-l-[3px] border-brand flex items-center justify-center pointer-events-none"
        style={{ padding: "10px 20px", fontSize: "11px", letterSpacing: "0.2em" }}
      >
        <span className="flex items-center gap-3 uppercase font-black">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-brand opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 bg-brand"></span>
          </span>
          SYS // OK
        </span>
      </div>

    </section>
  );
};
"""

lines[start_idx:end_idx+1] = [new_hero]

with open(file_path, "w") as f:
    f.writelines(lines)

print("Replaced VideoHero with upgraded brutalist detailistic full-bleed design.")
