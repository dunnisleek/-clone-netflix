// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  app:{
    head:{
      link:[
        {rel:'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'}
       ]
      
    }
  }
})
