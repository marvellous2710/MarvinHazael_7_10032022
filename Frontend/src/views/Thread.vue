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

            <p class="titre" v-if="thread.typeMessage ==  1">
              {{ thread.content }}
            </p>
          </div>
        </div>
        <div class="picture" v-if="thread.typeMessage == 2">
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

            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-primary"
              v-if="user == thread.email"
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

                  <div class="btnFile">
                    <input type="text" class="form-control" v-model="titre" />
                    <label for="file" class="btn btn-primary"
                      ><i class="fas fa-image"></i
                    ></label>

                    <input
                      id="file"
                      type="file"
                      class="input-file"
                      accept="image/*"
                      ref="filePik"
                      @change="onFilePicked"
                    />

                    <div class="containerTypeMess">
                      <select
                        class="selectTypeMess"
                        @change="chooseTypeMess"
                        v-model="typeMessage"
                      >
                        <option
                          :value="tMess.idtypeMessage"
                          v-for="(tMess, i) in typeMessage"
                          :key="i"
                        >
                          {{ tMess.label }}
                        </option>
                      </select>
                    </div>
                  
                    <input v-if="typeMessage == 1"
                      type="text"
                      class="postThread"
                      v-model="content"
                      placeholder="Publier un commentaire ..."
                    />
                    <div class="modal-body" v-if="typeMessage == 2">
                      <img :src="imageUrl" height="150" v-if="imageUrl" />
                    </div>
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
                      class="btn btn-primary"
                      @click="updateThread(thread.idthread)"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary" v-if="user == thread.email || roleUser == 1">
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
                <p class="titre">{{ comment.idComment }}</p>
              </div>
            </div>

            <small class="date">
              Posté le {{ getFormatedDate(comment.datePost) }}
            </small>

            <form @submit.prevent="t">
              <div class="mt-3">
                <button
                  type="submit"
                  :class="
                    comment.isLikedByConnectedUser
                      ? 'btn btn-success'
                      : 'btn btn-primary'
                  "
                  @click="commentLike(comment.idComment)"
                >
                  <i class="fas fa-thumbs-up"></i>
                  {{ comment.nbLikeComment }}
                </button>

                <!-- Button trigger modal -->
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#enerveModal"
                  v-if="user == comment.email"
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
                        <h5 class="modal-title" id="commentModalLabel">
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
                          @click="deleteComment(comment.idComment)"
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
      content: "",
      roleUser: localStorage.getItem("roleUser"),
      user: localStorage.getItem("user"),
      userId: localStorage.getItem("userId"),
      imageUrl: "",
      image: null,
      selectedFile: null,
      file: "",
      idThread: this.$route.params.idthread,
      typeMessage: "",
      idComment: "",
      comments: "",
      idComment: "",
    };
  },

  methods: {
    deleteComment(idcomment) {
      instance
        .delete(`/threads/comments/${idcomment}`)
        .then((reponse) => {
          this.comment = reponse.data;
          this.$router.go();
         
          console.log("comment supprimé !");
        })
        .catch((error) => {
          console.log(error);
          console.log("FAILURE comment !!!");
        });
    },

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
    likeDislikePost(idthread) {
      instance
        .post(`/threads/${idthread}/like`, {
          idUser: this.userId,
          idThread: `${idthread}`,
        })
        .then((response) => {
          console.log(response);
          this.$router.go();
          console.log("like SUCCESSFULL home");
        })
        .catch((error) => {
          console.log(error);
          console.log("pas liké home");
        });
    },
    onFilePicked(event) {
      this.image = this.$refs.filePik; //[0];
      console.log(this.image.files);
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("please add a valid file !");
      }
      const fileReader = new FileReader(); //sans newFilereader l'image ne s'affiche pas
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      console.log("jai limage");
    },
    disconnect() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); //cela supprime un élément précis contrairement au CLEAR qui supprime tout le local alors qu'on pourrait avoir besoin d'autres éléments du local
      this.$router.push("/login");
    },

    commentLike(idComment) {
      instance
        .post(`/threads/${idComment}/commentLike`, {
          idUser: this.userId,
          idComment: `${idComment}`,
        })
        .then((response) => {
          console.log(response);
          this.$router.go();
          console.log("comment like SUCCESS!!");
        })
        .catch((error) => {
          console.log(error);
          console.log("comment pas liké !!");
        });
    },

     chooseTypeMess() {
      const labelTypeMess = document.getElementsByClassName("selectTypeMess");

      if (labelTypeMess.value == 0) {
        console.log("nonon");
      } else {
        console.log("bravo type message ");
      }
    },

    getFormatedDate(date) {
      return moment(String(date)).format("DD-MM-YYYY hh:mm");
    },



    // ----------------CA MARCHE ----------------------------//
    // updateThread() {
    //   instance
    //     .put(`/threads/${this.$route.params.idthread}`, {
    //       titre: this.titre,
    //       content: this.content,
    //       typeMessage: this.typeMessage,
    //     })
    //     .then((reponse) => {
    //       this.users = reponse.data;
    //       this.$router.go();
    //       console.log(reponse);
    //       console.log("THREAD MODIFIE");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       console.log("thread pas modifié");
    //     });
        
    // },
    // ----------------CA MARCHE  FIN pour changer le titre et le text----------------------------//

    updateThread() {
      const formData = new FormData();
      if (this.image) {
        formData.append("image", this.image.files[0]);
      }

      formData.append("titre", this.titre);
      formData.append("content", this.content);
      formData.append("typeMessage", this.typeMessage);

      instance
        .put(`/threads/${this.$route.params.idthread}`, formData, {
          "Content-Type": "multipart/form-data",
        })
       
        .then((reponse) => {
          //this.users = reponse.data;
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

    instance.get("/category/typeMessage").then((reponse) => {
      this.typeMessage = reponse.data;
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
