// 2026 한 해 학습운 테스트
// 과학: 0% / 재미: 100% / 부스 참여율: 높은 편(추정)

const $ = (sel) => document.querySelector(sel);

const screens = {
  start: $("#screenStart"),
  quiz: $("#screenQuiz"),
  result: $("#screenResult"),
};

const inpName = $("#inpName");
const selMode = $("#selMode");
const selMonth = $("#selMonth");
const selSpeed = $("#selSpeed");
const monthRow = $("#monthRow");

const btnStart = $("#btnStart");
const btnBack = $("#btnBack");
const btnRestartMid = $("#btnRestartMid");
const btnAgain = $("#btnAgain");
const btnCopy = $("#btnCopy");
const btnPrint = $("#btnPrint");

const qTitle = $("#qTitle");
const choicesEl = $("#choices");
const progressText = $("#progressText");
const progressBar = $("#progressBar");

const resultName = $("#resultName");
const resultType = $("#resultType");
const resultAvatar = $("#resultAvatar");
const resultSummary = $("#resultSummary");
const resultImg = $("#resultImg");

const mFocus = $("#mFocus");
const mPlan = $("#mPlan");
const mMind = $("#mMind");
const mBody = $("#mBody");

const goodRoute = $("#goodRoute");
const trap = $("#trap");
const mission = $("#mission");
const lucky = $("#lucky");
const monthLine = $("#monthLine");

const dlgHow = $("#dlgHow");
$("#btnHow").addEventListener("click", (e) => { e.preventDefault(); dlgHow.showModal(); });
$("#btnCloseDlg").addEventListener("click", () => dlgHow.close());

selMode.addEventListener("change", () => {
  monthRow.style.display = selMode.value === "month" ? "grid" : "none";
});

