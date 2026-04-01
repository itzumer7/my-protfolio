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
    title: "FPS ACTION",
    description: "A vibrant collage showcasing the diverse lifestyle and luxury elements of a tycoon experience.",
    image: "/images/uthumbnail1.png",
    tags: ["Thumbnail", "fps", "Collage"],
  },
  {
    title: "Noob vs Pro Evolution",
    description: "High-CTR comparison thumbnail designed to showcase character progression and power scaling.",
    image: "/images/newthumb2.png",
    tags: ["Thumbnail", "CTR", "Roblox"],
  },
  {
    title: "Game Thumbnail 1",
    description: "High-quality game thumbnail design.",
    image: "/images/thumbnail1.png",
    tags: ["Thumbnail", "Game"],
  },
  {
    title: "Game Thumbnail 2",
    description: "High-quality game thumbnail design.",
    image: "/images/thumbnail2.png",
    tags: ["Thumbnail", "Game"],
  },
  {
    title: "Game Thumbnail 3",
    description: "High-quality game thumbnail design.",
    image: "/images/thumbnail3.png",
    tags: ["Thumbnail", "Game"],
  },
  {
    title: "Game Thumbnail 4",
    description: "High-quality game thumbnail design.",
    image: "/images/thumbnail4.png",
    tags: ["Thumbnail", "Game"],
  },
  {
    title: "Game Thumbnail 6",
    description: "High-quality game thumbnail design.",
    image: "/images/thumbnail6.png",
    tags: ["Thumbnail", "Game"],
  },
  {
    title: "Game Thumbnail 8",
    description: "High-quality game thumbnail design.",
    image: "/images/thumbnail8.png",
    tags: ["Thumbnail", "Game"],
  },
  {
    title: "Game Thumbnail 9",
    description: "High-quality game thumbnail design.",
    image: "/images/thumbnail9.png",
    tags: ["Thumbnail", "Game"],
  }
];

const GAME_ICONS = [
  {
    title: "Game Icon 1",
    description: "High-quality game icon design.",
    image: "/images/1icon.png",
    tags: ["Icon", "Game"],
  },
  {
    title: "Game Icon 2",
    description: "High-quality game icon design.",
    image: "/images/2icon.png",
    tags: ["Icon", "Game"],
  },
  {
    title: "Game Icon 3",
    description: "High-quality game icon design.",
    image: "/images/3icon.png",
    tags: ["Icon", "Game"],
  },
  {
    title: "Game Icon 4",
    description: "High-quality game icon design.",
    image: "/images/newicon4.png",
    tags: ["Icon", "Game"],
  }
];

