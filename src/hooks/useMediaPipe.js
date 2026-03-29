import { useEffect, useState } from 'react';

export const useMediaPipe = (videoElement) => {
  const [landmarks, setLandmarks] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (!videoElement) return;

    const Holistic = window.Holistic;
    const Camera = window.Camera;

    const holistic = new Holistic({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults((results) => {
      if (results.leftHandLandmarks || results.rightHandLandmarks) {
        setIsDetecting(true);
        setLandmarks({
          leftHand: results.leftHandLandmarks,
          rightHand: results.rightHandLandmarks,
          pose: results.poseLandmarks
        });
      } else {
        setIsDetecting(false);
      }
    });

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await holistic.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });

    camera.start();

    return () => {
      holistic.close();
      camera.stop();
    };
  }, [videoElement]);

  return { landmarks, isDetecting };
};

