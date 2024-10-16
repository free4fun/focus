import React from 'react';
import BackgroundChanger from './components/BackgroundChanger';
import Timer from './components/Timer';
import AudioPlayer from './components/AudioPlayer';
import QuoteDisplay from './components/QuoteDisplay';
import { getBackgroundImages } from '../utils/imageUtils';
import styles from './FocusApp.module.css';


export default function Home() {
  const backgrounds = getBackgroundImages();

  return (
    <div className={styles.app}>
    <BackgroundChanger backgrounds={backgrounds} interval={30000} />
    <div className={styles.contentWrapper}>
      <div className="content-container">
        <Timer />
        <AudioPlayer />
        <QuoteDisplay />
      </div>
    </div>
  </div>

  );
}
