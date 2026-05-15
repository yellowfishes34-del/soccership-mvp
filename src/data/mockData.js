// ─────────────────────────────────────────────
// Soccership Mock Data
//
// Supabase 연동 시:
//   - MOCK_PLAYERS  → supabase.from('players').select()
//   - MOCK_POSTS    → supabase.from('posts').select()
//   - MOCK_COMMENTS → supabase.from('comments').select()
//   - MOCK_USERS    → supabase.auth.admin (또는 profiles 테이블)
// ─────────────────────────────────────────────

export const MOCK_PLAYERS = [
  {
    id: 'p1', name: '김준서', position: 'FW', level: '고등', grade: '고등학교 2학년',
    team: '매탄고등학교 축구부', height: '175cm', weight: '68kg', preferredFoot: '오른발', age: 17,
    bio: '빠른 스피드와 적극적인 전방 압박이 강점인 공격수. 작년 전국고교축구리그 득점 상위권에 오르며 주목받기 시작했다.',
    careerGoal: '대학 진학 후 K리그 선수',
    tournaments: ['2025 전국고교축구리그 (16강)', '2025 추계전국고교축구대회 (8강)', '2024 경기도체육대회 (금메달)'],
    growthNote: '작년 대비 신장 3cm 성장, 스프린트 능력 향상. 오른발 슈팅 정확도 집중 훈련 중.',
    videoUrl: '',
    stats: { 스피드: 88, 슈팅정확도: 74, 드리블: 82, 전방압박: 85, 협업능력: 70, 체력: 79 },
  },
  {
    id: 'p2', name: '이서연', position: 'MF', level: '대학', grade: '대학교 1학년',
    team: '한양대학교 축구부', height: '178cm', weight: '71kg', preferredFoot: '양발', age: 19,
    bio: '넓은 시야와 정확한 패스가 장점인 중앙 미드필더. 고등학교 시절 전국대회 MVP를 수상한 경력이 있다.',
    careerGoal: '실업팀·세미프로 선수',
    tournaments: ['2024 전국고교축구리그 MVP', '2023 추계대회 (4강)', '2024 전국체전 (경기도 대표)'],
    growthNote: '패스 정확도 꾸준히 향상. 왼발 활용도 증가. 세트피스 킥 집중 훈련 진행 중.',
    videoUrl: '',
    stats: { 패스정확도: 89, 시야: 85, 드리블: 76, 볼탈취: 72, 체력: 88, 리더십: 80 },
  },
  {
    id: 'p3', name: '박도현', position: 'CB', level: '중등', grade: '중학교 3학년',
    team: '오산중학교 축구부', height: '183cm', weight: '74kg', preferredFoot: '왼발', age: 15,
    bio: '또래보다 체격이 크고 공중볼 다툼에 강한 중학생 센터백. 고등학교 진학팀 선택을 앞두고 있다.',
    careerGoal: '명문 고등학교 진학 후 대학 축구',
    tournaments: ['2025 경기도중학교축구리그 (우승)', '2024 전국중학교축구대회 (8강)', '2025 춘계전국대회 (4강)'],
    growthNote: '1년간 신장 5cm 증가. 왼발 정확도 향상. 빌드업 패스 능력 개선 중.',
    videoUrl: '',
    stats: { 공중볼: 88, 대인마킹: 82, 빌드업패스: 68, 위치선정: 80, 체력: 76, 리더십: 72 },
  },
  {
    id: 'p4', name: '최민호', position: 'GK', level: '고등', grade: '고등학교 1학년',
    team: '광주고등학교 축구부', height: '185cm', weight: '78kg', preferredFoot: '오른발', age: 16,
    bio: '빠른 반사 신경과 넓은 수비 범위를 자랑하는 골키퍼. 이번 시즌 팀의 주전으로 도약했다.',
    careerGoal: '체육특기자 대학 진학',
    tournaments: ['2025 전국고교축구리그 (조별 1위)', '2024 전국체전 광주 대표', '2025 춘계대회 (준우승, 수비진 최우수)'],
    growthNote: '신장 및 팔 길이 성장으로 세이브 범위 확대. 킥 정확도 훈련 집중 진행.',
    videoUrl: '',
    stats: { 반사신경: 86, 세이브범위: 84, 공배급: 72, 공중볼장악: 85, 집중력: 88, 체력: 78 },
  },
  {
    id: 'p5', name: '정유진', position: 'RW', level: '초등', grade: '초등학교 6학년',
    team: '화성FC U-12', height: '158cm', weight: '52kg', preferredFoot: '오른발', age: 12,
    bio: '또래에서 압도적인 스피드와 드리블 능력을 보유한 유소년 윙어. 중학교 진학을 앞두고 있다.',
    careerGoal: '축구 명문 중학교 진학',
    tournaments: ['2025 화성시장배 U-12 (우승, 득점왕)', '2024 경기도유소년축구대회 (4강)', '2025 전국유소년대회 (8강)'],
    growthNote: '지난 1년 신장 4cm, 체중 5kg 증가. 왼발 보완 훈련 중.',
    videoUrl: '',
    stats: { 스피드: 92, 드리블: 88, 기본기: 80, 왼발활용: 60, 적극성: 90, 체력: 74 },
  },
  {
    id: 'p6', name: '한지훈', position: 'DM', level: '대학', grade: '대학교 3학년',
    team: '고려대학교 축구부', height: '181cm', weight: '77kg', preferredFoot: '오른발', age: 21,
    bio: '넓은 활동 범위와 강한 볼 탈취 능력을 갖춘 수비형 미드필더. 졸업 후 진로를 고민 중이다.',
    careerGoal: '실업팀 입단 또는 지도자 과정',
    tournaments: ['2025 전국대학축구리그 (4강)', '2024 대학축구 U리그 (우승)', '2023 전국체전 서울 대표'],
    growthNote: '부상 재활 후 체력 완전 회복. 전술 이해도 꾸준히 향상.',
    videoUrl: '',
    stats: { 볼탈취: 87, 커버범위: 84, 패스배급: 78, 위치선정: 85, 체력: 86, 전술이해: 88 },
  },
  {
    id: 'p7', name: '오세준', position: 'LB', level: '고등', grade: '고등학교 3학년',
    team: '울산현대고등학교 축구부', height: '174cm', weight: '68kg', preferredFoot: '왼발', age: 18,
    bio: '공격적인 오버래핑과 정확한 왼발 크로스가 장점인 왼쪽 풀백. 대학 체육특기자 전형 준비 중.',
    careerGoal: '체육특기자로 대학 진학',
    tournaments: ['2025 전국고교축구리그 (준우승)', '2025 추계대회 (우승, 베스트11)', '2024 전국체전 울산 대표'],
    growthNote: '크로스 성공률 지난 시즌 대비 15% 향상. 포트폴리오 준비 완료.',
    videoUrl: '',
    stats: { 오버래핑: 86, 크로스정확도: 83, 수비가담: 74, 스피드: 80, 체력: 82, 왼발정확도: 88 },
  },
  {
    id: 'p8', name: '신태민', position: 'FW', level: '중등', grade: '중학교 1학년',
    team: '전주중학교 축구부', height: '163cm', weight: '55kg', preferredFoot: '오른발', age: 13,
    bio: '빠른 성장세를 보이는 중학교 1학년 공격수. 초등학교 때부터 전북 지역에서 이름을 알렸다.',
    careerGoal: '명문 고등학교 축구부 진학',
    tournaments: ['2024 전국유소년대회 (우승, MVP)', '2025 전북중학교축구리그 (득점 2위)', '2025 춘계중학교대회 (4강)'],
    growthNote: '중학교 전환 후 체격 급성장. 피지컬 향상에 집중. 기본 패스 훈련 병행 중.',
    videoUrl: '',
    stats: { 스피드: 84, 슈팅: 79, 돌파력: 82, 적극성: 88, 기본기: 74, 체력: 80 },
  },
];

