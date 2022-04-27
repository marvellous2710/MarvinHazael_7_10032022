<template>
  <div>
    <h2>Connexion</h2>
    <hr />

    <div class="alert alert-danger" v-if="isWrong">
      Mot de passe et/ou email incorrect
    </div>

    <form @submit.prevent="onLogin">
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password" />
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
          //localStorage.setItem('firstname',response.data.user.firstname);
          localStorage.setItem('userId',response.data.user.idUser);
          
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
