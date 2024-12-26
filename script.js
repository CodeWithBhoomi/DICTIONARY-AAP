const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const popularWords = ["serendipity", "eloquent", "ethereal", "luminescent", "quintessential"];

document.addEventListener("DOMContentLoaded", () => {
  const wordInput = document.getElementById("wordInput");
  const searchButton = document.getElementById("searchButton");
  const wordTitle = document.getElementById("wordTitle");
  const definition = document.getElementById("definition");
  const synonyms = document.getElementById("synonyms");
  const example = document.getElementById("example");
  const playAudio = document.getElementById("playAudio");
  const wordDetails = document.getElementById("wordDetails");
  const cloud = document.getElementById("cloud");

  // Generate word cloud
  populateWordCloud();

  function populateWordCloud() {
    popularWords.forEach((word) => {
      const wordElement = document.createElement("div");
      wordElement.textContent = word;
      wordElement.addEventListener("click", () => fetchWordData(word));
      cloud.appendChild(wordElement);
    });
  }

  // Search word
  searchButton.addEventListener("click", () => {
    const word = wordInput.value.trim();
    if (word) fetchWordData(word);
  });

  function fetchWordData(word) {
    fetch(`${apiUrl}${word}`)
      .then((response) => response.json())
      .then((data) => displayWordData(data[0]))
      .catch(() => {
        wordTitle.textContent = "Word not found!";
        definition.textContent = "";
        synonyms.textContent = "";
        example.textContent = "";
        playAudio.style.display = "none";
      });
  }

  function displayWordData(data) {
    wordDetails.classList.remove("hidden");
    wordTitle.textContent = data.word;
    definition.textContent = `Definition: ${data.meanings[0].definitions[0].definition}`;
    synonyms.textContent =
      data.meanings[0].synonyms.length > 0
        ? `Synonyms: ${data.meanings[0].synonyms.join(", ")}`
        : "No synonyms available.";
    example.textContent =
      data.meanings[0].definitions[0].example
        ? `Example: ${data.meanings[0].definitions[0].example}`
        : "No example available.";
    playAudio.style.display = "inline";
    playAudio.onclick = () => {
      const audio = new Audio(data.phonetics[0]?.audio || "");
      audio.play();
    };
  }
});
