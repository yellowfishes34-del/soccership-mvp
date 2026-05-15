// ─────────────────────────────────────────────
// Soccership 공통 옵션 목록
// 새 항목 추가 시 이 파일만 수정하면 됩니다.
// ─────────────────────────────────────────────

export const USER_TYPES = ['학부모', '선수', '지도자', '전문가'];

export const ROLE_ICONS = {
  학부모: '👨‍👩‍👦',
  선수:   '⚽',
  지도자: '📋',
  전문가: '🩺',
};

export const LEVELS = ['전체', '초등', '중등', '고등', '대학'];

export const POSITIONS = [
  '전체', 'GK', 'CB', 'RB', 'LB', 'DM', 'MF', 'CM', 'RW', 'LW', 'FW',
];

export const POSITION_OPTIONS = [
  'GK', 'CB', 'RB', 'LB', 'DM', 'MF', 'CM', 'RW', 'LW', 'FW',
];

export const CATEGORIES = [
  '전체',
  '진학 정보',
  '팀 선택 고민',
  '부상·재활',
  '대회 정보',
  '축구용품 추천',
  '진로 고민',
  '학부모 자유게시판',
];

export const CATEGORY_OPTIONS = [
  '진학 정보',
  '팀 선택 고민',
  '부상·재활',
  '대회 정보',
  '축구용품 추천',
  '진로 고민',
  '학부모 자유게시판',
];

export const CONSULT_TYPES = [
  '진학 상담',
  '팀 선택 상담',
  '부상·재활 상담',
  '피지컬 트레이닝',
  '개인 레슨',
  '진로 상담',
];

export const CONSULT_INFO = [
  { type: '진학 상담',      icon: '🎓', desc: '중학교·고등학교·대학 진학 전략 및 준비 방법' },
  { type: '팀 선택 상담',   icon: '🏫', desc: '소속팀·학교 축구부 선택 기준과 환경 비교 분석' },
  { type: '부상·재활 상담', icon: '🩺', desc: '성장기 부상 관리, 재활 프로그램 및 복귀 타이밍' },
  { type: '피지컬 트레이닝',icon: '💪', desc: '학교급·포지션별 맞춤 체력 및 피지컬 훈련 설계' },
  { type: '개인 레슨',      icon: '⚽', desc: '기술·전술 향상을 위한 전문 코치 1:1 레슨 연결' },
  { type: '진로 상담',      icon: '🗺️', desc: '실업팀·지도자·해외 진출 등 졸업 후 진로 설계' },
];

export const PREFERRED_FOOT = ['오른발', '왼발', '양발'];

export const LEVEL_OPTIONS = ['초등', '중등', '고등', '대학'];
