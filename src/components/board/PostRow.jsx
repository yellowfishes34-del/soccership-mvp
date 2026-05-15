import { useState } from 'react';
import { card, G, CAT_COLORS } from '../../constants/theme';
import RoleBadge from '../shared/RoleBadge';

export default function PostRow({ post, onClick }) {
  const [hovered, setHovered] = useState(false);
  const catColor = CAT_COLORS[post.category] || G.text3;

  return (
    <div
      style={{ ...card, padding: '14px 20px', cursor: 'pointer', borderColor: hovered ? G.border2 : G.border, transition: 'border-color 0.15s' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <span style={{
            background: `${catColor}1A`, color: catColor,
            padding: '2px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {post.category}
          </span>
          <span style={{ fontWeight: 600, color: G.text, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.title}
          </span>
          <span style={{ fontSize: 12, color: G.text3, whiteSpace: 'nowrap', flexShrink: 0 }}>{post.authorName}</span>
          <RoleBadge role={post.authorRole} />
        </div>
        <div style={{ display: 'flex', gap: 12, color: G.text3, fontSize: 12, flexShrink: 0 }}>
          <span>👁 {post.views}</span>
          <span>❤️ {post.likes}</span>
        </div>
      </div>
    </div>
  );
}
