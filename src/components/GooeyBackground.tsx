export const GooeyBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050302]" style={{ contain: 'layout' }}>
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[20px]"
          style={{ transform: 'translateZ(0)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-orange-900/10 rounded-full blur-[25px]"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#050302] pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
};
