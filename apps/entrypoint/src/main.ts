import './style.css'

import 'ui-kit-vite/main.css'
import 'ui-kit-vite-vuetify/main.css'

import 'vuetify/styles'

import { createVuetify } from 'vuetify'

import { createApp } from 'vue'
import App from './app.vue'

const app = createApp(App)

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
})

app.use(vuetify)

app.mount('#app')
