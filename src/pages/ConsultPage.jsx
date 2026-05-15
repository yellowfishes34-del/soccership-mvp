import { useState } from 'react';
import { G, card } from '../constants/theme';
import { CONSULT_TYPES, CONSULT_INFO } from '../constants/options';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { Input, Textarea, Select } from '../components/shared/FormControls';
import { Divider } from '../components/shared/ui';
import Button from '../components/shared/Button';

export default function ConsultPage() {
  const { navigate }          = useRouter();
  const { submitConsultation } = useData();
  const { user }              = useAuth();
  const { isMobile }          = useResponsive();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: user?.username || '', email: user?.email || '',
    phone: '', targetPlayer: '', type: '진학 상담', message: '',
  });
  const [done, setDone] = useState(false);

  const f = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    submitConsultation(form);
    setDone(true);
  };

  // 완료 화면
  if (done) return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: G.text, marginBottom: 16 }}>신청 완료!</h1>
      <p style={{ color: G.text2, fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
        상담 신청이 성공적으로 접수되었습니다.<br />
        <strong style={{ color: G.accent }}>{form.email}</strong>으로<br />
        영업일 기준 1~2일 내에 전문가가 연락드리겠습니다.
      </p>
      <div style={{ ...card, padding: 24, marginBottom: 36, textAlign: 'left' }}>
        {[['이름', form.name], ['이메일', form.email], ['상담 종류', form.type], ['관심 선수', form.targetPlayer || '미입력']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${G.border}`, fontSize: 14 }}>
            <span style={{ color: G.text3 }}>{k}</span>
            <span style={{ color: G.text, fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
      <Button variant="primary" onClick={() => { setDone(false); setStep(1); setForm({ name: '', email: '', phone: '', targetPlayer: '', type: '진학 상담', message: '' }); }}>
        다시 신청하기
      </Button>
    </div>
  );

  // Step indicator
  const StepBar = () => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? 32 : 48 }}>
      {[['1', '기본 정보'], ['2', '상담 내용'], ['3', '확인']].map(([n, l], i) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: step > i ? G.accent : step === i + 1 ? G.accent : G.bg2, border: `2px solid ${step >= i + 1 ? G.accent : G.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: step >= i + 1 ? G.bg : G.text3, transition: 'all 0.3s' }}>
              {step > i + 1 ? '✓' : n}
            </div>
            <span style={{ fontSize: 11, color: step === i + 1 ? G.accent : G.text3, fontWeight: 600, whiteSpace: 'nowrap' }}>{l}</span>
          </div>
          {i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? G.accent : G.border, margin: '0 8px', marginBottom: 22, transition: 'background 0.3s' }} />}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '56px 24px' }}>
      <div style={{ fontSize: 11, color: G.accent, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>EXPERT CONSULTATION</div>
      <h1 style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: G.text, marginBottom: 10 }}>전문가 상담 신청</h1>
      <p style={{ color: G.text2, fontSize: 15, marginBottom: 48, lineHeight: 1.75 }}>
        진학, 팀 선택, 부상·재활, 피지컬 트레이닝, 개인 레슨, 진로 고민까지. 엘리트 유소년 축구 전문가가 직접 1:1로 답변해드립니다.
      </p>

      <StepBar />

      <div style={{ ...card, padding: isMobile ? 24 : 36 }}>
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: G.text, marginBottom: 24 }}>기본 정보 입력</h2>
            <div style={{ display: 'grid', gap: 18 }}>
              <div><label style={{ fontSize: 13, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 7 }}>이름 *</label><Input placeholder="성함을 입력하세요" value={form.name} onChange={f('name')} /></div>
              <div><label style={{ fontSize: 13, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 7 }}>이메일 *</label><Input type="email" placeholder="연락받을 이메일 주소" value={form.email} onChange={f('email')} /></div>
              <div><label style={{ fontSize: 13, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 7 }}>전화번호 (선택)</label><Input placeholder="010-0000-0000" value={form.phone} onChange={f('phone')} /></div>
            </div>
            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" onClick={() => setStep(2)} disabled={!form.name || !form.email} style={{ padding: '12px 32px' }}>다음 단계 →</Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: G.text, marginBottom: 24 }}>상담 내용 입력</h2>
            <div style={{ display: 'grid', gap: 18 }}>
              <div><label style={{ fontSize: 13, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 7 }}>상담 종류 *</label><Select value={form.type} onChange={f('type')} options={CONSULT_TYPES} /></div>
              <div><label style={{ fontSize: 13, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 7 }}>관련 선수 이름 (선택)</label><Input placeholder="예: 홍길동 (고2)" value={form.targetPlayer} onChange={f('targetPlayer')} /></div>
              <div><label style={{ fontSize: 13, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 7 }}>상담 내용 *</label><Textarea placeholder="상담하고 싶은 내용을 자유롭게 적어주세요." value={form.message} onChange={f('message')} rows={6} /></div>
            </div>
            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <Button variant="ghost" onClick={() => setStep(1)} style={{ padding: '12px 24px' }}>← 이전</Button>
              <Button variant="primary" onClick={() => setStep(3)} disabled={!form.message} style={{ padding: '12px 32px' }}>다음 단계 →</Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: G.text, marginBottom: 24 }}>신청 내용 확인</h2>
            <div style={{ background: G.bg2, borderRadius: 8, padding: 24, marginBottom: 24 }}>
              {[['이름', form.name], ['이메일', form.email], ['전화번호', form.phone || '미입력'], ['상담 종류', form.type], ['관련 선수', form.targetPlayer || '미입력'], ['상담 내용', form.message]].map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${G.border}`, fontSize: 14 }}>
                  <span style={{ color: G.text3, fontWeight: 600 }}>{k}</span>
                  <span style={{ color: G.text, lineHeight: 1.6, wordBreak: 'break-all' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 18px', background: `${G.accent}10`, border: `1px solid ${G.accent}30`, borderRadius: 8, marginBottom: 28, fontSize: 13, color: G.text2, lineHeight: 1.7 }}>
              ✦ 입력하신 이메일로 확인 메일이 발송됩니다.<br />
              ✦ 영업일 기준 1~2일 내에 전문 상담사가 연락드립니다.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <Button variant="ghost" onClick={() => setStep(2)} style={{ padding: '12px 24px' }}>← 수정하기</Button>
              <Button variant="primary" onClick={handleSubmit} style={{ padding: '12px 36px', fontSize: 15 }}>상담 신청 완료 ✓</Button>
            </div>
          </div>
        )}
      </div>

      {/* 상담 유형 안내 카드 */}
      <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
        {CONSULT_INFO.map(item => (
          <div key={item.type} style={{ ...card, padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 4 }}>{item.type}</div>
              <div style={{ fontSize: 12, color: G.text3, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
