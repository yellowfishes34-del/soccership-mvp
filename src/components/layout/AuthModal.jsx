import { useState, useEffect } from 'react';
import { card, G } from '../../constants/theme';
import { USER_TYPES, ROLE_ICONS } from '../../constants/options';
import { ROLE_COLOR } from '../../constants/theme';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../shared/FormControls';
import Button from '../shared/Button';
import { Divider } from '../shared/ui';

export default function AuthModal() {
  const { modal, closeModal, openModal } = useUI();
  const { login, signup } = useAuth();
  const [form, setForm]   = useState({ email: '', password: '', username: '', role: '학부모' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = modal === 'login';

  useEffect(() => {
    setForm({ email: '', password: '', username: '', role: '학부모' });
    setError('');
  }, [modal]);

  const f = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const err = isLogin
      ? login({ email: form.email, password: form.password })
      : signup(form);
    setLoading(false);
    if (err) setError(err);
  };

  if (!modal) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
      onClick={e => e.target === e.currentTarget && closeModal()}
    >
      <div style={{ ...card, padding: 36, width: 'min(440px, 95vw)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, color: G.accent, fontWeight: 700, letterSpacing: 1.5, marginBottom: 4 }}>SOCCERSHIP</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: G.text }}>{isLogin ? '로그인' : '회원가입'}</h2>
          </div>
          <button onClick={closeModal} style={{ background: 'transparent', border: 'none', color: G.text3, fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {!isLogin && (
            <>
              {/* 사용자 유형 선택 */}
              <div>
                <label style={{ fontSize: 12, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 8 }}>사용자 유형</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {USER_TYPES.map(type => {
                    const selected = form.role === type;
                    const rc = ROLE_COLOR[type] || ROLE_COLOR['학부모'];
                    return (
                      <button key={type} onClick={() => setForm(p => ({ ...p, role: type }))}
                        style={{
                          padding: '10px 12px', borderRadius: 8,
                          border: `1px solid ${selected ? rc.text : G.border}`,
                          background: selected ? rc.bg : 'transparent',
                          color: selected ? rc.text : G.text2,
                          cursor: 'pointer', fontSize: 13, fontWeight: selected ? 700 : 500,
                          display: 'flex', alignItems: 'center', gap: 7,
                        }}>
                        <span>{ROLE_ICONS[type]}</span>
                        {type}
                        {selected && <span style={{ marginLeft: 'auto' }}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 6 }}>닉네임</label>
                <Input placeholder="사용할 닉네임을 입력하세요" value={form.username} onChange={f('username')} />
              </div>
            </>
          )}
          <div>
            <label style={{ fontSize: 12, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 6 }}>이메일</label>
            <Input type="email" placeholder="email@example.com" value={form.email} onChange={f('email')} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: G.text2, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              비밀번호{!isLogin && ' (6자 이상)'}
            </label>
            <Input type="password" placeholder="비밀번호를 입력하세요" value={form.password} onChange={f('password')} />
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: '#FF5C5C18', border: '1px solid #FF5C5C44', borderRadius: 8, color: G.red, fontSize: 13 }}>
            {error}
          </div>
        )}

        <Button variant="primary" onClick={handleSubmit} disabled={loading} style={{ width: '100%', marginTop: 22, padding: '13px', fontSize: 15 }}>
          {loading ? '처리 중...' : isLogin ? '로그인하기' : '가입하기'}
        </Button>

        {isLogin && (
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: G.text3, lineHeight: 1.8 }}>
            테스트: admin@soccership.kr / admin123<br />
            또는: parent1@test.kr / test1234
          </div>
        )}

        <Divider />
        <div style={{ textAlign: 'center', fontSize: 13, color: G.text2 }}>
          {isLogin ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
          <button
            onClick={() => openModal(isLogin ? 'signup' : 'login')}
            style={{ background: 'none', border: 'none', color: G.accent, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
          >
            {isLogin ? '회원가입' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
}
