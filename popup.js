document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');

  // 初始化按鈕狀態
  chrome.storage.local.get('buttonState', (data) => {
    if (data.buttonState === 'running') {
      startBtn.textContent = 'running';
    } else {
      startBtn.textContent = 'start';
    }
  });

  // 監聽按鈕點擊事件
  startBtn.addEventListener('click', () => {
    // 檢查當前按鈕的狀態，並進行相應的操作
    if (startBtn.textContent === 'start') {
      // 觸發背景腳本執行
      chrome.runtime.sendMessage({ action: 'start' });

      // 改變按鈕文字
      startBtn.textContent = 'running';

      // 儲存按鈕的狀態
      chrome.storage.local.set({ buttonState: 'running' });
    } else {
      console.log('script is running');
      chrome.runtime.sendMessage({ action: 'stop' });
      startBtn.textContent = 'start';
      chrome.storage.local.set({ buttonState: 'start' });
    }
  });
});
