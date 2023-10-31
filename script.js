const paragraphs = [
    "In a quaint village nestled between rolling hills and winding rivers, there lived a young boy named Thomas. Thomas was known throughout the village for his unwavering curiosity and his insatiable thirst for adventure. Every morning, he would wake with the sun, eager to explore the world beyond the village boundaries.",
    "One crisp autumn morning, as the leaves painted the landscape with hues of gold and crimson, Thomas set out on a journey unlike any he had undertaken before. Armed with a tattered map and a trusty satchel filled with provisions, he ventured into the heart of the nearby forest, where whispers of ancient mysteries and untold legends had long piqued his imagination.",
    "The forest was a labyrinth of towering trees, their branches entwined in an intricate dance against the backdrop of the azure sky. Sunlight filtered through the dense foliage, casting dappled patterns on the forest floor. Thomas navigated through the underbrush, following the faint traces left by those who had dared to explore before him.",
    "As he journeyed deeper into the forest, the air grew thick with the scent of pine and earth. The distant chirping of birds and the rustling of unseen creatures added an enchanting melody to the natural symphony that surrounded him. Thomas pressed on, fueled by a sense of wonder and an unyielding determination to uncover the secrets hidden within the woods.",
    "After hours of trekking through the wilderness, Thomas stumbled upon a clearing bathed in ethereal light. In the center of the clearing stood a weathered stone pedestal, upon which rested a gleaming emerald orb. Its luminous surface seemed to pulse with an otherworldly energy, casting a mesmerizing glow that danced across the trees and the forest floor.",
    "Mesmerized by the orb's radiance, Thomas approached cautiously, his heart pounding with a mixture of trepidation and exhilaration. As he extended a trembling hand toward the orb, a gentle hum filled the air, and the forest seemed to hold its breath in anticipation. With a surge of courage, Thomas grasped the orb, and in an instant, he was enveloped in a blinding cascade of light.",
    "When Thomas opened his eyes, he found himself in a breathtaking realm unlike anything he had ever seen. Crystal spires towered above him, refracting light into a kaleidoscope of colors that painted the air. Strange creatures with iridescent wings flitted about, their melodious songs echoing through the luminous expanse. Thomas realized that he had stepped into a realm of ancient magic and forgotten wonders.",
    "In this wondrous realm, he encountered a wise old sage who revealed to him the legends of the forest and the powerful forces that had shaped the land for millennia. The sage imparted upon Thomas the knowledge of balance and harmony, teaching him the ancient ways of nature and the interconnectedness of all living beings.",
    "With newfound wisdom and a profound sense of purpose, Thomas bid farewell to the enchanting realm and returned to his village. He shared his tales of adventure and the lessons he had learned with the villagers, igniting a newfound sense of reverence for the natural world that surrounded them.",
    "From that day forward, Thomas became the village's storyteller, regaling young and old alike with tales of courage, wonder, and the magic that resides within the heart of every living thing. His journey had not only transformed him but had also awakened a deep appreciation for the beauty and mysteries of the world that lay just beyond their doorstep.",
    "In the bustling city of Arcadia, where skyscrapers kissed the clouds and neon lights painted the night in a vibrant tapestry of colors, there lived a young artist named Maya. Maya was a dreamer, a visionary whose imagination knew no bounds. She wandered the city streets, capturing the essence of urban life with her paintbrush and sketchpad, infusing each stroke with the energy and vitality that pulsed through the metropolis.",
    "One evening, as Maya strolled along the bustling avenues, a mysterious figure caught her eye. A cloaked stranger stood in the shadows of an alleyway, beckoning her with a silent but alluring gesture. Intrigued and fueled by an insatiable curiosity, Maya followed the enigmatic figure into the labyrinthine depths of the city.",
    "The narrow alleys twisted and turned, their walls adorned with vibrant graffiti and poignant messages that spoke of hidden truths and forgotten dreams. The air hummed with the melody of distant music, and the scent of exotic spices mingled with the city's pulsating energy. Maya felt as if she had stepped into a world beyond the familiar, a realm where creativity and passion coalesced into a symphony of expression.",
    "Guided by the cloaked figure, Maya arrived at a clandestine gallery tucked away in the heart of the city, a sanctuary of artistic marvels and undiscovered masterpieces. The gallery glowed with an otherworldly radiance, its walls adorned with canvases that seemed to breathe and pulse with a life of their own. Each painting told a story, evoking emotions that stirred the soul and ignited the imagination.",
    "As Maya wandered through the gallery, she felt an inexplicable connection to the artworks, as if they spoke to her in a language beyond words. She found herself entranced by a series of paintings that depicted the city in all its grandeur and complexity, capturing its pulse and rhythm in vibrant splashes of color and intricate details that transcended the ordinary.",
    "In a moment of revelation, Maya realized that the cloaked figure was none other than the enigmatic curator of the gallery, a revered artist whose identity remained shrouded in mystery. The curator imparted upon Maya the wisdom of artistry, the power of creation, and the transformative nature of self-expression. Maya's spirit ignited with a newfound sense of purpose and a deep understanding of the role art plays in shaping the world around us.",
    "With a heart brimming with inspiration, Maya returned to her studio, where she poured her soul into her canvases, infusing each stroke with the essence of the city and the wisdom she had gained. Her artworks graced the walls of galleries and museums, captivating audiences with their raw emotion and profound storytelling. Maya became a beacon of creativity in Arcadia, her legacy a testament to the transcendent power of art to inspire, to provoke, and to transform lives.",
];

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);