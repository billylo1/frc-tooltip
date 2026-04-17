let frcTeams = {};
let tooltip = null;
let currentWord = "";

if (!window.frcTooltipLoaded) {
  window.frcTooltipLoaded = true;
  // Load team data
  fetch(chrome.runtime.getURL('teams.json'))
    .then(response => response.json())
    .then(data => {
      frcTeams = data;
      init();
    })
    .catch(err => console.error('Error loading FRC teams:', err));
}

function init() {
  createTooltip();
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', hideTooltip);
}

function createTooltip() {
  tooltip = document.createElement('div');
  tooltip.id = 'frc-team-tooltip';
  tooltip.style.position = 'fixed';
  tooltip.style.display = 'none';
  tooltip.style.zIndex = '1000000';
  tooltip.style.pointerEvents = 'none';
  tooltip.className = 'frc-tooltip';
  document.body.appendChild(tooltip);
}

let throttleTimer = null;

function handleMouseMove(e) {
  if (throttleTimer) return;
  
  throttleTimer = setTimeout(() => {
    throttleTimer = null;
    processMouseMove(e);
  }, 50); // 50ms throttle
}

function processMouseMove(e) {
  let range, textNode, offset;

  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (!range) return hideTooltip();
    textNode = range.startContainer;
    offset = range.startOffset;
  } else if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(e.clientX, e.clientY);
    if (!range) return hideTooltip();
    textNode = range.offsetNode;
    offset = range.offset;
  } else {
    return;
  }

  if (textNode && textNode.nodeType === Node.TEXT_NODE) {
    const text = textNode.textContent;
    const wordInfo = getWordAtOffset(text, offset);
    
    if (wordInfo) {
      const word = wordInfo.word;
      if (word !== currentWord) {
        currentWord = word;
        if (/^\d{1,5}$/.test(word) && frcTeams[word]) {
          showTooltip(frcTeams[word], e.clientX, e.clientY);
        } else {
          hideTooltip();
        }
      } else if (tooltip.style.display === 'block') {
        // Just update position slightly if already showing for this word
        updateTooltipPosition(e.clientX, e.clientY);
      }
    } else {
      hideTooltip();
    }
  } else {
    hideTooltip();
  }
}

function getWordAtOffset(text, offset) {
  if (!text) return null;
  
  // Find word boundaries around the offset
  const left = text.slice(0, offset).search(/[^\s\w\d]|[\s]$/);
  const right = text.slice(offset).search(/[^\s\w\d]|[\s]/);
  
  let start = 0;
  if (left !== -1) {
    // search from the end of the left slice
    const lastMatch = text.slice(0, offset).match(/[\s\W][\w\d]*$/);
    start = lastMatch ? offset - lastMatch[0].length + 1 : 0;
  }
  
  let end = text.length;
  if (right !== -1) {
    end = offset + right;
  }
  
  const word = text.slice(start, end).trim();
  if (!word) return null;
  
  return { word, start, end };
}

function showTooltip(teamName, x, y) {
  tooltip.textContent = teamName;
  tooltip.style.display = 'block';
  updateTooltipPosition(x, y);
}

function updateTooltipPosition(x, y) {
  tooltip.style.left = (x + 15) + 'px';
  tooltip.style.top = (y + 15) + 'px';
}

function hideTooltip() {
  if (tooltip) {
    tooltip.style.display = 'none';
  }
  currentWord = "";
}
