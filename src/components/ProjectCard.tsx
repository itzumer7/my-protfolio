import { motion } from "motion/react";
import { memo } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  aspectRatio?: "1:1" | "16:9" | "16:10";
  loading?: "lazy" | "eager";
  key?: string | number;
}

const ProjectCardComponent = ({ title, image, aspectRatio = "16:10", loading = "lazy" }: ProjectCardProps) => {
  const aspectClass = aspectRatio === "1:1" ? "aspect-square" : aspectRatio === "16:9" ? "aspect-video" : "aspect-[16/10]";

  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="glass group relative overflow-hidden rounded-[24px] p-2 cursor-pointer"
      style={{ contain: 'layout style paint' }}
    >
      <div className={`relative ${aspectClass} overflow-hidden rounded-[18px]`}>
        <motion.img
          src={image}
          alt={title}
          loading={loading}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          referrerPolicy="no-referrer"
        />
        <motion.div 
          className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-6 text-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div 
            className="transform"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white leading-none">{title}</h3>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ProjectCard = memo(ProjectCardComponent);
