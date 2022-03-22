<template>

  <div class="oneThread">

   
    <header class="container-fluid header">
      <div class="container">
        <a href="#home" class="logo">Groupomania</a>
        <nav class="menu">
          <a href="#category" class="categoryBurger"
            ><i class="fas fa-utensils"></i
          ></a>
          <a href="/"><i class="fas fa-globe"></i></a>
          <a href="/profile"><i class="fas fa-user-alt"></i></a>
          <a @click.prevent="disconnect"><i class="fas fa-sign-out-alt"></i></a>
        </nav>
      </div>
    </header>
    <div class="containerThread">
      <div class="cards">
        <div class="title-container">
          <div class="title">
            <p class="userId">{{ thread.email }}</p>
            <p class="titre">{{ thread.titre }}</p>
            <p class="titre">{{ thread.idthread }}</p>
          </div>
        </div>

        <div class="picture">
          <img :src="thread.image" />
        </div>

        <small class="date">
          Posté le {{ getFormatedDate(thread.datePost) }}
        </small>

        <form @submit.prevent="">
          <div class="mt-3">
            <button class="btn btn-primary">
              <i class="fas fa-thumbs-up" @click="likeDislikePost()"></i>
              {{ currentValue }}
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click="findOne(thread.idthread)"
            >
              <i class="fas fa-comment-alt"></i> Répondre
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              v-if="user == thread.email"
            >
              <i class="fas fa-edit" @click="updatePost()"></i> Modifier
            </button>
            <button class="btn btn-primary" v-if="user == thread.email">
              <i class="fas fa-trash-alt" @click="deletePost()"></i> Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../api";
import moment from "moment";

export default {
  data() {
    return {
      thread: "",
      threadPost: "",
      titre: "",
      //email: "",
      user: localStorage.getItem("user"),
      //email: localStorage.getItem("user"),
      imageUrl: "",
      image: null,
      selectedFile: null,
      file: "",
      // idthread: this.$route.params.idthread,
      currentValue: 0,
    };
  },

  methods: {
    getFormatedDate(date) {
      return moment(String(date)).format("DD-MM-YYYY hh:mm");
    },
  },

  created() {
    instance
      .get(`/threads/${this.$route.params.idthread}`)
      .then((reponse) => {
        this.thread = reponse.data;
        console.log("thread ok !");
      })
      .catch((error) => {
        console.log(error);
        console.log("le thread s'affiche pas");
      });
  },
};
</script>

<style scoped>
.header {
  background-color: #022c63;
  height: 70px;
  line-height: 70px;
}

.oneThread {
  background-color: #022c63;
}

.logo {
  color: whitesmoke;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  float: left;
}

.menu {
  float: right;
}

.categoryBurger {
  visibility: hidden;
}

.menu a:hover {
  color: red;
  border: solid 1px violet;
  border-radius: 3px;
  font-weight: bold;
}

.menu a {
  color: whitesmoke;
  margin-right: 20px;
}

.hello {
  background: #022c63;
}

.containerLabelThread {
  display: flex;
  margin-left: 15%;
}

.containerLabel {
  /* display: flex; */
  border-radius: 5px;
  margin: 4px auto;
  margin-right: 5px;
  width: 10%;
  /* background-color: red; */
  text-align: start;
  font-size: 2rem;
}

.label {
  /* background-color: whitesmoke; */
  margin-right: 10px;
  color: whitesmoke;
}

.label:hover {
  background-color: whitesmoke;
  color: #022c63;
}

.input-file {
  display: none;
}

.btnPublication {
  display: flex;
}

.lapizzadelamamma a {
  text-decoration: none;
}

.cardThread {
  background-color: whitesmoke;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.171);
  padding: 5px;
  border-radius: 5px;
  margin: 4px auto;
  width: 50%;
  display: flex;
}

.cardThread input {
  border: none;
}

.postThread {
  padding: 5px;
  border-radius: 50px;
  margin: 4px auto;
  width: 40%;
}

/* ---------------------- CARDS ------------------------------*/

.cards {
  background-color: whitesmoke;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.171);
  padding: 10px;
  border-radius: 5px;
  width: 50%;
  margin: auto;
}

.title {
  display: flex;
  flex-direction: column;
  text-align: start;
}

.picture img {
  width: 100%;
  border-radius: 5px;
}

.date {
  display: flex;
  text-align: start;
  padding: 5px;
}

.mt-3 {
  margin: 5px;
}

.mt-3 button {
  margin: 5px;
}

.subforum-column {
  border-radius: 5px;
  background-color: cadetblue;
}

/*----------------------------------- RESPONSIVE -----------------------------------*/

@media all and (max-width: 800px) {
  
.containerLabelThread {
  display: inline;
}

.cards {
  width: auto;
  margin: 10px;
}

.cardThread {
  width: 90%;
}

.categoryBurger {
  visibility: visible;
}
}

/*-----------------------------------FIN RESPONSIVE -----------------------------------*/
</style>
