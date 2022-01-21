 <template>
     <div>
         <h2>Connexion</h2>
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


            <!-- <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
                Adresse mail et/ou mot de passe invalide
            </div> -->
             <div class="mt-3">
                 <!-- <button type="submit" class="button button--disabled" >Se connecter -->
                     <button type="submit" class="button" :class="{'button--disabled' : !validateFields}" >Se connecter
                     <span v-if="status == 'loading'">Connexion en cours...</span>
                     <!-- <span v-else>Connexion</span> -->
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
            if (this.email != "" && this.password != "") {               
                    return true;
            } else {
                    return false;
            }
        },
        ...mapState(['status'])
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
                    this.$router.push('/');
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