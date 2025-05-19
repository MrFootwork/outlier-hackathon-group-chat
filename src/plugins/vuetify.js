import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const sharedColors = {
  primary: '#8cd992',
  'highlight-dark': '#181818',
}

export default createVuetify({
  components,
  directives,
  typography: {
    defaultFontFamily: 'Questrial, sans-serif',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#f5f5f5',
          'background-2': '#b9b9b9',
          ...sharedColors,
        },
      },
      dark: {
        colors: {
          background: '#181818',
          'background-2': '#383838',
          ...sharedColors,
        },
      },
    },
  },
})
