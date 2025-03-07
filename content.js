// 使用 window 物件來存儲 intervalId，確保在多次加載中只會有一個 instance
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
  if (message.action === 'start' && window.intervalId === null) {  // 確保計時器尚未啟動
    // 開始自動點擊
    window.intervalId = setInterval(monitorAndClickButton, 2000); // 每2秒檢查一次
    console.log("script is running");
  } else if (message.action === 'stop' && window.intervalId !== null) {  // 確保只有在計時器存在的情況下才停止
    // 停止自動點擊
    clearInterval(window.intervalId);  // 清除計時器
    window.intervalId = null;  // 重設 intervalId
    console.log('Auto-click stopped');
  }
});
