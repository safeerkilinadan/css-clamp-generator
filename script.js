/**
 * Generates a CSS clamp() function for fluid scaling between two font sizes.
 * Base value applies in both px and rem modes.
 * Automatically converts between px and rem when toggled.
 * Removes unnecessary trailing zeros for cleaner output.
 */
function calculateClamp(minTarget, maxTarget, minViewport, maxViewport, isRem, baseValue) {
  minTarget = parseFloat(minTarget);
  maxTarget = parseFloat(maxTarget);
  minViewport = parseFloat(minViewport);
  maxViewport = parseFloat(maxViewport);
  baseValue = parseFloat(baseValue) || 10;

  // Normalize to rem units internally for consistent slope calculations
  const minRem = isRem ? minTarget : minTarget / baseValue;
  const maxRem = isRem ? maxTarget : maxTarget / baseValue;

  const slope = (maxRem - minRem) / (maxViewport - minViewport);
  const intercept = minRem - slope * minViewport;
  const slopeInVw = slope * 100;

  // Format numbers cleanly
  const fmt = (num) => {
    return Number.isInteger(num) ? num.toString() : parseFloat(num.toFixed(3)).toString();
  };

  if (!isRem) {
    const minPx = minRem * baseValue;
    const interceptPx = intercept * baseValue;
    const maxPx = maxRem * baseValue;
    return `clamp(${fmt(minPx)}px, ${fmt(interceptPx)}px + ${fmt(slopeInVw)}vw, ${fmt(maxPx)}px)`;
  }

  return `clamp(${fmt(minRem)}rem, ${fmt(intercept)}rem + ${fmt(slopeInVw)}vw, ${fmt(maxRem)}rem)`;
}

// DOM Elements
const inputs = document.querySelectorAll("input[type='number']");
const output = document.getElementById("clampOutput");
const exampleText = document.getElementById("exampleText");
const copyBtn = document.getElementById("copyBtn");
const unitToggle = document.getElementById("unitToggle");
const unitLabel = document.getElementById("unitLabel");
const baseValueInput = document.getElementById("baseValue");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");

function updateClamp() {
  const min = minInput.value;
  const max = maxInput.value;
  const minVW = document.getElementById("minVW").value;
  const maxVW = document.getElementById("maxVW").value;
  const isRem = unitToggle.checked;
  const baseValue = parseFloat(baseValueInput.value) || 10;

  const clampValue = calculateClamp(min, max, minVW, maxVW, isRem, baseValue);
  output.textContent = clampValue;
  exampleText.style.fontSize = clampValue;
}

function copyClamp() {
  navigator.clipboard.writeText(output.textContent).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  });
}

// 🔁 Conversion logic for px ↔ rem
unitToggle.addEventListener("change", () => {
  const isRem = unitToggle.checked;
  const baseValue = parseFloat(baseValueInput.value) || 10;

  let min = parseFloat(minInput.value);
  let max = parseFloat(maxInput.value);

  if (isNaN(min) || isNaN(max)) return;

  // Format helper
  const fmt = (num) => (Number.isInteger(num) ? num.toString() : parseFloat(num.toFixed(3)).toString());

  if (isRem) {
    // px → rem
    minInput.value = fmt(min / baseValue);
    maxInput.value = fmt(max / baseValue);
  } else {
    // rem → px
    minInput.value = fmt(min * baseValue);
    maxInput.value = fmt(max * baseValue);
  }

  unitLabel.textContent = isRem ? "rem → px" : "px → rem";
  updateClamp();
});

inputs.forEach((input) => input.addEventListener("input", updateClamp));
baseValueInput.addEventListener("input", updateClamp);
copyBtn.addEventListener("click", copyClamp);

// Initialize
updateClamp();
