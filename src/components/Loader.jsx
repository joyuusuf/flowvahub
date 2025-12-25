export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src="/flowva_logo.png" 
        alt="Logo"
        className="w-45 h-32 animate-[fade_1.5s_ease-in-out_infinite]"
        style={{
          animationName: 'fade',
          animationDuration: '1.5s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}
      />
      <style jsx>{`
        @keyframes fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

