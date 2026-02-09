# trustable-widget

> Embeddable AI Visibility Score widget. Display your Trustable Score on any website.

[![npm version](https://img.shields.io/npm/v/trustable-widget.svg)](https://www.npmjs.com/package/trustable-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start

Add this single line to your HTML:

```html
<script src="https://unpkg.com/trustable-widget@1/widget.js" data-brand="YourBrand"></script>
```

Or via jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/trustable-widget@1/widget.js" data-brand="YourBrand"></script>
```

That's it! The widget will automatically render on your page.

## Options

Configure via data attributes:

```html
<script 
  src="https://unpkg.com/trustable-widget@1/widget.js"
  data-brand="YourBrand"
  data-theme="dark"
  data-size="large"
  data-position="bottom-right">
</script>
```

### Available Options

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-brand` | string | required | Your brand name |
| `data-theme` | `light`, `dark` | `light` | Color theme |
| `data-size` | `small`, `medium`, `large` | `medium` | Widget size |
| `data-position` | `inline`, `bottom-right`, `bottom-left` | `inline` | Position |
| `data-show-details` | `true`, `false` | `false` | Show score breakdown |

## What is the Trustable Score?

The **Trustable Score** (0-100) measures your brand's visibility in AI-generated responses:

| Score | Rating | What it means |
|-------|--------|---------------|
| 80-100 | Excellent | AI recommends you frequently |
| 60-79 | Good | Regular AI citations |
| 40-59 | Moderate | Emerging AI presence |
| 20-39 | Low | Rarely mentioned by AI |
| 0-19 | Minimal | Invisible to AI |

## Why Display Your Score?

- **Build trust** — Show visitors you're AI-verified
- **Stand out** — Most brands score below 30
- **Drive interest** — Prospects want to know you're AI-visible

## Programmatic Usage

```javascript
import { TrustableWidget } from 'trustable-widget';

const widget = new TrustableWidget({
  brand: 'YourBrand',
  theme: 'dark',
  container: document.getElementById('widget-container')
});

widget.render();
```

## Resources

- [Trustable Website](https://trustablelabs.com)
- [What is GEO?](https://pages.trustablelabs.com/geo/) - Complete GEO guide
- [What is AEO?](https://pages.trustablelabs.com/aeo/) - Answer Engine Optimization
- [GEO vs SEO Comparison](https://pages.trustablelabs.com/compare/geo-vs-seo/)
- [Best AI Visibility Tools](https://pages.trustablelabs.com/compare/best-ai-visibility-tools/)
- [All Tool Comparisons](https://pages.trustablelabs.com/compare/)

### Related Packages
- [trustable-score](https://github.com/trustablelabs/trustable-score) - NPM package for AI visibility scoring
- [trustable-mcp-server](https://github.com/trustablelabs/trustable-mcp-server) - MCP server for AI agents

## About Trustable

**Trustable** is the AI Trust & Visibility Platform. We help brands measure and improve their presence in AI-generated responses using the Trustable Score™.

- Website: [trustablelabs.com](https://trustablelabs.com)
- Twitter: [@trustablelabs](https://twitter.com/trustablelabs)

## License

MIT © [Trustable Labs](https://trustablelabs.com)
