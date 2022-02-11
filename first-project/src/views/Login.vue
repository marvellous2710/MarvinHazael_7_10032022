<template>
  <div>
    <h2>Connexion</h2>
    <hr />

    <div class="alert alert-success" v-if="isSuccess">
      Post Created Successfully
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
        <button
          type="submit"
          class="btn btn-primary"        
        >
          Se connecter      
        </button>

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
      email: "",
      password: "",
      isSuccess: false,
      comment: "",
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
   
  },
  methods: {
    onLogin() {
      instance
        .post(`/users/login`, { email: this.email, password: this.password })
        .then((response) => {
          // response.data.token => A stocker, soit dans cookie soit dans localStorage
          this.isSuccess = true;
          this.$router.push("/");

          console.log(response);
        });
    },
  
  },
};
</script>
