document.addEventListener('DOMContentLoaded', function() {
  const defaultHighSensitivity = 15;
  const defaultLowSensitivity = 5;

  // Load saved settings
  chrome.storage.sync.get(['highSensitivity', 'lowSensitivity'], function(items) {
    document.getElementById('highSensitivity').value = items.highSensitivity || defaultHighSensitivity;
    document.getElementById('lowSensitivity').value = items.lowSensitivity || defaultLowSensitivity;
  });

  // Save settings
  document.getElementById('save').addEventListener('click', function() {
    let highSensitivity = parseInt(document.getElementById('highSensitivity').value);
    let lowSensitivity = parseInt(document.getElementById('lowSensitivity').value);

    // Ensure lowSensitivity is always less than highSensitivity
    if (lowSensitivity >= highSensitivity) {
      lowSensitivity = highSensitivity - 1;
    }

    chrome.storage.sync.set({
      highSensitivity: highSensitivity,
      lowSensitivity: lowSensitivity
    }, function() {
      // Update status to let user know settings were saved.
      alert('Settings saved');
    });
  });
});