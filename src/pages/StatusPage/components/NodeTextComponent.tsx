import { motion } from 'framer-motion';
import { useState } from 'react';

type NodeTextProps = {
  size: number;
  isHovered: boolean;
  showText: boolean;
  name: string;
  mostRecentUpdate?: string;
  handleTextLayout: (textNode: SVGTextElement, setTextWidth: (width: number) => void) => void;
};

export const NodeTextComponent = ({
  size,
  isHovered,
  showText,
  name,
  mostRecentUpdate,
  handleTextLayout,
}: NodeTextProps) => {
  const [nameWidth, setLocalNameWidth] = useState(0);
  const [updateWidth, setLocalUpdateWidth] = useState(0);

  return (
    <>
      {/* Background for the name */}
      {isHovered && (
        <motion.rect
          x={-nameWidth / 2 - 8}
          y={size * 0.9 - 16}
          rx={8}
          ry={8}
          width={nameWidth + 16}
          height={24}
          fill="black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        />
      )}
      <motion.text
        className="node-text"
        x={0}
        y={size * 0.9}
        textAnchor="middle"
        fontSize={0.2 * size}
        fill="white"
        fontFamily="sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        ref={(node) => node && handleTextLayout(node, setLocalNameWidth)}
      >
        {name}
      </motion.text>
      {showText && (
        <>
          {/* Background for the mostRecentUpdate */}
          <motion.rect
            x={-updateWidth / 2 - 8}
            y={size * 1.2 - 16}
            rx={8}
            ry={8}
            width={updateWidth + 16}
            height={24}
            fill="black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
          />
          <motion.text
            className="node-text"
            x={0}
            y={size * 1.2}
            textAnchor="middle"
            fontSize={0.2 * size}
            fill="white"
            fontFamily="sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            ref={(node) => node && handleTextLayout(node, setLocalUpdateWidth)}
          >
            {mostRecentUpdate
              ? new Date(mostRecentUpdate).toLocaleString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })
              : ''}
          </motion.text>
        </>
      )}
    </>
  );
};
