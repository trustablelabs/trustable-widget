/**
 * Trustable Score Widget
 * 
 * Embed AI visibility scores on any website.
 * Every embed spreads the Trustable brand and links back to trustablelabs.com.
 * 
 * Usage:
 *   <div id="trustable-score" data-brand="YourBrand"></div>
 *   <script src="https://cdn.trustablelabs.com/widget.js"></script>
 * 
 * @see https://trustablelabs.com
 * @author Trustable Labs
 */

(function() {
  'use strict';

  const TRUSTABLE_API = 'https://api.trustablelabs.com/v1';
  const TRUSTABLE_URL = 'https://trustablelabs.com';

  // Styles injected into the page
  const styles = `
    .trustable-widget {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      padding: 20px;
      color: white;
      max-width: 300px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .trustable-widget-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .trustable-widget-logo {
      width: 24px;
      height: 24px;
    }
    .trustable-widget-title {
      font-size: 14px;
      font-weight: 600;
      opacity: 0.9;
    }
    .trustable-widget-brand {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .trustable-widget-score {
      font-size: 48px;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 4px;
    }
    .trustable-widget-rating {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.9;
      margin-bottom: 16px;
    }
    .trustable-widget-meter {
      background: rgba(255,255,255,0.3);
      border-radius: 10px;
      height: 8px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .trustable-widget-meter-fill {
      background: white;
      height: 100%;
      border-radius: 10px;
      transition: width 1s ease-out;
    }
    .trustable-widget-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }
    .trustable-widget-link {
      color: white;
      text-decoration: none;
      opacity: 0.9;
    }
    .trustable-widget-link:hover {
      opacity: 1;
      text-decoration: underline;
    }
    .trustable-widget-cta {
      background: white;
      color: #667eea;
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 11px;
    }
    .trustable-widget-cta:hover {
      opacity: 0.9;
    }
    .trustable-widget-loading {
      text-align: center;
      padding: 40px 20px;
    }
    .trustable-widget-error {
      text-align: center;
      padding: 20px;
      opacity: 0.9;
    }
    .trustable-widget-minimal {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 8px 16px;
      border-radius: 20px;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      text-decoration: none;
    }
    .trustable-widget-minimal-score {
      font-weight: 700;
      font-size: 18px;
    }
    .trustable-widget-minimal-label {
      font-size: 12px;
      opacity: 0.9;
    }
  `;

  // Inject styles
  function injectStyles() {
    if (document.getElementById('trustable-widget-styles')) return;
    const style = document.createElement('style');
    style.id = 'trustable-widget-styles';
    style.textContent = styles;
    document.head.appendChild(style);
  }

  // Get rating from score
  function getRating(score) {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    if (score >= 20) return 'Low';
    return 'Minimal';
  }

  // Estimate score locally (fallback)
  function estimateScore(signals) {
    let score = 20;
    if (signals.platformCount >= 4) score += 25;
    else if (signals.platformCount >= 2) score += signals.platformCount * 5;
    if (signals.hasWikidata) score += 10;
    if (signals.hasGoogleBusiness) score += 8;
    if (signals.hasSchemaMarkup) score += 10;
    if (signals.contentAge <= 6) score += 12;
    else if (signals.contentAge <= 12) score += 8;
    if (signals.hasComparisonContent) score += 15;
    return Math.min(100, Math.max(0, score));
  }

  // Render full widget
  function renderWidget(container, data) {
    container.innerHTML = `
      <div class="trustable-widget">
        <div class="trustable-widget-header">
          <svg class="trustable-widget-logo" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span class="trustable-widget-title">Trustable Score</span>
        </div>
        <div class="trustable-widget-brand">${data.brand}</div>
        <div class="trustable-widget-score">${data.score}</div>
        <div class="trustable-widget-rating">${data.rating} AI Visibility</div>
        <div class="trustable-widget-meter">
          <div class="trustable-widget-meter-fill" style="width: ${data.score}%"></div>
        </div>
        <div class="trustable-widget-footer">
          <a href="${TRUSTABLE_URL}" target="_blank" class="trustable-widget-link">
            Powered by Trustable
          </a>
          <a href="${TRUSTABLE_URL}?ref=widget" target="_blank" class="trustable-widget-cta">
            Get Your Score
          </a>
        </div>
      </div>
    `;
  }

  // Render minimal badge
  function renderBadge(container, data) {
    container.innerHTML = `
      <a href="${TRUSTABLE_URL}?brand=${encodeURIComponent(data.brand)}&ref=badge" 
         target="_blank" 
         class="trustable-widget-minimal">
        <span class="trustable-widget-minimal-score">${data.score}</span>
        <span class="trustable-widget-minimal-label">Trustable Score</span>
      </a>
    `;
  }

  // Initialize widget
  function initWidget(container) {
    const brand = container.dataset.brand;
    const variant = container.dataset.variant || 'full';
    const apiKey = container.dataset.apiKey;

    if (!brand) {
      container.innerHTML = '<div class="trustable-widget trustable-widget-error">Missing data-brand attribute</div>';
      return;
    }

    // Show loading state
    container.innerHTML = '<div class="trustable-widget trustable-widget-loading">Loading...</div>';

    // If API key provided, fetch real score
    if (apiKey) {
      fetch(`${TRUSTABLE_API}/score/${encodeURIComponent(brand)}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      })
      .then(res => res.json())
      .then(data => {
        const renderData = {
          brand: brand,
          score: data.trustableScore,
          rating: getRating(data.trustableScore)
        };
        if (variant === 'badge') {
          renderBadge(container, renderData);
        } else {
          renderWidget(container, renderData);
        }
      })
      .catch(() => {
        // Fallback to estimate
        const score = 50; // Default estimate
        const renderData = { brand, score, rating: getRating(score) };
        if (variant === 'badge') {
          renderBadge(container, renderData);
        } else {
          renderWidget(container, renderData);
        }
      });
    } else {
      // No API key - show demo with CTA
      const score = 50;
      const renderData = { brand, score, rating: getRating(score) };
      if (variant === 'badge') {
        renderBadge(container, renderData);
      } else {
        renderWidget(container, renderData);
      }
    }
  }

  // Initialize all widgets on page
  function init() {
    injectStyles();
    const containers = document.querySelectorAll('[id="trustable-score"], .trustable-score');
    containers.forEach(initWidget);
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual initialization
  window.TrustableWidget = { init, initWidget };
})();
