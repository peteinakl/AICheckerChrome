# Is this AI? Chrome Extension

![Is this AI? Extension Screenshot](screenshot.png)

## Description

"Is this AI?" is a Chrome extension that analyzes web page content to determine the likelihood of it being AI-generated. It scans for specific phrases and patterns commonly associated with AI-written text and provides a visual indication of the result.

## Features

- Quick analysis of web page content
- Clean, animated result display with a 3D glass effect
- Three-tier result system: "Likely AI", "Could be AI", and "Doesn't look like AI"
- Easy-to-use: just click the extension icon to analyze the current page

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to any web page you want to analyze.
2. Click the "Is this AI?" extension icon in your Chrome toolbar.
3. A popup will appear, showing the analysis result.

## Files

- `manifest.json`: Extension configuration
- `background.js`: Main logic for content analysis
- `styles.css`: Styling for the result popup
- `icon.png`: Extension icon (16px, 48px, and 128px versions)

## How it works

The extension searches for specific phrases and patterns in the page content that are commonly associated with AI-generated text. Based on the number of matches found, it categorizes the content into one of three categories:

- "Likely AI": Many AI-associated phrases detected
- "Could be AI": Some AI-associated phrases detected
- "Doesn't look like AI": Few or no AI-associated phrases detected

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This extension provides an estimate based on common patterns and is not a definitive AI detection tool. Results should be interpreted as a general indication rather than a conclusive determination.