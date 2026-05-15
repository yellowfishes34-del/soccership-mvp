import { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_USERS } from '../data/mockData';
import { useUI } from './UIContext';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [users, setUsers] = useState(MOCK_USERS);
  const { showToast, closeModal } = useUI();

  // ── Supabase 전환 시: supabase.auth.signInWithPassword() 로 교체 ──
  const login = useCallback(({ email, password }) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return '이메일 또는 비밀번호가 올바르지 않습니다.';
    setUser(found);
    closeModal();
    showToast(`${found.username}님 (${found.role}), 환영합니다! ⚽`);
    return null;
  }, [users, closeModal, showToast]);

  // ── Supabase 전환 시: supabase.auth.signUp() + profiles 테이블 insert 로 교체 ──
  const signup = useCallback(({ email, password, username, role }) => {
    if (!username || !email || !password) return '모든 항목을 입력해주세요.';
    if (password.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    if (users.find(u => u.email === email)) return '이미 사용 중인 이메일입니다.';
    const newUser = { id: `u${Date.now()}`, email, password, username, role: role || '학부모' };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    closeModal();
    showToast(`${username}님 (${role || '학부모'}), 환영합니다! ⚽`);
    return null;
  }, [users, closeModal, showToast]);

  // ── Supabase 전환 시: supabase.auth.signOut() 로 교체 ──
  const logout = useCallback(() => {
    setUser(null);
    showToast('로그아웃 되었습니다.');
  }, [showToast]);

  return (
    <AuthCtx.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
