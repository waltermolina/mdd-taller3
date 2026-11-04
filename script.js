"use strict";

// El contenido del caso es local: no se realizan solicitudes ni se necesitan bibliotecas.
const problems = [
  {
    title: "Abandono de checkout",
    description: "Muchos usuarios agregan productos al carrito pero abandonan el proceso antes de finalizar la compra.",
    stage: "Compra",
    touchpoint: "Checkout",
    sources: ["Logs Web", "Google Analytics"],
    kpis: ["Tasa de abandono", "Tasa de conversión"],
    decision: "Simplificar el proceso de checkout.",
    alternatives: [
      "Aumentar el presupuesto de campañas sin revisar el proceso de compra.",
      "Simplificar el proceso de checkout.",
      "Incorporar más pasos obligatorios antes de confirmar la compra."
    ],
    expert: "El abandono ocurre durante la etapa de compra. Los registros de navegación permiten identificar fricciones dentro del checkout y medir el impacto sobre la conversión. La organización debería analizar los pasos del proceso e implementar mejoras para reducir el abandono."
  },
  {
    title: "Demoras en la atención mediante chatbot",
    description: "Los clientes reportan tiempos de respuesta excesivos durante las consultas posteriores a la compra.",
    stage: "Soporte",
    touchpoint: "Chatbot",
    sources: ["Logs del chatbot", "CRM"],
    kpis: ["Tiempo medio de respuesta", "Nivel de satisfacción"],
    decision: "Optimizar el chatbot y revisar el flujo de atención.",
    alternatives: [
      "Optimizar el chatbot y revisar el flujo de atención.",
      "Enviar más promociones a todos los clientes.",
      "Reducir los canales de atención sin analizar las consultas."
    ],
    expert: "Los registros conversacionales permiten identificar cuellos de botella en la atención. El análisis de los tiempos de respuesta ayuda a comprender el impacto sobre la satisfacción de los clientes."
  },
  {
    title: "Baja conversión de campañas",
    description: "Las campañas generan visitas al sitio pero una proporción reducida de esas visitas termina en compras.",
    stage: "Descubrimiento",
    touchpoint: "Email Marketing",
    sources: ["Plataforma de campañas", "Google Analytics"],
    kpis: ["Tasa de conversión", "CTR"],
    decision: "Segmentar mejor las audiencias y optimizar los mensajes.",
    alternatives: [
      "Incrementar la frecuencia de envío del mismo mensaje a toda la base.",
      "Rediseñar la atención posventa como única medida.",
      "Segmentar mejor las audiencias y optimizar los mensajes."
    ],
    expert: "El análisis conjunto de campañas y comportamiento web permite identificar oportunidades de mejora en la segmentación y en la propuesta de valor comunicada."
  }
];

const stages = [
  { name: "Descubrimiento", text: "El cliente conoce GreenShop a través de campañas y mensajes digitales. Touchpoints: Email Marketing y anuncios. Analizá cómo las visitas se relacionan con las compras." },
  { name: "Consideración", text: "El cliente compara alternativas y consulta el catálogo. Touchpoints: fichas de producto y reseñas. La claridad de la información ayuda a evaluar la propuesta de valor." },
  { name: "Compra", text: "El cliente agrega productos al carrito y completa el pago. Touchpoint: Checkout. Las fricciones en este proceso pueden generar abandono y afectar la conversión." },
  { name: "Uso", text: "El cliente recibe y utiliza el producto. Touchpoints: entrega y producto. Comprender esta experiencia permite detectar necesidades posteriores a la compra." },
  { name: "Soporte", text: "El cliente busca ayuda después de la compra. Touchpoint: Chatbot. Los tiempos de respuesta y la satisfacción permiten evaluar la calidad de la atención." }
];

