/**
 * Generates a CSS clamp() function for fluid scaling between two font sizes.
 * Base value now applies in both px and rem modes.
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

  // If px mode, convert final rem values back to px using baseValue
  if (!isRem) {
    const minPx = minRem * baseValue;
    const interceptPx = intercept * baseValue;
    const maxPx = maxRem * baseValue;
    return `clamp(${minPx.toFixed(3)}px, ${interceptPx.toFixed(3)}px + ${slopeInVw.toFixed(3)}vw, ${maxPx.toFixed(3)}px)`;
  }

  // Otherwise output in rem
  return `clamp(${minRem.toFixed(3)}rem, ${intercept.toFixed(3)}rem + ${slopeInVw.toFixed(3)}vw, ${maxRem.toFixed(3)}rem)`;
}

// DOM Elements
const inputs = document.querySelectorAll("input[type='number']");
const output = document.getElementById("clampOutput");
const exampleText = document.getElementById("exampleText");
const copyBtn = document.getElementById("copyBtn");
const unitToggle = document.getElementById("unitToggle");
const unitLabel = document.getElementById("unitLabel");
const baseValueInput = document.getElementById("baseValue");

function updateClamp() {
  const min = document.getElementById("min").value;
  const max = document.getElementById("max").value;
  const minVW = document.getElementById("minVW").value;
  const maxVW = document.getElementById("maxVW").value;
  const isRem = unitToggle.checked;
  const baseValue = baseValueInput.value;

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

inputs.forEach(input => input.addEventListener("input", updateClamp));
baseValueInput.addEventListener("input", updateClamp);
unitToggle.addEventListener("change", () => {
  unitLabel.textContent = unitToggle.checked ? "rem → px" : "px → rem";
  updateClamp();
});
copyBtn.addEventListener("click", copyClamp);

updateClamp();
