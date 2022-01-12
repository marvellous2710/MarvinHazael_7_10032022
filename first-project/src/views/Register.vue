 <template>
     <div>
         <h2>Create Account</h2>
         <hr />

         <div class="alert alert-success" v-if="isSuccess">Account Created Successfully</div>
         <form @submit.prevent="onCreatePost">
             <div class="form-group">
                 
                 <input type="text" class="form-control" v-model="name" placeholder="name">
                 <input type="text" class="form-control" v-model="firstname" placeholder="firstname">
                 <input type="text" class="form-control" v-model="email" placeholder="email">
                 <input type="text" class="form-control" v-model="password" placeholder="password">

                 <h2>Commentaire</h2>

         <form class="flex flex-col" @submit.prevent="submitComment">
           <!-- <textearea class="border rounded p-3 mb-3" v-model="comment"></textearea> -->
           <textarea name="" id="" cols="30" rows="10" v-model="comment"></textarea>
           <button type="submit" class="border rounded py-2">Commenter</button>
         </form>
                         
             </div>

             <div class="mt-3">
                 <button type="submit" class="btn btn-primary">Create Account</button>
             </div>
         </form>
     </div>
 </template>

 <script>

import axios from 'axios';

export default {
    data(){
        return {
            title: '',
            description: '',
            isSuccess: false,
        };
    },
    methods: {
        onCreatePost() {
            axios.post(
                `https://vue-completecourse.firebaseio.com/posts.json`,
                
                {title: this.title,
                description: this.description},
                )
                .then((response) => {
                    this.isSuccess = true;
                    console.log(response);
                });
        },
    },
};
 </script>
 