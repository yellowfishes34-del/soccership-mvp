import { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_PLAYERS, MOCK_POSTS, MOCK_COMMENTS } from '../data/mockData';
import { useUI } from './UIContext';

const DataCtx = createContext(null);

export function DataProvider({ children }) {
  const [players, setPlayers]           = useState(MOCK_PLAYERS);
  const [posts,   setPosts]             = useState(MOCK_POSTS);
  const [comments, setComments]         = useState(MOCK_COMMENTS);
  const [consultations, setConsultations] = useState([]);
  const { showToast } = useUI();

  // ── Supabase 전환 시: supabase.from('players').insert() 로 교체 ──
  const createPlayer = useCallback((form) => {
    const newPlayer = {
      id:            `p${Date.now()}`,
      name:          form.name,
      position:      form.position,
      level:         form.level,
      grade:         form.grade,
      team:          form.team,
      age:           Number(form.age) || 0,
      height:        form.height,
      weight:        form.weight,
      preferredFoot: form.preferredFoot,
      bio:           form.bio,
      careerGoal:    form.careerGoal,
      growthNote:    form.growthNote,
      tournaments:   form.tournamentsRaw
                       .split('\n')
                       .map(t => t.trim())
                       .filter(Boolean),
      videoUrl:      form.videoUrl,
      stats:         {},
      registeredBy:  form.registeredBy,
      createdAt:     new Date().toISOString().slice(0, 10),
    };
    setPlayers(prev => [newPlayer, ...prev]);
    showToast(`${newPlayer.name} 선수 프로필이 등록되었습니다! 🎉`);
    return newPlayer;
  }, [showToast]);

  // ── Supabase 전환 시: supabase.from('posts').insert() 로 교체 ──
  const createPost = useCallback(({ title, content, category, authorId, authorName, authorRole }) => {
    const p = {
      id:         `b${Date.now()}`,
      title, content, category,
      authorId, authorName,
      authorRole: authorRole || '학부모',
      views:      0,
      likes:      0,
      createdAt:  new Date().toISOString().slice(0, 10),
    };
    setPosts(prev => [p, ...prev]);
    setComments(prev => ({ ...prev, [p.id]: [] }));
    showToast('게시글이 등록되었습니다!');
    return p;
  }, [showToast]);

  // ── Supabase 전환 시: supabase.from('comments').insert() 로 교체 ──
  const createComment = useCallback(({ postId, content, authorId, authorName, authorRole }) => {
    const c = {
      id:         `c${Date.now()}`,
      postId, content,
      authorId, authorName,
      authorRole: authorRole || '학부모',
      createdAt:  new Date().toISOString().slice(0, 10),
    };
    setComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), c] }));
    showToast('댓글이 등록되었습니다.');
    return c;
  }, [showToast]);

  // ── Supabase 전환 시: supabase.rpc('increment_views', { post_id }) 로 교체 ──
  const incrementViews = useCallback((postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, views: p.views + 1 } : p));
  }, []);

  // ── Supabase 전환 시: supabase.from('consultations').insert() 로 교체 ──
  const submitConsultation = useCallback((form) => {
    const c = {
      id:        `cons${Date.now()}`,
      ...form,
      status:    'pending',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setConsultations(prev => [...prev, c]);
    showToast('상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.');
    return c;
  }, [showToast]);

  return (
    <DataCtx.Provider value={{
      players, posts, comments, consultations,
      createPlayer, createPost, createComment,
      incrementViews, submitConsultation,
    }}>
      {children}
    </DataCtx.Provider>
  );
}

export const useData = () => useContext(DataCtx);
