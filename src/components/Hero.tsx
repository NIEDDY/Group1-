import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.png";

/**
 * Hero
 * - preserves original API and behavior (buttons, text, imports)
 * - replaces single <img> with three spaced circular crops of the same asset
 * - adds modern, subtle animations (floating, staggered fade-in, hover scale)
 * - respects prefers-reduced-motion (turns animations off)
 *
 * Drop-in replacement for your existing Hero.tsx
 */
const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-primary to-primary-glow text-primary-foreground pt-16"
      aria-label="Hero section"
    >
      {/* Local component CSS for animations and spacing.
          We include it here so this file is self-contained and safe to drop in.
          The media query respects prefers-reduced-motion to disable motion for users who opt out. */}
      <style>{`
        /* Floating animation (gentle vertical motion + subtle rotate) */
        @keyframes floatY {
          0% { transform: translateY(0) translateZ(0) rotate(0.0deg); }
          50% { transform: translateY(-12px) translateZ(0) rotate(-0.6deg); }
          100% { transform: translateY(0) translateZ(0) rotate(0.0deg); }
        }

        /* Entrance fade/slide */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* unique classes to scope animations */
        .hero-circle {
          transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms;
          will-change: transform;
        }
        .hero-circle:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 18px 40px rgba(16,40,64,0.18);
        }

        /* floating variants with different durations/delays */
        .float-1 { animation: floatY 6.8s ease-in-out infinite; animation-delay: 0s; }
        .float-2 { animation: floatY 7.6s ease-in-out infinite; animation-delay: 0.9s; }
        .float-3 { animation: floatY 8.4s ease-in-out infinite; animation-delay: 1.6s; }

        /* entrance */
        .enter-stagger { animation: fadeInUp 700ms cubic-bezier(.2,.9,.2,1) both; }
        .enter-stagger.delay-1 { animation-delay: 120ms; }
        .enter-stagger.delay-2 { animation-delay: 240ms; }
        .enter-stagger.delay-3 { animation-delay: 360ms; }

        /* reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .float-1, .float-2, .float-3, .enter-stagger { animation: none !important; }
          .hero-circle:hover { transform: none !important; }
        }
      `}</style>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: copy + CTAs (unchanged) */}
          <div className="space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Empowering Cooperatives Through Digital Innovation
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-prose">
              Smart Cooperative Hub is a comprehensive digital platform that enables cooperatives to manage members,
              finances, products, and connect with buyers through a transparent marketplace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right column: three spaced circles with animations */}
          <div className="relative w-full h-[440px] md:h-[520px] lg:h-[520px] pointer-events-none" aria-hidden>
            {/* SVG dashed connectors (kept decorative) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1200 700"
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* Connector lines between centers; tuned to circle positions below */}
              <path
                d="M 760 120 C 720 180 640 240 560 320"
                fill="none"
                stroke="rgba(42,181,216,0.28)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <path
                d="M 560 320 C 620 360 700 420 820 460"
                fill="none"
                stroke="rgba(108,194,74,0.22)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            {/* Large top-right circle */}
            <div
              className="absolute right-6 md:right-16 lg:right-20 top-8 md:top-6 lg:top-12 w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden hero-circle float-1 enter-stagger delay-1"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "70% 18%", // crop to different part of the image
                border: "8px solid rgba(255,255,255,0.7)",
                boxShadow: "0 22px 50px rgba(16,40,64,0.15)",
              }}
            />

            {/* Middle-left circle (spaced further left/down) */}
            <div
              className="absolute left-8 md:left-20 lg:left-24 top-44 md:top-56 lg:top-60 w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden hero-circle float-2 enter-stagger delay-2"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "18% 62%",
                border: "6px solid rgba(255,255,255,0.6)",
                boxShadow: "0 14px 36px rgba(16,40,64,0.12)",
              }}
            />

            {/* Bottom-right circle (spaced lower/right) */}
            <div
              className="absolute right-24 md:right-36 lg:right-44 bottom-6 md:bottom-12 lg:bottom-10 w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden hero-circle float-3 enter-stagger delay-3"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "85% 82%",
                border: "6px solid rgba(255,255,255,0.55)",
                boxShadow: "0 16px 40px rgba(16,40,64,0.14)",
              }}
            />

            {/* Decorative accent dots / blobs for parity with reference */}
            <div className="absolute right-8 top-44 w-6 h-6 rounded-full bg-pink-300 opacity-60 blur-sm" />
            <div className="absolute left-36 bottom-28 w-20 h-20 rounded-full bg-purple-400 opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;