import Logo from '../../assets/images/logo2.png'
function Home(){
    return(
        <>
      <style jsx>{`
        .home {
          position: relative;
          overflow: hidden;
        }
        
        .glass-card {
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
        }
        
        .logo-border {
          position: relative;
          overflow: hidden;
        }
        
        .logo-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 2px solid transparent;
          border-radius: 1px;
          background: linear-gradient(90deg, #0575E6, #00F2FE, #0575E6) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: border-flow 4s linear infinite;
        }
        
        .water-text {
          position: relative;
        }
        
        .water-text-gradient {
          background: linear-gradient(to right, #0575E6, #00F2FE, #0575E6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: text-flow 3s linear infinite;
        }
        
        .drop-icon {
          display: inline-block;
          margin-right: 4px;
          animation: bounce 2s infinite ease;
        }
        
        .flow-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          width: 80%;
          margin: 8px auto 0;
          animation: flow 2s infinite;
        }
        
        @keyframes border-flow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes text-flow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .ripple-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: radial-gradient(circle, rgba(5, 117, 230, 0.1) 10%, transparent 70%);
          transform: scale(0);
          animation: ripple 5s infinite ease-out;
        }
        
        .ripple-bg:nth-child(2) {
          animation-delay: 1.5s;
        }
        
        .ripple-bg:nth-child(3) {
          animation-delay: 3s;
        }
        
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
      
      <div className='flex justify-center home w-full h-full items-center'>
        <div className='ripple-bg'></div>
        <div className='ripple-bg'></div>
        <div className='ripple-bg'></div>
        
        <div className='p-10 glass-card'>
          <div className='logo-border p-8 text-white'>
            <div className='text-center mb-2 text-9xl water-text'>
              <span className='drop-icon'>💧</span>
              <span className='water-text-gradient'>O.N.E.E</span>
            </div>
            <div className='text-3xl text-center water-text water-text-gradient'>BRANCHE EAU</div>
            <div className='flow-line'></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home