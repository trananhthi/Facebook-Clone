export const themeConfig = {
  dialog: {
    styles: {
      base: {
        backdrop: {
          backgroundColor: 'bg-[#f3f3f4]',
          backgroundOpacity: 'bg-opacity-80',
          backdropFilter: ''
        },
        container: {
          fontFamily: 'ui-sans-serif'
        }
      },
      sizes: {
        xs: {
          width: '',
          minWidth: '',
          maxWidth: ''
        },
        sm: {
          width: 'w-full md:w-2/3 lg:w-2/4 2xl:w-1/3',
          minWidth: 'min-w-[80%] md:min-w-[66.666667%] lg:min-w-[10%] 2xl:min-w-[10%]',
          maxWidth: 'max-w-[80%] md:max-w-[66.666667%] lg:max-w-[33.3%] 2xl:max-w-[28%]'
        }
      }
    }
  },
  dialogFooter: {
    defaultProps: {
      className: ''
    },
    styles: {
      base: {
        fontSmoothing: 'antialiased',
        fontFamily: 'font-sans',
        fontSize: 'text-base',
        fontWeight: 'font-light',
        lineHeight: 'leading-relaxed',
        flexShrink: 'shrink'
      }
    }
  },
  input: {
    styles: {
      base: {
        container: {
          position: 'relative',
          width: 'w-full',
          minWidth: 'min-w-[100px]'
        }
      }
    }
  },
  cardBody: {
    styles: {
      base: {
        p: 'p-4'
      }
    }
  },
  menu: {
    styles: {
      base: {
        menu: {
          minWidth: 'min-w-[50px]'
        }
      }
    }
  },
  select: {
    styles: {
      base: {
        container: {
          minWidth: 'min-w-[50px]'
        }
      }
    }
  }
}
