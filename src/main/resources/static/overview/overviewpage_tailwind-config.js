tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    "50": "#f0f9ff",
                    "100": "#e0f2fe",
                    "200": "#bae6fd",
                    "300": "#7dd3fc",
                    "400": "#38bdf8",
                    "500": "#0ea5e9",
                    "600": "#0284c7",
                    "700": "#0369a1",
                    "800": "#075985",
                    "900": "#0c4a6e",
                    "950": "#082f49"
                },
                secondary: {
                    "50": "#f5f3ff",
                    "100": "#ede9fe",
                    "200": "#ddd6fe",
                    "300": "#c4b5fd",
                    "400": "#a78bfa",
                    "500": "#8b5cf6",
                    "600": "#7c3aed",
                    "700": "#6d28d9",
                    "800": "#5b21b6",
                    "900": "#4c1d95",
                    "950": "#2e1065"
                }
            },
            fontFamily: {
                'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
                'body': ['Poppins', 'ui-sans-serif', 'system-ui'],
                'display': ['Poppins', 'ui-sans-serif', 'system-ui']
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '72': '18rem',
                '84': '21rem',
                '96': '24rem'
            },
            fontSize: {
                'xxs': '0.625rem',
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '4rem'
            },
            borderRadius: {
                'sm': '0.125rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                'full': '9999px'
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                'none': 'none'
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 2s infinite'
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                }
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
                'width': 'width',
                'bg': 'background-color',
                'border': 'border-color',
                'colors': 'color, background-color, border-color',
                'opacity': 'opacity',
                'shadow': 'box-shadow',
                'transform': 'transform'
            },
            transitionTimingFunction: {
                'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                'soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)'
            },
            transitionDuration: {
                '0': '0ms',
                '150': '150ms',
                '300': '300ms',
                '500': '500ms',
                '700': '700ms',
                '1000': '1000ms'
            },
            scale: {
                '98': '.98',
                '101': '1.01',
                '102': '1.02'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            }
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        }
    },
    variants: {
        extend: {
            backgroundColor: ['active', 'group-hover'],
            textColor: ['group-hover'],
            transform: ['group-hover'],
            scale: ['group-hover'],
            translate: ['group-hover'],
            opacity: ['group-hover'],
            blur: ['hover', 'group-hover'],
            grayscale: ['hover', 'group-hover']
        }
    }
};