export const MOCK_POSTS = [
  {
    id: 'b1',
    title: '초등 6학년 중학교 축구부 선택 기준이 궁금합니다',
    content: '안녕하세요. 초등 6학년 아이를 둔 학부모입니다.\n\n내년 중학교 진학을 앞두고 아이가 축구부 활동을 계속하길 원하는데, 어떤 기준으로 중학교 축구부를 선택해야 할지 막막합니다.\n\n현재 고민하는 부분들:\n1. 성적보다 축구 명문 중학교를 선택해야 할까요?\n2. 통학 거리와 기숙사 여부가 중요한지요?\n3. 전임 코치 유무가 그렇게 중요한가요?\n\n경험 있으신 학부모님들의 조언 부탁드립니다!',
    authorId: 'u1', authorName: '학부모김씨', authorRole: '학부모',
    category: '팀 선택 고민', views: 412, likes: 34, createdAt: '2026-05-14',
  },
  {
    id: 'b2',
    title: '고등학교 진학 준비는 언제부터 어떻게 해야 하나요?',
    content: '중학교 2학년 아들을 둔 부모입니다.\n\n주변에서 고등학교 축구부 진학 준비는 일찍 시작해야 한다고 하는데, 구체적으로 어떤 준비가 필요한지 잘 모르겠습니다.\n\n궁금한 점:\n- 체육특기자 전형 기준이 학교마다 다른가요?\n- 대회 실적이 없으면 좋은 고등학교 진학이 어려운가요?\n- 포트폴리오 영상은 어떻게 준비하면 되나요?',
    authorId: 'u4', authorName: '축구아빠', authorRole: '학부모',
    category: '진학 정보', views: 387, likes: 41, createdAt: '2026-05-13',
  },
  {
    id: 'b3',
    title: '성장기 무릎 통증, 어떻게 관리해야 하나요?',
    content: '고등학교 1학년 아이가 훈련 후 무릎 통증을 자주 호소합니다.\n\n병원에서는 성장통과 오스굿-슐라터병이 의심된다고 했는데, 훈련을 완전히 쉬어야 하는지 판단이 서질 않습니다.\n\n같은 경험 하신 분들 계신가요?\n- 병원 치료와 재활을 병행하셨나요?\n- 훈련 복귀까지 얼마나 걸리셨나요?',
    authorId: 'u1', authorName: '걱정엄마', authorRole: '학부모',
    category: '부상·재활', views: 521, likes: 56, createdAt: '2026-05-12',
  },
  {
    id: 'b4',
    title: '대회 영상 포트폴리오는 어떻게 준비하면 좋을까요?',
    content: '고3 아들이 대학 체육특기자 지원을 앞두고 포트폴리오 영상을 준비하려고 합니다.\n\n직접 촬영한 영상들이 있긴 한데, 어떻게 편집하고 어떤 장면을 중심으로 구성해야 할지 막막합니다.\n\n알고 싶은 것들:\n1. 영상 길이는 얼마나 되어야 하나요?\n2. 유튜브에 올리는 게 맞는 건지, 파일로 전달해야 하는지?',
    authorId: 'u4', authorName: '대학준비중', authorRole: '학부모',
    category: '진학 정보', views: 298, likes: 29, createdAt: '2026-05-11',
  },
  {
    id: 'b5',
    title: '축구부 회비와 전지훈련 비용이 어느 정도 드나요?',
    content: '아이가 중학교 축구부에 막 들어갔습니다.\n\n입단 전에는 비용에 대한 정보를 제대로 못 얻어서 막연하게 생각했는데, 실제로 들어가 보니 생각보다 지출이 많더라고요.\n\n다른 분들은 보통 어느 정도 쓰시나요? 학교나 팀 레벨에 따라 차이가 크겠지만, 중학교 기준 평균적인 비용이 궁금합니다.',
    authorId: 'u1', authorName: '비용고민중', authorRole: '학부모',
    category: '학부모 자유게시판', views: 634, likes: 48, createdAt: '2026-05-10',
  },
  {
    id: 'b6',
    title: '대학 축구 진학을 위해 필요한 준비가 궁금합니다',
    content: '고등학교 2학년 아들이 대학 진학을 목표로 하고 있습니다.\n\n체육특기자 전형과 일반 전형 중 어떤 루트가 현실적인지, 또 대학 축구부의 운영 환경이 실제로 어떤지 궁금합니다.\n\n특히 프로 진출이 어렵다면 졸업 후 진로는 어떻게 되는지도 알고 싶습니다.',
    authorId: 'u4', authorName: '진로고민중', authorRole: '학부모',
    category: '진로 고민', views: 445, likes: 37, createdAt: '2026-05-09',
  },
];

