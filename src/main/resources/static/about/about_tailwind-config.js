
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
                    "900": "#4c1d95"
                }
            },
            fontFamily: {
                'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
                'body': ['Poppins', 'ui-sans-serif', 'system-ui'],
                'display': ['Poppins', 'ui-sans-serif', 'system-ui']
            },
            screens: {
                'xs': '375px',
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
                'mobile': {'min': '320px', 'max': '639px'},
                'tablet': {'min': '640px', 'max': '1023px'},
                'laptop': {'min': '1024px', 'max': '1279px'},
                'desktop': {'min': '1280px'},
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 2s infinite',
                'bounce-gentle': 'bounceGentle 2s infinite'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' }
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(-2%)' },
                    '50%': { transform: 'translateY(0)' }
                }
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'glow': '0 0 15px rgba(14, 165, 233, 0.3)'
            }
        }
    },
    variants: {
        extend: {
            backgroundColor: ['active', 'group-hover', 'dark'],
            textColor: ['group-hover', 'dark'],
            transform: ['group-hover', 'hover'],
            scale: ['group-hover', 'hover'],
            translate: ['group-hover', 'hover'],
            opacity: ['group-hover', 'dark'],
            borderColor: ['dark', 'group-hover'],
            ringColor: ['dark', 'focus-visible'],
            ringOffsetColor: ['dark'],
            boxShadow: ['dark', 'hover', 'focus']
        }
    }
};