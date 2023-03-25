// Service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service worker registered:', registration);
      })
      .catch(error => {
        console.log('Service worker registration failed:', error);
      });
  });
}

// Prompt user to install PWA
window.addEventListener('beforeinstallprompt', event => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  window.deferredPrompt = event;
  // Show install button
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'block';
  installButton.addEventListener('click', () => {
    // Show the prompt
    window.deferredPrompt.prompt();
    // Wait for user to respond to the prompt
    window.deferredPrompt.userChoice.then(choiceResult => {
      // Clear the deferredPrompt so it can be shown again
      window.deferredPrompt = null;
      // Hide the install button
      installButton.style.display = 'none';
    });
  });
});

// Hide install button if PWA is already installed
window.addEventListener('appinstalled', () => {
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'none';
});
