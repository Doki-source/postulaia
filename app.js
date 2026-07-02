const WEBHOOK_URL = "https://hook.us2.make.com/quqxsrkjy7574zajmmbgp7sd3r6og184";

const form = document.querySelector("#analysis-form");
const submitButton = document.querySelector("#submit-button");
const message = document.querySelector("#form-message");
const emptyState = document.querySelector("#empty-state");
const resultContent = document.querySelector("#result-content");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const payload = new URLSearchParams(new FormData(form));
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: payload
    });

    if (!response.ok) throw new Error(`El flujo respondió ${response.status}.`);

    const raw = await response.text();
    const result = parseResult(raw);
    renderResult(result);
    message.textContent = "Análisis completado.";
  } catch (error) {
    message.textContent = `No pudimos completar el análisis: ${error.message}`;
  } finally {
    setLoading(false);
  }
});

function parseResult(raw) {
  const clean = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/, "")
    .replace(/\s*```$/, "");
  return JSON.parse(clean);
}

function renderResult(data) {
  const score = Math.max(0, Math.min(100, Number(data.puntaje) || 0));

  emptyState.hidden = true;
  resultContent.hidden = false;
  document.querySelector("#result-panel").classList.remove("empty");
  document.querySelector("#score-value").textContent = score;
  document.querySelector("#score-bar").style.width = `${score}%`;
  document.querySelector("#compatibility-level").textContent = data.nivel_compatibilidad || "Sin clasificación";
  document.querySelector("#recommendation").textContent = data.recomendacion || "Sin recomendación.";
  document.querySelector("#cv-summary").textContent = data.resumen_cv || "Sin resumen.";

  renderList("#strengths", data.fortalezas);
  renderList("#gaps", data.brechas);
  renderList("#plan", data.plan_30_dias);
}

function renderList(selector, items) {
  const list = document.querySelector(selector);
  list.replaceChildren();
  (Array.isArray(items) ? items : []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.append(li);
  });
}

function setLoading(loading) {
  submitButton.disabled = loading;
  submitButton.querySelector("span").textContent = loading
    ? "Analizando perfil…"
    : "Analizar compatibilidad";
  message.textContent = loading ? "Make está procesando los datos con Gemini." : "";
}
