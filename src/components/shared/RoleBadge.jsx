import { ROLE_COLOR } from '../../constants/theme';

/** 사용자 역할 배지 (학부모 / 선수 / 지도자 / 전문가) */
export default function RoleBadge({ role }) {
  if (!role || role === 'admin') return null;
  const rc = ROLE_COLOR[role] || ROLE_COLOR['학부모'];
  return (
    <span style={{
      background: rc.bg, color: rc.text,
      padding: '1px 8px', borderRadius: 4,
      fontSize: 11, fontWeight: 700, flexShrink: 0,
    }}>
      {role}
    </span>
  );
}
