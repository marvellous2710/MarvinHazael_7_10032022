<template>
  <div class="containerProfile">
    <h2>Mon profile</h2>
    <hr />
    <div class="alert alert-success" v-if="isRight">
      Mot de passe et/ou email incorrect
    </div>

    <form>
      <div class="form-group">
        <label>Nouveau mot de passe</label>
        <input type="password" class="form-control" v-model="password" />
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary" :disabled="!password.length" @click="changePassword()">
          Changer votre mot de passe
        </button>
      </div>
    </form>

    <h1>tuto india</h1>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      ENVOYER
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">HELLO !</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <h1>FIN tuto india</h1>
  </div>
</template>

<script>
import { instance } from "../api";

export default {
  data() {
    return {
      users: "",
      password: "",
      isRight: false,
    };
  },

  methods: {
    changePassword(iduser) {
      instance
        .put(`/users/${iduser}`)

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
    },
  },
};
</script>

<style scoped>
.form-control {
  width: 50%;
  margin: auto;
}
</style>
