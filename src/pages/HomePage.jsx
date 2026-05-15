import { G, card } from '../constants/theme';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useResponsive } from '../hooks/useResponsive';
import PlayerCard from '../components/player/PlayerCard';
import PostRow from '../components/board/PostRow';
import Button from '../components/shared/Button';
import { Divider } from '../components/shared/ui';

export default function HomePage() {
  const { navigate }     = useRouter();
  const { players, posts } = useData();
  const { isMobile }     = useResponsive();

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', padding: 'clamp(52px,8vw,96px) 20px clamp(48px,6vw,72px)', background: G.bg, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '5%', right: '8%', width: 480, height: 480, background: `radial-gradient(circle, ${G.accent}0C 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '5%', width: 360, height: 360, background: 'radial-gradient(circle, #3B82F60A 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 2, background: G.accent }} />
            <span style={{ color: G.accent, fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>엘리트 유소년 축구 정보 플랫폼</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 900, lineHeight: 1.08, color: '#fff', marginBottom: 28, letterSpacing: -1 }}>
            축구선수와 학부모의<br />
            <span style={{ color: G.accent }}>막막한 선택</span>을<br />
            함께 해결합니다
          </h1>
          <p style={{ fontSize: 17, color: G.text2, maxWidth: 520, lineHeight: 1.85, marginBottom: 44 }}>
            진학, 팀 선택, 부상 관리, 진로 고민까지. 초등·중등·고등·대학 엘리트 축구선수와 학부모가 필요한 정보를 한곳에서 확인하고 경험을 나눌 수 있는 축구 특화 정보 플랫폼입니다.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => navigate('board')}   style={{ fontSize: 16, padding: '14px 36px' }}>커뮤니티 참여하기 →</Button>
            <Button variant="outline" onClick={() => navigate('consult')} style={{ fontSize: 16, padding: '14px 36px' }}>전문가 상담 신청</Button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div style={{ background: G.bg1, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}`, padding: '24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
          {[['2,400+', '누적 학부모 질문'], ['320+', '등록 선수 프로필'], ['180+', '전문가 답변'], ['7개', '정보 카테고리']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: G.accent }}>{val}</div>
              <div style={{ fontSize: 12, color: G.text3, letterSpacing: 1, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Players ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div>
            <div style={{ color: G.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>PLAYER PROFILES</div>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, color: G.text }}>성장 중인 선수들</h2>
          </div>
          <Button variant="ghost" onClick={() => navigate('players')} style={{ fontSize: 13 }}>전체 보기 →</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {players.slice(0, 8).map(p => (
            <PlayerCard key={p.id} player={p} onClick={() => navigate('player-detail', { playerId: p.id })} />
          ))}
        </div>
      </section>

      {/* ── Recent Posts ── */}
      <section style={{ background: G.bg1, borderTop: `1px solid ${G.border}`, padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div>
              <div style={{ color: G.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>COMMUNITY</div>
              <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, color: G.text }}>학부모·선수 실시간 질문</h2>
            </div>
            <Button variant="ghost" onClick={() => navigate('board')} style={{ fontSize: 13 }}>게시판 가기 →</Button>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {posts.slice(0, 5).map(p => (
              <PostRow key={p.id} post={p} onClick={() => navigate('post-detail', { postId: p.id })} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '88px 24px', textAlign: 'center', background: G.bg }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: isMobile ? '0 8px' : '0' }}>
          <div style={{ fontSize: 12, color: G.accent, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>전문가 상담</div>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: 900, color: '#fff', marginBottom: 18, lineHeight: 1.15 }}>
            진학·부상·진로 고민<br /><span style={{ color: G.accent }}>전문가</span>와 함께 해결하세요
          </h2>
          <p style={{ color: G.text2, fontSize: 16, marginBottom: 40, lineHeight: 1.8 }}>
            진학 상담, 팀 선택, 부상·재활, 피지컬 트레이닝, 개인 레슨, 진로 상담까지. 엘리트 유소년 축구 전문가가 직접 답변해드립니다. 첫 상담은 무료입니다.
          </p>
          <Button variant="primary" onClick={() => navigate('consult')} style={{ fontSize: 17, padding: '16px 52px' }}>
            상담 신청하기 →
          </Button>
        </div>
      </section>
    </div>
  );
}
