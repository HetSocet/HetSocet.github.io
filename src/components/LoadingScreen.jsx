import { useState, useEffect, Suspense } from 'react';
import Lanyard from './Lanyard';
import './LoadingScreen.css';

export default function LoadingScreen({ onLoadingComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [showLanyard, setShowLanyard] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('LoadingScreen mounted');
    
    // Animate progress from 0 to 100
    const duration = 4000; // Total duration in ms
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
      }
      setProgress(Math.floor(currentProgress));
    }, interval);
    
    // Show lanyard after 1 second
    const lanyardTimer = setTimeout(() => {
      console.log('Showing Lanyard');
      setShowLanyard(true);
    }, 1000);
    
    // Simulate loading time or wait for assets to load
    const timer = setTimeout(() => {
      console.log('Starting fade out');
      setFadeOut(true);
      // Wait for fade animation to complete before calling onLoadingComplete
      setTimeout(() => {
        console.log('Loading complete');
        if (onLoadingComplete) onLoadingComplete();
      }, 1000); // Match the CSS transition duration
    }, 4000); // Show loading screen for 4 seconds

    return () => {
      clearInterval(progressInterval);
      clearTimeout(lanyardTimer);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      {showLanyard ? (
        <Suspense fallback={<div className="loading-text">{progress}%</div>}>
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={false} />
        </Suspense>
      ) : (
        <div className="loading-text">{progress}%</div>
      )}
    </div>
  );
}
