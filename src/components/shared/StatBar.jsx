import { G } from '../../constants/theme';

export default function StatBar({ label, value }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontSize: 13, color: G.text2 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: G.accent }}>{value}</span>
      </div>
      <div style={{ background: G.bg3, borderRadius: 4, height: 5 }}>
        <div style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${G.accentD}, ${G.accent})`,
          borderRadius: 4, height: 5,
        }} />
      </div>
    </div>
  );
}