export const MOCK_COMMENTS = {
  b1: [
    { id: 'c1', postId: 'b1', authorId: 'u1', authorName: '경험있는학부모', authorRole: '학부모', content: '전임 코치 유무를 가장 중요하게 봤습니다. 코치가 자주 바뀌면 일관성이 없더라고요.', createdAt: '2026-05-14' },
    { id: 'c2', postId: 'b1', authorId: 'u2', authorName: '축구코치A',       authorRole: '지도자', content: '통학 거리도 중요합니다. 성장기엔 수면과 회복이 핵심이에요!', createdAt: '2026-05-14' },
  ],
  b2: [
    { id: 'c3', postId: 'b2', authorId: 'u4', authorName: '고3아빠', authorRole: '학부모', content: '중2 때부터 준비하시는 거 정말 현명합니다! 대회 실적 영상은 꼭 미리미리 모아두세요.', createdAt: '2026-05-13' },
  ],
  b3: [
    { id: 'c4', postId: 'b3', authorId: 'u3', authorName: '재활전문가',    authorRole: '전문가', content: '오스굿-슐라터는 성장기에 흔한 증상입니다. 스트레칭과 아이싱을 꾸준히 하는 것이 중요합니다.', createdAt: '2026-05-12' },
    { id: 'c5', postId: 'b3', authorId: 'u1', authorName: '비슷한경험엄마', authorRole: '학부모', content: '저희 아이도 같은 증상이었어요. 3개월 강도를 낮추고 재활에 집중했더니 완전 회복됐습니다!', createdAt: '2026-05-12' },
  ],
  b4: [
    { id: 'c6', postId: 'b4', authorId: 'u2', authorName: '대학코치B', authorRole: '지도자', content: '영상은 3~5분 이내 하이라이트 위주로, 유튜브 비공개 링크로 공유하시면 됩니다.', createdAt: '2026-05-11' },
  ],
  b5: [],
  b6: [
    { id: 'c7', postId: 'b6', authorId: 'u2', authorName: '대학축구선수', authorRole: '선수', content: '체육특기자는 실제 경기 영상과 대회 실적이 핵심입니다. 지도자 자격증은 대학 2학년 이후부터 준비 가능합니다!', createdAt: '2026-05-09' },
  ],
};

export const MOCK_USERS = [
  { id: 'u0', email: 'admin@soccership.kr',  username: '관리자',    password: 'admin123',  role: 'admin'  },
  { id: 'u1', email: 'parent1@test.kr',      username: '학부모김씨', password: 'test1234', role: '학부모' },
  { id: 'u2', email: 'coach1@test.kr',       username: '축구코치A',  password: 'test1234', role: '지도자' },
  { id: 'u3', email: 'expert1@test.kr',      username: '재활전문가', password: 'test1234', role: '전문가' },
  { id: 'u4', email: 'player1@test.kr',      username: '고3아빠',    password: 'test1234', role: '학부모' },
];
