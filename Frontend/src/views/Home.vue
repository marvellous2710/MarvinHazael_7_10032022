<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icongroupomania7.png">
   
    <HelloWorld msg=""/>

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

}
</script>

<style scoped>
img {
  width: 100px;
}
</style>