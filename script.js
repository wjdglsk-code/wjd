// 2026 학습운 테스트 (모바일 카드형, 5점 척도, 자동 다음)
const $ = (s) => document.querySelector(s);

// 화면
const start = $("#start");
const quiz = $("#quiz");
const result = $("#result");

// 시작
const nameInput = $("#name");
const startBtn = $("#startBtn");

// 퀴즈 UI
const backBtn = $("#backBtn");
const restartBtn = $("#restartBtn");
const qnum = $("#qnum");
const question = $("#question");
const choices = $("#choices");
const progressText = $("#progressText");
const bar = $("#bar");

// 결과 UI
const resultTitle = $("#resultTitle");
const resultDesc = $("#resultDesc");
const resultImg = $("#resultImg");
const tip = $("#tip");

const mFocus = $("#mFocus");
const mPlan  = $("#mPlan");
const mMind  = $("#mMind");
const mBody  = $("#mBody");

const againBtn = $("#againBtn");
const copyBtn  = $("#copyBtn");
const printBtn = $("#printBtn");

// “아무것도 안 뜸” 방지: 요소 누락이면 콘솔에 박제
const required = {
  start, quiz, result, nameInput, startBtn,
  backBtn, restartBtn, qnum, question, choices, progressText, bar,
  resultTitle, resultDesc, resultImg, tip,
  mFocus, mPlan, mMind, mBody,
  againBtn, copyBtn, printBtn
};
for (const [k,v] of Object.entries(required)) {
  if (!v) console.error(`[DOM 누락] ${k} 요소를 못 찾음. index.html의 id가 맞는지 확인.`);
}

const LIKERT = [
  { label:"매우 그렇다", value:5, sub:"완전 내 얘기" },
  { label:"그렇다", value:4, sub:"대체로 맞음" },
  { label:"보통이다", value:3, sub:"그냥 그럼" },
  { label:"아니다", value:2, sub:"잘 안 그럼" },
  { label:"전혀 아니다", value:1, sub:"아예 아님" },
];

// 고1~고3 대상 문항(10)
const QUESTIONS = [
  { q:"나는 시험 2주 전부터 공부 계획을 구체적으로 세운다.", dim:"plan" },
  { q:"공부 중 휴대폰 알림이 오면 집중이 크게 흔들린다.", dim:"focus", reverse:true },
  { q:"정해진 시간에 앉기만 하면 어느 정도 공부가 진행된다.", dim:"plan" },
  { q:"모르는 문제가 나오면 불안해져서 손이 멈춘다.", dim:"mind", reverse:true },
  { q:"문제풀이를 하면 집중이 더 잘 된다.", dim:"focus" },
  { q:"수면/피로에 따라 공부 효율이 크게 바뀐다.", dim:"body", reverse:true },
  { q:"실수했을 때 원인을 정리하고 다음에 반영한다.", dim:"mind" },
  { q:"해야 할 일이 많을수록 우선순위를 잡는 편이다.", dim:"plan" },
  { q:"공부가 안 되는 날에도 ‘최소량’은 채우려고 한다.", dim:"mind" },
  { q:"시험 기간에 컨디션(잠/식사)을 의식적으로 관리한다.", dim:"body" },
];

// 결과 타입 4개 (이미지 없으면 자동 숨김)
const TYPES = [
  {
    key:"CLOVER",
    title:"🍀 루틴 축적형",
    desc:"꾸준함으로 이기는 타입. 2026 장기전에서 강함.",
    img:"./assets/type1.jpg",
    tip:"시작 루틴(물 한 잔+책상 정리) + 마감 루틴(오답 3줄 기록)만 고정하면, 성적이 루틴 따라 올라감."
  },
  {
    key:"OWL",
    title:"🦉 몰입 집중형",
    desc:"집중 잡히면 확 올라감. 환경 세팅이 성패.",
    img:"./assets/type2.jpg",
    tip:"폰은 시야 밖 + 타이머 25분. 자리/소음만 정리해도 효율이 확 바뀜."
  },
  {
    key:"SHIELD",
    title:"🛡️ 회복 방패형",
    desc:"회복력이 강점. 자책 루프만 끊으면 우상향.",
    img:"./assets/type3.jpg",
    tip:"오답은 실패가 아니라 데이터. 하루 1개 ‘완료’만 만들어도 흐름이 복구됨."
  },
  {
    key:"ROCKET",
    title:"🚀 스퍼트 추진형",
    desc:"몰아칠 때 폭발력. 페이스 조절이 필수.",
    img:"./assets/type4.jpg",
    tip:"‘스퍼트 2일 + 회복 1일’로 시스템화. 밤샘은 2026 전체 운을 깎는 지름길."
  }
];

