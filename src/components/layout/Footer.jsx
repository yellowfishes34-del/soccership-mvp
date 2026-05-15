import { G } from '../../constants/theme';
import { useRouter } from '../../context/RouterContext';
import { Divider } from '../shared/ui';

const COL_LINKS = [
  { title: '서비스', links: [['선수 프로필', 'players'], ['커뮤니티', 'board'], ['상담 신청', 'consult']] },
  { title: '문의',   links: [['contact@soccership.kr', 'home'], ['02-1234-5678', 'home']] },
];

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer style={{ background: G.bg1, borderTop: `1px solid ${G.border}`, padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ flex: '2 1 200px', minWidth: 180 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, background: G.accent, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚽</div>
              <span style={{ fontSize: 17, fontWeight: 900, color: '#fff' }}>SOCCER<span style={{ color: G.accent }}>SHIP</span></span>
            </div>
            <p style={{ fontSize: 13, color: G.text3, lineHeight: 1.8 }}>
              엘리트 축구선수와 학부모가 필요한 정보를<br />
              한곳에서 확인하고 소통하는 축구 특화 플랫폼.
            </p>
          </div>

          {/* Nav columns */}
          {COL_LINKS.map(col => (
            <div key={col.title} style={{ flex: '1 1 100px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: G.text3, marginBottom: 14 }}>{col.title}</div>
              {col.links.map(([label, page]) => (
                <div key={label}
                  onClick={() => navigate(page)}
                  style={{ fontSize: 13, color: G.text2, marginBottom: 10, cursor: 'pointer' }}>
                  {label}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Divider />

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: G.text3 }}>© 2026 Soccership. All rights reserved.</span>
          <span style={{ fontSize: 12, color: G.text3 }}>Made with ⚽ in Seoul</span>
        </div>
      </div>
    </footer>
  );
}
