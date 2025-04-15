import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { CustomNode } from '../helpers/types';
import { NodeTextComponent } from './NodeTextComponent';

export const NodeComponent = ({ node: { logo, layer, name, mostRecentUpdate } }: { node: CustomNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered && layer === 1) {
      timer = setTimeout(() => {
        setShowText(true);
      }, 3000);
    } else {
      setShowText(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered, layer]);

  let size: number = 0;
  const scale = window.innerWidth > 720 ? 1 : window.innerWidth / 720; // adjust icon size for small screens
  switch (layer) {
    case 0:
      size = 150 * scale;
      break;
    case 1:
      size = 70 * scale;
      break;
    case 2:
      size = 30 * scale;
      break;
    default:
      break;
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTextLayout = (textNode: SVGTextElement, setTextWidth: (width: number) => void) => {
    if (textNode) {
      setTextWidth(textNode.getBBox().width);
    }
  };

  return (
    <motion.g
      className="node"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: isHovered && layer === 1 ? 1.2 : 1 }}
    >
      <circle cx={0} cy={0} r={0.6 * size} fill="black" strokeWidth={2} opacity={1} />
      <image href={logo} x={-0.5 * size} y={-0.5 * size} height={size} width={size} />
      {layer === 1 && (
        <NodeTextComponent
          size={size}
          isHovered={isHovered}
          showText={showText}
          name={name || ''}
          mostRecentUpdate={mostRecentUpdate?.toString() || ''}
          handleTextLayout={handleTextLayout}
        />
      )}
    </motion.g>
  );
};
