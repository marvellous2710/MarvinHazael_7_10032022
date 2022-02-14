import { createApp } from 'vue'
import App           from './App.vue'
import router        from './router'
import store         from './store'
import axios         from 'axios'


// const app = createApp(App)
// app.use(store)

// axios.interceptors.request.use((config) => {
//     let token = localStorage.getItem('authtoken');

//     if(token){
//         config.headers['Autorization'] = `Bearer ${ token }`;
//     }
//     return config;
//     console.log(config);
//     console.log("CEST ICI");
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// app.use(router)
// app.mount('#app')


createApp(App).use(store).use(router).mount('#app');

// Vue.filter('formatDate', function (value) {
//     if (!value) return ''
    
//     return moment(String(value)).format('DD/MM/YYYY hh:mm');
// })