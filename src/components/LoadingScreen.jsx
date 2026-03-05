import { useState, useEffect, Suspense } from 'react';
import Lanyard from './Lanyard';
import './LoadingScreen.css';

export default function LoadingScreen({ onLoadingComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleCardPulled = () => {
    setFadeOut(true);
    // Wait for fade animation to complete before calling onLoadingComplete
    setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 1000); // Match the CSS transition duration
  };

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <Suspense fallback={null}>
        <Lanyard 
          position={[0, 0, 20]} 
          gravity={[0, -40, 0]} 
          transparent={false}
          onCardDragged={handleCardPulled}
        />
      </Suspense>
      <div className="pull-instruction">Pull the card</div>
    </div>
  );
}
