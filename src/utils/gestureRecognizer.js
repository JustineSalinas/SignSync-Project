// src/utils/gestureRecognizer.js

// Helper function to calculate 3D distance between two landmarks
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

  // A simple heuristic for an "Open Hand" (e.g., "Hello" or "Stop")
  // If all fingertips are far away from the wrist, the hand is open.
  // (0.4 is an arbitrary threshold that works well for MediaPipe's normalized coordinates)
  const isOpenHand = indexDist > 0.4 && middleDist > 0.4 && ringDist > 0.4 && pinkyDist > 0.4;

  // A simple heuristic for a "Fist" (e.g., the letter "A" or "S" in ASL)
  // If the fingertips are very close to the wrist, the hand is closed.
  const isFist = indexDist < 0.2 && middleDist < 0.2 && ringDist < 0.2 && pinkyDist < 0.2;

  if (isOpenHand) return "HELLO";
  if (isFist) return "FIST";

  return "SIGNING..."; // Default state when fingers are moving
};