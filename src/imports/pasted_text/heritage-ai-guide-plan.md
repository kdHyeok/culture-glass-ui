## 1. 서비스 핵심 요약

* **핵심 가치:** 카메라와 음성을 통해 언어 및 디지털 장벽 없이 누구나 국가유산의 역사적 맥락을 깊이 있게 이해할 수 있는 배리어프리(Barrier-free) AI 해설 경험 제공
* **핵심 사용자:**
* 외국인 관광객 (언어/문화적 맥락 부재 해결)
* 노년층 및 디지털 소외계층 (복잡한 조작 및 시각적 인지 어려움 해결)
* 일반 관광객 (관람 기록 부재 및 단방향 정보 습득 해결)


* **핵심 UX 목표:**
* **Zero-UI 지향:** 화면 터치를 최소화하고 음성 및 카메라 시야 중심의 핸즈프리(Hands-free) 경험 제공
* **Calm Technology:** 사용자의 관람 시야를 방해하지 않는 투명하고 간결한 인터페이스
* **개인화된 연속성:** 일회성 해설로 끝나지 않고, 개인의 맥락(언어, 연령, 관심사)에 맞춘 다이어리로 경험 기록



---

## 2. 사용자 페르소나

### 외국인 관광객 (예: 프랑스인, 30대)

* **목표:** 한국의 국가유산에 담긴 역사와 문화적 의미를 본인의 모국어로 깊이 있게 이해하고 싶음.
* **불편함:** 한국어 위주의 안내판, 파편화된 번역/지도 앱 사용으로 인한 관람 흐름 단절, 단순 직역으로 인한 문화적 맥락(Context) 이해 불가.
* **필요한 UX:** 실시간 다국어 전환, 자국 문화(예: 베르사유 궁전)와 빗대어 설명해 주는 맞춤형 해설, 끊김 없는 카메라 백그라운드 오디오 재생.

### 노년층 사용자 (예: 내국인, 70대)

* **목표:** 복잡한 기기 조작 없이 눈앞에 있는 문화재가 무엇인지 쉽고 편하게 알고 싶음.
* **불편함:** 안내판의 작은 글씨와 어려운 한자어, QR코드 스캔이나 회원가입 등 복잡한 디지털 앱 사용 경험.
* **필요한 UX:** 큼직하고 명확한 타이포그래피(큰 글씨 모드), 고대비 UI, 직관적인 원버튼(또는 음성 발화) 실행, 일상 용어로 풀어낸 음성 중심의 인터페이스.

### 일반 관광객 (예: 내국인, 20대)

* **목표:** 데이트나 여행 중 방문한 장소를 기록하고, 나중에 여행 코스를 회고하거나 SNS에 공유하고 싶음.
* **불편함:** 설명만 듣고 지나치면 휘발되는 정보, 기존 안내판의 지루한 텍스트 나열.
* **필요한 UX:** 자동으로 정리되는 타임라인 기반의 관람 다이어리, 해설 요약 텍스트, 흥미로운 스토리텔링 중심의 UI.

---

## 3. 정보 구조 (IA)

```text
K-Heritage Sync
├── 홈 (카메라 메인)
│   ├── 카메라 뷰파인더 (실시간 화면)
│   ├── 메인 인터랙션 버튼 (촬영/음성 명령)
│   ├── AI 인식 상태 인디케이터
│   └── 사용자 프로필 퀵뷰 (언어/맞춤 설정)
├── 실시간 AI 해설
│   ├── 오디오 플레이어 (재생/일시정지/탐색)
│   ├── 맞춤형 해설 텍스트 (실시간 자막)
│   ├── 연관 이미지/출처 뷰어 (RAG 기반)
│   └── 대화형 Q&A (추가 질문하기)
├── 관람 다이어리 (방문 기록)
│   ├── 일자별 타임라인 뷰
│   ├── 지도 기반 방문 위치 뷰
│   └── 국가유산 상세 기록 (장소/시간/해설 요약/Q&A 기록)
└── 설정 (Settings)
    ├── 사용자 프로필 설정 (연령, 지식수준, 관심분야)
    ├── 다국어 설정 (음성/텍스트 언어)
    ├── 접근성 설정 (노년층 큰 글씨 모드, 고대비 모드, TTS 속도 조절)
    └── 권한 관리 (카메라, 마이크, 위치)

```

---

## 4. 사용자 플로우

**시나리오: 외국인 관광객이 국가유산을 촬영하고 다이어리를 확인하기까지**

