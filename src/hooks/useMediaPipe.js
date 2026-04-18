import { useEffect, useRef, useState } from 'react';

export const useMediaPipe = (videoElement) => {
  const [landmarks, setLandmarks] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  // Prevent queuing frames while holistic is still processing the previous one
  const isProcessing = useRef(false);
  // Keep stable refs for cleanup
  const holisticRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!videoElement) return;

    const Holistic = window.Holistic;
    const Camera = window.Camera;

    if (!Holistic || !Camera) {
      console.error("MediaPipe not loaded yet");
      return;
    }

    const holistic = new Holistic({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    });
    holisticRef.current = holistic;

    holistic.setOptions({
      // 0 = lightweight & fast, 1 = full accuracy (slow on mobile)
      modelComplexity: 0,
      smoothLandmarks: true,
      // Disabling pose & segmentation massively speeds up inference
      enableSegmentation: false,
      smoothSegmentation: false,
      refineFaceLandmarks: false,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults((results) => {
      isProcessing.current = false;
      if (results.leftHandLandmarks || results.rightHandLandmarks) {
        setIsDetecting(true);
        setLandmarks({
          leftHand: results.leftHandLandmarks,
          rightHand: results.rightHandLandmarks,
        });
      } else {
        setIsDetecting(false);
        setLandmarks(null);
      }
    });

    // Lower resolution = fewer pixels to process per frame = faster inference
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        // Skip frame if previous is still being processed to prevent queue buildup
        if (isProcessing.current) return;
        isProcessing.current = true;
        try {
          await holistic.send({ image: videoElement });
        } catch (e) {
          isProcessing.current = false;
          console.error("Holistic processing error", e);
        }
      },
      width: 640,
      height: 480,
    });
    cameraRef.current = camera;

    camera.start().catch((err) => {
      console.error("Camera start error:", err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? "Camera access denied. Please allow permissions in your browser."
          : "Failed to start camera: " + err.message
      );
    });

    return () => {
      holistic.close();
      camera.stop();
      holisticRef.current = null;
      cameraRef.current = null;
    };
  }, [videoElement]);

  return { landmarks, isDetecting, cameraError };
};
