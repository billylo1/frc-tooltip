# FRC Team Lookup Chrome Extension

This extension shows the FRC team name as a tooltip when you hover over a team number (1-5 digits) on any webpage.

## How to Install

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select this directory (`frc_team_number_to_name`).

## How it Works

- The extension uses a content script that monitors mouse movement.
- It identifies the word under the cursor using `document.caretRangeFromPoint`.
- If the word is a number found in `teams.json`, it displays a styled tooltip next to the cursor.

## Updating Team Data

The `teams.json` file currently contains a subset of popular FRC teams. To add more teams, simply update `teams.json` with new key-value pairs where the key is the team number (as a string) and the value is the team nickname.

You can fetch the latest data from [The Blue Alliance API](https://www.thebluealliance.com/apidocs/v3).
