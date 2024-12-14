export const CATEGORY_COLORS = {
  Needs: {
    primary: '#646cff',
    secondary: '#8b94ff',
  },
  Wants: {
    primary: '#ff6464',
    secondary: '#ff8b8b',
  },
  Savings: {
    primary: '#64ff7c',
    secondary: '#8bff9e',
  },
} as const;

export const CHART_OPTIONS = {
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
} as const;