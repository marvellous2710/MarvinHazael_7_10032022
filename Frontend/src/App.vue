<template>
  
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/signup">S'inscrire</router-link> |
      <router-link to="/thread">THREAD</router-link> |
      |
      <router-link to="/profile">Profile</router-link>
      
      <router-view /> 
    </div>

      
</template>

<script>


export default {
  name: "App",
  components: {
 
  
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}




</style>
