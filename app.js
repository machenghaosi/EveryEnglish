const stateKey = "everyEnglishProgress";

const defaultState = {
  outputs: 0,
  materials: 0,
  lastStudyDate: "",
  streak: 0
};

const sources = [
  {
    name: "睡眠和精力状态",
    url: "https://www.bbc.co.uk/learningenglish/",
    tag: "短视频 / 听力 / 日常表达",
    idea: "适合拿一个短节目，练“听懂重点 + 复述给朋友”。",
    sample: "看到一个关于睡眠、工作或天气的话题后，练习向别人解释你为什么今天状态不好。"
  },
  {
    name: "交通和临时迟到",
    url: "https://learningenglish.voanews.com/",
    tag: "慢速新闻 / 美国生活",
    idea: "适合中级学习者从新闻里提取生活词块。",
    sample: "读到交通、健康、消费类新闻后，练习问路、预约或说明自己的需求。"
  },
  {
    name: "轻新闻复述",
    url: "https://www.newsinlevels.com/",
    tag: "分级新闻 / 每日更新",
    idea: "适合 A2-B1，用同一新闻从简单版本开始练。",
    sample: "读一条轻新闻后，用 3 句话告诉朋友“发生了什么、你怎么看、想问什么”。"
  },
  {
    name: "热门话题讨论",
    url: "https://breakingnewsenglish.com/",
    tag: "分级课程 / 讨论题",
    idea: "适合把新闻变成讨论、角色扮演和听写练习。",
    sample: "用文章里的讨论题，改成和同学、同事、店员之间的真实对话。"
  },
  {
    name: "表达偏好和选择",
    url: "https://engoo.com/app/daily-news",
    tag: "词汇 / 问答 / 口语讨论",
    idea: "适合围绕一个话题做 10 分钟口语输出。",
    sample: "读完一篇日常新闻后，练习表达偏好、解释选择、礼貌反问。"
  },
  {
    name: "外卖或取餐提醒",
    url: "#materials",
    tag: "通知 / 菜单 / 短信",
    idea: "最贴近现实：直接用你今天收到、看到、需要处理的内容。",
    sample: "把外卖提醒、课程通知、店铺公告变成一句请求或一次确认。"
  },
  {
    name: "天气变化",
    url: "https://www.newsinlevels.com/",
    tag: "天气 / 出行 / 小解释",
    idea: "适合把天气新闻变成迟到、改约、提醒别人带伞的表达。",
    sample: "因为突然下雨，你想告诉朋友自己会晚到，并确认是否还在原地点见面。"
  },
  {
    name: "店铺公告",
    url: "#materials",
    tag: "公告 / 营业时间 / 服务",
    idea: "适合练确认营业时间、询问库存、预约和退款。",
    sample: "看到店铺临时关门或调整营业时间，你想确认明天是否还能过去取东西。"
  },
  {
    name: "课程或会议通知",
    url: "#materials",
    tag: "邮件 / 通知 / 时间变动",
    idea: "适合练确认时间、请假、改约和解释原因。",
    sample: "收到课程或会议改时间的通知后，你想确认新时间，并说明自己可能无法参加。"
  },
  {
    name: "健康和身体状态",
    url: "https://learningenglish.voanews.com/",
    tag: "健康 / 生活方式 / 状态说明",
    idea: "适合练描述不舒服、请求休息、取消安排但保持礼貌。",
    sample: "你今天有点不舒服，想临时取消见面，并给对方一个新的可选时间。"
  },
  {
    name: "消费和价格变化",
    url: "https://engoo.com/app/daily-news",
    tag: "购物 / 价格 / 选择",
    idea: "适合练询问价格、解释预算、表达想换一个选项。",
    sample: "你发现价格比预期高，想礼貌询问有没有更便宜的选择或折扣。"
  },
  {
    name: "朋友聊天话题",
    url: "https://www.bbc.co.uk/learningenglish/",
    tag: "短视频 / 社交 / 延伸聊天",
    idea: "适合从一个轻松话题开始，练主动追问和自然收尾。",
    sample: "看到一个关于电影、饮食或周末活动的短内容后，你想问朋友的看法并继续聊下去。"
  }
];

