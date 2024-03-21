import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as icons from '@mdi/font/css/materialdesignicons.css'

export default new createVuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
      dark: {
        primary: '#1a237e',
        secondary: '#424242',
        accent: '#82b1ff',
        error: '#d32f2f',
      },
    },
  },
    icons: {
      iconfont: 'mdiSvg',
      values: icons,
    },
  })