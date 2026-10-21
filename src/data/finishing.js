export const FINISHES = [
  { name: '폴리싱', en: 'Polished', desc: '고광택으로 연마해 석재 본연의 색과 결을 가장 선명하게 드러냅니다.', gloss: 1, roughness: 0 },
  { name: '혼드', en: 'Honed', desc: '광을 죽인 매트한 표면으로 차분하고 부드러운 인상을 줍니다.', gloss: 0.35, roughness: 0.1 },
  { name: '브러쉬드', en: 'Brushed', desc: '브러시로 표면을 다듬어 은은한 질감과 촉감을 살립니다.', gloss: 0.2, roughness: 0.35 },
  { name: '레더', en: 'Leathered', desc: '가죽처럼 자연스러운 요철을 만들어 오염이 덜 드러납니다.', gloss: 0.15, roughness: 0.55 },
  { name: '샌드블라스트', en: 'Sandblasted', desc: '고압의 모래로 균일한 거친 면을 만들어 미끄럼을 방지합니다.', gloss: 0, roughness: 0.75 },
  { name: '버너', en: 'Flamed', desc: '고온의 불꽃으로 표면을 가공해 외장·바닥용 논슬립 효과를 냅니다.', gloss: 0, roughness: 1 },
];

export const PROCESSES = [
  { no: '01', name: '워터젯 커팅', en: 'Waterjet Cutting', desc: '고압수로 복잡한 곡선과 인레이 패턴까지 정밀하게 절단합니다.' },
  { no: '02', name: 'CNC 가공', en: 'CNC Machining', desc: '세면대, 싱크볼, 입체 조형물을 3D 데이터 그대로 가공합니다.' },
  { no: '03', name: '엣지 프로파일', en: 'Edge Profiling', desc: '일자, 라운드, 오지, 베벨 등 다양한 모서리 디자인을 제공합니다.' },
  { no: '04', name: '북매치', en: 'Book Matching', desc: '연속된 슬라브를 대칭으로 배치해 결이 이어지는 대형 패턴을 연출합니다.' },
];
