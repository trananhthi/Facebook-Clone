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
        primary: '#EE4D2D'
      },
      transitionProperty: {
        'test': '0.3s ease-in-out'
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
        'slide-out-right-post': 'slide-out-right-post 0.1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'slide-in-left-post': 'slide-in-left-post 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
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
        'slide-out-right-post': {
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
        }
      }
    },
    fontFamily: {
      sans: ['SFProDisplay-Regular', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }
      })
    })
  ]
})
