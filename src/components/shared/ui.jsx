// ─────────────────────────────────────────────
// Small shared UI components
// ─────────────────────────────────────────────
import { G } from '../../constants/theme';
import { useUI } from '../../context/UIContext';
import Button from './Button';

export function FilterBar({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
      {options.map(o => {
        const active = value === o;
        return (
          <button key={o} onClick={() => onChange(o)}
            style={{
              padding: '7px 16px', borderRadius: 6,
              border: `1px solid ${active ? G.accent : G.border}`,
              background: active ? `${G.accent}15` : 'transparent',
              color: active ? G.accent : G.text2,
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
            }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function EmptyState({ icon = '📭', title, desc }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: G.text3 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: G.text2, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14 }}>{desc}</div>
    </div>
  );
}

export function Divider({ style = {} }) {
  return <div style={{ height: 1, background: G.border, margin: '16px 0', ...style }} />;
}

export function SectionTitle({ label, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
      <div style={{ color: G.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>
        {label.toUpperCase()}
      </div>
      {action}
    </div>
  );
}

export function ToastNotification() {
  const { toast } = useUI();
  if (!toast) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28,
      background: G.accent, color: G.bg,
      padding: '12px 22px', borderRadius: 10,
      fontWeight: 700, zIndex: 999, fontSize: 14,
      maxWidth: 'calc(100vw - 32px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      {toast}
    </div>
  );
}
