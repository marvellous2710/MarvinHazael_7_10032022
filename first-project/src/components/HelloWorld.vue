<template>

  <div class="hello">
    <header class="container-fluid header">
      <div class="container">
        <a href="#" class="logo">Groupomania</a>
        <nav class="menu">
          <a href="#">Home</a>
          <a href="#about">Mon profil</a>
          <a href="#portofolio">Portofolio</a>
          <a href="#contact">Déconnexion</a>
        </nav>
      </div>
    </header>

    <h1>{{ msg }}</h1>

  <!-- <div class="alert alert-success" v-if="isSuccess">
      Post Created Successfully
    </div> -->
    <form @submit.prevent="postThread">
      <div class="form-group">
        <input type="text" class="postThread" v-model="threadPost" placeholder="Poster un commentaire ..."/>
      </div>
      <div class="mt-3">
        <button type="submit" class="btn btn-primary">Poster</button>
      </div>
      
    </form>

    <div :key="threads" v-for="threads in threads"> 
      <div class="container">
        <div class="cards">
          <p>User : {{ threads.titre }}</p>
          <p>Content :{{ threads.text }}</p>
          <p>Posté le : {{ threads.datePost }}</p>
        </div>
      </div>
    </div>

   
    
  </div>
</template>

<script>
import axios from "axios";
import { instance } from "../api";

export default {
  name: "HelloWorld",

  data() {
    return {
      threads: "",
      threadPost: "",
    };
  },
  created() {
    instance.get("http://localhost:4000/threads/").then((reponse) => {
      this.threads = reponse.data;
      console.log(this.threads);
    });
  },
  methods: {
    postThread() {
      instance
        .post(("http://localhost:4000/threads/addthread"), { text: this.threadPost })
        .then((response) => {
          this.$router.push("/");
          // this.isSuccess = true;
          console.log(response);
        });
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.header {
  background-color: #022c63;
  height: 70px;
  line-height: 70px;
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

.postThread{

  padding: 5px;
  border-radius: 5px;
  margin: 4px auto;
  width: 50%;
}

/* ---------------------- CARDS ------------------------------*/
.cards {
  background-color: whitesmoke;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.171);
  padding: 5px;
  border-radius: 5px;
  margin: 4px auto;
  width: 50%;
}



.subforum-column {
  border-radius: 5px;
  background-color: cadetblue;
}
</style>
