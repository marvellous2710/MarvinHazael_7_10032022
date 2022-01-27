<template>
  <div>
    <h2>Créer un compte</h2>
    <hr />

    <div class="alert alert-success" v-if="isSuccess">
      Account Created Successfully
    </div>
    <form @submit.prevent="onCreateUser">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="name"
        />
        <input
          type="text"
          class="form-control"
          v-model="firstname"
          placeholder="firstname"
        />
        <input
          type="text"
          class="form-control"
          v-model="email"
          placeholder="email"
        />
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="password"
        />
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary">Créer mon compte</button>
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
      name: "",
      firstname: "",
      email: "",
      password: "",
      isSuccess: false,
      comment: "",
    };
  },
  methods: {
    onCreateUser() {
      instance
        .post(`/signup`, {
          name: this.name,
          firstname: this.firstname,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.isSuccess = true;

          console.log(response);
        });
    },
    submitComment() {
      axios.post("/comments", {
        content: this.comment,
      });

      console.log(this.comment);
    },
  },
};
</script>
