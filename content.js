// Create the button
const button = document.createElement('button');
button.textContent = "Is this AI?";
button.style.position = 'fixed';
button.style.top = '20px';
button.style.right = '20px';
button.style.backgroundColor = '#007bff';
button.style.color = '#fff';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.padding = '10px 20px';
button.style.cursor = 'pointer';
button.style.zIndex = '1000';
button.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';

// Add the button to the page
document.body.appendChild(button);

// Words and phrases to detect
const phrases = ["Delve", "landscape", "evolving", "context", "insight", "nuanced", "perspective", "paradigm", "comprehensive", "framework", "facet", "dynamic", "intricacies", "holistic", "iterative", "synergy", "confluence", "pivotal", "nuance", "robust", "transformative", "underpinning", "spectrum", "trajectory", "in-depth", "at the core of", "a myriad of", "on a broader scale", "in the context of", "from a holistic perspective", "taking into account", "a dynamic interplay", "evolving over time", "a comprehensive overview", "intricacies involved", "a pivotal role", "underpinning principles", "the spectrum of", "transformative impact", "It's not about X, it's about Y", "While X is important, Y is even more crucial", "In fact", "Indeed", "Absolutely", "Clearly", "First and foremost", "Next", "Finally", "As a result", "Therefore", "Consequently", "Because of this", "In other words", "To put it simply", "That is to say", "To elaborate", "For example", "For instance", "Such as", "To illustrate", "Although", "Even though", "Despite", "While it may seem", "In summary", "To sum up", "In conclusion", "All in all", "Imagine if", "Suppose that", "What if", "Have you ever wondered", "What would happen if", "How can we", "Isn't it true that", "Wouldn't you agree that", "Isn't it obvious that", "Not only X but also Y", "Both X and Y", "Either X or Y", "More importantly", "Even more", "Less significant but", "On one hand, on the other hand", "While X, Y", "Conversely", "The challenge is", "The key issue is", "The question remains"];

// Function to check the content
function checkContent() {
    console.log('Button clicked');  // Log when the button is clicked

    const bodyText = document.body.innerText;
    const foundPhrases = phrases.filter(phrase => bodyText.includes(phrase));

    console.log('Phrases found:', foundPhrases.length);  // Log the number of found phrases

    const resultBox = document.createElement('div');
    resultBox.style.position = 'fixed';
    resultBox.style.top = '50%';
    resultBox.style.left = '50%';
    resultBox.style.transform = 'translate(-50%, -50%)';
    resultBox.style.backgroundColor = '#fff';
    resultBox.style.border = '2px solid #007bff';
    resultBox.style.padding = '20px';
    resultBox.style.borderRadius = '10px';
    resultBox.style.zIndex = '1001';
    resultBox.style.textAlign = 'center';
    resultBox.style.fontSize = '18px';
    resultBox.style.color = '#007bff';
    resultBox.style.minWidth = '200px';
    resultBox.style.minHeight = '100px';
    resultBox.style.display = 'flex';
    resultBox.style.alignItems = 'center';
    resultBox.style.justifyContent = 'center';

    // Determine the AI likelihood based on the number of found phrases
    if (foundPhrases.length > 15) {
        resultBox.textContent = "Likely AI";
    } else if (foundPhrases.length > 5) {
        resultBox.textContent = "Could be AI";
    } else {
        resultBox.textContent = "Doesn't look like AI";
    }

    document.body.appendChild(resultBox);

    // Log when the result box is displayed
    console.log('Result box displayed');

    // Remove the result box after 3 seconds
    setTimeout(() => {
        resultBox.remove();
        // Log when the result box is removed
        console.log('Result box removed');
    }, 3000);
}

// Add event listener to the button
button.addEventListener('click', checkContent);
