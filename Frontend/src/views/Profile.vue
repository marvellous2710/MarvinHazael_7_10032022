<template>
<div class="pageProfile">
    <div class="containerProfile">
    <h2>Mon profile</h2>
    <hr />
    <div class="alert alert-success" v-if="isRight">Mot de passe modifié</div>

    <form>
      <div class="form-group">
        <label>Nouveau mot de passe</label>
      
         
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="form-group">
        <label>Confirmation nouveau mot de passe</label>
        <input
          type="password"
          class="form-control"
          v-model="confirmPassword"
          :disabled="!password.length"
        />
      </div>

      <div class="mt-3">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="isDisabled"
          @click="changePassword()"
        >
          <i class="fas fa-address-card"></i
        > Changer votre mot de passe
        </button>
      </div>
    </form>
  </div>
</div>

</template>

<script>
import { instance } from "../api";

export default {
  data() {
    return {
      users: "",
      password: "",
      confirmPassword: "",
      isRight: false,
      userId: localStorage.getItem('userId')
    };
  },

  computed: {
    isDisabled: function () {
      if (!this.password || this.confirmPassword !== this.password) {
        return true;
      }
      return false;
    },
  },

  methods: {

       changePassword() {
     
      instance
        .put(`/users/password/`, { userId: this.userId, password: this.password  })    
        .then((reponse) => {
          this.users = reponse.data;
          this.isRight = true;

          console.log(reponse);
          console.log("MOT DE PASSE MODIFIE");
        })
        .catch((error) => {
          console.log(error);
          console.log("et non password marche pas");
        });
    }
   
   
  },
};
</script>

<style scoped>



.pageProfile {
  background: #022c63;
}

.form-control {
  width: 50%;
  margin: auto;
}
</style>