const choices = {
  touchpoint: ["Checkout", "Chatbot", "Email Marketing", "Ficha de producto"],
  sources: ["Logs Web", "Google Analytics", "Logs del chatbot", "CRM", "Plataforma de campañas", "Inventario de depósito"],
  kpis: ["Tasa de abandono", "Tasa de conversión", "Tiempo medio de respuesta", "Nivel de satisfacción", "CTR", "Rotación de inventario"]
};
const stepNames = ["Situación", "Touchpoint", "Fuentes", "KPIs", "Decisión", "Síntesis experta"];
const screen = document.getElementById("screen");
let selectedStage = 0;
let currentProblem = 0;
let currentStep = 0;

// Cada problema conserva sus respuestas al volver atrás; resolverlo nunca duplica contadores.
function newAnalysis() {
  return { touchpoint: "", sources: [], kpis: [], decision: "", valid: {}, resolved: false };
}
let analyses = problems.map(newAnalysis);

function updateDashboard() {
  const resolved = analyses.filter(analysis => analysis.resolved).length;
  const uniqueCount = key => new Set(analyses.flatMap(analysis => analysis.valid[key] ? analysis[key] : [])).size;
  document.getElementById("resolved-count").textContent = `${resolved}/3`;
  document.getElementById("sources-count").textContent = uniqueCount("sources");
  document.getElementById("kpis-count").textContent = uniqueCount("kpis");
  document.getElementById("decisions-count").textContent = analyses.filter(analysis => analysis.valid.decision).length;
  document.getElementById("case-progress").value = resolved;
  document.getElementById("case-progress").textContent = `${resolved} de 3 problemas`;
  document.getElementById("progress-value").textContent = `${Math.round(resolved / 3 * 100)}%`;
}

