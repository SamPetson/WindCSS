/**
 * Compiles all WindCSS utility classes into a searchable table
 * @returns {Object} Complete keyword reference with categories
 */
function generateWindCSSKeywords() {
  const keywords = {
    // Layout
    display: [
      'block', 'inline-block', 'inline', 'flex', 'inline-flex', 
      'grid', 'inline-grid', 'hidden'
    ],
    position: [
      'static', 'fixed', 'absolute', 'relative', 'sticky'
    ],
    flexbox: [
      'flex-row', 'flex-col', 'flex-wrap', 'flex-nowrap', 'flex-1',
      'flex-auto', 'flex-initial', 'flex-none', 'justify-start',
      'justify-end', 'justify-center', 'justify-between', 'justify-around',
      'justify-evenly', 'items-start', 'items-end', 'items-center',
      'items-baseline', 'items-stretch'
    ],
    grid: [
      'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
      'grid-cols-5', 'grid-cols-6', 'gap-0', 'gap-1', 'gap-2',
      'gap-3', 'gap-4', 'gap-5'
    ],

    // Spacing
    spacing: [
      'm-0', 'm-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-auto',
      'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5'
    ],

    // Sizing
    sizing: [
      'w-auto', 'w-full', 'w-screen', 'w-min', 'w-max',
      'h-auto', 'h-full', 'h-screen', 'h-min', 'h-max'
    ],

    // Typography
    typography: [
      'text-center', 'text-left', 'text-right', 'text-justify',
      'font-bold', 'font-semibold', 'font-normal', 'font-light',
      'uppercase', 'lowercase', 'capitalize', 'italic', 'underline',
      'line-through', 'no-underline'
    ],

    // Backgrounds
    backgrounds: [
      'bg-transparent', 'bg-current', 'bg-primary', 'bg-secondary',
      'bg-accent', 'bg-danger', 'bg-success', 'bg-warning',
      'bg-info', 'bg-light', 'bg-dark'
    ],

    // Borders
    borders: [
      'border', 'border-0', 'border-2', 'border-4', 'border-8',
      'border-t', 'border-r', 'border-b', 'border-l',
      'rounded-none', 'rounded-sm', 'rounded', 'rounded-md',
      'rounded-lg', 'rounded-full'
    ],

    // Effects
    effects: [
      'shadow-none', 'shadow-sm', 'shadow', 'shadow-md',
      'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-inner',
      'opacity-0', 'opacity-25', 'opacity-50', 'opacity-75',
      'opacity-100'
    ],

    // Transforms
    transforms: [
      'transform', 'transform-gpu', 'rotate-0', 'rotate-45',
      'rotate-90', 'rotate-180', 'scale-0', 'scale-50',
      'scale-75', 'scale-90', 'scale-95', 'scale-100',
      'scale-105', 'scale-110', 'scale-125', 'scale-150'
    ],

    // Transitions
    transitions: [
      'transition-none', 'transition-all', 'transition',
      'transition-colors', 'transition-opacity', 'transition-shadow',
      'transition-transform'
    ],

    // Animations
    animations: [
      'animate-none', 'animate-spin', 'animate-pulse', 'animate-bounce',
      'animate-fade-in', 'animate-fade-out', 'animate-slide-in',
      'animate-slide-out'
    ],

    // Interactivity
    interactivity: [
      'cursor-auto', 'cursor-default', 'cursor-pointer', 'cursor-wait',
      'cursor-text', 'cursor-move', 'cursor-help', 'cursor-not-allowed',
      'pointer-events-none', 'pointer-events-auto',
      'user-select-none', 'user-select-text', 'user-select-all',
      'user-select-auto'
    ],

    // SVG
    svg: [
      'fill-current', 'stroke-current', 'stroke-0', 'stroke-1', 'stroke-2'
    ],

    // Accessibility
    accessibility: [
      'sr-only', 'not-sr-only'
    ],

    // Responsive Variants
    responsive: [
      'sm:', 'md:', 'lg:', 'xl:', 'xxl:', 'print:'
    ]
  };

  // Generate full class names with wind- prefix
  const prefixedKeywords = {};
  for (const category in keywords) {
    prefixedKeywords[category] = keywords[category].map(key => 
      key.includes(':') ? key : `wind-${key}`
    );
  }

  return prefixedKeywords;
}

/**
 * Renders the keyword reference as an HTML table
 * @param {Object} keywords 
 * @returns {string} HTML table string
 */
function renderKeywordTable(keywords) {
  let html = `
    <div class="wind-keyword-reference">
      <h2>WindCSS Keyword Reference</h2>
      <input type="text" id="keywordSearch" placeholder="Search keywords..." class="wind-p-2 wind-mb-4 wind-border wind-rounded">
      
      <table class="wind-w-full wind-border">
        <thead>
          <tr class="wind-bg-gray-100">
            <th class="wind-p-2 wind-border wind-text-left">Category</th>
            <th class="wind-p-2 wind-border wind-text-left">Keywords</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (const category in keywords) {
    html += `
      <tr class="keyword-row">
        <td class="wind-p-2 wind-border wind-font-semibold">${category}</td>
        <td class="wind-p-2 wind-border">
          <div class="wind-flex wind-flex-wrap wind-gap-2">
            ${keywords[category].map(keyword => 
              `<span class="wind-bg-blue-50 wind-text-blue-800 wind-px-2 wind-py-1 wind-rounded wind-text-sm">${keyword}</span>`
            ).join('')}
          </div>
        </td>
      </tr>
    `;
  }

  html += `
        </tbody>
      </table>
    </div>

    <script>
      document.getElementById('keywordSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.keyword-row');
        
        rows.forEach(row => {
          const keywords = row.textContent.toLowerCase();
          row.style.display = keywords.includes(searchTerm) ? '' : 'none';
        });
      });
    </script>
  `;

  return html;
}

// Export the complete keyword data and render function
const WindCSSKeywords = {
  data: generateWindCSSKeywords(),
  renderTable: function() {
    return renderKeywordTable(this.data);
  },
  getAllKeywords: function() {
    return Object.values(this.data).flat();
  }
};

// Example usage:
// document.body.innerHTML = WindCSSKeywords.renderTable();
// console.log(WindCSSKeywords.getAllKeywords());

// For Node.js/CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WindCSSKeywords;
}

// For browser environments
if (typeof window !== 'undefined') {
  window.WindCSSKeywords = WindCSSKeywords;
}