const QUESTIONS = [
  {
    q: "시험 2주 전. 너의 상태는?",
    options: [
      { tag:"계획러", text:"이미 일별 플랜이 있고, 체크리스트가 살아있다.", w:{ plan:3, focus:1, mind:1, body:0 } },
      { tag:"감으로 감", text:"대충 큰 단원만 잡고, 그날 컨디션 봐서 한다.", w:{ plan:1, focus:1, mind:1, body:1 } },
      { tag:"벼락형", text:"불안하지만 손이 안 간다. 내일의 나에게 맡긴다.", w:{ plan:0, focus:0, mind:1, body:1 } },
      { tag:"완벽주의", text:"플랜 짜다 하루가 끝난다. 플랜이 본체다.", w:{ plan:2, focus:0, mind:0, body:0 } },
    ]
  },
  {
    q: "집중이 깨지는 대표 원인은?",
    options: [
      { tag:"폰", text:"알림 한 번이면 끝. 정신이 로그아웃됨.", w:{ focus:0, mind:1, body:0, plan:0 } },
      { tag:"피로", text:"졸림이 모든 걸 이긴다. 내 의지? 그게 뭐지.", w:{ body:2, focus:0, mind:0, plan:0 } },
      { tag:"잡생각", text:"공부 중인데 인생 회의가 시작됨.", w:{ mind:2, focus:0, body:0, plan:0 } },
      { tag:"환경", text:"자리/소음/온도에 예민. 세상이 날 방해함.", w:{ focus:1, body:1, mind:0, plan:0 } },
    ]
  },
  {
    q: "너한테 가장 잘 먹히는 공부 방식은?",
    options: [
      { tag:"회독", text:"여러 번 돌려서 익숙해지면 안정감이 온다.", w:{ focus:1, plan:1, mind:1, body:0 } },
      { tag:"문제풀이", text:"문제로 때려야 머리에 남는다.", w:{ focus:2, plan:0, mind:0, body:0 } },
      { tag:"정리", text:"노트/정리/색깔펜. 눈으로 보여야 믿는다.", w:{ plan:2, focus:0, mind:0, body:0 } },
      { tag:"설명", text:"누구한테 설명하거나 말로 풀면 이해가 된다.", w:{ mind:1, focus:1, plan:0, body:0 } },
    ]
  },
  {
    q: "과제/공부 미루는 패턴은?",
    options: [
      { tag:"즉시처리", text:"미루면 마음이 더 불편해서 바로 끝낸다.", w:{ plan:2, mind:1, focus:1, body:0 } },
      { tag:"마감러", text:"마감이 다가오면 각성한다. 그전엔 잠.", w:{ focus:1, mind:0, plan:0, body:0 } },
      { tag:"현실도피", text:"해야 하는 건 아는데, 딴짓이 더 급해짐.", w:{ mind:0, plan:0, focus:0, body:0 } },
      { tag:"쪼개기", text:"작게 쪼개면 할 만해져서 그 방식으로 버틴다.", w:{ plan:2, focus:1, mind:1, body:0 } },
    ]
  },
  {
    q: "컨디션 관리에서 제일 취약한 건?",
    options: [
      { tag:"수면", text:"잠만 잘 자도 인생이 쉬워질 텐데…", w:{ body:0, mind:1, focus:0, plan:0 } },
      { tag:"식사", text:"먹는 게 들쑥날쑥. 뇌가 배고파함.", w:{ body:0, focus:0, mind:0, plan:0 } },
      { tag:"운동", text:"몸을 안 쓰니까 집중도 안 따라온다.", w:{ body:0, focus:1, mind:0, plan:0 } },
      { tag:"스트레스", text:"멘탈이 흔들리면 다 같이 무너진다.", w:{ mind:0, focus:0, body:0, plan:0 } },
    ]
  },
  {
    q: "실수했을 때 너의 반응은?",
    options: [
      { tag:"복구", text:"원인 분석하고 다음엔 같은 실수 안 하려 한다.", w:{ plan:1, mind:2, focus:1, body:0 } },
      { tag:"자책", text:"내가 문제임. (근데 해결은 안 됨)", w:{ mind:0, focus:0, plan:0, body:0 } },
      { tag:"넘김", text:"지나간 건 지나간 거. 다음 문제.", w:{ mind:1, focus:1, plan:0, body:0 } },
      { tag:"폭주", text:"불안해서 더 몰아치다가 번아웃 온다.", w:{ focus:1, mind:0, body:0, plan:0 } },
    ]
  },
  {
    q: "공부할 때 제일 좋은 배경은?",
    options: [
      { tag:"조용", text:"완전 무음. 종이 넘기는 소리도 거슬림.", w:{ focus:2, mind:0, plan:0, body:0 } },
      { tag:"백색소음", text:"카페/빗소리 같은 일정한 소음이 좋다.", w:{ focus:1, mind:1, plan:0, body:0 } },
      { tag:"음악", text:"노래 없으면 시작이 안 된다.", w:{ mind:1, focus:0, plan:0, body:0 } },
      { tag:"상관없음", text:"어디든 앉으면 한다. 환경 적응형.", w:{ focus:1, plan:1, mind:1, body:0 } },
    ]
  },
  {
    q: "너의 ‘의욕’은 주로 어디서 나오냐면",
    options: [
      { tag:"목표", text:"내가 원하는 미래가 뚜렷할수록 강해진다.", w:{ plan:2, mind:1, focus:1, body:0 } },
      { tag:"경쟁", text:"누가 잘하면 나도 불타오른다.", w:{ focus:2, mind:0, plan:0, body:0 } },
      { tag:"칭찬", text:"인정 받으면 지속력이 생긴다.", w:{ mind:2, focus:0, plan:0, body:0 } },
      { tag:"루틴", text:"의욕은 믿지 않는다. 시스템으로 간다.", w:{ plan:2, focus:1, mind:0, body:0 } },
    ]
  },
  {
    q: "하루가 망한 느낌이 들 때, 너는",
    options: [
      { tag:"리셋", text:"짧게라도 정리하고 내일을 살려둔다.", w:{ plan:1, mind:2, focus:0, body:0 } },
      { tag:"포기", text:"그냥 잔다. 내일의 나야 파이팅.", w:{ body:1, mind:0, focus:0, plan:0 } },
      { tag:"폭주", text:"지금이라도 만회하려고 밤샘 각.", w:{ focus:1, body:0, mind:0, plan:0 } },
      { tag:"자책루프", text:"왜 그랬지… 반복하다 시간 날림.", w:{ mind:0, focus:0, plan:0, body:0 } },
    ]
  },
  {
    q: "너의 공부 템포는 보통",
    options: [
      { tag:"꾸준", text:"매일 조금씩. 쌓이면 강해진다.", w:{ plan:2, focus:1, mind:1, body:1 } },
      { tag:"스퍼트", text:"할 때 몰아서 크게 뽑는다.", w:{ focus:2, plan:0, mind:0, body:0 } },
      { tag:"기복", text:"잘 되는 날과 안 되는 날 차이가 크다.", w:{ mind:0, body:0, focus:0, plan:0 } },
      { tag:"느긋", text:"급하게 안 한다. 대신 오래 붙든다.", w:{ mind:1, focus:1, plan:1, body:0 } },
    ]
  },
];

