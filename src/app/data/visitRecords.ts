export interface VisitRecord {
  id: number;
  date: string;
  dateLabel: string;
  time: string;
  title: string;
  place: string;
  summary: string;
  dialogue: string;
  tags: string[];
  image: string;
  mapPos: { x: number; y: number };
  durationMinutes: number;
  questionCount: number;
}

export const visitRecords: VisitRecord[] = [
  {
    id: 1,
    date: '2026-05-28',
    dateLabel: '5월 28일',
    time: '14:05',
    title: '경복궁 근정전',
    place: '경복궁',
    summary: '조선의 중심을 상징하는 전각으로, 왕의 즉위식과 국가 의례가 열리던 공간입니다.',
    dialogue: 'Q: 지붕 위의 작은 조각들은 뭐야?\nA: 잡상이라고 부르는 장식입니다. 나쁜 기운을 막아주는 상징적인 역할을 했어요.',
    tags: ['건축', '왕실 문화'],
    image:
      'https://images.unsplash.com/photo-1638964663550-e2123ac8900b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
    mapPos: { x: 45, y: 35 },
    durationMinutes: 42,
    questionCount: 8,
  },
  {
    id: 2,
    date: '2026-05-28',
    dateLabel: '5월 28일',
    time: '15:30',
    title: '경회루',
    place: '경복궁',
    summary: '연못 위에 세워진 누각으로, 외국 사신을 맞이하거나 연회를 열던 장소입니다.',
    dialogue: 'Q: 여기서는 어떤 행사를 했어?\nA: 주로 외국 사신을 맞이하거나 왕실 연회를 여는 장소로 사용했습니다.',
    tags: ['건축', '자연'],
    image:
      'https://images.unsplash.com/photo-1625551900827-f04c5bc3d26a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
    mapPos: { x: 25, y: 30 },
    durationMinutes: 36,
    questionCount: 6,
  },
  {
    id: 3,
    date: '2026-05-28',
    dateLabel: '5월 28일',
    time: '17:10',
    title: '광화문 광장',
    place: '광화문',
    summary: '과거 육조거리의 흐름을 품은 서울의 중심 광장입니다.',
    dialogue: 'Q: 육조거리가 무슨 뜻이야?\nA: 조선시대 주요 관청인 육조가 자리했던 거리라는 뜻입니다.',
    tags: ['역사', '랜드마크'],
    image:
      'https://images.unsplash.com/photo-1704942491152-a63de2499f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
    mapPos: { x: 50, y: 75 },
    durationMinutes: 28,
    questionCount: 5,
  },
  {
    id: 4,
    date: '2026-05-27',
    dateLabel: '5월 27일',
    time: '11:20',
    title: '북촌 한옥 골목',
    place: '북촌',
    summary: '전통 한옥의 지붕선과 좁은 골목이 이어지는 서울의 생활 문화 공간입니다.',
    dialogue: 'Q: 한옥 처마는 왜 곡선이야?\nA: 빗물을 흘려보내고 햇빛을 조절하면서도 건물의 인상을 부드럽게 만드는 구조입니다.',
    tags: ['한옥', '생활 문화'],
    image:
      'https://images.unsplash.com/photo-1625551900827-f04c5bc3d26a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
    mapPos: { x: 68, y: 42 },
    durationMinutes: 51,
    questionCount: 9,
  },
  {
    id: 5,
    date: '2026-05-27',
    dateLabel: '5월 27일',
    time: '13:45',
    title: '국립민속박물관',
    place: '삼청동',
    summary: '한국인의 생활사와 민속 문화를 전시로 살펴볼 수 있는 박물관입니다.',
    dialogue: 'Q: 장승은 왜 마을 앞에 세웠어?\nA: 마을의 경계를 알리고 외부의 나쁜 기운을 막는 수호 상징으로 여겨졌습니다.',
    tags: ['박물관', '민속'],
    image:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
    mapPos: { x: 57, y: 48 },
    durationMinutes: 39,
    questionCount: 7,
  },
  {
    id: 6,
    date: '2026-05-27',
    dateLabel: '5월 27일',
    time: '16:10',
    title: '인사동 공예 거리',
    place: '인사동',
    summary: '전통 공예품, 갤러리, 찻집이 모여 있는 문화 산책 거리입니다.',
    dialogue: 'Q: 나전칠기는 어떻게 빛이 나는 거야?\nA: 조개껍데기를 얇게 다듬어 붙인 뒤 옻칠로 마감해서 빛을 반사합니다.',
    tags: ['공예', '거리'],
    image:
      'https://images.unsplash.com/photo-1578922746465-3a80a228f223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
    mapPos: { x: 61, y: 63 },
    durationMinutes: 24,
    questionCount: 4,
  },
];

export const nearbyPlaces = [
  { id: 101, title: '국립고궁박물관', mapPos: { x: 30, y: 55 } },
  { id: 102, title: '대한민국역사박물관', mapPos: { x: 75, y: 65 } },
  { id: 103, title: '동십자각', mapPos: { x: 80, y: 35 } },
];

export function getVisitRecordById(id: number) {
  return visitRecords.find((record) => record.id === id);
}
