// src/utils/gestureRecognizer.js

const calculateDistance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) +
    Math.pow(point2.y - point1.y, 2) +
    Math.pow(point2.z - point1.z, 2)
  );
};

export const detectGesture = (handLandmarks) => {
  if (!handLandmarks || handLandmarks.length === 0) return null;

  const wrist = handLandmarks[0];
  
  // Fingertips
  const thumbTip = handLandmarks[4];
  const indexTip = handLandmarks[8];
  const middleTip = handLandmarks[12];
  const ringTip = handLandmarks[16];
  const pinkyTip = handLandmarks[20];

  // Calculate distances from wrist to fingertips
  const indexDist = calculateDistance(wrist, indexTip);
  const middleDist = calculateDistance(wrist, middleTip);
  const ringDist = calculateDistance(wrist, ringTip);
  const pinkyDist = calculateDistance(wrist, pinkyTip);

  // --- THE HEURISTIC THRESHOLDS ---
  // (Adjust these slightly if your hand size/camera distance requires it)
  const isIndexOpen = indexDist > 0.4;
  const isMiddleOpen = middleDist > 0.4;
  const isRingOpen = ringDist > 0.4;
  const isPinkyOpen = pinkyDist > 0.4;

  const isIndexClosed = indexDist < 0.25;
  const isMiddleClosed = middleDist < 0.25;
  const isRingClosed = ringDist < 0.25;
  const isPinkyClosed = pinkyDist < 0.25;

  // --- GESTURE DICTIONARY ---

  // 1. OPEN HAND ("HELLO" or "STOP")
  if (isIndexOpen && isMiddleOpen && isRingOpen && isPinkyOpen) {
    return "HELLO";
  }

  // 2. FIST ("SEND" Command)
  if (isIndexClosed && isMiddleClosed && isRingClosed && isPinkyClosed) {
    return "FIST";
  }

  // 3. POINTING ("I" or "YOU" or "THAT")
  // Index finger is far from wrist, all other fingers are close to wrist
  if (isIndexOpen && isMiddleClosed && isRingClosed && isPinkyClosed) {
    return "I"; // Translates well for "I want..." or "I need..."
  }

  // 4. PEACE SIGN ("TWO" or "APPOINTMENT")
  // Index and middle are open, ring and pinky are closed
  if (isIndexOpen && isMiddleOpen && isRingClosed && isPinkyClosed) {
    return "APPOINTMENT"; 
  }

  // Default state when transitioning between signs
  return "SIGNING..."; 
};