// store in window object to prevent multiple declaration
if (!window.intervalId) {
  window.intervalId = null;
}

function monitorAndClickButton() {
  const button = document.querySelector('button[aria-label="領取額外獎勵"]');
  if (button) {
    button.click();
    console.log("按鈕已被點擊");
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'start' && window.intervalId === null) {  
    // 開始自動點擊
    window.intervalId = setInterval(monitorAndClickButton, 2000); // check every 2 seconds
    console.log("script is running");
  } else if (message.action === 'stop' && window.intervalId !== null) {  
    // stop auto-click
    clearInterval(window.intervalId);  // clear interval
    window.intervalId = null;  // reset intervalId
    console.log('Auto-click stopped');
  }
});
