import { useState } from 'react';
import { card, POS_COLOR, POS_EMOJI, LEVEL_COLOR, G } from '../../constants/theme';

export default function PlayerCard({ player, onClick }) {
  const [hovered, setHovered] = useState(false);
  const posColor   = POS_COLOR[player.position]   || G.text2;
  const levelColor = LEVEL_COLOR[player.level] || G.text2;

  return (
    <div
      style={{
        ...card,
        padding: '18px 14px', textAlign: 'center', cursor: 'pointer',
        borderColor: hovered ? `${posColor}66` : G.border,
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.2s',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 58, height: 58, borderRadius: '50%',
        background: `${posColor}18`, border: `2px solid ${posColor}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 10px', fontSize: 24,
      }}>
        {POS_EMOJI[player.position] || '⚽'}
      </div>

      {/* 학교급 배지 */}
      <div style={{
        display: 'inline-block', background: `${levelColor}1A`, color: levelColor,
        padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700,
        letterSpacing: 0.5, marginBottom: 6,
      }}>
        {player.level}
      </div>

      <div style={{ fontWeight: 700, color: G.text, marginBottom: 2, fontSize: 14 }}>{player.name}</div>
      <div style={{ fontSize: 11, color: posColor, fontWeight: 600, marginBottom: 4 }}>{player.position}</div>
      <div style={{ fontSize: 11, color: G.text3, marginBottom: 4, lineHeight: 1.4 }}>{player.team}</div>
      <div style={{ fontSize: 11, color: G.text3 }}>{player.grade}</div>
    </div>
  );
}
