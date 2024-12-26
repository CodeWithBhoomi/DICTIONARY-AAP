// Simple dictionary with word definitions
const dictionary = {
    "apple": "A round fruit with red or green skin and a whitish interior.",
    "banana": "A long, yellow fruit that is sweet and soft.",
    "cherry": "A small, round fruit that is typically red or black when ripe.",
    "dog": "A domesticated carnivorous mammal with a barking or whining voice.",
    "elephant": "A large mammal with a trunk and tusks, typically found in Africa or Asia."
};

// Function to search for the word definition
function searchWord() {
    const wordInput = document.getElementById("wordInput").value.toLowerCase();
    const definition = document.getElementById("definition");

    if (wordInput === "") {
        definition.innerHTML = "Please enter a word.";
        return;
    }

    if (dictionary[wordInput]) {
        definition.innerHTML = `<strong>${wordInput}</strong>: ${dictionary[wordInput]}`;
    } else {
        definition.innerHTML = `Sorry, the word "${wordInput}" is not in the dictionary.`;
    }
}
