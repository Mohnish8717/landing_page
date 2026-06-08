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
          className={`w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.85] transition-opacity duration-1000 ease-out ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ transform: "translateZ(0)" }}
        >
          <source src="/Untitled design (1).mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays to ensure text legibility on the left, and nav legibility on top */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"
        />
      </div>

      {/* ── DOT GRID TEXTURE OVERLAY (Detailistic) ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* ── LEFT-ALIGNED TYPOGRAPHY (Floating over video) ── */}
      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : opacity }}
        className="relative z-10 min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-12 w-full max-w-[1400px] mx-auto"
      >
        <div className="max-w-[800px]">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 border-[2px] border-white/20 bg-black/40 backdrop-blur-md font-mono text-[11px] tracking-[0.25em] font-bold uppercase text-white shadow-[4px_4px_0px_0px_rgba(255,69,0,1)]">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              Simulation Engine Live
            </span>
          </motion.div>

          {/* Main headline - Full-bleed style */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
              className="text-[clamp(3.5rem,7vw,7.5rem)] font-black uppercase tracking-tighter text-white leading-[0.9] drop-shadow-2xl"
            >
              Simulate The
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="my-1"
            >
              <span
                className="block text-[clamp(4rem,8.5vw,9rem)] font-black uppercase tracking-tighter leading-[0.9]"
                style={{
                  WebkitTextStroke: "3px #FF4500",
                  color: "transparent",
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))"
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
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
              className="text-[clamp(3.5rem,7vw,7.5rem)] font-black uppercase tracking-tighter text-white leading-[0.9] drop-shadow-2xl"
            >
              Before You Build
            </motion.h1>
          </div>

          {/* Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="w-24 h-[4px] bg-brand mb-8"
          />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
            className="text-lg md:text-xl font-semibold text-white/90 max-w-[50ch] leading-relaxed mb-12 border-l-[4px] border-brand pl-6 bg-black/10 backdrop-blur-sm py-4 rounded-r-lg"
          >
            Validate product-market fit, predict regulatory friction, and generate engineering-ready specs using autonomous AI simulation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-5"
          >
            <a
              href="https://github.com/mohnish8717/tsc-archite"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-black font-mono font-black text-sm tracking-widest uppercase border-[3px] border-brand rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(255,69,0,0.5)] transition-all"
            >
              <IconBolt size={18} stroke={2.5} />
              Run Simulation
            </a>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black/40 backdrop-blur-md text-white font-mono font-bold text-sm tracking-widest uppercase border-[3px] border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <IconArrowRight size={18} stroke={2} />
              See Pipeline
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── VIDEO CONTROLS (Floating over video) ── */}
      <div className="absolute bottom-10 right-10 z-30 flex gap-3">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="w-14 h-14 bg-brand text-black rounded-full flex items-center justify-center hover:scale-110 shadow-lg shadow-brand/20 transition-all border-2 border-transparent hover:border-white"
        >
          {isPlaying ? <IconPlayerPause size={20} stroke={2.5} /> : <IconPlayerPlay size={20} stroke={2.5} />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="w-14 h-14 bg-black/60 backdrop-blur-md border-[2px] border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all"
        >
          {isMuted ? <IconVolumeOff size={20} stroke={2} /> : <IconVolume size={20} stroke={2} />}
        </button>
      </div>

      {/* ── WATERMARK COVER — bottom right corner ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 z-20 font-mono text-brand bg-black/80 backdrop-blur-md border-t-[2px] border-l-[2px] border-brand/30 flex items-center justify-center pointer-events-none rounded-tl-xl"
        style={{ padding: "8px 16px", fontSize: "10px", letterSpacing: "0.2em" }}
      >
        <span className="flex items-center gap-2 uppercase font-black">
          <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />SYS // OK
        </span>
      </div>

    </section>
  );
};
"""

lines[start_idx:end_idx+1] = [new_hero]

with open(file_path, "w") as f:
    f.writelines(lines)

print("Replaced VideoHero with full-bleed design successfully.")
