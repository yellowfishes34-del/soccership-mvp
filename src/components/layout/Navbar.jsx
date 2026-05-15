import { useState } from 'react';
import { G, ROLE_COLOR } from '../../constants/theme';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { useResponsive } from '../../hooks/useResponsive';
import Avatar from '../shared/Avatar';
import RoleBadge from '../shared/RoleBadge';
import Button from '../shared/Button';

const LINKS = [
  { label: '홈',        page: 'home'    },
  { label: '선수 프로필', page: 'players' },
  { label: '커뮤니티',   page: 'board'   },
  { label: '상담 신청',  page: 'consult' },
];

export default function Navbar() {
  const { route, navigate } = useRouter();
  const { user, logout }    = useAuth();
  const { openModal }       = useUI();
  const { isMobile }        = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (p) =>
    route.page === p ||
    (p === 'board'   && route.page === 'post-detail') ||
    (p === 'players' && (route.page === 'player-detail' || route.page === 'player-register'));

  const handleNav = (page) => { navigate(page); setMenuOpen(false); };

  const UserArea = () =>
    user ? (
      <>
        <Avatar name={user.username} size={26} />
        <span style={{ fontSize: 13, fontWeight: 600, color: G.accent }}>@{user.username}</span>
        <RoleBadge role={user.role} />
        <Button variant="ghost" onClick={() => { logout(); setMenuOpen(false); }} style={{ fontSize: 12, padding: '6px 12px' }}>
          로그아웃
        </Button>
      </>
    ) : (
      <>
        <Button variant="ghost" onClick={() => { openModal('login'); setMenuOpen(false); }} style={{ fontSize: 13, padding: '7px 14px' }}>
          로그인
        </Button>
        <Button variant="primary" onClick={() => { openModal('signup'); setMenuOpen(false); }} style={{ fontSize: 13, padding: '7px 14px' }}>
          회원가입
        </Button>
      </>
    );

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: `${G.bg}EE`, borderBottom: `1px solid ${G.border}`, backdropFilter: 'blur(12px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }} onClick={() => handleNav('home')}>
          <div style={{ width: 28, height: 28, background: G.accent, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚽</div>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>SOCCER<span style={{ color: G.accent }}>SHIP</span></span>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 2 }}>
            {LINKS.map(l => (
              <button key={l.page} onClick={() => handleNav(l.page)}
                style={{
                  background: 'transparent', border: 'none', padding: '8px 13px',
                  cursor: 'pointer', borderRadius: 6, fontSize: 13,
                  fontWeight: isActive(l.page) ? 700 : 500,
                  color: isActive(l.page) ? G.accent : G.text2,
                  borderBottom: `2px solid ${isActive(l.page) ? G.accent : 'transparent'}`,
                }}>
                {l.label}
              </button>
            ))}
          </div>
        )}

        {/* Desktop auth */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <UserArea />
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'transparent', border: `1px solid ${G.border}`, color: G.text2, borderRadius: 7, padding: '6px 10px', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{ background: G.bg1, borderTop: `1px solid ${G.border}`, padding: '12px 20px 16px' }}>
          {LINKS.map(l => (
            <button key={l.page} onClick={() => handleNav(l.page)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'transparent', border: 'none', padding: '11px 0',
                cursor: 'pointer', fontSize: 15,
                fontWeight: isActive(l.page) ? 700 : 500,
                color: isActive(l.page) ? G.accent : G.text2,
                borderBottom: `1px solid ${G.border}`,
              }}>
              {l.label}
            </button>
          ))}
          <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <UserArea />
          </div>
        </div>
      )}
    </nav>
  );
}