const RESULT_TYPES = [
  {
    key: "OWl",
    name: "새벽 올빼미형",
    avatar: "🦉",
    img: "./assets/result_owl.png",
    summary:
      "밤에 뇌가 켜지는 타입. 조용한 시간에 몰입하면 성적이 올라간다. 단, 수면 빚이 쌓이면 2026년 전체 운이 같이 무너짐.",
    goodRoute: "짧은 목표(25분) + 문제풀이로 몰입 유지, 밤 공부는 ‘마감 시간’ 정해두기",
    trap: "‘오늘만 더’ 하다가 수면 붕괴 → 다음날 집중력 증발",
    mission: "오늘은 공부 전 폰 알림 1시간 차단하기",
    lucky: "행운의 키워드: 조용함 / 체크리스트 / 따뜻한 차",
  },
  {
    key: "ROCKET",
    name: "로켓 스퍼트형",
    avatar: "🚀",
    img: "./assets/result_rocket.png",
    summary:
      "각 잡히면 미친 추진력. 단기간 점수 끌어올리기 최강. 대신 페이스 조절 실패하면 번아웃이 와서 손해를 크게 본다.",
    goodRoute: "스퍼트 2일 + 회복 1일 패턴으로 시스템화, 실전 문제로 감 유지",
    trap: "기세로 밤샘 → 컨디션 박살 → 연쇄 붕괴",
    mission: "오늘은 ‘마감 시간’ 정하고 그 시간 되면 무조건 종료",
    lucky: "행운의 키워드: 타이머 / 실전모드 / 스트레칭",
  },
  {
    key: "SHIELD",
    name: "멘탈 방패형",
    avatar: "🛡️",
    img: "./assets/result_shield.png",
    summary:
      "흔들려도 다시 돌아오는 회복력이 강점. 불안 관리만 되면 2026년에 꾸준히 우상향한다. 감정 루프만 조심.",
    goodRoute: "하루 1개라도 ‘완료’ 만들기, 오답노트를 ‘비난’이 아니라 ‘데이터’로 보기",
    trap: "자책이 길어질수록 행동이 멈춤",
    mission: "오늘 공부 시작 전에 ‘내가 할 수 있는 3가지’ 적기",
    lucky: "행운의 키워드: 리셋 / 기록 / 루틴",
  },
  {
    key: "CLOVER",
    name: "행운 루틴형",
    avatar: "🍀",
    img: "./assets/result_clover.png",
    summary:
      "재능보다 루틴으로 이기는 타입. 공부 운은 ‘쌓인 시간’에서 나온다는 걸 아는 사람. 2026년 장기전 최강.",
    goodRoute: "고정 루틴 2개(시작 루틴/마감 루틴) 만들기, 회독으로 안정감 쌓기",
    trap: "루틴이 무너지면 다시 세우기까지 시간이 오래 걸림",
    mission: "오늘은 공부 시작 루틴(물 한 잔+책상 정리) 고정하기",
    lucky: "행운의 키워드: 반복 / 회독 / 작은 성취",
  },
];

