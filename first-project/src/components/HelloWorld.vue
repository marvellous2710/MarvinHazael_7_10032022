<template>
  <div class="hello">
    <header class="container-fluid header">
      <div class="container">
        <a href="#home" class="logo">Groupomania</a>
        <nav class="menu">
          <a href="#"><i class="fas fa-globe"></i></a>
          <a href="#profile"><i class="fas fa-user-alt"></i></a>
          <a href="#notification"><i class="fas fa-bell"></i></a>
          <a @click.prevent="disconnect"><i class="fas fa-sign-out-alt"></i></a>
        </nav>
      </div>
    </header>

    <form @submit.prevent="postThread">
      <div class="cardThread">
        <input
          type="text"
          class="postThread"
          v-model="threadPost"
          placeholder="Poster un commentaire ..."
        />

        <div class="mt-3">
          <!-- <button type="submit" class="btn btn-primary" :class="{'button--disabled' : !bouton()}" >Publier</button> -->
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!threadPost.length"
          >
            Publier
          </button>
          <div class="buttonUpload">
            <input name="transfertFile" type="file" @change="onFileSelected" />
          </div>
        </div>
      </div>
    </form>

    <div class="container">
      <div class="containerLabel">
        <div
          class="lapizzadelamamma"
          :key="categories"
          v-for="categories in categories"
        >
          <a href="#"
            ><div class="label">
              {{ categories.label }}
            </div></a
          >
        </div>
      </div>

      <div :key="threads" v-for="threads in threads">
        <div class="containerThread">
          <div class="cards">
            <div class="userId">User : {{ threads.userId }}</div>
            <div class="titre">Titre : {{ threads.titre }}</div>
            <div class="content">Text : {{ threads.text }}</div>
            <div class="date">
              Posté le : {{ getFormatedDate(threads.datePost) }}
            </div>

            <form @submit.prevent="postThread">
              <div class="cardThread">
                <input
                  type="text"
                  class="postThread"
                  v-model="threadPost"
                  placeholder="Répondre ..."
                />

                <div class="mt-3">
                  <button type="submit" class="btn btn-primary">Publier</button>
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-photo-video"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from "../api";
import moment from "moment";
import axios from "axios";

export default {
  name: "HelloWorld",

  data() {
    return {
      categories: "",
      threads: "",
      threadPost: "",
      selectedFile: null,
    };
  },

  created() {
    this.page = 1;

    instance
      .get("/threads/?page=1&size=5")
      .then((reponse) => {
        this.threads = reponse.data;
        console.log(this.threads);
      })
      .catch((error) => {
        console.log(error.response.status);
      });

    document.addEventListener.call(window, "scroll", (event) => {
      const scrollValue =
        (window.innerHeight + window.scrollY) / document.body.offsetHeight;

      if (scrollValue == 1) {
        this.threads;
        this.page = this.page + 1;
        console.log(this.page);

        instance.get(`/threads/?page=${this.page}&size=5`).then((reponse) => {
          this.threads = this.threads.concat(reponse.data);
          console.log(this.threads);
        });
      }
    });

    instance.get("/category").then((reponse) => {
      this.categories = reponse.data;
    });
  },

  computed: {
    bouton: function () {
      if (this.threadPost != "") {
        return true;
      } else {
        // btnDisabled = false;
        return false;
      }
    },
  },

  // computed: {
  //    bouton: function () {
  //     if(this.threadPost != ''){
  //       return btnDisabled = true;

  //     } else {

  //       // btnDisabled = false;
  //       return btnDisabled = false;
  //     }
  //   }
  // },

  methods: {
    postThread() {
      instance
        .post("/threads/threads", {
          text: this.threadPost,
        })
        .then((response) => {
          console.log(response);
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFormatedDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    disconnect() {
      localStorage.removeItem("authToken"); //cela supprime un élément précis contrairement au CLEAR qui supprime tout le local alors qu'on pourrait avoir besoin d'autres éléments du local
      this.$router.push("/login");
    },
    // bouton(){
    //   if(this.threadPost != ''){
    //     return btnDisabled = true;

    //   } else {

    //     // btnDisabled = false;
    //     return btnDisabled = false;
    //   }
    // }
  },

  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.hello {
  background: darkgray;
}

.containerLabel {
  display: flex;
  border-radius: 5px;
  margin: 4px auto;
  width: 40%;
}

.label {
  background-color: #022c63;
  margin-right: 10px;
}

.label:hover {
  background-color: whitesmoke;
  color: #022c63;
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
  width: 40%;
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
