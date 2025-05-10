export const colors = {
  primary: {
    main: '#ffffff',    // Белый для основного текста
    light: '#e5e7eb',   // Светло-серый
    dark: '#9ca3af',    // Серый
  },
  secondary: {
    main: '#60a5fa',    // Голубой для акцентов
    light: '#93c5fd',   // Светло-голубой
    dark: '#3b82f6',    // Темно-голубой
  },
  background: {
    default: '#111827', // Темно-синий фон
    paper: '#ffffff',   // Темно-серый для карточек
  },
  text: {
    primary: '#ffffff',   // Белый для основного текста
    secondary: '#d1d5db', // Светло-серый для вторичного текста
    disabled: '#6b7280',  // Серый для неактивного текста
  },
  error: '#ef4444',    // Красный для ошибок
  success: '#22c55e',  // Зеленый для успеха
  warning: '#f59e0b',  // Оранжевый для предупреждений
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const typography = {
  h1: {
    fontSize: '2.25rem',    // 36px
    fontWeight: '700',
    lineHeight: '2.5rem',   // 40px
  },
  h2: {
    fontSize: '1.875rem',   // 30px
    fontWeight: '600',
    lineHeight: '2.25rem',  // 36px
  },
  h3: {
    fontSize: '1.5rem',     // 24px
    fontWeight: '600',
    lineHeight: '2rem',     // 32px
  },
  body1: {
    fontSize: '1rem',       // 16px
    fontWeight: '400',
    lineHeight: '1.5rem',   // 24px
  },
  body2: {
    fontSize: '0.875rem',   // 14px
    fontWeight: '400',
    lineHeight: '1.25rem',  // 20px
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
};

export const borderRadius = {
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  full: '9999px',
};

export const transitions = {
  default: 'all 0.3s ease',
  fast: 'all 0.15s ease',
  slow: 'all 0.5s ease',
};

// Стили для компонентов
export const components = {
  card: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.paper,
    boxShadow: shadows.md,
    transition: transitions.default,
    '&:hover': {
      boxShadow: shadows.lg,
    },
  },
  button: {
    primary: {
      backgroundColor: colors.secondary.main,
      color: colors.background.paper,
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: borderRadius.md,
      transition: transitions.default,
      '&:hover': {
        backgroundColor: colors.secondary.dark,
      },
    },
    secondary: {
      backgroundColor: colors.background.paper,
      color: colors.text.primary,
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.text.disabled}`,
      transition: transitions.default,
      '&:hover': {
        backgroundColor: colors.background.default,
      },
    },
  },
  input: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.text.disabled}`,
    transition: transitions.default,
    '&:focus': {
      borderColor: colors.secondary.main,
      outline: 'none',
    },
  },
}; 