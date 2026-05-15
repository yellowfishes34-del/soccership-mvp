import { useState } from 'react';
import { G } from '../constants/theme';
import { LEVELS, POSITIONS } from '../constants/options';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { useResponsive } from '../hooks/useResponsive';
import PlayerCard from '../components/player/PlayerCard';
import { FilterBar, EmptyState } from '../components/shared/ui';
import Button from '../components/shared/Button';

export default function PlayersPage() {
  const { navigate }    = useRouter();
  const { players }     = useData();
  const { user }        = useAuth();
  const { openModal }   = useUI();
  const { isMobile }    = useResponsive();

  const [posFilter,   setPosFilter]   = useState('전체');
  const [levelFilter, setLevelFilter] = useState('전체');

  const filtered = players.filter(p =>
    (posFilter   === '전체' || p.position === posFilter) &&
    (levelFilter === '전체' || p.level    === levelFilter)
  );

  const canRegister = user && (user.role === '선수' || user.role === '학부모');
  const handleRegisterClick = () => {
    if (!user) { openModal('login'); return; }
    if (canRegister) navigate('player-register');
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: 'flex-start',
        gap: isMobile ? 14 : 0, marginBottom: 8,
      }}>
        <div>
          <div style={{ fontSize: 11, color: G.accent, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>PLAYER PROFILES</div>
          <h1 style={{ fontSize: isMobile ? 32 : 44, fontWeight: 900, color: G.text }}>선수 프로필</h1>
        </div>
        {(!user || canRegister) && (
          <Button variant="primary" onClick={handleRegisterClick} style={{ marginTop: isMobile ? 0 : 8 }}>
            + 선수 프로필 등록
          </Button>
        )}
      </div>
      <p style={{ color: G.text2, fontSize: 15, marginBottom: 36 }}>
        초등·중등·고등·대학 엘리트 축구선수의 성장 기록을 확인하세요.
      </p>

      {/* 필터 */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: G.text3, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>학교급</div>
        <FilterBar options={LEVELS} value={levelFilter} onChange={setLevelFilter} />
      </div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, color: G.text3, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>포지션</div>
        <FilterBar options={POSITIONS} value={posFilter} onChange={setPosFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="해당 조건의 선수가 없습니다" desc="다른 필터를 선택해보세요." />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(auto-fill, minmax(140px, 1fr))'
            : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 20,
        }}>
          {filtered.map(p => (
            <PlayerCard key={p.id} player={p} onClick={() => navigate('player-detail', { playerId: p.id })} />
          ))}
        </div>
      )}
    </div>
  );
}
