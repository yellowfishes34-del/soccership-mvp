import { useState } from 'react';
import { inputStyle, G } from '../../constants/theme';

export function Input({ placeholder, value, onChange, type = 'text', style = {} }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputStyle, borderColor: focused ? G.accent : G.border, ...style }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

export function Textarea({ placeholder, value, onChange, rows = 4, style = {} }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      style={{ ...inputStyle, borderColor: focused ? G.accent : G.border, resize: 'vertical', ...style }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

export function Select({ value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputStyle, borderColor: focused ? G.accent : G.border }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}