function showScreen(markup) {
  screen.innerHTML = `<section class="screen">${markup}</section>`;
  const heading = screen.querySelector("h1");
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function button(id, label, style = "") {
  return `<button type="button" class="button ${style}" id="${id}">${label}</button>`;
}

function showIntro() {
  showScreen(`
    <p class="eyebrow">Laboratorio de análisis CX</p>
    <h1>De la experiencia del cliente<br>a las decisiones con datos.</h1>
    <p class="lead">Explorá un caso organizacional y construí un diagnóstico fundamentado con fuentes de datos, indicadores y decisiones de negocio.</p>
    <div class="intro-grid">
      <article class="card case-card">
        <p class="eyebrow">El caso</p><h2>¿Qué está pasando en GreenShop?</h2>
        <p>Durante los últimos tres meses las ventas disminuyeron un <strong>18%</strong>.</p>
        <p>La organización sospecha que existen problemas en distintos puntos de la experiencia del cliente, pero no logra identificar qué sucede ni qué información debería analizar para tomar decisiones fundamentadas.</p>
        <p>Como analista de Inteligencia de Negocios, tu misión será explorar la experiencia del cliente, identificar fuentes de datos relevantes y seleccionar indicadores adecuados para proponer mejoras.</p>
      </article>
      <article class="card impact-card">
        <h2>Ventas · últimos tres meses</h2><strong class="impact-number">-18%</strong>
        <p class="impact-caption">Una señal que requiere un diagnóstico.</p>
        <p><strong>Objetivo</strong><br>Identificar oportunidades de mejora utilizando datos.</p>
      </article>
    </div>
    <h2>Un recorrido de análisis en tres momentos</h2>
    <div class="method-grid">
      <article class="card"><span class="method-number">01 / EXPLORAR</span><h3>Comprender la experiencia</h3><p>Recorré las etapas del Customer Journey y ubicá cada situación.</p></article>
      <article class="card"><span class="method-number">02 / ANALIZAR</span><h3>Conectar datos y decisiones</h3><p>Analizá tres problemas con orientación y retroalimentación experta.</p></article>
      <article class="card"><span class="method-number">03 / INTEGRAR</span><h3>Construir el diagnóstico</h3><p>Revisá la matriz CX-Datos y el informe ejecutivo final.</p></article>
    </div>
    <div class="actions">${button("start", "Comenzar análisis", "primary")}<span class="hint">Sin calificaciones · Con orientación experta</span></div>
    <p class="metric-note">El avance se conserva mientras esta página permanezca abierta. Al recargar, comienza una nueva sesión.</p>
  `);
  document.getElementById("start").addEventListener("click", showJourney);
}

function showJourney() {
  const allResolved = analyses.every(analysis => analysis.resolved);
  showScreen(`
    <p class="eyebrow">Exploración del caso</p><h1>Customer Journey</h1>
    <p class="lead">Cada interacción deja evidencias. Seleccioná una etapa para explorar su contexto y luego elegí una situación para analizar.</p>
    <ol class="journey" aria-label="Etapas de la experiencia del cliente">
      ${stages.map((stage, index) => `<li><button type="button" class="stage" data-stage="${index}" aria-pressed="${selectedStage === index}" aria-controls="stage-context"><span>0${index + 1}</span>${stage.name}</button></li>`).join("")}
    </ol>
    <div class="card context-card" id="stage-context" aria-live="polite"></div>
    <div class="section-heading"><h2>Situaciones para analizar</h2><span class="badge">3 problemas de negocio</span></div>
    <div class="problem-grid">
      ${problems.map((problem, index) => `
        <article class="card problem-card">
          <div><span class="badge ${analyses[index].resolved ? "done" : ""}">${analyses[index].resolved ? "Resuelto" : `Situación 0${index + 1}`}</span></div>
          <h3>${problem.title}</h3><p>${problem.description}</p>
          <button type="button" class="button" data-problem="${index}" aria-label="${analyses[index].resolved ? "Revisar" : "Analizar"}: ${problem.title}">${analyses[index].resolved ? "Revisar análisis" : "Analizar"}</button>
        </article>`).join("")}
    </div>
    <div class="actions">${button("previous", "Anterior")}${allResolved ? button("matrix", "Siguiente: matriz CX-Datos", "primary") : '<span class="hint">Resolvé las tres situaciones para integrar el diagnóstico.</span>'}</div>
  `);
  function updateStage() {
    const stage = stages[selectedStage];
    const context = document.getElementById("stage-context");
    context.replaceChildren();
    const title = document.createElement("h3");
    title.textContent = stage.name;
    const text = document.createElement("p");
    text.textContent = stage.text;
    context.append(title, text);
  }
  updateStage();
  screen.querySelectorAll("[data-stage]").forEach(node => node.addEventListener("click", () => {
    selectedStage = Number(node.dataset.stage);
    screen.querySelectorAll("[data-stage]").forEach(stage => stage.setAttribute("aria-pressed", String(stage === node)));
    updateStage();
  }));
  screen.querySelectorAll("[data-problem]").forEach(node => node.addEventListener("click", () => {
    currentProblem = Number(node.dataset.problem);
    currentStep = analyses[currentProblem].resolved ? 5 : 0;
    showProblem();
  }));
  document.getElementById("previous").addEventListener("click", showIntro);
  if (allResolved) document.getElementById("matrix").addEventListener("click", showMatrix);
}

function evidenceMarkup(problem) {
  return `<dl class="evidence-list">
    <dt>Etapa</dt><dd>${problem.stage}</dd>
    <dt>Touchpoint</dt><dd>${problem.touchpoint}</dd>
    <dt>Fuentes de datos</dt><dd>${problem.sources.join(" · ")}</dd>
    <dt>KPIs</dt><dd>${problem.kpis.join(" · ")}</dd>
    <dt>Decisión recomendada</dt><dd>${problem.decision}</dd>
  </dl>`;
}

function showProblem() {
  const problem = problems[currentProblem];
  const analysis = analyses[currentProblem];
  const keys = ["", "touchpoint", "sources", "kpis", "decision"];
  const key = keys[currentStep];
  let content = "";
  if (currentStep === 0) {
    content = `<h2>Situación problemática</h2><p class="expert-text">${problem.description}</p><p class="instruction">Relacioná la situación con un punto de contacto, identificá las evidencias necesarias y elegí una decisión fundamentada. Podés revisar tus respuestas antes de continuar.</p>`;
  } else if (currentStep === 5) {
    content = `<p class="eyebrow">Retroalimentación experta</p><h2>De la evidencia a la acción</h2><p class="expert-text">${problem.expert}</p>${evidenceMarkup(problem)}<p class="metric-note">${analysis.resolved ? "Este problema ya está resuelto. Revisarlo no modifica los totales." : "Revisá la cadena de análisis y marcá el problema como resuelto para incorporarlo al diagnóstico."}</p>`;
  } else {
    const multiple = key === "sources" || key === "kpis";
    const optionList = key === "decision" ? problem.alternatives : choices[key];
    const prompts = {
      touchpoint: ["¿Cuál es el touchpoint principal?", "Seleccioná un punto de contacto. Recibirás feedback inmediato."],
      sources: ["¿Qué fuentes de datos necesitás?", "Seleccioná hasta dos fuentes y validá la combinación. Para este diagnóstico se requieren dos fuentes complementarias."],
      kpis: ["¿Qué indicadores permiten analizar el problema?", "Seleccioná los KPIs pertinentes y validá tu selección. Podés elegir más de uno."],
      decision: ["¿Qué decisión recomendarías?", "Elegí una de las tres alternativas a partir de las evidencias y los indicadores."]
    };
    content = `<div class="situation"><p><strong>Situación:</strong> ${problem.description}</p></div>
      <fieldset aria-describedby="selection-help"><legend>${prompts[key][0]}</legend>
        <p class="instruction" id="selection-help">${prompts[key][1]}</p>
        <div class="options ${key === "decision" ? "decision-options" : ""}">
          ${optionList.map((option, index) => `<label class="option" for="option-${index}">
            <input id="option-${index}" type="${multiple ? "checkbox" : "radio"}" name="${key}" value="${index}" ${multiple ? (analysis[key].includes(option) ? "checked" : "") : (analysis[key] === option ? "checked" : "")}>
            <span>${option}</span></label>`).join("")}
        </div>
      </fieldset>
      ${multiple ? `<div class="actions">${button("validate", key === "sources" ? "Validar fuentes" : "Validar KPIs")}</div>` : ""}
      <div id="feedback" class="feedback" role="status" aria-live="polite" aria-atomic="true"></div>`;
  }
  showScreen(`
    <button type="button" class="back-link" id="journey-back">← Volver al Customer Journey</button>
    <p class="eyebrow">Situación 0${currentProblem + 1} · Paso ${currentStep + 1} de 6</p>
    <h1>${problem.title}</h1>
    <ol class="step-list" aria-label="Progreso del análisis">${stepNames.map((name, index) => `<li class="${index === currentStep ? "current" : index < currentStep ? "complete" : ""}" ${index === currentStep ? 'aria-current="step"' : ""}>${index + 1}. ${name}</li>`).join("")}</ol>
    <article class="card analysis-card">${content}
      <nav class="navigation" aria-label="Navegación del análisis">
        ${button("previous", "Anterior")}
        ${button("next", currentStep === 0 ? "Analizar" : currentStep === 5 ? (analysis.resolved ? "Volver al diagnóstico" : "Marcar problema como resuelto") : "Siguiente", currentStep === 5 ? "success" : "primary")}
      </nav>
    </article>
  `);
  document.getElementById("journey-back").addEventListener("click", showJourney);
  document.getElementById("previous").addEventListener("click", () => {
    if (currentStep === 0) showJourney();
    else { currentStep--; showProblem(); }
  });
  const next = document.getElementById("next");
  next.disabled = Boolean(key && !analysis.valid[key]);
  next.addEventListener("click", () => {
    if (key && !analysis.valid[key]) return;
    if (currentStep === 5) {
      analysis.resolved = true;
      updateDashboard();
      if (analyses.every(item => item.resolved)) showMatrix();
      else showJourney();
    } else {
      currentStep++;
      showProblem();
    }
  });
  if (key) {
    setupSelection(key, problem, analysis);
    if (analysis.resolved) {
      screen.querySelectorAll("input, #validate").forEach(control => { control.disabled = true; });
      document.getElementById("feedback").textContent = "Análisis resuelto · Revisión de solo lectura. Las respuestas validadas se conservan en el diagnóstico.";
    }
  }
}

// Solo se habilita el siguiente paso con una respuesta completa y correcta.
function setupSelection(key, problem, analysis) {
  const multiple = key === "sources" || key === "kpis";
  const options = key === "decision" ? problem.alternatives : choices[key];
  const next = document.getElementById("next");
  const feedback = document.getElementById("feedback");
  function showFeedback(message, status = "") {
    feedback.className = `feedback ${status}`;
    feedback.textContent = message;
  }
  function validate() {
    const correct = multiple
      ? analysis[key].length === problem[key].length && problem[key].every(value => analysis[key].includes(value))
      : analysis[key] === problem[key];
    analysis.valid[key] = correct;
    next.disabled = !correct;
    updateDashboard();
    if (correct) {
      const explanations = {
        touchpoint: `Correcto. ${problem.touchpoint} es el punto de contacto principal de esta situación, vinculado a la etapa de ${problem.stage}.`,
        sources: "Combinación correcta. Estas fuentes permiten reunir evidencias complementarias sobre el problema.",
        kpis: "Indicadores correctos. Esta combinación permite medir el problema y evaluar el efecto de las mejoras.",
        decision: "Decisión fundamentada. La alternativa seleccionada actúa sobre el problema identificado y puede evaluarse con los KPIs elegidos."
      };
      showFeedback(explanations[key], "correct");
    } else {
      const hints = {
        touchpoint: "Revisá dónde ocurre la interacción descrita: el pago, una consulta posventa o una campaña. Elegí otro punto de contacto.",
        sources: "Revisá la combinación. Necesitás dos fuentes que registren esta interacción y permitan relacionarla con sus resultados.",
        kpis: "Revisá la selección completa: incluí los indicadores que miden este problema y quitá los que no aportan al diagnóstico.",
        decision: "Esta medida no aborda directamente la causa planteada. Relacioná tu decisión con el touchpoint y los indicadores seleccionados."
      };
      showFeedback(hints[key], "incorrect");
    }
  }
  screen.querySelectorAll('input[name="' + key + '"]').forEach(input => input.addEventListener("change", () => {
    const value = options[Number(input.value)];
    if (multiple) {
      if (key === "sources" && input.checked && analysis.sources.length >= 2) {
        input.checked = false;
        showFeedback("Podés seleccionar hasta dos fuentes. Desmarcá una antes de elegir otra.", "incorrect");
        return;
      }
      analysis[key] = Array.from(screen.querySelectorAll("input:checked"), checked => options[Number(checked.value)]);
      analysis.valid[key] = false;
      next.disabled = true;
      updateDashboard();
      const relevant = analysis[key].every(item => problem[key].includes(item));
      showFeedback(analysis[key].length === 0
        ? "Seleccioná las opciones que aporten evidencias sobre esta situación."
        : relevant
          ? "La selección es pertinente. Completá la combinación y validala para continuar."
          : "Hay una opción que no mide directamente esta situación. Revisá la pertinencia de las evidencias.", relevant ? "" : "incorrect");
    } else {
      analysis[key] = value;
      validate();
    }
  }));
  if (multiple) document.getElementById("validate").addEventListener("click", validate);
  if (analysis.valid[key]) validate();
}

function showMatrix() {
  if (!analyses.every(analysis => analysis.resolved)) { showJourney(); return; }
  showScreen(`
    <p class="eyebrow">Integración del diagnóstico</p><h1>Matriz CX-Datos</h1>
    <p class="lead">Tres situaciones, una visión integrada. Esta matriz reúne las respuestas correctas y conecta cada problema con evidencias, indicadores y acciones.</p>
    <div class="table-wrap" role="region" aria-label="Matriz CX-Datos; desplazamiento horizontal en pantallas pequeñas" tabindex="0">
      <table>
        <caption>GreenShop · Síntesis de los tres problemas resueltos</caption>
        <thead><tr><th scope="col">Problema</th><th scope="col">Touchpoint</th><th scope="col">Fuentes de Datos</th><th scope="col">KPIs</th><th scope="col">Decisión</th></tr></thead>
        <tbody>${problems.map(problem => `<tr><th scope="row">${problem.title}</th><td>${problem.touchpoint}</td><td><ul>${problem.sources.map(source => `<li>${source}</li>`).join("")}</ul></td><td><ul>${problem.kpis.map(kpi => `<li>${kpi}</li>`).join("")}</ul></td><td>${problem.decision}</td></tr>`).join("")}</tbody>
      </table>
    </div>
    <div class="actions">${button("previous", "Anterior")}${button("next", "Siguiente: Informe Ejecutivo", "primary")}</div>
  `);
  document.getElementById("previous").addEventListener("click", showJourney);
  document.getElementById("next").addEventListener("click", showReport);
}

function showReport() {
  if (!analyses.every(analysis => analysis.resolved)) { showJourney(); return; }
  showScreen(`
    <p class="eyebrow">GreenShop · Diagnóstico de Customer Experience</p><h1>Informe Ejecutivo</h1>
    <p class="lead">De los hallazgos a la formulación de proyectos de Inteligencia de Negocios.</p>
    <article class="card report">
      <span class="badge done">Análisis completo · 3 de 3 problemas resueltos</span>
      <h2 class="section-heading">Síntesis del diagnóstico</h2>
      <p class="report-intro">El análisis realizado permitió identificar oportunidades de mejora en distintas etapas de la experiencia del cliente.</p>
      <div class="priority"><div><strong>Prioridad de análisis · Etapa de ${problems[0].stage}</strong><p>La problemática con mayor impacto se encuentra en la etapa de Compra, donde se detecta un elevado abandono durante el proceso de checkout. Se recomienda: ${problems[0].decision}</p></div></div>
      <p>Asimismo, se identificaron oportunidades de optimización en la atención posventa y en las campañas de marketing digital.</p>
      <p>Las evidencias obtenidas sugieren priorizar iniciativas orientadas a reducir fricciones en la compra, mejorar los tiempos de respuesta y optimizar la segmentación de campañas.</p>
      <h2>Líneas de acción recomendadas</h2>
      <ul>${problems.map(problem => `<li>${problem.decision}</li>`).join("")}</ul>
      <p>La combinación de fuentes de datos, indicadores y decisiones fundamentadas permite construir una base sólida para la formulación de proyectos de Inteligencia de Negocios orientados a la mejora de la experiencia del cliente.</p>
      <p class="report-note"><strong>Alcance académico:</strong> la priorización del checkout es una hipótesis del caso, no una conclusión estadística. En un proyecto real se deben contrastar las fuentes, establecer valores base de los KPIs y medir el impacto de cada intervención. La caída del 18% no demuestra por sí sola una causa.</p>
    </article>
    <div class="actions">${button("previous", "Anterior: matriz CX-Datos")}${button("print", "Imprimir informe")}${button("restart", "Iniciar nuevo análisis")}</div>
  `);
  document.getElementById("previous").addEventListener("click", showMatrix);
  document.getElementById("print").addEventListener("click", () => window.print());
  document.getElementById("restart").addEventListener("click", () => {
    if (!window.confirm("¿Querés iniciar un nuevo análisis? Se borrará el avance de esta sesión.")) return;
    analyses = problems.map(newAnalysis);
    currentProblem = 0;
    currentStep = 0;
    selectedStage = 0;
    updateDashboard();
    showIntro();
  });
}

document.querySelector(".brand").addEventListener("click", event => {
  event.preventDefault();
  showIntro();
});
updateDashboard();
showIntro();
