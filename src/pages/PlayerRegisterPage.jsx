import { useState } from 'react';
import { G, card } from '../constants/theme';
import { LEVEL_OPTIONS, POSITION_OPTIONS, PREFERRED_FOOT } from '../constants/options';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { Input, Textarea, Select } from '../components/shared/FormControls';
import Button from '../components/shared/Button';

const EMPTY_FORM = {
  name: '', level: '고등', grade: '', position: 'FW',
  team: '', age: '', height: '', weight: '', preferredFoot: '오른발',
  careerGoal: '', bio: '', growthNote: '', tournamentsRaw: '', videoUrl: '',
};

function SectionHeader({ title, desc }) {
  return (
    <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${G.border}` }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: G.text, marginBottom: 4 }}>{title}</h3>
      {desc && <p style={{ fontSize: 12, color: G.text3 }}>{desc}</p>}
    </div>
  );
}

export default function PlayerRegisterPage() {
  const { navigate }  = useRouter();
  const { createPlayer } = useData();
  const { user }      = useAuth();
  const { isMobile }  = useResponsive();

  const [form,   setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [done,   setDone]   = useState(false);

  const f = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = '이름을 입력해주세요.';
    if (!form.grade.trim()) e.grade = '학년을 입력해주세요.';
    if (!form.team.trim())  e.team  = '소속팀을 입력해주세요.';
    if (!form.age)          e.age   = '나이를 입력해주세요.';
    if (!form.bio.trim())   e.bio   = '선수 소개를 입력해주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    createPlayer({ ...form, registeredBy: user?.id });
    setDone(true);
  };

  const lbl = (text, required = false) => (
    <label style={{ fontSize: 12, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 6 }}>
      {text}{required && <span style={{ color: G.red, marginLeft: 3 }}>*</span>}
    </label>
  );
  const errMsg  = (key) => errors[key] ? <div style={{ fontSize: 11, color: G.red, marginTop: 5 }}>{errors[key]}</div> : null;
  const fieldStyle = (key) => errors[key] ? { borderColor: G.red } : {};

  // 완료 화면
  if (done) return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: G.text, marginBottom: 14 }}>프로필 등록 완료!</h1>
      <p style={{ color: G.text2, fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
        <strong style={{ color: G.accent }}>{form.name}</strong> 선수의 프로필이<br />목록에 추가되었습니다.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary"  onClick={() => navigate('players')}>선수 목록 보기</Button>
        <Button variant="outline"  onClick={() => { setForm(EMPTY_FORM); setDone(false); }}>추가 등록하기</Button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px' }}>
      <Button variant="ghost" onClick={() => navigate('players')} style={{ marginBottom: 24, fontSize: 13 }}>
        ← 선수 목록으로
      </Button>

      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, color: G.accent, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>PLAYER PROFILE</div>
        <h1 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 900, color: G.text, marginBottom: 8 }}>선수 프로필 등록</h1>
        <p style={{ color: G.text2, fontSize: 14 }}><span style={{ color: G.red }}>*</span> 표시 항목은 필수입니다.</p>
      </div>

      <div style={{ display: 'grid', gap: 24 }}>

        {/* 기본 정보 */}
        <div style={{ ...card, padding: isMobile ? 24 : 32 }}>
          <SectionHeader title="기본 정보" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              {lbl('이름 또는 닉네임', true)}
              <Input placeholder="예: 김준서" value={form.name} onChange={f('name')} style={fieldStyle('name')} />
              {errMsg('name')}
            </div>
            <div>
              {lbl('학교급', true)}
              <Select value={form.level} onChange={f('level')} options={LEVEL_OPTIONS} />
            </div>
            <div>
              {lbl('학년', true)}
              <Input placeholder="예: 고등학교 2학년" value={form.grade} onChange={f('grade')} style={fieldStyle('grade')} />
              {errMsg('grade')}
            </div>
            <div>
              {lbl('포지션', true)}
              <Select value={form.position} onChange={f('position')} options={POSITION_OPTIONS} />
            </div>
            <div>
              {lbl('소속팀', true)}
              <Input placeholder="예: 매탄고등학교 축구부" value={form.team} onChange={f('team')} style={fieldStyle('team')} />
              {errMsg('team')}
            </div>
          </div>
        </div>

        {/* 신체 정보 */}
        <div style={{ ...card, padding: isMobile ? 24 : 32 }}>
          <SectionHeader title="신체 정보" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: 18 }}>
            <div>
              {lbl('나이', true)}
              <Input type="number" placeholder="17" value={form.age} onChange={f('age')} style={fieldStyle('age')} />
              {errMsg('age')}
            </div>
            <div>{lbl('신장')}<Input placeholder="175cm" value={form.height} onChange={f('height')} /></div>
            <div>{lbl('체중')}<Input placeholder="68kg"  value={form.weight} onChange={f('weight')} /></div>
            <div>{lbl('주발')}<Select value={form.preferredFoot} onChange={f('preferredFoot')} options={PREFERRED_FOOT} /></div>
          </div>
        </div>

        {/* 소개 & 진로 */}
        <div style={{ ...card, padding: isMobile ? 24 : 32 }}>
          <SectionHeader title="선수 소개 & 진로" />
          <div style={{ display: 'grid', gap: 18 }}>
            <div>
              {lbl('희망 진로')}
              <Input placeholder="예: 대학 진학 후 K리그 선수" value={form.careerGoal} onChange={f('careerGoal')} />
            </div>
            <div>
              {lbl('선수 소개', true)}
              <Textarea placeholder="선수의 특징, 장점, 현재 상황을 자유롭게 작성해주세요." value={form.bio} onChange={f('bio')} rows={4} />
              {errMsg('bio')}
            </div>
          </div>
        </div>

        {/* 성장 기록 & 대회 */}
        <div style={{ ...card, padding: isMobile ? 24 : 32 }}>
          <SectionHeader title="성장 기록 & 대회 경험" desc="입력하지 않아도 나중에 추가할 수 있습니다." />
          <div style={{ display: 'grid', gap: 18 }}>
            <div>
              {lbl('성장 기록')}
              <Textarea placeholder="예: 지난 1년 신장 3cm 성장. 스프린트 능력 향상 중." value={form.growthNote} onChange={f('growthNote')} rows={3} />
            </div>
            <div>
              {lbl('주요 대회 경험')}
              <Textarea
                placeholder={'한 줄에 하나씩 입력해주세요.\n예:\n2025 전국고교축구리그 (16강)\n2024 경기도체육대회 (금메달)'}
                value={form.tournamentsRaw} onChange={f('tournamentsRaw')} rows={5}
              />
              <div style={{ fontSize: 11, color: G.text3, marginTop: 5 }}>줄바꿈(Enter) 기준으로 각 대회가 구분됩니다.</div>
            </div>
            <div>
              {lbl('경기 영상 링크')}
              <Input placeholder="https://youtube.com/..." value={form.videoUrl} onChange={f('videoUrl')} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <Button variant="ghost"    onClick={() => navigate('players')} style={{ padding: '13px 28px' }}>취소</Button>
          <Button variant="primary"  onClick={handleSubmit} style={{ padding: '13px 36px', fontSize: 15 }}>프로필 등록하기 →</Button>
        </div>

      </div>
    </div>
  );
}
