let isRunning = false;  // 用來追蹤是否處於啟動狀態

chrome.runtime.onInstalled.addListener(() => {
  console.log("script is loaded");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start' && !isRunning) {
    isRunning = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];  // 當前活動分頁
      if (currentTab && currentTab.url) {
        console.log("當前頁面的 URL 是：" + currentTab.url);

        if (currentTab.url.startsWith("https://www.twitch.tv")) {
          // 注入 content.js
          chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            files: ["content.js"]
          }, () => {
            // 注入後，發送訊息啟動自動點擊
            chrome.tabs.sendMessage(currentTab.id, { action: 'start' });
          });
        }
      }
    });
  }
  else if (message.action === 'stop' && isRunning) {
    isRunning = false;
    // 查詢當前活動分頁並發送停止訊息
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab) {
        chrome.tabs.sendMessage(currentTab.id, { action: 'stop' });
      }
    });
  }
});
