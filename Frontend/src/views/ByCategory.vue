<template>
  <div class="oneThread">
    <header class="container-fluid header">
      <div class="container">
        <a href="/" class="logo">Groupomania</a>
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
       
          </div>
        </div>

        <div class="picture">
          <img :src="thread.content" />
        </div>

        <small class="date">
          Posté le {{ getFormatedDate(thread.datePost) }}
        </small>

        <form @submit.prevent="postComment">
          <div class="mt-3">
            <button
              type="submit"
              :class="
                thread.isLikedByConnectedUser
                   ? 'btn btn-success'
                  : 'btn btn-primary'
              "
              @click="likeDislikePost(thread.idthread)"
            >
              <div class="containerCounter">
                <i class="fas fa-thumbs-up"></i>

                <div class="likeDislike">
                  {{ thread.nbLike }}
                </div>
              </div>
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
      user: localStorage.getItem("user"),
      userId: localStorage.getItem("userId"),
      imageUrl: "",
      image: null,
      
      file: "",
      idThread: this.$route.params.idthread,
      
      
    };
  },

  methods: {
  
    likeDislikePost(idthread) {
      instance
        .post(`/threads/${idthread}/like`, {
          idUser: this.userId,
          idThread: `${idthread}`,
        })
        .then((response) => {
          console.log(response);
          console.log("like SUCCESSFULL home");
        })
        .catch((error) => {
          console.log(error);
          console.log("pas liké home");
        });
    },
    disconnect() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); //cela supprime un élément précis contrairement au CLEAR qui supprime tout le local alors qu'on pourrait avoir besoin d'autres éléments du local
      this.$router.push("/login");
    },

  

    getFormatedDate(date) {
      return moment(String(date)).format("DD-MM-YYYY hh:mm");
    },

 
  },

  created() {
    instance
    //   .get(`/threads/${this.$route.params.idthread}`)
    .get(`/threads/${this.$route.params.idcategories}`)
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
  text-decoration: none;
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
  border-radius: 3px;
  font-weight: bold;
}

.menu a {
  color: whitesmoke;
  margin-right: 20px;
  cursor: pointer;
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
  border: none;
}

/* ---------------------- CARDS ------------------------------*/

.cards {
  background-color: whitesmoke;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.171);
  padding: 10px;
  border-radius: 5px;
  width: 50%;
  margin: 10px auto;
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

.containerCounter {
  display: flex;
}
.containerCounter i {
  margin-top: 2px;
}

.likeDislike {
  margin-left: 5px;
}

/*----------------------------------- COMMENTS -----------------------------------*/

.cardsComments {
  background-color: whitesmoke;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.171);
  padding: 10px;
  border-radius: 5px;
  width: 50%;
  margin: 10px auto;
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
