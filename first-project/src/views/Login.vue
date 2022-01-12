 <template>
     <div>
         <h2>Login</h2>
         <hr />

         <div class="alert alert-success" v-if="isSuccess">Post Created Successfully</div>
         <form @submit.prevent="onLogin">
             <div class="form-group">
                 <label >Email</label>
                 <input type="text" class="form-control" v-model="email">
             </div>
             <div class="form-group">
                 <label >Password</label>
                 <input type="password" class="form-control" v-model="password">
             </div>

             <div class="mt-3">
                 <button type="submit" class="btn btn-primary" >Se connecter
                     <span v-if="status == 'loading'">Connexion en cours...</span>
                     <span v-else>Connexion</span>
                 </button>
             </div>
         </form>
     </div>
 </template>

 <script>

import axios from 'axios';
import {instance} from '../api';
import { mapState } from 'vuex';

export default {
  
       data(){
        return {
            email     : '',
            password  : '',
            isSuccess : false,
            comment   : '',
        };
    },
    computed: {
        validateFields: function () {
            
        }
    },
    methods: {
        onLogin() {
            instance.post(
                `/login`,   
                {email: this.email,
                password: this.password}
                )
                .then((response) => {
                    this.isSuccess = true;
                    console.log(response);
                });
        },
        submitComment() {
            axios.post('/comments', {
                content: this.comment
            })

            console.log(this.comment)
        
        },
    },

};

 </script>