1. **앱 실행 및 카메라 포인팅:** 사용자가 앱을 켜고 경복궁 근정전을 카메라 화면에 담는다. (UI: 카메라 뷰포트 중심, 심플한 포커스 영역 표시)
2. **캡처 및 AI 인식 (Trigger):** 하단의 플로팅 액션 버튼을 탭하거나 "Explain this"라고 말한다. (UI: 스캐닝 애니메이션 및 로딩 인디케이터 작동)
3. **데이터 검색 및 해설 생성:** VLM이 대상을 '근정전'으로 인식하고, RAG DB에서 공식 자료를 불러와 프랑스어 맞춤형 대본을 생성한다. (UI: "Analyzing heritage..." -> "Creating your guide..." 상태 메시지)
4. **AI 해설 청취 (Audio Playback):** 하단에서 바텀 시트가 부드럽게 올라오며 프랑스어 음성 해설이 시작된다. (UI: 오디오 비주얼라이저, 재생 컨트롤러, 핵심 키워드 자막 표시)
5. **추가 질문 (Q&A):** 해설 중 궁금한 점이 생겨 마이크 아이콘을 누르고 "지붕 위의 동물들은 뭐야?"라고 프랑스어로 묻는다. AI가 해당 맥락에 맞춰 답변을 이어간다. (UI: 대화형 말풍선 UI 추가)
6. **관람 종료 및 자동 기록:** 다른 장소로 이동하기 위해 바텀 시트를 스와이프하여 내린다. 방금 청취한 내역이 자동으로 앱 내 저장된다.
7. **다이어리 확인:** 관람을 마치고 하단 탭의 '다이어리'에 진입한다. (UI: 시간순 타임라인 카드 배열, 근정전 썸네일, 방문 시간, 프랑스어로 요약된 핵심 내용 확인)

---

## 5. 필요한 화면 리스트

| 화면명 | 화면 목적 | 핵심 UI 요소 | 필요한 컴포넌트 | 사용자 액션 |
| --- | --- | --- | --- | --- |
| **스플래시** | 브랜드 인지 및 앱 로딩 | 앱 로고, 부드러운 애니메이션 | Logo, Background Image | 대기 |
| **온보딩 & 설정** | 개인화 데이터 수집 | 언어, 연령대, 관심사 선택 카드 | Carousel, Toggle Button, Dropdown | 프로필 셋업 |
| **권한 허용** | 필수 권한 획득 | 마이크/카메라 접근 권한 안내 | Modal, Primary Button | 권한 승인 |
| **홈 (카메라)** | 대상 포인팅 및 트리거 | 전체화면 카메라, 중앙 포커스 링, 음성/촬영 버튼 | Camera View, FAB (Floating Action Button) | 탭/음성 발화 |
| **AI 인식 (로딩)** | 인식 과정 피드백 | 스캐닝 이펙트, 프로그레스 텍스트 | Lottie Animation, Status Text | 대기 |
| **AI 해설 (Player)** | 음성 청취 및 텍스트 확인 | 오디오 비주얼라이저, 재생 컨트롤, 스크롤 자막 | Bottom Sheet, Slider, Icon Buttons | 재생 제어, 읽기 |
| **해설 상세 (Q&A)** | 추가 질문 및 심화 정보 | 대화형 스레드, 마이크 버튼, 출처 링크 | Chat Bubbles, Mic Button, Link Text | 질문 발화/입력 |
| **다이어리 타임라인** | 관람 기록 확인 | 시간순 카드 리스트, 썸네일, 지도 토글 | Card List, Timeline Stepper, Map View | 스크롤, 탭 |
| **유산 상세 기록** | 특정 기록 회고 | 유산 이미지, 해설 요약본, 질문 내역 | Hero Image, Typography Hierarchy | 공유, 다시 듣기 |
| **접근성 설정** | 노년층 등 사용성 개선 | 큰 글씨 토글, TTS 속도 슬라이더 | Switch, Slider, High-contrast Toggle | 스위치 온/오프 |

---

## 6. 디자인 시스템 제안

* **스타일 방향:**
* 현대적이고 미니멀한 **Apple Human Interface Guidelines (HIG)** 수준의 완성도.
* **Calm Tech:** 콘텐츠(문화유산)가 돋보이도록 UI는 배경으로 물러나는 투명/반투명(Glassmorphism) 질감 활용.
* **시니어 친화적:** 중요 액션 버튼의 명도 대비(Contrast Ratio) 4.5:1 이상 준수.


