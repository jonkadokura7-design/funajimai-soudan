const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("on");
  }),
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const form = document.getElementById("lead-form");
const result = document.getElementById("result");
const summary = document.getElementById("summary");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  summary.textContent = [
    `お名前：${data.get("name")}`,
    `電話番号：${data.get("phone")}`,
    `船がある場所：${data.get("place")}`,
    `船の種類：${data.get("type")}`,
    `状態・相談内容：${data.get("detail") || "未入力"}`,
  ].join("\n");
  result.classList.add("show");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.getElementById("copy").addEventListener("click", async (event) => {
  await navigator.clipboard.writeText(summary.textContent);
  event.currentTarget.textContent = "コピーしました ✓";
});
