// Avatar.jsx
import { G } from '../../constants/theme';

const COLORS = ['#FF5C5C', '#60A5FA', '#A78BFA', '#FBBF24', G.accent, '#F472B6'];

export default function Avatar({ name, size = 36 }) {
  const idx = name ? name.charCodeAt(0) % COLORS.length : 0;
  const c   = COLORS[idx];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `${c}22`, border: `2px solid ${c}44`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, color: c, flexShrink: 0,
    }}>
      {name ? name.slice(0, 1) : '?'}
    </div>
  );
}
