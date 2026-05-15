import { useState } from 'react';
import { btnPrimary, btnOutline, btnGhost, G } from '../../constants/theme';

/**
 * variant: 'primary' | 'outline' | 'ghost'
 */
export default function Button({ variant = 'primary', onClick, children, style = {}, disabled = false }) {
  const [hovered, setHovered] = useState(false);
  const base     = variant === 'primary' ? btnPrimary : variant === 'outline' ? btnOutline : btnGhost;
  const hoverStyle = variant === 'primary'
    ? { background: G.accentH }
    : variant === 'outline'
    ? { background: `${G.accent}18` }
    : { borderColor: G.border2, color: G.text };

  return (
    <button
      style={{ ...base, ...(hovered && !disabled ? hoverStyle : {}), opacity: disabled ? 0.5 : 1, ...style }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
