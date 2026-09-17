const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("on");
  }),
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const form = document.getElementById("lead-form");
const result = document.getElementById("result");
const submitButton = form.querySelector('button[type="submit"]');
const formNote = form.querySelector(".form-note");
const endpoint =
  "https://script.google.com/macros/s/AKfycbyuHup5uveR-zdFJ367Ti8v2c7rYoOvaEB2pvo6HV0CZyTjd4rx5Na0q7SbujvZXrak/exec";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const query = new URLSearchParams(window.location.search);
  const adKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  const adParams = adKeys
    .filter((key) => query.get(key))
    .map((key) => `${key}=${query.get(key)}`)
    .join("&");

  data.set("source_url", window.location.href);
  data.set("ad_params", adParams);
  submitButton.disabled = true;
  submitButton.textContent = "送信しています…";
  result.classList.remove("show");
  formNote.textContent = "入力内容を安全に送信しています。画面を閉じずにお待ちください。";

  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(data),
    });
    form.reset();
    result.innerHTML =
      '<b>お問い合わせを受け付けました</b><p>内容を確認のうえ、担当者からご連絡します。お急ぎの場合は <a href="tel:07085083995">070-8508-3995</a> へお電話ください。</p>';
    result.classList.add("show");
    formNote.textContent = "送信完了しました。自動受付後、担当者が内容を確認します。";
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    result.innerHTML =
      '<b>送信できませんでした</b><p>通信状況をご確認のうえ再度お試しいただくか、<a href="tel:07085083995">070-8508-3995</a> へお電話ください。</p>';
    result.classList.add("show");
    formNote.textContent = "入力内容は送信されていません。";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "無料見積を依頼する →";
  }
});
