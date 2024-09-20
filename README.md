# Is this AI? Chrome Extension

## Overview

"Is this AI?" is a Chrome extension that helps users identify potential AI-generated content on web pages. It analyzes the text content of the current page for common phrases and patterns often associated with AI-generated text.

## Features

- Quick analysis of web page content
- Visual indicator of AI likelihood
- Customizable sensitivity settings
- Sleek, non-intrusive UI with a glass effect

## How it works

1. Click the extension icon in your Chrome toolbar to activate the analysis.
2. The extension scans the current page's text content for specific phrases and patterns.
3. A result box appears in the top-right corner of the page, indicating the likelihood of AI-generated content.
4. The result disappears after 5 seconds to minimize disruption.

## Result Categories

- "Likely AI": High probability of AI-generated content
- "Could be AI": Moderate probability of AI-generated content
- "Doesn't look like AI": Low probability of AI-generated content

## Customization

Users can adjust the sensitivity of the AI detection through the extension's options page:

- High Sensitivity Threshold: Adjust the threshold for "Likely AI" results
- Low Sensitivity Threshold: Adjust the threshold for "Could be AI" results

## Installation

1. Clone this repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Files

- `manifest.json`: Extension configuration
- `background.js`: Main logic for content analysis
- `styles.css`: Styling for the result box and animations
- `popup.html` & `popup.js`: Options page for sensitivity settings
- `icon.png`: Extension icon

## Privacy

This extension operates entirely on the client-side and does not send any data to external servers. All text analysis is performed locally in your browser.

## Disclaimer

This extension provides an estimate based on common patterns and is not a definitive tool for identifying AI-generated content. Results should be interpreted as a general indication rather than a conclusive determination.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)