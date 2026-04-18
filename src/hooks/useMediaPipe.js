import { useEffect, useRef, useState } from 'react';

export const useMediaPipe = (videoElement) => {
  const [landmarks, setLandmarks] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const isProcessing = useRef(false);
  const holisticRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!videoElement) return;

    let cancelled = false;

    const init = async () => {
      // ── Step 1: Explicitly request camera permission FIRST ──────────────
      // MediaPipe's Camera class swallows NotAllowedError internally, so we
      // must probe getUserMedia ourselves to catch and display permission errors.
      let permissionStream = null;
      try {
        permissionStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      } catch (err) {
        if (cancelled) return;
        console.error("Camera permission error:", err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError(
            "Camera access was denied. Please tap the lock/camera icon next to the URL in your browser, set Camera to \"Allow\", and refresh the page."
          );
        } else if (err.name === 'NotFoundError') {
          setCameraError("No camera was found on this device.");
        } else {
          setCameraError(`Could not access camera: ${err.message}`);
        }
        return;
      }

      // Permission granted — stop this temporary stream so MediaPipe can take over cleanly
      permissionStream.getTracks().forEach((t) => t.stop());
      if (cancelled) return;

      // ── Step 2: Load MediaPipe globals ────────────────────────────────────
      const Holistic = window.Holistic;
      const Camera = window.Camera;

      if (!Holistic || !Camera) {
        setCameraError("MediaPipe failed to load. Please check your internet connection and refresh.");
        return;
      }

      // ── Step 3: Initialize Holistic model ────────────────────────────────
      const holistic = new Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      });
      holisticRef.current = holistic;

      holistic.setOptions({
        modelComplexity: 0,          // 0 = lightweight & fast (best for mobile)
        smoothLandmarks: true,
        enableSegmentation: false,   // Disable unused heavy features
        smoothSegmentation: false,
        refineFaceLandmarks: false,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.5,
      });

      holistic.onResults((results) => {
        isProcessing.current = false;
        if (cancelled) return;
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

      // ── Step 4: Start MediaPipe camera at lower resolution for speed ──────
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          if (isProcessing.current || cancelled) return;
          isProcessing.current = true;
          try {
            await holistic.send({ image: videoElement });
          } catch (e) {
            isProcessing.current = false;
            console.error("Holistic processing error:", e);
          }
        },
        width: 640,
        height: 480,
      });
      cameraRef.current = camera;

      try {
        await camera.start();
      } catch (err) {
        if (cancelled) return;
        console.error("Camera start error:", err);
        setCameraError(
          err.name === 'NotAllowedError'
            ? "Camera access was denied. Please allow camera access in your browser settings and refresh the page."
            : "Failed to start camera: " + err.message
        );
      }
    };

    init();

    return () => {
      cancelled = true;
      holisticRef.current?.close();
      cameraRef.current?.stop();
      holisticRef.current = null;
      cameraRef.current = null;
    };
  }, [videoElement]);

  return { landmarks, isDetecting, cameraError };
};
