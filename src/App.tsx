"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import AnimatedTextCycle from "./components/ui/animated-text-cycle";
import RadialOrbitalTimeline from "./components/ui/radial-orbital-timeline";
import {
  IconLayersLinked,
  IconSearch,
  IconUsers,
  IconBriefcase,
  IconWorld,
  IconSwords,
  IconFileText,
  IconPackage,
  IconBolt,
  IconShield,
  IconBrain,
  IconArrowRight,
  IconActivity,
  IconChartBar,
  IconTerminal,
  IconBuildingSkyscraper,
  IconRocket,
  IconVolume,
  IconVolumeOff,
  IconPlayerPlay,
  IconPlayerPause,
} from "@tabler/icons-react";

/* ─── Data ─── */
const pipelineData = [
  {
    id: 1, title: "Ingestion", date: "Layer 1",
    content: "RAG-enhanced parsing of Zendesk tickets, Slack logs, and customer interviews into core semantic signals.",
    category: "Data", icon: IconLayersLinked, relatedIds: [2], status: "completed" as const, energy: 100,
  },
  {
    id: 2, title: "Discovery", date: "Layer 2",
    content: "Dynamically clusters pain points into Tension Clusters and drafts Feature Proposals addressing real friction.",
    category: "Analysis", icon: IconSearch, relatedIds: [1, 3], status: "completed" as const, energy: 92,
  },
  {
    id: 3, title: "Personas", date: "Layer 3",
    content: "Builds deep psychological user personas with cognitive biases, social interaction patterns, and value systems.",
    category: "Generation", icon: IconUsers, relatedIds: [2, 4], status: "completed" as const, energy: 88,
  },
  {
    id: 4, title: "Boardroom", date: "Layer 4",
    content: "Initializes the Autonomous Executive Suite — CEO, CTO, CISO, Legal, Product — each with private intelligence briefs.",
    category: "Assembly", icon: IconBriefcase, relatedIds: [3, 5], status: "completed" as const, energy: 80,
  },
  {
    id: 5, title: "OASIS Sim", date: "Layer 5",
    content: "Spins up hundreds of synthetic users in CAMEL-AI OASIS. They interact, argue, post — generating predictive behavioral data.",
    category: "Simulation", icon: IconWorld, relatedIds: [4, 6], status: "in-progress" as const, energy: 65,
  },
  {
    id: 6, title: "Debate", date: "Layer 6",
    content: "AG2 adversarial boardroom debate with anti-sycophancy measures. Every claim verified against Hindsight Memory Bank.",
    category: "Validation", icon: IconSwords, relatedIds: [5, 7], status: "in-progress" as const, energy: 55,
  },
  {
    id: 7, title: "Spec Gen", date: "Layer 7",
    content: "Auto-compiles debate consensus into a high-fidelity PRD: UI changes, data model updates, and prioritized tasks.",
    category: "Output", icon: IconFileText, relatedIds: [6, 8], status: "pending" as const, energy: 35,
  },
  {
    id: 8, title: "Handoff", date: "Layer 8",
    content: "Generates engineering-ready artifacts: integration tests, monitoring plans, and deployment configs.",
    category: "Delivery", icon: IconPackage, relatedIds: [7], status: "pending" as const, energy: 15,
  },
];

const features = [
  {
    icon: IconBrain, title: "Predictive Intelligence", accent: "bg-[#FF4500]",
    description: "Simulate thousands of synthetic users before writing a single line of code. Predict adoption, churn, and regulatory friction.",
  },
  {
    icon: IconSwords, title: "Anti-Sycophancy Debate", accent: "bg-white",
    description: "Autonomous executives with logit-bias manipulation force genuine adversarial challenge. No echo chambers.",
  },
  {
    icon: IconShield, title: "Zero-Hallucination Grounding", accent: "bg-black",
    description: "Every boardroom claim is verified against the Hindsight Memory Bank — actual simulation data, not fabrication.",
  },
  {
    icon: IconActivity, title: "Real-Time Observation", accent: "bg-[#FF4500]",
    description: "Watch synthetic social dynamics unfold live — sentiment shifts, coalition formation, and backlash prediction.",
  },
  {
    icon: IconChartBar, title: "Automated Analytics", accent: "bg-white",
    description: "Market Sentiment Series, Decision Journals, and Tension Ledgers generated from every simulation run.",
  },
  {
    icon: IconFileText, title: "Auto-Generated PRDs", accent: "bg-black",
    description: "Engineering-ready specifications compiled from boardroom consensus — UI changes, data models, test plans.",
  },
];