// 월별 운세 문구 (가볍게)
const MONTH_FORTUNE = {
  1: "1월: 새 출발 버프. ‘정리’가 점수를 만든다.",
  2: "2월: 기복 주의. 작은 루틴 하나만 고정해도 이김.",
  3: "3월: 속도 붙는다. 시작이 반이다(진짜로).",
  4: "4월: 집중력이 흔들리기 쉬움. 환경 세팅이 핵심.",
  5: "5월: 과제/수행평가 운 상승. 기록이 너를 살린다.",
  6: "6월: 시험운 분기점. 벼락은 리스크 크고, 회독이 안전.",
  7: "7월: 번아웃 경계. ‘휴식도 계획’에 넣어야 한다.",
  8: "8월: 역전 가능. 오답 정리하면 점수 급상승.",
  9: "9월: 꾸준함이 빛남. 루틴형이면 특히 강함.",
  10:"10월: 컨디션 관리가 승패. 잠이 성적이다.",
  11:"11월: 마무리 각. 실전 문제풀이가 효율 최고.",
  12:"12월: 정리의 달. 올해 데이터로 내년을 설계할 타이밍."
};

let state = {
  idx: 0,
  answers: Array(QUESTIONS.length).fill(null),
  score: { focus:0, plan:0, mind:0, body:0 },
  name: "",
  month: null,
  speed: "normal",
};

function show(screenKey){
  Object.values(screens).forEach(s => s.classList.add("hidden"));
  screens[screenKey].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetAll(){
  state = {
    idx: 0,
    answers: Array(QUESTIONS.length).fill(null),
    score: { focus:0, plan:0, mind:0, body:0 },
    name: "",
    month: null,
    speed: selSpeed.value || "normal",
  };
}

function calcScore(){
  const score = { focus:0, plan:0, mind:0, body:0 };
  state.answers.forEach((optIdx, qIdx) => {
    if(optIdx === null) return;
    const w = QUESTIONS[qIdx].options[optIdx].w;
    score.focus += (w.focus || 0);
    score.plan  += (w.plan  || 0);
    score.mind  += (w.mind  || 0);
    score.body  += (w.body  || 0);
  });
  state.score = score;
}

function pickResultType(){
  // 간단 분류 로직: 가장 높은 축 + 보정
  const s = state.score;
  const entries = [
    { k:"focus", v:s.focus },
    { k:"plan", v:s.plan },
    { k:"mind", v:s.mind },
    { k:"body", v:s.body },
  ].sort((a,b) => b.v - a.v);

  const top = entries[0].k;

  // 타입 매핑(대충 그럴듯하게)
  if(top === "focus") return RESULT_TYPES.find(r => r.key === "ROCKET");
  if(top === "plan")  return RESULT_TYPES.find(r => r.key === "CLOVER");
  if(top === "mind")  return RESULT_TYPES.find(r => r.key === "SHIELD");
  // body가 높으면 올빼미(컨디션 관리 강조)로 보내서 밸런스
  return RESULT_TYPES.find(r => r.key === "OWl");
}

function renderQuestion(){
  const q = QUESTIONS[state.idx];
  qTitle.textContent = q.q;

  const total = QUESTIONS.length;
  progressText.textContent = `${state.idx + 1}/${total}`;
  progressBar.style.width = `${Math.round(((state.idx + 1) / total) * 100)}%`;

  choicesEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const div = document.createElement("button");
    div.type = "button";
    div.className = "choice";
    if(state.answers[state.idx] === i) div.classList.add("selected");

    div.innerHTML = `
      <div class="cTop">
        <div class="cTag">${opt.tag}</div>
        <div aria-hidden="true">→</div>
      </div>
      <div class="cText">${opt.text}</div>
    `;

    div.addEventListener("click", () => {
      state.answers[state.idx] = i;
      // 빠른 모드면 선택 후 자동 다음
      if(selSpeed.value === "fast"){
        if(state.idx < QUESTIONS.length - 1){
          state.idx++;
          renderQuestion();
        }else{
          finishQuiz();
        }
      } else {
        renderQuestion();
      }
    });

    choicesEl.appendChild(div);
  });

  btnBack.disabled = (state.idx === 0);
}

