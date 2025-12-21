v// Universal Ad-Blocker for Pake Desktop Apps
(function() {
    const adPatterns = [
        'iframe[src*="doubleclick.net"]',
        'iframe[src*="googleads"]',
        'iframe[src*="adsystem"]',
        'div[class*="ad-box"]',
        'div[class*="sponsored"]',
        'div[id*="google_ads"]',
        'a[href*="clktra.com"]', // Common click tracker
        '.taboola-ads',
        '.outbrain-ads',
        '.ad-container'
    ];

    const removeAds = () => {
        // 1. Remove Elements by Selectors
        adPatterns.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });

        // 2. Prevent "Click-to-Ad" popups
        document.querySelectorAll('a').forEach(link => {
            if (link.href.includes('utm_source=ad') || link.onclick?.toString().includes('window.open')) {
                link.onclick = (e) => { e.preventDefault(); return false; };
            }
        });

        // 3. Skip Video Ads (Universal pattern)
        const skipBtn = document.querySelector('[class*="skip-button"], [class*="ad-skip"]');
        if (skipBtn) skipBtn.click();
    };

    // Run immediately
    removeAds();

    // Watch for new ads loading dynamically
    const observer = new MutationObserver(removeAds);
    observer.observe(document.body, { childList: true, subtree: true });
})();
