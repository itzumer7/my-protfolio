/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ProjectCard } from "./components/ProjectCard";
import { ChevronDown, MessageSquare, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const THUMBNAILS = [
  {
    title: "Space Explorer",
    description: "An epic cinematic render of an astronaut witnessing the awe-inspiring power of a massive black hole.",
    image: "/images/thumb5.png",
    tags: ["Thumbnail", "Cinematic", "Space"],
  },
  {
    title: "Life Tycoon",
    description: "A vibrant collage showcasing the diverse lifestyle and luxury elements of a tycoon experience.",
    image: "/images/thumb4.png",
    tags: ["Thumbnail", "Tycoon", "Collage"],
  },
  {
    title: "Ice Cave Discovery",
    description: "Atmospheric exploration scene featuring a character navigating a mysterious frozen cavern with a lantern.",
    image: "/images/thumb1.png",
    tags: ["Thumbnail", "Atmospheric", "Adventure"],
  },
  {
    title: "Slap Tower Obby",
    description: "High-energy action thumbnail for a fast-paced tower climbing and slapping game.",
    image: "/images/thumb2.png",
    tags: ["Thumbnail", "Action", "Roblox"],
  },
  {
    title: "Donate Me",
    description: "Engaging social interaction scene designed for donation-based simulator games.",
    image: "/images/thumb6.png",
    tags: ["Thumbnail", "Social", "Simulator"],
  },
  {
    title: "Noob vs Pro Evolution",
    description: "High-CTR comparison thumbnail designed to showcase character progression and power scaling.",
    image: "/images/thumb3.png",
    tags: ["Thumbnail", "CTR", "Roblox"],
  }
];

const GAME_ICONS = [
  {
    title: "Chained Together",
    description: "High-energy icon for a collaborative survival game.",
    image: "/images/icon3.png",
    tags: ["Icon", "Survival", "Roblox"],
  },
  {
    title: "Pet Simulator",
    description: "Vibrant and engaging icon for a pet collection and simulation experience.",
    image: "/images/icon2.png",
    tags: ["Icon", "Simulator", "Pets"],
  },
  {
    title: "Fight with Brainrots",
    description: "Dynamic action icon for a high-intensity combat game.",
    image: "/images/icon1.png",
    tags: ["Icon", "Action", "Roblox"],
  },
  {
    title: "Football World Cup",
    description: "High-intensity sports icon for a global football tournament experience.",
    image: "/images/icon4.png",
    tags: ["Icon", "Sports", "Roblox"],
  }
];

const SKIN_GFX = [
  {
    title: "Neon Boy Skin",
    description: "Vibrant neon-themed character design with high-contrast lighting.",
    image: "/images/skin1.jpeg",
    tags: ["Skin GFX", "Neon", "Character"],
  },
  {
    title: "Male Agent Skin",
    description: "Sleek and professional agent character design with tactical gear.",
    image: "/images/skin2.jpeg",
    tags: ["Skin GFX", "Agent", "Tactical"],
  }
];

const ICONS_UI = [
  {
    title: "Game UI",
    description: "Sleek and functional game interface design for immersive gameplay.",
    image: "/images/101.png",
    tags: ["UI", "Interface", "Modern"],
  },
  {
    title: "Icons",
    description: "Custom game icons and UI elements designed for clarity and style.",
    image: "/images/100.png",
    tags: ["UI", "Icons", "16:9"],
  }
];

const REVIEWS = [
  {
    name: "Alex",
    text: "The thumbnail quality is insane. My game's CTR jumped by 15% immediately after switching to Umer's work. Best Roblox GFX artist I've worked with!",
    rating: 5,
    type: "Thumbnail"
  },
  {
    name: "Sarah",
    text: "Umer's UI design is so clean and intuitive. The icons he made for my simulator are perfect. Highly recommend for any game dev.",
    rating: 5,
    type: "UI & Icons"
  },
  {
    name: "Jordan",
    text: "The custom skin GFX is top-tier. The lighting and posing are exactly what I was looking for. Will definitely be back for more!",
    rating: 5,
    type: "Skin GFX"
  }
];

const PRICING = {
  gfx: [
    {
      title: "3D Icons",
      description: "Clean, high-detail 3D icons for your games.",
      robux: "1.2k+",
      usd: "12",
      delivery: "8-20 hours",
      features: ["2 Revision pass", "HD Export (Roblox ready)"]
    },
    {
      title: "3D Thumbnails",
      description: "High Quality Thumbnails for your games or videos.",
      robux: "1.8k+",
      usd: "18",
      delivery: "8-20 hours",
      features: ["2 Revision pass", "Can do both CTR and non-CTR"]
    },
    {
      title: "3D Profile Pictures",
      description: "Engaging profile pictures for your YouTube or Discord.",
      robux: "1k+",
      usd: "10",
      delivery: "8-20 hours",
      features: ["2 Revision pass", "Custom posing & lighting"]
    }
  ],
  art: [
    {
      title: "2D Icons",
      description: "Hand-drawn 2D icons matching your game style.",
      robux: "2.5k+",
      usd: "25",
      delivery: "8-20 hours",
      features: ["2 Revision pass", "Clean export ready for Roblox UI"]
    },
    {
      title: "2D Thumbnails",
      description: "Fully illustrated 2D thumbnails for games or videos.",
      robux: "3k+",
      usd: "30",
      delivery: "8-20 hours",
      features: ["2 Revision passes", "CTR-friendly compositions"]
    },
    {
      title: "2D UI & HUD",
      description: "Custom hand-drawn UI elements and HUD systems.",
      robux: "1.2k+",
      usd: "12",
      delivery: "8-20 hours",
      features: ["2 Revision pass", "Vector-ready exports"]
    }
  ]
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pricingTab, setPricingTab] = useState<'gfx' | 'art'>('gfx');

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.4,
      touchMultiplier: 0.4,
      infinite: false,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { 
        offset: -100, 
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-yellow-500/30 bg-[#050302] text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-black/80 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => scrollToSection('home')}
          className="text-lg font-black tracking-tighter text-white cursor-pointer group"
        >
          ITZ_UMER <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">PORTFOLIO</span>
        </motion.div>
        <div className="flex gap-4 md:gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
          <button 
            onClick={() => scrollToSection('work')} 
            className="transition-all duration-200 hover:scale-105 hover:text-yellow-400 text-white/70"
          >
            Work
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="transition-all duration-200 hover:scale-105 hover:text-yellow-400 text-white/70"
          >
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="transition-all duration-200 hover:scale-105 hover:text-yellow-400 text-white/70"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="transition-all duration-200 hover:scale-105 hover:text-yellow-400 text-white/70"
          >
            Contact
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center px-4">
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                className="space-y-6 max-w-4xl"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full text-[11px] font-bold uppercase tracking-widest text-yellow-400"
                >
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                  REMOTE GFX ARTIST
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.8] uppercase"
                >
                  ELEVATING <br /> 
                  <span className="text-transparent stroke-text">ROBLOX</span> <br />
                  <span className="text-yellow-400">VISUALS</span>
                </motion.h1>
                
                <div className="flex justify-center gap-8 md:gap-16 pt-6">
                  <div className="text-center">
                    <div className="text-xl md:text-3xl font-black text-white">2K+</div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/40">Visits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-3xl font-black text-white">200+</div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/40">Clients</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                onClick={() => scrollToSection('work')}
              >
                <ChevronDown className="w-6 h-6 animate-bounce text-yellow-400" />
              </motion.div>
            </section>

            {/* Work Sections */}
            <div id="work" className="space-y-32 py-32">
              {/* Game Thumbnails */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">GAME THUMBNAILS</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                  {THUMBNAILS.map((project, index) => (
                      <ProjectCard 
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        aspectRatio="16:9"
                      />
                  ))}
                </div>
              </section>

              {/* Game Icons */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">GAME ICONS</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
                  {GAME_ICONS.map((project, index) => (
                      <ProjectCard 
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        aspectRatio="1:1"
                      />
                  ))}
                </div>
              </section>

              {/* Skin GFX */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">SKIN GFX</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                  {SKIN_GFX.map((project, index) => (
                      <ProjectCard 
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        aspectRatio="16:9"
                      />
                  ))}
                </div>
              </section>

              {/* Icons & UI */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">ICONS & UI</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                  {ICONS_UI.map((project, index) => (
                      <ProjectCard 
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        aspectRatio="16:9"
                      />
                  ))}
                </div>
              </section>
            </div>

            {/* About Me Section */}
            <section 
              id="about" 
              className="py-32 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">ABOUT ME</h2>
                  </div>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium">
                    Since <span className="text-white font-bold">mid-2022</span>, I’ve been dedicated to <span className="text-white font-bold">mastering the art</span> of Roblox GFX. 
                    I blend <span className="text-white font-bold">strategic design</span> with <span className="text-white font-bold">high-end aesthetics</span> to create 
                    <span className="text-yellow-400 font-black"> (High-CTR thumbnails)</span> and <span className="text-white font-bold">2D art</span> that doesn't just look great—it <span className="underline decoration-yellow-400 underline-offset-8">performs</span>. 
                    If you need visuals that <span className="text-white font-bold italic">stop the scroll</span> and <span className="text-white font-bold">drive clicks</span>, I’m your creator.
                  </p>
                  <div className="flex gap-4">
                    <button 
                    onClick={() => window.open('https://discord.com/users/1184431605335474279', '_blank')}
                    className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-full font-black uppercase tracking-widest text-[12px] transition-all duration-200 hover:scale-102 active:scale-98"
                    >
                      Let's Talk
                    </button>
                  </div>
                </div>
                <div className="relative group max-w-sm mx-auto lg:mx-0">
                  <div className="absolute inset-0 bg-yellow-400 rounded-[24px] rotate-6 group-hover:rotate-3 transition-transform duration-500 -z-10" />
                  <div className="overflow-hidden rounded-[24px] aspect-square glass">
                    <img 
                      src="/images/aboutme.png" 
                      alt="ITZ_UMER" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section 
              className="py-32 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto"
            >
              <div className="text-center mb-12 space-y-2">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">REVIEWS</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REVIEWS.map((review, index) => (
                  <div
                    key={index}
                    className="glass p-5 rounded-[20px] space-y-3 relative overflow-hidden group transition-transform duration-300 hover:-translate-y-2"
                  >
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/70 italic text-sm leading-relaxed">"{review.text}"</p>
                    <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                      <span className="font-bold text-white text-[12px]">{review.name}</span>
                      <span className="text-[8px] uppercase tracking-widest text-yellow-400 font-bold">{review.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing Section */}
            <section 
              id="pricing"
              className="py-32 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto border-t border-white/10"
            >
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">PRICING</h2>
              </div>

              <div className="flex justify-center mb-12">
                <div className="glass p-1 rounded-full flex gap-1 bg-black/40 border border-white/5">
                  <button
                    onClick={() => setPricingTab('gfx')}
                    className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${
                      pricingTab === 'gfx' ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    3D / GFX
                  </button>
                  <button
                    onClick={() => setPricingTab('art')}
                    className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${
                      pricingTab === 'art' ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    2D Art
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="wait">
                  {PRICING[pricingTab].map((tier, index) => (
                    <motion.div
                      key={`${pricingTab}-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      className="glass p-6 rounded-[24px] flex flex-col h-full group hover:border-yellow-400/30 transition-all duration-300 hover:bg-white/[0.02]"
                    >
                      <div className="mb-6">
                        <h3 className="text-lg font-black uppercase tracking-tight mb-1.5 group-hover:text-yellow-400 transition-colors duration-200">{tier.title}</h3>
                        <p className="text-white/40 text-[12px] font-medium leading-relaxed">{tier.description}</p>
                      </div>
                      
                      <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-white tracking-tighter">${tier.usd}</span>
                          <span className="text-yellow-400 text-[8px] font-black uppercase tracking-widest">USD</span>
                        </div>
                        <div className="w-full h-px bg-white/5" />
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-white tracking-tighter">{tier.robux}</span>
                          <span className="text-yellow-400 text-[8px] font-black uppercase tracking-widest">Robux</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8 flex-grow">
                        <div className="flex items-start gap-3 text-[12px] text-white/60 font-medium">
                          <div className="mt-1 w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)] flex-shrink-0" />
                          Delivery: {tier.delivery}
                        </div>
                        {tier.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-3 text-[12px] text-white/60 font-medium">
                            <div className="mt-1 w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)] flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => scrollToSection('contact')}
                        className="w-full py-3 glass bg-white/5 hover:bg-yellow-400 hover:text-black rounded-lg text-[11px] font-black uppercase tracking-widest transition-all duration-200 border border-white/10 hover:border-yellow-400 active:scale-95"
                      >
                        Order Now
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* Contact Section */}
            <section 
              id="contact" 
              className="py-32 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto"
            >
              <motion.div 
                whileHover={{ scale: 1.005 }}
                className="glass rounded-[32px] p-10 md:p-16 text-center space-y-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400" />
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none uppercase">
                  READY TO <br />
                  <span className="text-yellow-400">DOMINATE?</span>
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  <button 
                    onClick={() => window.open('https://discord.com/users/1184431605335474279', '_blank')}
                    className="group flex items-center gap-3 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black rounded-full font-black text-base uppercase tracking-widest transition-all duration-200 hover:scale-102 active:scale-98"
                  >
                    CONTACT ME
                    <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-[12px] font-bold uppercase tracking-[0.3em]">
              <div>© 2026 ITZ_UMER PORTFOLIO. ALL RIGHTS RESERVED.</div>
            </footer>
          </main>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px white;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050302;
        }
        ::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #facc15;
        }
        .lenis.lenis-smooth {
          height: auto;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
        /* Optimize animations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        /* Reduce paint operations during scroll */
        body {
          scroll-behavior: auto;
        }
        img {
          display: block;
        }
      `}</style>
    </div>
  );
}