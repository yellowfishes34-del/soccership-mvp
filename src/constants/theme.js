// ─────────────────────────────────────────────
// Soccership Design Tokens
// 색상 변경 시 이 파일만 수정하면 전체 반영됩니다.
// ─────────────────────────────────────────────

export const G = {
  bg:      '#07080F',
  bg1:     '#0D1117',
  bg2:     '#111827',
  bg3:     '#1a2232',
  border:  '#1E2D45',
  border2: '#2a3f5f',
  accent:  '#A8FF3E',
  accentH: '#C2FF70',
  accentD: '#7ACC22',
  text:    '#E2E8F0',
  text2:   '#94A3B8',
  text3:   '#4A6080',
  red:     '#FF5C5C',
  blue:    '#60A5FA',
  amber:   '#FBBF24',
  purple:  '#A78BFA',
};

// ── 포지션별 색상 ──────────────────────────────
export const POS_COLOR = {
  FW: '#FF5C5C', RW: '#FF7C5C', LW: '#FF5C7C',
  MF: '#60A5FA', DM: '#818CF8', CM: '#60A5FA',
  CB: '#FBBF24', RB: '#F59E0B', LB: '#F59E0B',
  GK: '#A78BFA',
};

export const POS_EMOJI = {
  FW: '⚡', RW: '⚡', LW: '⚡',
  MF: '🎯', DM: '🎯', CM: '🎯',
  CB: '🛡️', RB: '🛡️', LB: '🛡️',
  GK: '🧤',
};

// ── 학교급별 색상 ──────────────────────────────
export const LEVEL_COLOR = {
  초등: '#34D399',
  중등: '#60A5FA',
  고등: '#FBBF24',
  대학: '#A78BFA',
};

// ── 사용자 유형별 배지 색상 ────────────────────
export const ROLE_COLOR = {
  학부모: { bg: '#60A5FA1A', text: '#60A5FA' },
  선수:   { bg: '#A8FF3E1A', text: '#A8FF3E' },
  지도자: { bg: '#FBBF241A', text: '#FBBF24' },
  전문가: { bg: '#A78BFA1A', text: '#A78BFA' },
  admin:  { bg: '#FF5C5C1A', text: '#FF5C5C' },
};

// ── 게시판 카테고리별 색상 ─────────────────────
export const CAT_COLORS = {
  '진학 정보':         '#60A5FA',
  '팀 선택 고민':      '#A78BFA',
  '부상·재활':         '#FF5C5C',
  '대회 정보':         '#A8FF3E',
  '축구용품 추천':     '#FBBF24',
  '진로 고민':         '#F472B6',
  '학부모 자유게시판': '#94A3B8',
};

// ── 공통 스타일 객체 ───────────────────────────
export const card = {
  background:   G.bg1,
  border:       `1px solid ${G.border}`,
  borderRadius: 12,
};

export const inputStyle = {
  background:  G.bg2,
  border:      `1px solid ${G.border}`,
  borderRadius: 8,
  color:       G.text,
  padding:     '10px 14px',
  width:       '100%',
  fontSize:    14,
  outline:     'none',
  fontFamily:  'inherit',
};

export const btnPrimary = {
  background:   G.accent,
  color:        G.bg,
  border:       'none',
  borderRadius: 8,
  padding:      '10px 22px',
  fontWeight:   700,
  fontSize:     14,
  cursor:       'pointer',
  whiteSpace:   'nowrap',
};

export const btnOutline = {
  background:   'transparent',
  color:        G.accent,
  border:       `1px solid ${G.accent}`,
  borderRadius: 8,
  padding:      '10px 22px',
  fontWeight:   700,
  fontSize:     14,
  cursor:       'pointer',
  whiteSpace:   'nowrap',
};

export const btnGhost = {
  background:   'transparent',
  color:        G.text2,
  border:       `1px solid ${G.border}`,
  borderRadius: 8,
  padding:      '8px 16px',
  fontWeight:   500,
  fontSize:     14,
  cursor:       'pointer',
  whiteSpace:   'nowrap',
};