const scenarioTemplates = {
  request: {
    title: "提出小请求",
    setup: "你需要让对方帮你做一件小事，但不想显得太生硬。",
    dialogue: [
      "Could I ask a quick favor?",
      "Would it be possible to {action}?",
      "I understand if that is not convenient.",
      "Thanks, I really appreciate it."
    ],
    extensions: ["如果对方拒绝，你怎么换一种说法？", "你能不能把理由压缩成一句话？"]
  },
  explain: {
    title: "解释情况",
    setup: "你遇到一个小麻烦，需要简单解释原因，并让对方理解。",
    dialogue: [
      "Sorry, something came up.",
      "The thing is, {reason}.",
      "I am trying to sort it out now.",
      "Thanks for understanding."
    ],
    extensions: ["把解释说得更短一点。", "加入一句你接下来会怎么处理。"]
  },
  confirm: {
    title: "确认信息",
    setup: "你不确定时间、地点、规则或对方意思，需要礼貌确认。",
    dialogue: [
      "Just to confirm, {detail}?",
      "Did you mean the one near the entrance?",
      "I want to make sure I understood correctly.",
      "Great, thanks for clarifying."
    ],
    extensions: ["如果你听错了，对方纠正你后怎么回应？", "把确认句改得更自然。"]
  },
  reschedule: {
    title: "临时改计划",
    setup: "原计划有变化，你需要改时间，同时给出简短理由。",
    dialogue: [
      "I am sorry, but I may need to change our plan.",
      "{reason}, so would later still work?",
      "If not, I can do tomorrow afternoon.",
      "Thanks for being flexible."
    ],
    extensions: ["给对方两个可选时间。", "把道歉和新方案放在同一句里。"]
  },
  help: {
    title: "请求帮助",
    setup: "你卡在一个小问题上，需要对方帮你确认、解释或带一下路。",
    dialogue: [
      "Excuse me, could you help me with something?",
      "I am trying to {action}, but I am not sure how.",
      "Could you show me where to go?",
      "That helps a lot. Thank you."
    ],
    extensions: ["如果对方很忙，你怎么更礼貌？", "把求助改成发短信的版本。"]
  }
};

const phraseBanks = {
  "A2-B1": ["Could I...?", "I need to...", "Is it okay if...?", "Thank you for your help."],
  "B1-B2": ["Would it be possible to...?", "The thing is...", "Just to confirm...", "Thanks for understanding."],
  C1: ["I was wondering if...", "I appreciate your flexibility.", "I just wanted to clarify...", "Sorry for the short notice."]
};

let sourceBatch = 0;
let lastSourceIndexes = [];

function readState() {
  return { ...defaultState, ...JSON.parse(localStorage.getItem(stateKey) || "{}") };
}

