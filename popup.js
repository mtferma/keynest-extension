const API_URL = "https://keynest-was2.onrender.com/";

document.addEventListener("DOMContentLoaded", () => {
  const passwordDisplay = document.getElementById("password-display");
  const copyButton = document.getElementById("copy-button");
  const copyMessage = document.getElementById("copy-message");
  const associationsSection = document.getElementById("associations-section");
  const associationsToggle = document.getElementById("associations-toggle");
  const associationsBox = document.getElementById("associations-box");
  const associationsList = document.getElementById("associations-list");
  const syllableSlider = document.getElementById("syllable-slider");
  const includeNumbers = document.getElementById("include-numbers");
  const includeSymbols = document.getElementById("include-symbols");
  const seedInput = document.getElementById("seed-input");
  const generateButton = document.getElementById("generate-button");

  let syllableCount = 5;
  let showAssociations = false;

  syllableSlider.addEventListener("input", (e) => {
    syllableCount = parseFloat(e.target.value);
    syllableSlider.style.setProperty("--value", syllableCount);
  });

  syllableSlider.addEventListener("mouseup", () => {
    syllableCount = Math.round(syllableCount);
    syllableSlider.value = syllableCount;
    syllableSlider.style.setProperty("--value", syllableCount);
  });

  syllableSlider.addEventListener("touchend", () => {
    syllableCount = Math.round(syllableCount);
    syllableSlider.value = syllableCount;
    syllableSlider.style.setProperty("--value", syllableCount);
  });

  associationsToggle.addEventListener("click", () => {
    showAssociations = !showAssociations;
    associationsToggle.querySelector("p").textContent = `Ассоциации ${showAssociations ? "▲" : "▼"}`;
    associationsBox.className = `associations-box ${showAssociations ? "open" : "closed"}`;
  });

  copyButton.addEventListener("click", () => {
    const password = passwordDisplay.textContent.trim();
    if (password && password !== " ") {
      navigator.clipboard.writeText(password).then(() => {
        copyMessage.textContent = "Пароль скопирован!";
        copyMessage.style.display = "block";
        setTimeout(() => {
          copyMessage.textContent = "";
          copyMessage.style.display = "none";
        }, 2000);
      });
    }
  });

  generateButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          syllables: Math.round(syllableCount),
          numbers: includeNumbers.checked,
          symbols: includeSymbols.checked,
          seed: seedInput.value.trim(),
        }),
      });

      const data = await response.json();
      passwordDisplay.textContent = data.password || " ";
      associationsList.innerHTML = "";
      if (data.associations && data.associations.length > 0) {
        data.associations.forEach((assoc) => {
          const li = document.createElement("li");
          li.textContent = assoc;
          associationsList.appendChild(li);
        });
        associationsSection.style.display = "block";
      } else {
        associationsSection.style.display = "none";
      }
    } catch (error) {
      console.error("Ошибка при генерации пароля:", error);
      passwordDisplay.textContent = "Ошибка";
    }
  });
});