const stats = [
  { value: "1M+", label: "Synthetic Users" },
  { value: "8", label: "Autonomous Layers" },
  { value: "10", label: "Boardroom Agents" },
  { value: "14+", label: "Behavioral Metrics" },
];

const useCases = [
  {
    color: "bg-white", hoverBg: "hover:bg-brand", textColor: "text-black", hoverText: "group-hover:text-black",
    Icon: IconBuildingSkyscraper, title: "FOR FOUNDERS",
    body: "Validate product-market fit using a simulated market of synthetic users. Predict user backlash, churn risk, and regulatory friction before writing a single line of code.",
  },
  {
    color: "bg-black", hoverBg: "hover:bg-brand", textColor: "text-white", hoverText: "group-hover:text-black",
    Icon: IconFileText, title: "FOR PRODUCT MANAGERS",
    body: "Ingest raw Zendesk and Slack data to extract semantic Tension Clusters. Automatically draft validated feature proposals and deep psychological user personas.",
  },
  {
    color: "bg-white", hoverBg: "hover:bg-brand", textColor: "text-black", hoverText: "group-hover:text-black",
    Icon: IconTerminal, title: "FOR ENGINEERS",
    body: "Stress-test architectures through an autonomous boardroom debate. Automatically generate engineering-ready PRDs, data models, and deployment artifacts.",
  },
];

/* ─── Helpers ─── */

const MarqueeStripe = () => (
  <div className="w-full h-14 bg-brand border-y-[6px] border-black flex items-center overflow-hidden select-none shrink-0">
    <div className="marquee-track whitespace-nowrap">
      {[...Array(2)].map((_, batch) =>
        [...Array(8)].map((__, i) => (
          <span key={`${batch}-${i}`} className="px-10 font-mono font-bold text-black uppercase tracking-[0.18em] text-sm">
            PREDICTING FRICTION BEFORE IT HAPPENS // AUTONOMOUS SOFTWARE GENESIS // ADVERSARIAL BOARDROOM // HINDSIGHT MEMORY PROTOCOL v3.0 //
          </span>
        ))
      )}
    </div>
  </div>
);

