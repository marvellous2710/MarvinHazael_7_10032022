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
          <img :src="thread.content" />
        </div>

        <small class="date">
          Posté le {{ getFormatedDate(thread.datePost) }}
        </small>

        <form @submit.prevent="postComment">
          <div class="mt-3">
            <button :class="[btnLiked]">
              <div class="containerCounter">
                <i class="fas fa-thumbs-up" @click="likeDislikePost(thread.idthread)"></i>
                <div
                  class="counter"
                  :key="countLike"
                  v-for="countLike in countLike"
                >
                  <div class="likeDislike">
                    {{ countLike }}
                  </div>
                </div>
              </div>
            </button>

            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modifyModal"
            >
              <i class="fas fa-edit"></i> Modifier
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              id="modifyModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modifier votre commentaire
                    </h5>

                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <input type="text" class="form-control" v-model="titre" />

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
                      class="btn btn-primary"
                      @click="updateThread(thread.idthread)"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary" v-if="user == thread.email">
              <i class="fas fa-trash-alt" @click="deletePost()"></i> Supprimer
            </button>
          </div>
          <div>
            <input
              type="text"
              class="postThread"
              v-model="titre"
              placeholder="Répondre ..."
            />
            <button class="btn btn-primary" :disabled="!titre.length">
              <i class="fas fa-paper-plane"></i> Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="containerCom">
      <div :key="comment" v-for="comment in comments">
        <div class="containerComments">
          <div class="cardsComments">
            <div class="title-container">
              <div class="title">
                <p class="userId">{{ comment.email }}</p>
                <p class="titre">{{ comment.titre }}</p>
                <p class="titre">{{ comment.idthread }}</p>
              </div>
            </div>

            <small class="date">
              Posté le {{ getFormatedDate(comment.datePost) }}
            </small>

            <form @submit.prevent="t">
              <div class="mt-3">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click="commentLike(comment.idComment)"
                >
                  <i class="fas fa-thumbs-up"></i> {{ currentValue }}
                </button>
              
                <button
                  type="submit"
                  class="btn btn-primary"
                  v-if="user == thread.email"
                  @click="updatePost()"
                >
                  <i class="fas fa-edit"></i> Modifier
                </button>

                <!-- Button trigger modal -->
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#enerveModal"
                  v-if="user == thread.email"
                >
                  <i class="fas fa-trash-alt"></i> Supprimer
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
                        <h5 class="modal-title" id="enerveModalLabel">
                          Suppression
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        Voulez-vous vraiment supprimer ce commentaire ?
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
                          @click="deletePost(thread.idthread)"
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
      countLike: "",
      titre: "",
      user: localStorage.getItem("user"),
      userId: localStorage.getItem("userId"),
      imageUrl: "",
      image: null,
      selectedFile: null,
      file: "",
      idThread: this.$route.params.idthread,
      currentValue: 0,

      comments: "",
      idComment: "",

      btnLiked: "btn btn-primary",
    };
  },

  methods: {
    postComment() {
      const formData = new FormData();

      if (this.image) {
        formData.append("image", this.image.files[0]);
      }

      formData.append("userId", this.userId);
      formData.append("email", this.user);
      formData.append("titre", this.titre);
      formData.append("idThread", this.idThread);

      instance
        .post(`/threads/comment/${this.$route.params.idthread}`, formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((response) => {
          console.log(response);
          this.$router.go();
          console.log("SUCCESS!!");
        })
        .catch((error) => {
          console.log(error);
          console.log("FAILURE!!");
        });
    },

    likeDislikePost() {
      instance
        .post(`/threads/${this.$route.params.idThread}/like`, {
          idUser: this.userId,
          idThread: this.idThread,
        })
        .then((response) => {
          console.log(response);
          //this.$router.go();
          this.btnLiked = "btn btn-success";
          console.log("like SUCCESS!!");
        })
        .catch((error) => {
          console.log(error);
          console.log("pas liké !!");
        });
    },
    commentLike(idComment) {
      instance
        .post(`/threads/${idComment}/commentLike`, {
          idUser: this.userId,
          idComment: `${idComment}`,
        })
        .then((response) => {
          console.log(response);
          //this.$router.go();
          // this.btnLiked = "btn btn-success";
          console.log("comment like SUCCESS!!");
        })
        .catch((error) => {
          console.log(error);
          console.log("comment pas liké !!");
        });
    },

    // alreadyLiked() {
    //   `/threads/${this.$route.params.idThread}/liked`,
    //   {
    //     idUser : this.userId,
    //     idThread : this.idThread,
    //   }
    //   .then((response) => {
    //     console.log(response);
    //     //this.$router.go();
    //     this.btnLiked = "btn-success";
    //     console.log("already liked !!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log("t'es dans lerreur");
    //   });
    // },

    getFormatedDate(date) {
      return moment(String(date)).format("DD-MM-YYYY hh:mm");
    },

    updateThread() {
      instance
        .put(`/threads/${this.$route.params.idthread}`, { titre: this.titre })
        .then((reponse) => {
          this.users = reponse.data;
          this.$router.go();
          console.log(reponse);
          console.log("THREAD MODIFIE");
        })
        .catch((error) => {
          console.log(error);
          console.log("thread pas modifié");
        });
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

    instance
      .get(`/threads/comments/${this.$route.params.idthread}`)
      .then((reponse) => {
        this.comments = reponse.data;

        console.log(this.comments);
      })
      .catch((error) => {
        console.log(error);
      });

    instance
      .get(`/threads/countLike/${this.$route.params.idthread}`)
      .then((reponse) => {
        this.countLike = reponse.data[0];
      })
      .catch((error) => {
        console.log(error);
      });

    // pour afficher que le like est bien liké par le user connecté
    // instance
    //   .get(`/threads/liked/${this.$route.params.idthread}`)
    //   .then((response) => {
    //     console.log(response);
    //     //this.$router.go();
    //     this.btnLiked = "btn-success";
    //     console.log("already liked !!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log("t'es dans l'erreur");
    //   });
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
