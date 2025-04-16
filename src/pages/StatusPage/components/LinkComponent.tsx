import { motion } from 'framer-motion';

import { CustomLink, LinkStatus } from '../helpers/types';

export const LinkComponent = (props: { link: CustomLink }) => {
  const { source, target } = props.link;
  return (
    <svg height="100%" width="100%">
      <defs>
        <radialGradient id="glow-gradient" cx="50%" cy="50%" r="20%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </radialGradient>
      </defs>
      <motion.line
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke={target.status === LinkStatus.active ? 'rgba(21, 183, 158, 0.5)' : 'rgba(255, 0, 0, 0.5)'}
        strokeWidth="3"
        opacity={0.5}
      />
      <motion.line
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke="url(#glow-gradient)"
        strokeWidth="3"
        initial={{ strokeDashoffset: 0 }}
        animate={{
          strokeDashoffset: target.status === LinkStatus.active ? [0, 360] : [0, 12],
        }}
        transition={{
          duration: target.status === LinkStatus.active ? 1.5 : 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
        strokeDasharray={target.status === LinkStatus.active ? '180' : '6'}
      />
    </svg>
  );
};
