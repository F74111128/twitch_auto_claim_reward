document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');

  chrome.storage.local.get('buttonState', (data) => {
    if (data.buttonState === 'running') {
      startBtn.textContent = 'running';
    } else {
      startBtn.textContent = 'start';
    }
  });
  startBtn.addEventListener('click', () => {
    if (startBtn.textContent === 'start') {
      chrome.runtime.sendMessage({ action: 'start' });

      // change text
      startBtn.textContent = 'running';

      // store button state
      chrome.storage.local.set({ buttonState: 'running' });
    } else {
      console.log('script is running');
      chrome.runtime.sendMessage({ action: 'stop' });
      startBtn.textContent = 'start';
      chrome.storage.local.set({ buttonState: 'start' });
    }
  });
});
