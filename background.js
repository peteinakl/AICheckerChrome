// Listen for the icon click
chrome.action.onClicked.addListener((tab) => {
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

// Function to check the page content
function checkPageContent() {
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

    const resultBox = document.createElement('div');
    resultBox.className = 'ai-checker-result-box';

    const glassPane = document.createElement('div');
    glassPane.className = 'glass-pane';

    const content = document.createElement('div');
    content.className = 'content';

    const icon = document.createElement('div');
    icon.className = 'icon';

    // Determine the AI likelihood based on the number of found phrases
    let resultText, iconContent, resultClass, animationClass;
    if (foundPhrases.length > 15) {
        resultText = "Likely AI";
        iconContent = "🤖";
        resultClass = "likely-ai";
        animationClass = "thunderstorm";
    } else if (foundPhrases.length > 5) {
        resultText = "Could be AI";
        iconContent = "🤔";
        resultClass = "maybe-ai";
        animationClass = "thunderstorm";
    } else {
        resultText = "Doesn't look like AI";
        iconContent = "👨‍💻";
        resultClass = "not-ai";
        animationClass = "confetti";
    }

    icon.textContent = iconContent;
    content.appendChild(icon);

    const textSpan = document.createElement('span');
    textSpan.textContent = resultText;
    content.appendChild(textSpan);

    glassPane.appendChild(content);
    resultBox.appendChild(glassPane);
    resultBox.classList.add(resultClass);

    document.body.appendChild(resultBox);

    // Add animation background
    const animationBackground = document.createElement('div');
    animationBackground.className = `animation-background ${animationClass}`;
    
    if (animationClass === 'confetti') {
        for (let i = 0; i < 50; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.className = 'confetti-piece';
            confettiPiece.style.left = `${Math.random() * 100}%`;
            confettiPiece.style.top = `-10px`;
            confettiPiece.style.backgroundColor = ['#ffd700', '#7fffd4', '#ff69b4', '#ff9933'][Math.floor(Math.random() * 4)];
            confettiPiece.style.animationDelay = `${Math.random() * 4}s`;
            animationBackground.appendChild(confettiPiece);
        }
    }
    
    document.body.appendChild(animationBackground);

    // Trigger the fade-in and 3D hover effect
    setTimeout(() => {
        resultBox.classList.add('visible');
        animationBackground.style.display = 'block';
    }, 10);

    // Add hover effect
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

    // Remove the result box and animation background after 5 seconds (increased from 3)
    // with a fade-out effect lasting 2 seconds (increased from 0.5)
    setTimeout(() => {
        resultBox.style.transition = 'opacity 2s ease';
        resultBox.style.opacity = '0';
        if (animationClass === 'confetti') {
            animationBackground.style.transition = 'opacity 2s ease';
            animationBackground.style.opacity = '0';
        } else {
            animationBackground.style.display = 'none';
        }
        setTimeout(() => {
            resultBox.remove();
            animationBackground.remove();
        }, 2000);
    }, 5000);
}
