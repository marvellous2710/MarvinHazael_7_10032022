import { createApp }       from 'vue';
import App                 from './App.vue';
import router              from './router';
import store               from './store';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { library }         from '@fortawesome/fontawesome-svg-core';
// import { fas }             from '@fortawesome/free-solid-svg-icons';
import axios               from 'axios';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

//library.add(fas);

createApp(App).use(store)
.use(router).mount('#app');
