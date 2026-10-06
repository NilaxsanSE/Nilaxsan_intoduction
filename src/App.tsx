import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Play, Video } from "lucide-react";

const videoSrc = "/media/IMG_6927.mp4";
const cvSrc = "/media/Nilaxsan_Suvendralingam_CV.pdf";

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return null;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setHasStarted(true);
    await video.play();
  };

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-cyan-300 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34rem),radial-gradient(circle_at_80%_15%,rgba(59,130,246,0.13),transparent_30rem),linear-gradient(180deg,#020617_0%,#07111f_48%,#020617_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.028)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="one-screen-shell mx-auto flex min-h-[100svh] w-full max-w-[1220px] flex-col px-4 py-4 sm:px-7 lg:px-8">
        <header className="flex shrink-0 items-center justify-between gap-4">
          <p className="min-w-0 truncate text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-100/70 sm:text-xs sm:tracking-[0.18em]">
            Video Introduction{duration ? ` • ${duration}` : ""}
          </p>
          <a
            href={cvSrc}
            download="Suvendralingam_Nilaxsan_CV.pdf"
            aria-label="Download CV"
            className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-cyan-200/15 bg-white/[0.025] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-cyan-200/45 hover:bg-cyan-200/10 hover:text-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-slate-950 sm:px-3.5"
          >
            CV
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="intro-copy mx-auto w-full max-w-4xl text-center"
        >
          <h1 className="text-balance text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.02] tracking-normal text-white">
            Hello, I&apos;m Nilaxsan.
          </h1>
          <p className="mt-2 text-[clamp(1rem,1.6vw,1.35rem)] text-cyan-100/90">
            Software Engineer • Full-Stack Developer
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Computer Science graduate and Software Developer building practical full-stack software
            solutions.
          </p>
        </motion.div>

        <motion.section
          id="video"
          initial={{ opacity: 0, y: 14, scale: 0.992 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="video-stage mx-auto flex w-full flex-1 flex-col items-center justify-center"
          aria-label="Video introduction"
        >
          <p className="mb-2 text-center text-xs text-slate-400 sm:text-sm">
            Based in Sri Lanka • Open to International Opportunities
          </p>

          <div className="video-shell relative aspect-video overflow-hidden rounded-[clamp(1rem,2vw,1.65rem)] border border-white/12 bg-slate-950 shadow-[0_28px_110px_rgba(14,165,233,0.18)] ring-1 ring-cyan-200/10">
            <video
              ref={videoRef}
              className="h-full w-full bg-slate-950 object-contain"
              controls
              playsInline
              preload="metadata"
              onLoadedMetadata={(event) => {
                setDuration(formatDuration(event.currentTarget.duration));
              }}
              onPlay={() => setHasStarted(true)}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support HTML5 video playback.
            </video>

            {!hasStarted && (
              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 grid place-items-center bg-slate-950/62 text-center backdrop-blur-[2px] transition hover:bg-slate-950/50 focus:outline-none focus:ring-4 focus:ring-cyan-300/60"
                aria-label="Play video introduction"
              >
                <span className="flex flex-col items-center gap-5">
                  <span className="grid h-[clamp(4rem,7vw,5.5rem)] w-[clamp(4rem,7vw,5.5rem)] place-items-center rounded-full border border-cyan-200/40 bg-cyan-200/12 text-cyan-100 shadow-2xl shadow-cyan-950/60">
                    <Play className="ml-1 h-[42%] w-[42%] fill-current" aria-hidden="true" />
                  </span>
                  <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-cyan-50 sm:text-sm">
                    <Video className="h-5 w-5" aria-hidden="true" />
                    Video Introduction
                  </span>
                </span>
              </button>
            )}
          </div>
        </motion.section>

        <footer className="shrink-0 py-1 text-center text-xs text-slate-500">
          © 2026 Suvendralingam Nilaxsan
        </footer>
      </div>
    </main>
  );
}

export default App;
