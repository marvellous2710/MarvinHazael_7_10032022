<template>
  <div class="pageProfile">
    <div class="containerProfile">
      <div>
        <h2>Mon profile</h2>
        <div class="container-fluid header">
          <div class="container">
            <nav class="menu">
              <a href="/" title="Accueil"><i class="fas fa-globe"></i></a>

              <a @click.prevent="disconnect" title="Se déconnecter"
                ><i class="fas fa-sign-out-alt"></i
              ></a>
            </nav>
          </div>
        </div>
      </div>

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
            <i class="fas fa-address-card"></i> Changer votre mot de passe
          </button>
        </div>

        <div class="mt-3">
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#enerveModal"
          >
            <i class="fas fa-trash-alt"></i> Supprimer mon compte
          </button>

          <!-- Modal DELETE-->
          <div
            class="modal fade"
            id="enerveModal"
            tabindex="-1"
            aria-labelledby="enerveModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="commentModalLabel">
                    Suppression du compte
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Voulez-vous vraiment supprimer ce compte ?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteUser()"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
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
      userId: localStorage.getItem("userId"),
      email: localStorage.getItem("user"),
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
        .put(`/users/password/`, {
          userId: this.userId,
          password: this.password,
        })
        .then((reponse) => {
          this.users = reponse.data;
          this.isRight = true;

          console.log(reponse);
          console.log("MOT DE PASSE MODIFIE");
        })
        .catch((error) => {
          console.log(error);
          console.log("password not ok");
        });
    },

    deleteUser() {
      instance
        .put(`/users/deleteUser`, { email: this.email, userId: this.userId })
        .then((reponse) => {
          console.log(reponse);
          localStorage.clear();
          this.$router.push("/signup");
          console.log("user deleted");
        })
        .catch((error) => {
          console.log(error);
          console.log("user not deleted");
        });
    },
  },
};
</script>

<style scoped>
.pageProfile {
  background: #022c63;
  color: antiquewhite;
}

.header {
  background-color: #022c63;
  height: 70px;
  line-height: 70px;
}

nav a {
  color: white;
  margin: 10px;
  cursor: pointer;
}

.form-control {
  width: 50%;
  margin: auto;
}

h5 {
  color: black;
}

.modal-body {
  color: black;
}
</style>