function finishQuiz(){
  calcScore();
  const result = pickResultType();

  const name = (state.name || "익명 인간").trim();
  resultName.textContent = name;
  resultType.textContent = result.name;
  resultAvatar.textContent = result.avatar;
  resultSummary.textContent = result.summary;

  // 이미지: 없으면 숨김 처리
  resultImg.src = result.img;
  resultImg.onerror = () => { resultImg.style.display = "none"; };

  const clampPct = (x) => Math.max(8, Math.min(100, x));
  // 점수 최대치 대략 20 근처라서 적당히 스케일
  const toPct = (v) => clampPct(Math.round((v / 18) * 100));

  mFocus.style.width = `${toPct(state.score.focus)}%`;
  mPlan.style.width  = `${toPct(state.score.plan)}%`;
  mMind.style.width  = `${toPct(state.score.mind)}%`;
  mBody.style.width  = `${toPct(state.score.body)}%`;

  goodRoute.textContent = result.goodRoute;
  trap.textContent = result.trap;
  mission.textContent = result.mission;
  lucky.textContent = result.lucky;

  const month = state.month;
  const monthText = month ? `선택한 달 운세: ${MONTH_FORTUNE[month]}` : `랜덤 모드: ${pickRandomMonthLine()}`;
  monthLine.textContent = monthText;

  show("result");
}

function pickRandomMonthLine(){
  const m = Math.floor(Math.random()*12) + 1;
  return MONTH_FORTUNE[m];
}

function startQuiz(){
  resetAll();
  state.name = inpName.value.trim();
  state.speed = selSpeed.value;

  if(selMode.value === "month"){
    state.month = Number(selMonth.value);
  } else {
    state.month = null;
  }

  show("quiz");
  renderQuestion();
}

// 버튼 이벤트
btnStart.addEventListener("click", startQuiz);

btnBack.addEventListener("click", () => {
  if(state.idx > 0){
    state.idx--;
    renderQuestion();
  }
});

btnRestartMid.addEventListener("click", () => {
  show("start");
});

btnAgain.addEventListener("click", () => {
  show("start");
});

btnCopy.addEventListener("click", async () => {
  const txt = buildShareText();
  try{
    await navigator.clipboard.writeText(txt);
    btnCopy.textContent = "복사 완료";
    setTimeout(() => btnCopy.textContent = "결과 복사", 1200);
  }catch(e){
    alert("복사 실패… 브라우저가 심술부림. 직접 드래그해서 복사해줘.");
  }
});

btnPrint.addEventListener("click", () => {
  window.print();
});

function buildShareText(){
  const name = resultName.textContent;
  const type = resultType.textContent;
  const s = state.score;
  return [
    `2026 한 해 학습운 테스트 결과`,
    `닉네임: ${name}`,
    `타입: ${type}`,
    `스탯(대충): 집중 ${s.focus} / 계획 ${s.plan} / 멘탈 ${s.mind} / 컨디션 ${s.body}`,
    `잘 풀리는 루트: ${goodRoute.textContent}`,
    `주의할 함정: ${trap.textContent}`,
    `오늘의 미션: ${mission.textContent}`,
    `행운 키워드: ${lucky.textContent}`,
    `${monthLine.textContent}`,
    ``,
    `#교육동아리 #학습운 #2026`
  ].join("\n");
}

// 일반 모드에서는 마지막 문항에서 선택 후 “자동 완료”가 없으니,
// 사용자가 마지막 문항 선택했을 때 결과로 넘어갈 수 있게: 선택 변경 감지용
choicesEl.addEventListener("click", () => {
  // 일반 모드일 때만: 마지막 문항이면 0.2초 후 종료
  if(selSpeed.value !== "fast" && state.idx === QUESTIONS.length - 1){
    if(state.answers[state.idx] !== null){
      setTimeout(finishQuiz, 200);
    }
  }
});

// 초기 UI
monthRow.style.display = selMode.value === "month" ? "grid" : "none";