function writeState(nextState) {
  localStorage.setItem(stateKey, JSON.stringify(nextState));
  renderProgress();
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak(current) {
  const today = todayKey();
  if (current.lastStudyDate === today) return current;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  return {
    ...current,
    lastStudyDate: today,
    streak: current.lastStudyDate === yesterdayKey ? current.streak + 1 : 1
  };
}

function renderProgress() {
  const state = readState();
  document.getElementById("streakCount").textContent = state.streak;
  document.getElementById("outputCount").textContent = state.outputs;
  document.getElementById("materialCount").textContent = state.materials;
}

function pickSourceIndexes(count) {
  const allIndexes = sources.map((_, index) => index);
  const available = allIndexes.filter((index) => !lastSourceIndexes.includes(index));
  const pool = available.length >= count ? available : allIndexes;

  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function renderSources(indexes = pickSourceIndexes(3)) {
  const grid = document.getElementById("sourceGrid");
  lastSourceIndexes = indexes;
  sourceBatch += 1;
  document.getElementById("sourceBatchLabel").textContent = `第 ${sourceBatch} 批材料建议`;

  grid.innerHTML = indexes
    .map((sourceIndex) => {
      const source = sources[sourceIndex];
      return `
        <article class="source-card">
          <p class="eyebrow">${source.tag}</p>
          <h3>${source.name}</h3>
          <p>${source.idea}</p>
          <p><strong>可转化场景：</strong>${source.sample}</p>
          <div class="source-actions">
            <a class="button secondary" href="${source.url}" target="${source.url.startsWith("#") ? "_self" : "_blank"}" rel="noreferrer">打开来源</a>
            <button class="button primary" type="button" data-source-index="${sourceIndex}">用它生成</button>
          </div>
        </article>
      `;
    })
    .join("");

  grid.querySelectorAll("[data-source-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const source = sources[Number(button.dataset.sourceIndex)];
      document.getElementById("materialTitle").value = source.name;
      document.getElementById("materialContext").value = source.sample;
      document.getElementById("materials").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function extractKeywords(text) {
  return text
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 5);
}

function fillDialogue(line, context) {
  const action = context.includes("late") || context.includes("迟到") ? "come a bit later" : "change this a little";
  const reason = context || "I have a small timing issue";
  const detail = context || "we are meeting at the same place";
  return line.replace("{action}", action).replace("{reason}", reason).replace("{detail}", detail);
}

function createTask({ title, context, level, scenarioType }) {
  const scenario = scenarioTemplates[scenarioType];
  const keywords = extractKeywords(`${title} ${context}`);
  const phrases = phraseBanks[level];
  const dialogue = scenario.dialogue.map((line) => fillDialogue(line, context.slice(0, 90)));

  return `
    <p class="eyebrow">${new Date().toLocaleDateString("zh-CN")} · ${level}</p>
    <h3>${scenario.title}：${title}</h3>
    <p><strong>真实场景：</strong>${scenario.setup}</p>
    <p><strong>材料线索：</strong>${context || "先从这个主题补充一个你今天真的可能遇到的细节。"}</p>
    <p><strong>关键词：</strong>${keywords.length ? keywords.join(" / ") : "time / help / change / confirm"}</p>
    <section class="task-section">
      <h4>4 句以内可用对话</h4>
      <ol>${dialogue.map((line) => `<li>${line}</li>`).join("")}</ol>
    </section>
    <section class="task-section">
      <h4>可替换词块</h4>
      <p>${phrases.join(" / ")}</p>
    </section>
    <section class="task-section">
      <h4>自主延伸</h4>
      <ul>${scenario.extensions.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <p><strong>输出任务：</strong>现在把这段对话换成你自己的真实情况，说 2 遍，再记录最自然的一版。</p>
  `;
}

function createPlan(level, goal, minutes) {
  const m = Number(minutes);
  const input = Math.max(3, Math.round(m * 0.25));
  const phrases = Math.max(3, Math.round(m * 0.25));
  const output = Math.max(4, Math.round(m * 0.35));
  const review = Math.max(2, m - input - phrases - output);

  const focus =
    goal === "survive"
      ? "先练能解决问题的句子：问、改、确认、求助。"
      : goal === "natural"
        ? "重点减少中式直译，多用短句和礼貌缓冲。"
        : "每个材料都加一个追问，让对话能继续往下走。";

  const load =
    level === "foundation"
      ? "每次最多 3 个词块，输出 2-4 句就够。"
      : level === "intermediate"
        ? "每次最多 5 个词块，输出一段 30 秒对话。"
        : "每次最多 6 个词块，重点打磨语气、分寸和自然度。";

  return `
    <h3>今日 ${m} 分钟计划</h3>
    <ul>
      <li>${input} 分钟：从来源库选一个材料，只看和生活有关的点。</li>
      <li>${phrases} 分钟：提取 3-6 个可复用词块，不背孤立单词。</li>
      <li>${output} 分钟：套入一个真实场景，说出 4 句以内对话。</li>
      <li>${review} 分钟：记录最有用的一句，明天换场景复用。</li>
    </ul>
    <p><strong>目标安排：</strong>${focus}</p>
    <p><strong>学习量限制：</strong>${load}</p>
  `;
}

document.getElementById("materialForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const html = createTask({
    title: form.get("materialTitle"),
    context: form.get("materialContext"),
    level: form.get("materialLevel"),
    scenarioType: form.get("scenarioType")
  });
  document.getElementById("taskCard").innerHTML = html;

  const current = bumpStreak(readState());
  writeState({ ...current, materials: current.materials + 1 });
});

document.getElementById("refreshSources").addEventListener("click", () => {
  renderSources();
});

document.getElementById("minutes").addEventListener("input", (event) => {
  document.getElementById("minuteValue").textContent = event.target.value;
});

document.getElementById("planForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const level = document.getElementById("level").value;
  const goal = document.getElementById("goal").value;
  const minutes = document.getElementById("minutes").value;
  document.getElementById("planOutput").innerHTML = createPlan(level, goal, minutes);
});

document.getElementById("completeOutput").addEventListener("click", () => {
  const current = bumpStreak(readState());
  writeState({ ...current, outputs: current.outputs + 1 });
});

renderSources();
renderProgress();
