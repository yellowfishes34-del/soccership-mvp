import { useState } from 'react';
import { G, card, CAT_COLORS } from '../constants/theme';
import { CATEGORIES, CATEGORY_OPTIONS } from '../constants/options';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { useResponsive } from '../hooks/useResponsive';
import PostRow from '../components/board/PostRow';
import { Input, Textarea, Select } from '../components/shared/FormControls';
import { FilterBar, EmptyState } from '../components/shared/ui';
import Button from '../components/shared/Button';

export default function BoardPage() {
  const { navigate }           = useRouter();
  const { posts, createPost }  = useData();
  const { user }               = useAuth();
  const { openModal }          = useUI();
  const { isMobile }           = useResponsive();

  const [catFilter, setCatFilter] = useState('전체');
  const [showForm,  setShowForm]  = useState(false);
  const [form, setForm] = useState({ title: '', content: '', category: '학부모 자유게시판' });

  const filtered = catFilter === '전체' ? posts : posts.filter(p => p.category === catFilter);

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    createPost({ ...form, authorId: user.id, authorName: user.username, authorRole: user.role });
    setForm({ title: '', content: '', category: '학부모 자유게시판' });
    setShowForm(false);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px' }}>
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: 'flex-start',
        gap: isMobile ? 14 : 0, marginBottom: 36,
      }}>
        <div>
          <div style={{ fontSize: 11, color: G.accent, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>COMMUNITY</div>
          <h1 style={{ fontSize: isMobile ? 32 : 44, fontWeight: 900, color: G.text }}>커뮤니티</h1>
          <p style={{ color: G.text2, fontSize: 14, marginTop: 8 }}>학부모·선수·지도자가 함께 나누는 진짜 경험과 정보</p>
        </div>
        {user
          ? <Button variant="primary" onClick={() => setShowForm(v => !v)}>{showForm ? '취소' : '+ 글쓰기'}</Button>
          : <Button variant="outline" onClick={() => openModal('login')}>로그인 후 글쓰기</Button>
        }
      </div>

      {/* 글쓰기 폼 */}
      {showForm && (
        <div style={{ ...card, padding: 28, marginBottom: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: G.text, marginBottom: 18 }}>새 게시글 작성</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: 12, marginBottom: 12 }}>
            <Input placeholder="제목을 입력하세요" value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} />
            <Select value={form.category} onChange={v => setForm(p => ({ ...p, category: v }))} options={CATEGORY_OPTIONS} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <Textarea placeholder="내용을 입력하세요" value={form.content} onChange={v => setForm(p => ({ ...p, content: v }))} rows={6} />
          </div>
          <Button variant="primary" onClick={handleSubmit} disabled={!form.title.trim() || !form.content.trim()}>등록하기</Button>
        </div>
      )}

      <FilterBar options={CATEGORIES} value={catFilter} onChange={setCatFilter} />

      {filtered.length === 0
        ? <EmptyState icon="📝" title="게시글이 없습니다" desc="첫 번째 게시글을 작성해보세요!" />
        : (
          <div style={{ display: 'grid', gap: 8 }}>
            {filtered.map(p => (
              <PostRow key={p.id} post={p} onClick={() => navigate('post-detail', { postId: p.id })} />
            ))}
          </div>
        )
      }
    </div>
  );
}
