// Listen for the icon click
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: injectContainer
    }, () => {
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['styles.css']
        }, () => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: checkPageContent
            });
        });
    });
});

function injectContainer() {
    if (!document.getElementById('ai-checker-container')) {
        const container = document.createElement('div');
        container.id = 'ai-checker-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            overflow: visible;
            z-index: 2147483647;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

// Function to check the page content
function checkPageContent() {
    const defaultHighSensitivity = 15;
    const defaultLowSensitivity = 5;

    chrome.storage.sync.get(['highSensitivity', 'lowSensitivity'], function(items) {
        const highSensitivity = items.highSensitivity || defaultHighSensitivity;
        const lowSensitivity = items.lowSensitivity || defaultLowSensitivity;

        const phrases = [
            "delve", "landscape", "evolving", "context", "insight", "nuanced", "perspective", "paradigm",
            "comprehensive", "framework", "facet", "dynamic", "intricacies", "holistic", "iterative",
            "synergy", "confluence", "pivotal", "nuance", "robust", "transformative", "underpinning",
            "spectrum", "trajectory", "in-depth", "at the core of", "a myriad of", "on a broader scale",
            "in the context of", "from a holistic perspective", "taking into account", "a dynamic interplay",
            "evolving over time", "a comprehensive overview", "intricacies involved", "a pivotal role",
            "underpinning principles", "the spectrum of", "transformative impact",
            /it's not about \w+,\s? it's about \w+/i,
            /while \w+ is important,\s? \w+ is even more crucial/i,
            /not only \w+ but also \w+/i,
            /both \w+ and \w+/i,
            /either \w+ or \w+/i,
            /more importantly,\s? \w+/i,
            /even more,\s? \w+/i,
            /on one hand,\s? \w+, on the other hand,\s? \w+/i
        ];

        const bodyText = document.body.innerText.toLowerCase();
        let foundPhrases = [];

        // Check for exact phrases and patterns
        phrases.forEach(phrase => {
            if (typeof phrase === 'string') {
                if (bodyText.includes(phrase)) {
                    foundPhrases.push(phrase);
                }
            } else if (phrase instanceof RegExp) {
                if (phrase.test(bodyText)) {
                    foundPhrases.push(phrase);
                }
            }
        });

        const container = document.getElementById('ai-checker-container');
        container.innerHTML = ''; // Clear previous results

        const resultBox = document.createElement('div');
        resultBox.className = 'ai-checker-result-box';

        const glassPane = document.createElement('div');
        glassPane.className = 'ai-checker-glass-pane';

        const content = document.createElement('div');
        content.className = 'ai-checker-content';

        const icon = document.createElement('div');
        icon.className = 'ai-checker-icon';

        // Determine the AI likelihood based on the number of found phrases
        let resultText, iconContent, resultClass;
        if (foundPhrases.length > highSensitivity) {
            resultText = "Likely AI";
            iconContent = "🤖";
            resultClass = "likely-ai";
        } else if (foundPhrases.length > lowSensitivity) {
            resultText = "Could be AI";
            iconContent = "🤔";
            resultClass = "maybe-ai";
        } else {
            resultText = "Doesn't look like AI";
            iconContent = "👨‍💻";
            resultClass = "not-ai";
        }

        icon.textContent = iconContent;
        content.appendChild(icon);

        const textSpan = document.createElement('span');
        textSpan.textContent = resultText;
        content.appendChild(textSpan);

        glassPane.appendChild(content);
        resultBox.appendChild(glassPane);
        resultBox.classList.add(`ai-checker-${resultClass}`);

        container.appendChild(resultBox);

        // Remove the confetti and thunderstorm code
        // Instead, add a hover effect to the glass pane
        resultBox.addEventListener('mousemove', (e) => {
            const rect = resultBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;
            glassPane.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        resultBox.addEventListener('mouseleave', () => {
            glassPane.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });

        // Trigger the fade-in effect
        setTimeout(() => {
            resultBox.classList.add('ai-checker-visible');
        }, 10);

        // Remove the results after 5 seconds
        setTimeout(() => {
            container.innerHTML = '';
        }, 5000);
    });
}
