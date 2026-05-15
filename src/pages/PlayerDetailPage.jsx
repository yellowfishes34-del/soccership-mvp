import { G, card, POS_COLOR, POS_EMOJI, LEVEL_COLOR } from '../constants/theme';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useResponsive } from '../hooks/useResponsive';
import StatBar from '../components/shared/StatBar';
import Button from '../components/shared/Button';
import { EmptyState } from '../components/shared/ui';

export default function PlayerDetailPage() {
  const { route, navigate } = useRouter();
  const { players }         = useData();
  const { isMobile }        = useResponsive();

  const player = players.find(p => p.id === route.params.playerId);
  if (!player) return <EmptyState icon="🔍" title="선수를 찾을 수 없습니다" desc="" />;

  const posColor   = POS_COLOR[player.position]  || G.text2;
  const levelColor = LEVEL_COLOR[player.level]   || G.text2;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
      <Button variant="ghost" onClick={() => navigate('players')} style={{ marginBottom: 28, fontSize: 13 }}>
        ← 목록으로
      </Button>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 32 }}>

        {/* ── Left: 기본 정보 ── */}
        <div style={{ ...card, padding: isMobile ? 24 : 36 }}>
          {/* 아이콘 + 이름 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: `${posColor}18`, border: `3px solid ${posColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, flexShrink: 0 }}>
              {POS_EMOJI[player.position] || '⚽'}
            </div>
            <div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ background: `${levelColor}1A`, color: levelColor, padding: '3px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>{player.level}</span>
                <span style={{ background: G.bg3, color: G.text2, padding: '3px 10px', borderRadius: 4, fontSize: 12 }}>{player.grade}</span>
                <span style={{ background: `${posColor}1A`, color: posColor, padding: '3px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>{player.position}</span>
              </div>
              <h1 style={{ fontSize: isMobile ? 26 : 32, fontWeight: 900, color: G.text, lineHeight: 1, marginBottom: 6 }}>{player.name}</h1>
              <div style={{ color: G.text2, fontSize: 13 }}>{player.team}</div>
            </div>
          </div>

          {/* 현재 단계 / 희망 진로 카드 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            <div style={{ background: G.bg2, border: `1px solid ${levelColor}33`, borderRadius: 10, padding: '14px' }}>
              <div style={{ fontSize: 10, color: levelColor, fontWeight: 700, letterSpacing: 1, marginBottom: 5 }}>현재 단계</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: G.text, lineHeight: 1.4 }}>{player.grade}</div>
              <div style={{ fontSize: 11, color: G.text2, marginTop: 2 }}>{player.team}</div>
            </div>
            <div style={{ background: G.bg2, border: `1px solid ${G.accent}33`, borderRadius: 10, padding: '14px' }}>
              <div style={{ fontSize: 10, color: G.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 5 }}>희망 진로</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: G.text, lineHeight: 1.4 }}>{player.careerGoal}</div>
            </div>
          </div>

          {/* 소개 */}
          <p style={{ color: G.text2, lineHeight: 1.85, fontSize: 14, marginBottom: 20 }}>{player.bio}</p>

          {/* 기본 정보 그리드 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[['나이', `${player.age}세`], ['신장', player.height], ['체중', player.weight], ['주발', player.preferredFoot], ['학교급', player.level], ['포지션', player.position]].map(([k, v]) => (
              <div key={k} style={{ background: G.bg2, padding: '12px 14px', borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: G.text3, marginBottom: 4, letterSpacing: 0.8 }}>{k.toUpperCase()}</div>
                <div style={{ fontWeight: 700, color: G.text, fontSize: 14 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* 영상 링크 */}
          {player.videoUrl && (
            <a href={player.videoUrl} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: G.bg2, borderRadius: 8, color: G.blue, fontSize: 14, fontWeight: 600, marginBottom: 16, textDecoration: 'none', border: `1px solid ${G.border}` }}>
              ▶ 경기 영상 보러가기
            </a>
          )}

          <Button variant="primary" onClick={() => navigate('consult')} style={{ width: '100%', padding: '14px', fontSize: 15 }}>
            진학·성장 상담 신청하기 →
          </Button>
        </div>

        {/* ── Right: 성장 지표 + 기록 + 대회 ── */}
        <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
          <div style={{ ...card, padding: isMobile ? 20 : 28 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: G.text, marginBottom: 20 }}>성장 지표</h2>
            {Object.entries(player.stats).map(([k, v]) => <StatBar key={k} label={k} value={v} />)}
          </div>

          {player.growthNote && (
            <div style={{ ...card, padding: isMobile ? 18 : 24 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: G.text, marginBottom: 12 }}>성장 기록</h2>
              <p style={{ color: G.text2, fontSize: 13, lineHeight: 1.85 }}>{player.growthNote}</p>
            </div>
          )}

          {player.tournaments?.length > 0 && (
            <div style={{ ...card, padding: isMobile ? 18 : 24 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: G.text, marginBottom: 16 }}>주요 대회 경험</h2>
              <div style={{ display: 'grid', gap: 10 }}>
                {player.tournaments.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${G.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: G.accent, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                    <span style={{ color: G.text2, fontSize: 13, lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
