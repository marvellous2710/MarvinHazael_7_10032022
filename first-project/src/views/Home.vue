<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icongroupomania7.png">
   
    <HelloWorld msg="Welcome to Groupomania"/>

  <div>
  
    
  </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';


export default {
  name: 'Home',
 
  components: {
    HelloWorld, 
   
  },
   data(){
    return{
      threads: null,
    }
  },
  // created(){
  //     axios.get('http://localhost:4000/threads/')
  //     .then((reponse) => {
  //       this.threads = reponse.data;
  //       console.log(this.threads)
  //     });
  // },
  
  // created(){
  //   axios.get('http://localhost:4000/threads/').then(response => console.log(response));
  // }
}
</script>

<style scoped>
img {
  width: 100px;
}
</style>