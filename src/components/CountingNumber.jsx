import React, { useRef, useState, useEffect } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function CountingNumber({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const springValue = useSpring(count, { damping: 30, stiffness: 100, mass: 1 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}