const SKIN_GFX = [
  {
    title: "Character Skin Render",
    description: "High-quality character skin design and render.",
    image: "/images/skins1.png",
    tags: ["Skin GFX", "Character", "Render"],
  },
  {
    title: "Male Agent Skin",
    description: "Sleek and professional agent character design with tactical gear.",
    image: "/images/12.png",
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

const PROFILE_PICTURES = [
  {
    title: "PFP 1",
    description: "Custom profile picture design for social media and gaming platforms.",
    image: "/images/1pfp.png",
    tags: ["Profile Picture", "Custom", "Design"],
  },
  {
    title: "PFP 2",
    description: "Custom profile picture design for social media and gaming platforms.",
    image: "/images/2pfp.png",
    tags: ["Profile Picture", "Custom", "Design"],
  },
  {
    title: "PFP 3",
    description: "Custom profile picture design for social media and gaming platforms.",
    image: "/images/3pfp.png",
    tags: ["Profile Picture", "Custom", "Design"],
  }
];

const REVIEWS = [
  {
    name: "Thomas",
    text: "The quality of the thumbnail is insane. The CTR of my game increased by 15% just after using his work. The best GFX artist in Roblox that I have ever worked with!",
    rating: 5,
    type: "Thumbnail"
  },
  {
    name: "Sarah",
    text: "this man work on the UI is amazing. The icons that he created for my simulator game were exactly what I needed. Highly recommend for any game developer!",
    rating: 5,
    type: "UI & Icons"
  },
  {
    name: "Jordan",
    text: "The quality of the custom skin GFX is amazing. The lighting is exactly what I wanted. Definitely will be back for more!",
    rating: 5,
    type: "Skin GFX"
  }
];

const PRICING = {
  gfx: [
    {
      title: "3D ICONS",
      description: "Clean, high-detail icons for your game.",
      robux: "1.2k+",
      usd: "12",
      delivery: "Same day (8–20 hours)",
      features: ["2 Revisions", "High-Res Export"]
    },
    {
      title: "3D THUMBNAILS",
      description: "High-quality scenes for games or YouTube.",
      robux: "1.8k+",
      usd: "18",
      delivery: "Same day (8–20 hours)",
      features: ["2 Revisions", "Click-focused (CTR) styles available"]
    },
    {
      title: "3D PROFILE PICTURES",
      description: "Custom PFP for your Discord or YouTube.",
      robux: "1k+",
      usd: "10",
      delivery: "Same day (8–20 hours)",
      features: ["Custom posing & lighting", "2 Revisions"]
    }
  ],
  art: [
    {
      title: "2D ICONS",
      description: "Custom hand-drawn 2D icons for your game.",
      robux: "800+",
      usd: "8",
      delivery: "8-20 hours",
      features: ["2 Revision pass", "Vector-ready exports"]
    },
    {
      title: "2D THUMBNAILS",
      description: "High-quality 2D artwork for games or YouTube.",
      robux: "1.2k+",
      usd: "12",
      delivery: "8-20 hours",
      features: ["2 Revision pass", "Click-focused (CTR) styles available"]
    },
    {
      title: "2D UI",
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
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
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

  // Removed background audio effect

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
    <div ref={containerRef} className="relative min-h-screen font-sans" style={{ background: 'transparent' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4" style={{
        background: 'rgba(15, 15, 20, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => scrollToSection('home')}
          className="text-lg font-black tracking-tighter text-white cursor-pointer group drop-shadow-lg"
        >
          ITZ_UMER <span className="text-orange-500 group-hover:text-orange-400 transition-colors">PORTFOLIO</span>
        </motion.div>
        <div className="flex gap-4 md:gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
          <button 
            onClick={() => scrollToSection('work')} 
            className="transition-all duration-200 hover:scale-105 hover:text-orange-500 text-white/80"
          >
            Work
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="transition-all duration-200 hover:scale-105 hover:text-orange-500 text-white/80"
          >
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="transition-all duration-200 hover:scale-105 hover:text-orange-500 text-white/80"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="transition-all duration-200 hover:scale-105 hover:text-orange-500 text-white/80"
          >
            Contact
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center px-4" style={{ background: 'transparent' }}>
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                className="space-y-6 max-w-4xl"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: 'rgba(30, 32, 40, 0.45)',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)'
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-orange-500"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                  REMOTE GFX ARTIST
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.8] uppercase text-white drop-shadow-2xl"
                >
                  ELEVATING <br /> 
                  <span className="text-orange-500">ROBLOX</span> <br />
                  <span className="text-orange-400">VISUALS</span>
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                onClick={() => scrollToSection('work')}
              >
                <ChevronDown className="w-6 h-6 animate-bounce text-orange-500" />
              </motion.div>
            </section>

            {/* Work Sections */}
            <div id="work" className="space-y-32 py-32">
              {/* Game Thumbnails */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-32"
                style={{ background: 'transparent' }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white drop-shadow-lg">GAME THUMBNAILS</h2>
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
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                  ))}
                </div>
              </section>

              {/* Game Icons */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-32"
                style={{ background: 'transparent' }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white drop-shadow-lg">GAME ICONS</h2>
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
                        scale={1.05}
                      />
                  ))}
                </div>
              </section>

              {/* Skin GFX */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-32"
                style={{ background: 'transparent' }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white drop-shadow-lg">CHARACTER RENDERS</h2>
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

              {/* Profile Pictures */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-32"
                style={{ background: 'transparent' }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white drop-shadow-lg">PROFILE PICTURES</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
                  {PROFILE_PICTURES.map((project, index) => (
                      <ProjectCard 
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        aspectRatio="1:1"
                        scale={1.05}
                      />
                  ))}
                </div>
              </section>

              {/* Icons & UI */}
              <section 
                className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-32"
                style={{ background: 'transparent' }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white drop-shadow-lg">ICONS & UI</h2>
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
              className="py-32 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto"
              style={{
                background: 'rgba(30, 32, 40, 0.45)',
                border: '1.5px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '24px',
                margin: '0 auto'
              }}
            >
              <div className="max-w-3xl mx-auto text-center">
                <div className="space-y-8">
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white">ABOUT ME</h2>
                  </div>
                  <p className="text-base md:text-lg text-white leading-relaxed font-medium">
                    I'm a <span className="text-white font-bold">GFX artist</span> focusing on <span className="text-white font-bold italic">3D character renders</span> and <span className="text-white font-bold">game icons</span>. 
                    I started doing this because I wanted to make the <span className="text-orange-500 font-bold">Roblox world</span> look more detailed. 
                    I spend most of my time in <span className="text-white font-bold">Blender</span> and <span className="text-white font-bold">Photoshop</span> making sure the <span className="underline decoration-orange-500 underline-offset-8">lighting</span> and <span className="underline decoration-orange-500 underline-offset-8">shaders</span> look exactly right.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button 
                    onClick={() => window.open('https://discord.com/users/1184431605335474279', '_blank')}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-black uppercase tracking-widest text-[12px] transition-all duration-200 hover:scale-102 active:scale-98"
                    >
                      Let's Talk
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section 
              className="py-32 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto"
              style={{ background: 'transparent' }}
            >
              <div className="text-center mb-12 space-y-2">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white drop-shadow-lg">REVIEWS</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REVIEWS.map((review, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(30, 32, 40, 0.45)',
                      border: '1.5px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      borderRadius: '20px'
                    }}
                    className="p-5 space-y-3 relative overflow-hidden group transition-transform duration-300 hover:-translate-y-2"
                  >
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                    <p className="text-white/80 italic text-sm leading-relaxed">"{review.text}"</p>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                      <span className="font-bold text-white text-[12px]">{review.name}</span>
                      <span className="text-[8px] uppercase tracking-widest text-orange-500 font-bold">{review.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing Section */}
            <section 
              id="pricing"
              className="py-32 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto"
              style={{ background: 'transparent' }}
            >
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-lg">PRICING</h2>
              </div>

              <div className="flex justify-center mb-12">
                <div style={{
                  background: 'rgba(30, 32, 40, 0.45)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '50px',
                  padding: '4px'
                }} className="flex gap-1">
                  <button
                    onClick={() => setPricingTab('gfx')}
                    className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${
                      pricingTab === 'gfx' ? 'bg-orange-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    3D / GFX
                  </button>
                  <button
                    onClick={() => setPricingTab('art')}
                    className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${
                      pricingTab === 'art' ? 'bg-orange-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/10'
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
                      style={{
                        background: 'rgba(30, 32, 40, 0.45)',
                        border: '1.5px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderRadius: '24px'
                      }}
                      className="p-6 flex flex-col h-full group transition-all duration-300"
                    >
                      <div className="mb-6">
                        <h3 className="text-lg font-black uppercase tracking-tight mb-1.5 group-hover:text-orange-500 transition-colors duration-200 text-white">{tier.title}</h3>
                        <p className="text-white/60 text-[12px] font-medium leading-relaxed">{tier.description}</p>
                      </div>
                      
                      <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-white tracking-tighter">${tier.usd}</span>
                          <span className="text-orange-500 text-[8px] font-black uppercase tracking-widest">USD</span>
                        </div>
                        <div className="w-full h-px bg-white/10" />
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-white tracking-tighter">{tier.robux}</span>
                          <span className="text-orange-500 text-[8px] font-black uppercase tracking-widest">Robux</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8 flex-grow">
                        <div className="flex items-start gap-3 text-[12px] text-white/60 font-medium">
                          <div className="mt-1 w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" />
                          Delivery: {tier.delivery}
                        </div>
                        {tier.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-3 text-[12px] text-white/60 font-medium">
                            <div className="mt-1 w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => scrollToSection('contact')}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[11px] font-black uppercase tracking-widest transition-all duration-200 active:scale-95"
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
              style={{ background: 'transparent' }}
            >
              <motion.div 
                whileHover={{ scale: 1.005 }}
                style={{
                  background: 'rgba(30, 32, 40, 0.6)',
                  border: '1.5px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '32px'
                }}
                className="p-10 md:p-16 text-center space-y-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none uppercase text-white drop-shadow-lg">
                  HAVE A <br />
                  <span className="text-orange-500">PROJECT IN MIND?</span>
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  <button 
                    onClick={() => window.open('https://discord.com/users/1184431605335474279', '_blank')}
                    className="group flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-black text-base uppercase tracking-widest transition-all duration-200 hover:scale-102 active:scale-98"
                  >
                    CONTACT ME
                    <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-[12px] font-bold uppercase tracking-[0.3em]" style={{
              background: 'rgba(15, 15, 20, 0.4)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
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