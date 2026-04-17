# FRC Team Lookup Chrome Extension

This extension shows the FRC team name as a tooltip when you hover over a team number (1-5 digits) on any webpage.

## Installation for Development

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select this directory.

## Building for Chrome Web Store

To create a package for upload to the Chrome Web Store, run the build script:

```bash
./build.sh
```

This will generate a `frc-tooltip-v1.0.zip` file containing all necessary assets, including automatically generated icons.

## How it Works

- The extension runs automatically on all webpages.
- It monitors mouse movement and identifies the word under the cursor.
- If the word is a number found in `teams.json`, it displays a styled tooltip next to the cursor.

## Updating Team Data

The `teams.json` file currently contains a subset of popular FRC teams. To add more teams, update `teams.json` with new key-value pairs where the key is the team number (as a string) and the value is the team nickname.

You can fetch the latest data from [The Blue Alliance API](https://www.thebluealliance.com/apidocs/v3).
