let isRunning = false;  

chrome.runtime.onInstalled.addListener(() => {
  console.log("script is loaded");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start' && !isRunning) {
    isRunning = true;
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url.startsWith("https://www.twitch.tv")) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
          }, () => {
            chrome.tabs.sendMessage(tab.id, { action: 'start' });
          });
        }
      });
    });
    
  }
  else if (message.action === 'stop' && isRunning) {
    isRunning = false;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab) {
        chrome.tabs.sendMessage(currentTab.id, { action: 'stop' });
      }
    });
  }
});
