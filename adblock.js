// Universal Ad-Blocker Logic
(function () {
  const cleanPage = () => {
    // 1. Auto-skip video ads
    const skipButtons = document.querySelectorAll(
      '.ytp-ad-skip-button, .ytp-ad-skip-button-modern, [class*="skip-button"]',
    );
    skipButtons.forEach((btn) => btn.click());

    // 2. Kill invisible "click-hijack" overlays
    document.querySelectorAll("div").forEach((div) => {
      const z = window.getComputedStyle(div).zIndex;
      if (parseInt(z) > 1000) div.remove();
    });
  };

  // Run every 800ms to catch ads that load late
  setInterval(cleanPage, 800);
})();