* **컬러 팔레트 (한국의 전통에서 영감을 받은 모던 컬러):**
* *Primary:* **Celadon Green** (청자색, #5B8C7A) - 부드럽고 차분한 신뢰감.
* *Background:* **Hanji White** (한지색, #F9F8F6) - 눈이 편안한 웜톤 화이트.
* *Text/Accent:* **Ink Black** (먹색, #1C1B1A) - 높은 가독성.


* **타이포그래피:**
* Pretendard (한글) / San Francisco (영문).
* 기본 본문 16pt 이상, 시니어 모드 활성화 시 기본 본문 20pt 적용 및 굵기(Weight) 증가.


* **Spacing & Corner Radius:**
* 8pt Grid System 적용으로 여백의 일관성 확보.
* Corner Radius: 20px (전반적으로 둥글고 부드러운 카드 스타일로 친근감 부여).


* **UI 컴포넌트 스타일:**
* *카드:* 그림자를 최소화하고 Subtle border(1px, 10% opacity)를 사용한 플랫/클린 스타일.
* *버튼:* 플로팅 액션 버튼(FAB)은 64x64px 이상의 큰 터치 영역 확보.
* *아이콘:* 선 굵기가 일정하고(2px) 속이 빈(Outlined) 직관적인 미니멀 아이콘.
* *음성 인터랙션:* Siri 또는 Google Assistant처럼 하단에서 부드럽게 일렁이는 웨이브폼 애니메이션.



---

## 7. UX 디테일

* **카메라 인식 중 상태:**
* 화면 전체를 가리지 않고, 카메라 중앙 영역에만 은은한 글래스모피즘 박스와 스캐닝 바(Scanning bar)가 위아래로 움직이며 피드백 제공. "분석 중..."이라는 명확한 텍스트 동반.


* **인식 실패 상태:**
* 빨간색 경고창 대신, "문화재를 조금 더 가까이 비춰주세요"라는 툴팁과 함께 부드러운 햅틱 피드백(Haptic) 제공.


* **음성 재생 상태 & 핸즈프리 UX:**
* 사용자가 폰을 주머니에 넣거나 들고 걸을 것을 대비해, 화면 화면이 꺼져도 백그라운드 오디오 재생 유지. 잠금 화면에서도 컨트롤러(OS 기본 기능) 연동.


* **노년층 큰 글씨 모드 (Accessibility):**
* 단순히 글씨만 커지는 것이 아니라, 불필요한 UI(예: 미니맵, 태그)가 숨겨지고 '재생', '정지', '다시 듣기' 3가지 핵심 버튼만 화면 하단에 큼직하게 재배치됨.


* **다국어 전환 UX:**
* 복잡한 설정 뎁스(Depth)를 타지 않고, 홈 화면 우측 상단에 현재 언어 국기/텍스트 칩을 배치하여 원탭(One-tap)으로 드롭다운 전환 가능.



---

## 8. 최종 Figma AI 프롬프트

```text
Design a production-ready, highly detailed mobile app UI for a modern AI-powered heritage guide app named "K-Heritage Sync". The aesthetic should be premium travel-tech, minimal, accessible, and fully compliant with iOS Human Interface Guidelines (Apple HIG). Adopt a "Calm Tech" philosophy where UI elements do not obstruct the camera view. Use a soft, natural color palette inspired by Korean heritage: Hanji White (warm off-white) for backgrounds, Celadon Green (muted soft green) for primary actions, and Ink Black for text. Use a clean, sans-serif typography with high contrast for accessibility. Layout based on an 8pt grid with soft 20px corner radius for cards and bottom sheets. 

Generate the following 5 key screens in high fidelity:

1. [Onboarding & Profile Setup Screen]: 
A clean white background screen asking "Tell us about yourself to personalize your guide." Include elegant selection cards for Language (English, French, Korean), Age group, and Interest areas (Architecture, History, Royalty). Use toggle states with Celadon Green active states. Place a large, high-contrast "Start Exploring" button at the bottom.

2. [Home - Camera Recognition UI]: 
A full-screen camera view showing a traditional Korean palace building (e.g., Gyeongbokgung). Overlay a subtle, glassmorphism viewfinder frame in the center. At the bottom, design a large, prominent floating action button (FAB, 72x72px) with a microphone icon for hands-free voice trigger. Include a smooth, glowing Siri-like voice visualizer wave at the bottom edge. Top right corner should have a quick-toggle chip for Language and a high-contrast 'Accessibility/Senior Mode' toggle.

3. [AI Guide & Voice Assistant Player]: 
The camera view is blurred in the background. A large bottom sheet covers the lower 60% of the screen. Inside the bottom sheet: A title "Gyeongbokgung Geunjeongjeon", a dynamic audio visualizer indicating TTS playback, large media playback controls (Play/Pause, Rewind 15s), and a clean, legible auto-scrolling transcription of the explanation. Add a subtle text input field at the bottom saying "Ask a question..." with a microphone icon for interactive Q&A.

4. [Heritage Visit Timeline Diary Screen]: 
A beautiful vertical timeline view tracking the user's travel journey. The background is Hanji White. Display chronological cards connected by a thin vertical line. Each card represents a visited heritage site, featuring a small thumbnail image, the timestamp (e.g., "14:05"), the location name, and a 2-line personalized summary text generated by AI. Include small pill-shaped tags showing the focused interest (e.g., "Architecture"). 

5. [Senior-Friendly Accessibility Mode - Detail Screen]: 
A modified version of the AI Guide screen optimized for elderly users. Extremely simplified UI with a solid high-contrast background (no camera blur). Typography is increased by 150% (minimum 24pt for body text). Features only three massive, solid-colored buttons (Play, Pause, Repeat) with both icons and text labels. 

Ensure realistic shadows, proper spacing, clear visual hierarchy, and a polished, professional finish that a frontend developer can immediately use for implementation.

```