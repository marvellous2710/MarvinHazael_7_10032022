<template>
  <div class="place">
  
    <router-link to="/signup">S'inscrire</router-link>
    <h2>Connexion</h2>
    <hr />

    <div class="alert alert-danger" v-if="isWrong">
      Mot de passe et/ou email incorrect
    </div>

    <form @submit.prevent="onLogin">
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" v-model="email" placeholder="email"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="mot de passe"/>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary" :disabled="!password.length">Se connecter</button>
      </div>
    </form>
  </div>
</template>

<script>

import { instance } from "../api";

export default {
  data() {
    return {
      email: "",
      password: "",
      comment: "",
      isWrong: false,
    };
  },
 
  methods: {
    onLogin() {
      instance
        .post(`/users/login`, { email: this.email, password: this.password })
        .then((response) => {

          localStorage.setItem('authToken',response.data.token);
          localStorage.setItem('user',response.data.user.email);
          localStorage.setItem('userId',response.data.user.idUser);
          localStorage.setItem('roleUser',response.data.user.roleUserID);
          
          this.$router.push("/");

          console.log(response);
        })
        .catch((error) => {
          this.isWrong = true;
        });
    },
  },
};
</script>


<style scoped>

.place{
  background: #022c63;
  padding: 30vh;
  color: whitesmoke;
}

.place a {
  color: 	#DC143C;
  text-decoration: none;
}

@media all and (max-width: 800px) {

.place {
  padding: 0;
}
}

</style>