let state = initState();

function initState(){
  return {
    i: 0,
    name: "",
    answers: Array(QUESTIONS.length).fill(null),
    score: { focus:0, plan:0, mind:0, body:0 },
  };
}

function show(section){
  [start, quiz, result].forEach(el => el.classList.add("hidden"));
  section.classList.remove("hidden");
  window.scrollTo({ top:0, behavior:"smooth" });
}

function render(){
  const total = QUESTIONS.length;
  const q = QUESTIONS[state.i];

  qnum.textContent = `Q${state.i + 1}`;
  question.textContent = q.q;

  progressText.textContent = `${state.i + 1} / ${total}`;
  bar.style.width = `${Math.round(((state.i + 1) / total) * 100)}%`;

  backBtn.disabled = (state.i === 0);

  choices.innerHTML = "";
  LIKERT.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    if(state.answers[state.i] === opt.value) btn.classList.add("selected");

    btn.innerHTML = `<strong>${opt.label}</strong><span>${opt.sub}</span>`;

    btn.addEventListener("click", () => {
      state.answers[state.i] = opt.value;

      // 선택 표시
      [...choices.children].forEach(c => c.classList.remove("selected"));
      btn.classList.add("selected");

      // 자동 다음(마지막이면 결과)
      setTimeout(() => {
        if(state.i < total - 1){
          state.i++;
          render();
        }else{
          finish();
        }
      }, 180);
    });

    choices.appendChild(btn);
  });
}

function compute(){
  const s = { focus:0, plan:0, mind:0, body:0 };
  state.answers.forEach((v, idx) => {
    if(v == null) return;
    const q = QUESTIONS[idx];
    const val = q.reverse ? (6 - v) : v; // 5점 척도 반전
    s[q.dim] += val;
  });
  state.score = s;
}

function pickType(){
  const topDim = Object.entries(state.score).sort((a,b)=>b[1]-a[1])[0][0];
  if(topDim === "plan") return TYPES.find(t => t.key === "CLOVER");
  if(topDim === "focus") return TYPES.find(t => t.key === "OWL");
  if(topDim === "mind") return TYPES.find(t => t.key === "SHIELD");
  return TYPES.find(t => t.key === "ROCKET");
}

function setMeters(){
  // 축별 문항 개수 차이 고려해서 대충 최대 15로 스케일
  const toPct = (v, max=15) => Math.max(8, Math.min(100, Math.round((v/max) * 100)));
  mFocus.style.width = `${toPct(state.score.focus)}%`;
  mPlan.style.width  = `${toPct(state.score.plan)}%`;
  mMind.style.width  = `${toPct(state.score.mind)}%`;
  mBody.style.width  = `${toPct(state.score.body)}%`;
}

function finish(){
  compute();
  const t = pickType();
  const n = (state.name || "익명").trim();

  resultTitle.textContent = `${n}의 결과: ${t.title}`;
  resultDesc.textContent = t.desc;
  tip.textContent = t.tip;

  resultImg.style.display = "block";
  resultImg.src = t.img;
  resultImg.onerror = () => { resultImg.style.display = "none"; };

  setMeters();
  show(result);
}

function shareText(){
  const s = state.score;
  return [
    `2026 학습운 테스트 결과`,
    `닉네임: ${(state.name || "익명").trim()}`,
    `점수(대충): 집중 ${s.focus} / 계획 ${s.plan} / 멘탈 ${s.mind} / 컨디션 ${s.body}`,
    `${resultTitle.textContent}`,
    `2026 운영법: ${tip.textContent}`,
    `#교육동아리 #학습운 #2026`
  ].join("\n");
}

/* 이벤트 */
startBtn.addEventListener("click", () => {
  state = initState();
  state.name = nameInput.value.trim();
  show(quiz);
  render();
});

backBtn.addEventListener("click", () => {
  if(state.i > 0){
    state.i--;
    render();
  }
});

restartBtn.addEventListener("click", () => show(start));
againBtn.addEventListener("click", () => show(start));

copyBtn.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(shareText());
    copyBtn.textContent = "복사 완료";
    setTimeout(()=>copyBtn.textContent="결과 복사", 1200);
  }catch{
    alert("복사가 막혔음. 브라우저가 또 까다롭게 굶. (직접 복사해도 됨)");
  }
});

printBtn.addEventListener("click", () => window.print());
