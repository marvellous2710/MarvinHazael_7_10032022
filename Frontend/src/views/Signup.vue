<template>
  <div class="place">
    <router-link to="/login">Se connecter</router-link>
   
    <h2>Créer un compte</h2>
    <hr />

    <div class="alert alert-success" v-if="isSuccess">
      Compte utilisateur crée !
    </div>
    <form @submit.prevent="onCreateUser">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="Nom"
        />
        <input
          type="text"
          class="form-control"
          v-model="firstname"
          placeholder="Prénom"
        />
        <input
          type="text"
          class="form-control"
          v-model="email"
          placeholder="Email"
        />
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Mot de passe"
        />
      </div>

      <div class="mt-3">
        <button type="submit" 
        class="btn btn-primary"
        :disabled="!password.length"
        >Créer mon compte</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { instance } from "../api";

export default {
  data() {
    return {
      name      : "",
      firstname : "",
      email     : "",
      password  : "",
      isSuccess : false,
      comment   : "",
    };
  },
  methods: {
    onCreateUser() {
      instance
        .post(`/users/signup`, {
          name      : this.name,
          firstname : this.firstname,
          email     : this.email,
          password  : this.password,
        })
        .then((response) => {
          this.isSuccess = true;
          this.$router.push("/login");
          console.log(response);
        });
    },
   
  },
};
</script>

<style >
.form-control{
    width: 50%;
    margin: auto;
}


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
