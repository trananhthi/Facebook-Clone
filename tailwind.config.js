/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
const withMT = require('@material-tailwind/react/utils/withMT')
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        header: '#2A2A2A',
        primary: '#EE4D2D',
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        primarylight: "rgb(var(--color-primary-light) / <alpha-value>)",
        primarydark: "rgb(var(--color-primary-dark) / <alpha-value>)",
        primarygray: "rgb(var(--color-primary-gray) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        pending: "rgb(var(--color-pending) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        textprimary: "rgb(var(--color-text-primary) / <alpha-value>)",
        textgray: "rgb(var(--color-text-gray) / <alpha-value>)",
      },
      boxShadow: {
        'custom': "#ffffff 0px 0px 0px 2px,#0866ff 0px 0px 0px 4px"
      },
      animation: {
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s',
        'slide-in-left': 'slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-left-search': 'slide-left-search 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.1s both',
        'slide-right-search': 'slide-right-search 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.1s both',
        'slide-out-left-search': 'slide-out-left 0.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'slide-in-left-search': 'slide-in-left-search 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.1s both',
        'flip-out-hor-top-logo': 'flip-out-hor-top-logo 0.45s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'flip-in-hor-bottom-logo': 'flip-in-hor-bottom-logo 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-right-button': 'slide-in-right-button 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.1s both',
        'scale-out-bl-box-emoji': 'scale-out-bl-box-emoji 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'scale-out-tl-box-emoji': 'scale-out-tl-box-emoji 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'slide-in-bottom-box-emoji': 'slide-in-bottom-box-emoji 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'scale-up-bottom-emoji': 'scale-up-bottom-emoji 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'scale-down-bottom-emoji': 'scale-down-bottom-emoji 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-out-left-post': 'slide-out-left-post 0.1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'slide-in-right-post': 'slide-in-right-post 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-out-right-createpost': 'slide-out-right-createpost 0.1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'slide-in-left-post': 'slide-in-left-post 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'scale-in-hor-center': 'scale-in-hor-center 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'scale-out-hor-center': 'scale-out-hor-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
      },
      keyframes: {
        'text-reveal': {
          '0%': {
            transform: 'translate(0, 100%)'
          },
          '100%': {
            transform: 'translate(0, 0)'
          }
        },
        'slide-in-left': {
          '0%': {
            transform: 'translateX(-20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'slide-left-search': {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-25px)'
          }
        },
        'slide-right-search': {
          '0%': {
            transform: 'translateX(-25px)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        'slide-out-left': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(-10px)',
            opacity: '0'
          }
        },
        'slide-in-left-search': {
          '0%': {
            transform: 'translateX(-10px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'flip-out-hor-top-logo': {
          '0%': {
            transform: 'rotateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'rotateX(90deg)',
            opacity: '1'
          }
        },
        'flip-in-hor-bottom-logo': {
          '0%': {
            transform: 'rotateX(90deg)',
            opacity: '0'
          },
          '100%': {
            transform: 'rotateX(0)',
            opacity: '1'
          }
        },
        'slide-in-right-button': {
          '0%': {
            transform: 'translateX(15px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'slide-in-bottom-box-emoji': {
          '0%': {
            transform: 'translateY(50px)',
            opacity: '0',
            cursor: 'pointer'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          }
        },
        'scale-out-bl-box-emoji': {
          '0%': {
            transform: 'scale(1)',
            transformOrigin: '0% 100%',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(0)',
            transformOrigin: '0% 100%',
            opacity: '1'
          }
        },
        'scale-out-tl-box-emoji': {
          '0%': {
            transform: 'scale(1)',
            transformOrigin: '0% 0%',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(0)',
            transformOrigin: '0% 0%',
            opacity: '1'
          }
        },
        'scale-up-bottom-emoji': {
          '0%': {
            transform: 'scale(1)',
            transformOrigin: '50% 100%'
          },
          '100%': {
            transform: 'scale(1.3)',
            transformOrigin: '50% 100%'
          }
        },
        'scale-down-bottom-emoji': {
          '0%': {
            transform: 'scale(1.3)',
            transformOrigin: '50% 100%'
          },
          '100%': {
            transform: 'scale(1)',
            transformOrigin: '50% 100%'
          }
        },
        'slide-out-left-post': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(-20px)',
            opacity: '0'
          }
        },
        'slide-in-right-post': {
          '0%': {
            transform: 'translateX(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'slide-out-right-createpost': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(20px)',
            opacity: '0'
          }
        },
        'slide-in-left-post': {
          '0%': {
            transform: 'translateX(-20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'scale-in-hor-center': {
          '0%': {
            transform: 'scaleX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'scaleX(1)',
            opacity: '1'
          }
        },
        'scale-out-hor-center': {
          '0%': {
            transform: 'scaleX(1)',
            opacity: '1'
          },
          '100%': {
            transform: 'scaleX(0.5)',
            opacity: '1'
          }
        },
        'scale-out-center': {
          '0%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(0)',
            opacity: '1'
          }
        },
        'scale-in-center': {
          '0%': {
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }

      }
    },
    fontFamily: {
      sans: ['SFProDisplay-Regular', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: [
    // require("@tailwindcss/forms"),
    plugin(function ({ addBase, matchUtilities }) {
      addBase({
        // Default colors
        ":root": {
          "--color-primary": '',
          "--color-primary-dark": "26 54 149",
          "--color-primary-gray": "228 230 235",
          "--color-primary-light": "53 83 183",
          "--color-secondary": '',
          "--color-success": '',
          "--color-info": '240 20 20',
          "--color-warning": '',
          "--color-pending": '',
          "--color-danger": '',
          "--color-light": '',
          "--color-dark": '',
          "--color-text-primary": "5 5 5", //050505
          "--color-text-gray": "101 103 107", //
        },
        // Default dark-mode colors
        ".dark": {
          "--color-primary": '',
          "--color-primary-dark": "41 52 79",
          "--color-primary-light": "37 49 76",
          "--color-darkmode-50": "87 103 132",
          "--color-darkmode-100": "74 90 121",
          "--color-darkmode-200": "65 81 114",
          "--color-darkmode-300": "53 69 103",
          "--color-darkmode-400": "48 61 93",
          "--color-darkmode-500": "41 53 82",
          "--color-darkmode-600": "40 51 78",
          "--color-darkmode-700": "35 45 69",
          "--color-darkmode-800": "27 37 59",
          "--color-darkmode-900": "15 23 42",
        },
      });

      // Animation delay utilities
      matchUtilities(
        {
          "animate-delay": (value) => ({
            "animation-delay": value,
          }),
        },
        {
          values: (() => {
            const values = {};
            for (let i = 1; i <= 50; i++) {
              values[i * 10] = `${i * 0.1}s`;
            }
            return values;
          })(),
        }
      );

      // Animation fill mode utilities
      matchUtilities(
        {
          "animate-fill-mode": (value) => ({
            "animation-fill-mode": value,
          }),
        },
        {
          values: {
            none: "none",
            forwards: "forwards",
            backwards: "backwards",
            both: "both",
          },
        }
      );
    }),
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        },
        '.flexbox-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      })
    })
  ]
})