const Reveal = ({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ─── SPLASH SCREEN ─── */
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fillProgress, setFillProgress] = useState(0);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const start = performance.now();
    let frameId: number;

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setFillProgress(easeProgress * 100);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setSlideUp(true);
          setTimeout(onComplete, 800);
        }, 600);
      }
    };
    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-start justify-center bg-[#04070D] transition-transform duration-[800ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
        slideUp ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] md:bg-[size:128px_128px] pointer-events-none" />
      
      {/* Target Crosshairs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[1px] bg-white/5 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vh] w-[1px] bg-white/5 z-0" />

      <div className="relative z-10 w-full max-w-[90vw] md:max-w-[85vw] mx-auto flex flex-col h-full py-12 md:py-20 justify-between">
        
        {/* Top Header / Branding */}
        <div className="w-full flex flex-row justify-between items-end border-b-2 border-white/10 pb-6 mb-auto">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-brand grid place-items-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-lg md:text-2xl font-bold tracking-[0.1em] text-white uppercase">
                Pr_E Core
              </span>
              <span className="font-mono text-[10px] md:text-xs tracking-widest text-white/50 uppercase">
                System Initializing
              </span>
            </div>
          </div>
          <div className="hidden md:flex font-mono text-sm tracking-[0.2em] text-brand animate-pulse uppercase">
            [ Sequence // {Math.floor(fillProgress).toString().padStart(3, '0')}% ]
          </div>
        </div>

        {/* Massive Typography */}
        <div className="relative text-[13.5vw] md:text-[10.5vw] font-black uppercase tracking-[-0.05em] text-left leading-[0.82] select-none w-full my-auto flex flex-col">
          {/* Outline text */}
          <div
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
          >
            <div>PREDICTIVE</div>
            <div>REALITY</div>
            <div>ENGINE</div>
          </div>
          
          {/* Solid text filling from bottom to top */}
          <div
            className="absolute inset-0 z-10 text-white flex flex-col"
            style={{ clipPath: `inset(${100 - fillProgress}% 0 0 0)` }}
          >
            <div>PREDICTIVE</div>
            <div>REALITY</div>
            <div className="text-brand">ENGINE</div>
          </div>
        </div>

        {/* Bottom Loading Bar & Logs */}
        <div className="w-full mt-auto flex flex-col gap-4">
          <div className="flex justify-between font-mono text-[10px] md:text-xs text-white/40 tracking-widest uppercase">
            <span>Loading Neural Assets...</span>
            <span className="md:hidden text-brand">{Math.floor(fillProgress)}%</span>
            <span className="hidden md:inline">v.9.0.4 / Secure Connection</span>
          </div>
          
          <div className="w-full h-1.5 md:h-2 bg-white/10 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-brand"
              style={{ width: `${fillProgress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};


/* ─── VIDEO HERO ─── */
const VideoHero = ({ splashFinished }: { splashFinished: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

    // While splash is active, ensure it stays paused
    vid.pause();

    // If splash isn't finished yet, don't set up the timers or listeners
    if (!splashFinished) return;

    let played = false;
    let timeoutId: NodeJS.Timeout;
    let allowPlay = false;

    const attemptPlay = () => {
      if (played || !vid || !allowPlay) return;
      
      vid.muted = false;
      vid.defaultMuted = false;
      setIsMuted(false);

      vid.play()
        .then(() => { setIsPlaying(true); played = true; removeListeners(); })
        .catch((err) => {
          console.warn("Unmuted autoplay blocked by browser. Falling back to muted autoplay.", err);
          vid.muted = true;
          vid.defaultMuted = true;
          setIsMuted(true);
          
          vid.play().then(() => {
            setIsPlaying(true);
            played = true;
            // Unmuted failed, so we wait for the first click/scroll to seamlessly unmute
            const forceUnmute = () => {
              vid.muted = false;
              setIsMuted(false);
              removeListeners();
              window.removeEventListener("click", forceUnmute);
              window.removeEventListener("touchstart", forceUnmute);
              window.removeEventListener("scroll", forceUnmute);
            };
            window.addEventListener("click", forceUnmute);
            window.addEventListener("touchstart", forceUnmute);
            window.addEventListener("scroll", forceUnmute, { once: true });
          }).catch(() => {});
        });
    };

    const removeListeners = () => {
      window.removeEventListener("click", attemptPlay);
      window.removeEventListener("touchstart", attemptPlay);
      window.removeEventListener("scroll", attemptPlay);
      window.removeEventListener("keydown", attemptPlay);
    };

    // Wait exactly 5 seconds AFTER the splash screen has completely finished
    timeoutId = setTimeout(() => {
      allowPlay = true;
      if (!played) {
        attemptPlay();
      }
    }, 5000);

    // If the browser blocks unmuted autoplay, these listeners will catch the next interaction
    // (They will only trigger if allowPlay is true, meaning 5s have passed)
    window.addEventListener("click", attemptPlay);
    window.addEventListener("touchstart", attemptPlay);
    window.addEventListener("scroll", attemptPlay);
    window.addEventListener("keydown", attemptPlay);

    // Pause video when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (!vid.paused) {
              vid.pause();
              setIsPlaying(false);
            }
          } else if (played) {
            vid.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      clearTimeout(timeoutId);
      removeListeners();
      observer.disconnect();
    };
  }, [splashFinished]);

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
          preload="auto"
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.95] transition-opacity duration-1000 ease-out ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ transform: "translateZ(0)" }}
        >
          <source src="/Untitled design (1).mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays: sleek fade so text is readable but 4k video pops */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent w-full md:w-[85%] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"
        />
        {/* Bottom fade for smooth transition to next section */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
        />
      </div>

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
            <div className="px-3 py-1 border-[1.5px] border-white text-white font-mono text-[10px] tracking-[0.2em] uppercase">
              Simulation Engine Online
            </div>
          </motion.div>

          {/* Main headline */}
          <div className="mb-10 relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[1.1] drop-shadow-lg"
            >
              Simulate The
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="my-3"
            >
              <span className="inline-block bg-brand text-black px-4 py-2 text-[clamp(3rem,6vw,5.5rem)] font-black uppercase tracking-tighter leading-[0.9] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <AnimatedTextCycle
                  words={["Users", "Market", "Friction", "Backlash"]}
                  interval={3000}
                />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[1.1] drop-shadow-lg"
            >
              Before You Build
            </motion.h1>
          </div>

          {/* Subtext in a clean brutalist glass box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 relative max-w-[600px]"
          >
            <div className="relative bg-black/40 backdrop-blur-xl border-l-[6px] border-brand p-6 shadow-2xl">
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

/* ─── MAIN PAGE ─── */
export default function LandingPage() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    // Lock scroll during splash
    if (!splashFinished) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [splashFinished]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-brand selection:text-black">
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}

      {/* ══════════════════════════════════════════════
          NAV — transparent overlay on video, borders in on scroll
      ══════════════════════════════════════════════ */}
      <StickyNav />

      {/* ══════════════════════════════════════════════
          HERO — full-screen video
      ══════════════════════════════════════════════ */}
      <VideoHero splashFinished={splashFinished} />

      {/* ANCHOR for scroll-cue */}
      <div id="below-hero" />

      {/* ══════════════════════════════════════════════
          MARQUEE — structural beam separator
      ══════════════════════════════════════════════ */}
      <MarqueeStripe />

      {/* ══════════════════════════════════════════════
          STATS BAR — gapless 4-col grid
      ══════════════════════════════════════════════ */}
      <section className="w-full bg-background border-b-[6px] border-black">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-[4px] divide-y-[4px] md:divide-y-0 divide-black max-w-full">
          {stats.map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="p-10 text-center bg-background hover:bg-black hover:text-white transition-colors group cursor-default">
                <div className="text-4xl md:text-6xl font-black tracking-tighter leading-none group-hover:text-white">
                  {value}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] mt-3 group-hover:text-gray-300">
                  {label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CAPABILITIES — gapless bento
      ══════════════════════════════════════════════ */}
      <section id="capabilities" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              Intelligence<br />At Every Layer
            </h2>
            <p className="text-lg font-semibold max-w-[52ch] leading-snug text-black/70 mb-16">
              From raw data ingestion to executive-grade decision artifacts — every layer is
              autonomous, adversarial, and grounded in real behavior.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border-[4px] border-black shadow-neo-lg">
            {features.map(({ icon: Icon, title, description, accent }, i) => (
              <motion.div
                key={title}
                className={`group p-10 border-r-[4px] border-b-[4px] border-black ${i % 3 === 2 ? "md:border-r-0" : ""
                  } ${i >= 3 ? "border-b-0" : ""
                  } bg-white hover:bg-black cursor-pointer transition-colors duration-150`}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <div className={`w-14 h-14 ${accent} border-[3px] border-black flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                  <Icon size={28} stroke={2} className={accent === "bg-black" ? "text-white" : "text-black"} />
                </div>
                <h3 className="font-black text-black text-xl uppercase tracking-tight mb-3 group-hover:text-white transition-colors">
                  {title}
                </h3>
                <p className="text-base font-semibold leading-snug text-black/70 group-hover:text-white/80 transition-colors">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PIPELINE — orbital timeline on light neo-brutalist bg
      ══════════════════════════════════════════════ */}
      <section id="pipeline" className="relative py-32 px-6 md:px-12 border-y-[6px] border-black bg-[#E5E5E5] text-black overflow-hidden">
        {/* NEO-BRUTALIST GRID */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)",
            backgroundSize: "100px 100px",
            backgroundPosition: "center center",
            opacity: 0.04
          }}
        />
        
        {/* MASSIVE BACKGROUND TYPOGRAPHY */}
        <div 
          className="absolute top-10 left-[-5%] z-0 text-[18vw] font-black leading-none text-transparent opacity-10 pointer-events-none select-none" 
          style={{ WebkitTextStroke: "4px #000" }}
        >
          PIPELINE
        </div>
        <div 
          className="absolute bottom-10 right-[-5%] z-0 text-[18vw] font-black leading-none text-transparent opacity-10 pointer-events-none select-none" 
          style={{ WebkitTextStroke: "4px #000" }}
        >
          ENGINE
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="mb-16 bg-white p-8 md:p-12 border-[6px] border-black shadow-[12px_12px_0px_0px_#FF4500] max-w-2xl relative">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 text-black">
                Explore The<br />Architecture
              </h2>
              <p className="text-lg font-semibold max-w-[48ch] leading-snug text-black border-l-[6px] border-[#FF4500] pl-6 font-mono">
                Click any node to explore the pipeline. Connected layers pulse to show data flow.
              </p>
            </div>
          </Reveal>
          <RadialOrbitalTimeline timelineData={pipelineData} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          USE CASES — horizontal split tiles
      ══════════════════════════════════════════════ */}
      <section className="border-t-[6px] border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              Built For Real<br />
              <span className="text-brand">World Friction</span>
            </h2>
            <p className="text-lg font-semibold max-w-[48ch] leading-snug text-black/70 mb-16">
              Three roles. One engine. No more guessing.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border-[4px] border-black shadow-neo-lg">
            {useCases.map(({ color, hoverBg, textColor, hoverText, Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className={`group ${color} ${hoverBg} p-10 h-full border-r-[4px] border-black ${i === useCases.length - 1 ? "border-r-0" : ""} cursor-pointer transition-colors duration-150`}>
                  <div className="w-14 h-14 bg-white border-[3px] border-black flex items-center justify-center mb-8 shadow-neo-sm transition-transform group-hover:rotate-6">
                    <Icon size={26} stroke={2} className="text-black" />
                  </div>
                  <h3 className={`font-black text-2xl uppercase tracking-tight mb-4 ${textColor} ${hoverText} transition-colors`}>
                    {title}
                  </h3>
                  <div className="w-full h-1 bg-black mb-6 group-hover:bg-white transition-colors" />
                  <p className={`text-base font-semibold leading-snug ${textColor} ${hoverText} transition-colors`}>
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SCROLL ANIMATION DEMO SECTION
      ══════════════════════════════════════════════ */}
      <section className="border-t-[6px] border-black bg-background relative">
        <ContainerScroll
          titleComponent={
            <Reveal>
              <div className="flex flex-col items-start max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-black">
                  See It In<br />Action
                </h2>
                <p className="text-lg font-semibold text-black/70 max-w-[42ch] leading-snug border-l-[6px] border-brand pl-6">
                  A live look at the autonomous engine orchestrating your pipeline from ingestion to boardroom handoff.
                </p>
              </div>
            </Reveal>
          }
        >
          <div className="w-full h-full bg-black flex flex-col border-[6px] border-black overflow-hidden font-mono">
            <div className="h-10 bg-brand border-b-[4px] border-black flex items-center justify-between px-4 shrink-0">
              <span className="font-black tracking-widest text-black flex items-center gap-2 text-xs">
                <IconBolt size={14} stroke={3} /> TELEMETRY LIVE VIEW
              </span>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-brand border-[2px] border-black text-[10px] font-black text-black uppercase tracking-widest">SIM ACTIVE</span>
              </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-56 bg-[#111] border-r-[3px] border-black p-4 flex-col gap-4 hidden md:flex shrink-0">
                {stats.map(({ value, label }) => (
                  <div key={label} className="border-[2px] border-white/10 bg-black p-3 hover:-translate-y-0.5 hover:border-brand transition-all">
                    <div className="text-[9px] text-gray-500 font-black mb-1 tracking-[0.2em]">{label}</div>
                    <div className="text-xl font-black text-white">{value}</div>
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col bg-black overflow-y-auto">
                {[
                  { label: "Layer 4 // Boardroom Debate", color: "text-brand", status: "LIVE", img: "/boardroom_shot.png" },
                  { label: "Layer 5 // OASIS Sim", color: "text-brand", status: "SYNCED", img: "/oasis_shot.png" },
                ].map(({ label, color, status, img }) => (
                  <div key={label} className="flex flex-col border-b-[3px] border-black last:border-0 shrink-0">
                    <div className="h-10 bg-[#111] border-b-[2px] border-black flex items-center px-4 justify-between sticky top-0">
                      <span className="text-white font-black text-[10px] tracking-widest uppercase">{label}</span>
                      <span className={`${color} font-black text-[9px] flex items-center gap-1`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />{status}
                      </span>
                    </div>
                    <div className="bg-gray-900">
                      <img src={img} alt={label} className="w-full h-auto object-cover opacity-90" draggable={false} style={{ transform: "translateZ(0)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — full-bleed black
      ══════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 bg-black border-t-[6px] border-brand">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none mb-8">
              Predict<br />Your Future
            </h2>
            <p className="text-xl font-semibold text-white/60 max-w-[42ch] mb-12 leading-snug border-l-[6px] border-brand pl-6">
              Join early access and run your first autonomous simulation in under 5 minutes.
            </p>
            <a
              href="https://github.com/mohnish8717/tsc-archite"
              target="_blank" rel="noopener noreferrer"
              className="btn-press-white inline-flex items-center gap-3 px-8 py-5 bg-brand text-black font-mono font-black text-xl tracking-widest uppercase border-[4px] border-white shadow-neo-white"
            >
              <IconBolt size={26} stroke={2.5} />
              Run First Simulation
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="border-t-[6px] border-black py-12 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3 font-mono font-black text-xl text-black uppercase tracking-tighter">
            <span className="inline-block w-7 h-7 bg-brand border-2 border-black" />
            Autonomous Simulation Engine
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 font-mono text-xs font-bold text-black uppercase tracking-widest">
            <a href="https://github.com/mohnish8717/tsc-archite" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">GitHub</a>
            <span className="text-black/40">&#169; 2026 AGPL v3 Licensed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── STICKY NAV — transparent on video, solid after scroll ─── */
function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full h-[68px] flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${scrolled
        ? "bg-background border-b-[4px] border-black"
        : "bg-transparent border-b-[4px] border-transparent"
        }`}
    >
      <a href="/" className={`flex items-center gap-3 font-mono font-bold text-lg md:text-xl uppercase tracking-widest transition-colors ${scrolled ? "text-black" : "text-white"}`}>
        <div className={`w-6 h-6 md:w-8 md:h-8 grid place-items-center transition-all ${scrolled ? "bg-brand shadow-[3px_3px_0px_0px_#000000]" : "bg-brand shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]"}`}>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black" />
        </div>
        <span className="hidden sm:inline-block">PREDICTIVE REALITY</span>
        <span className="sm:hidden">Pr_E</span>
      </a>
      <div className="flex items-center gap-8 font-mono text-sm font-bold uppercase tracking-widest">
        <a href="#pipeline" className={`hidden md:block transition-colors hover:text-brand ${scrolled ? "text-black" : "text-white/80"}`}>
          Pipeline
        </a>
        <a href="#capabilities" className={`hidden md:block transition-colors hover:text-brand ${scrolled ? "text-black" : "text-white/80"}`}>
          Capabilities
        </a>
        <a
          href="https://github.com/mohnish8717/tsc-archite"
          target="_blank" rel="noopener noreferrer"
          className={`btn-press flex items-center gap-2 px-5 py-2 border-[3px] font-mono text-sm font-bold uppercase tracking-widest transition-all ${scrolled
            ? "bg-black text-white border-black shadow-neo-sm"
            : "bg-brand text-black border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            }`}
        >
          <IconRocket size={16} stroke={2} />
          Get Access
        </a>
      </div>
    </nav>
  );
}
