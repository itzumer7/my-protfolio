import { motion } from "motion/react";
import { memo } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  aspectRatio?: "1:1" | "16:9" | "16:10";
  loading?: "lazy" | "eager";
  scale?: number;
  key?: string | number;
}

const ProjectCardComponent = ({ title, image, aspectRatio = "16:10", loading = "lazy", scale = 1 }: ProjectCardProps) => {
  const aspectClass = aspectRatio === "1:1" ? "aspect-square" : aspectRatio === "16:9" ? "aspect-video" : "aspect-[16/10]";

  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-[24px] p-2 cursor-pointer"
      style={{
        background: 'rgba(30, 32, 40, 0.45)',
        border: '1.5px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        contain: 'layout style paint',
        transform: `scale(${scale})`
      }}
    >
      <div className={`relative ${aspectClass} overflow-hidden rounded-[18px]`}>
        <motion.img
          src={image}
          alt={title}
          loading={loading}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
};

export const ProjectCard = memo(ProjectCardComponent);
