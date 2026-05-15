import { useState, useEffect } from 'react';
import { G, card, CAT_COLORS } from '../constants/theme';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import Avatar from '../components/shared/Avatar';
import RoleBadge from '../components/shared/RoleBadge';
import { Textarea } from '../components/shared/FormControls';
import { Divider, EmptyState } from '../components/shared/ui';
import Button from '../components/shared/Button';

export default function PostDetailPage() {
  const { route, navigate }                            = useRouter();
  const { posts, comments, createComment, incrementViews } = useData();
  const { user }                                       = useAuth();
  const { openModal }                                  = useUI();
  const [commentText, setCommentText] = useState('');

  const post         = posts.find(p => p.id === route.params.postId);
  const postComments = comments[route.params.postId] || [];

  useEffect(() => {
    if (post) incrementViews(post.id);
  }, [route.params.postId]); // eslint-disable-line

  if (!post) return <EmptyState icon="🔍" title="게시글을 찾을 수 없습니다" desc="" />;

  const catColor = CAT_COLORS[post.category] || G.text3;

  const handleComment = () => {
    if (!commentText.trim()) return;
    createComment({ postId: post.id, content: commentText, authorId: user.id, authorName: user.username, authorRole: user.role });
    setCommentText('');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      <Button variant="ghost" onClick={() => navigate('board')} style={{ marginBottom: 28, fontSize: 13 }}>
        ← 게시판으로
      </Button>

      {/* 게시글 본문 */}
      <div style={{ ...card, padding: 36, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ background: `${catColor}1A`, color: catColor, padding: '2px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>{post.category}</span>
          <span style={{ fontSize: 12, color: G.text3 }}>{post.createdAt}</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: G.text, marginBottom: 20, lineHeight: 1.35 }}>{post.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          <Avatar name={post.authorName} size={30} />
          <span style={{ fontSize: 14, fontWeight: 600, color: G.text2 }}>{post.authorName}</span>
          <RoleBadge role={post.authorRole} />
          <span style={{ color: G.text3, fontSize: 13 }}>· 👁 {post.views} · ❤️ {post.likes}</span>
        </div>
        <Divider />
        <div style={{ color: G.text2, lineHeight: 1.9, fontSize: 15, whiteSpace: 'pre-wrap' }}>{post.content}</div>
      </div>

      {/* 댓글 섹션 */}
      <div style={{ ...card, padding: 28 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: G.text, marginBottom: 24 }}>
          댓글 <span style={{ color: G.accent, fontSize: 16 }}>{postComments.length}</span>
        </h2>

        {postComments.length === 0
          ? <div style={{ textAlign: 'center', padding: '32px 0', color: G.text3, fontSize: 14 }}>첫 번째 댓글을 남겨보세요!</div>
          : postComments.map(c => (
            <div key={c.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${G.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                <Avatar name={c.authorName} size={28} />
                <span style={{ fontSize: 14, fontWeight: 600, color: G.text }}>{c.authorName}</span>
                <RoleBadge role={c.authorRole} />
                <span style={{ fontSize: 12, color: G.text3 }}>{c.createdAt}</span>
              </div>
              <div style={{ color: G.text2, fontSize: 14, lineHeight: 1.7, paddingLeft: 38 }}>{c.content}</div>
            </div>
          ))
        }

        <Divider />
        {user ? (
          <div>
            <Textarea placeholder="댓글을 입력하세요..." value={commentText} onChange={setCommentText} rows={3} />
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" onClick={handleComment} disabled={!commentText.trim()}>댓글 등록</Button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: G.text2, fontSize: 14, marginBottom: 14 }}>댓글을 작성하려면 로그인이 필요합니다.</p>
            <Button variant="outline" onClick={() => openModal('login')}>로그인하기</Button>
          </div>
        )}
      </div>
    </div>
  );
}
