<template>
  <div class="hello">
    <header class="container-fluid header">
      <div class="container">
        <a href="/" class="logo">Groupomania</a>
        <nav class="menu">
          <a href="/" title="Accueil"><i class="fas fa-globe"></i></a>
          <a href="/profile" title="Profil"><i class="fas fa-user-alt"></i></a>
          <a @click.prevent="disconnect" title="Se déconnecter"
            ><i class="fas fa-sign-out-alt" style="color: white"></i
          ></a>
        </nav>
      </div>
    </header>

    <form
      @submit.prevent="postThread"
      enctype="multipart/form-data"
      id="formulaire"
    >
      <div class="cardThread">
        <p
          class="publication"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i class="fas fa-globe"></i> Publier un commentaire ...
        </p>

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
                <h5 class="modal-title" id="exampleModalLabel">
                  Créer une publication
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="sendImage">
                <input
                  type="text"
                  class="postThread"
                  v-model="titre"
                  placeholder="Publier le titre ..."
                />

                <label
                  for="file"
                  class="btn btn-primary"
                  v-if="typeMessageValue == 2"
                  ><i class="fas fa-image"></i
                ></label>

                <div class="modal-title btnPublication">
                  <input
                    id="file"
                    type="file"
                    class="input-file"
                    accept="image/*"
                    ref="meuh"
                    @change="onFilePicked"
                  />

                  <div class="containerTypeMess">
                    <select
                      class="form-select selectTypeMess"
                      @change="chooseTypeMess"
                      v-model="typeMessageValue"
                    >
                      <option :value="null" disabled>Type message</option>
                      <option
                        :value="tMess.idtypeMessage"
                        v-for="(tMess, i) in typeMessage"
                        :key="i"
                      >
                        {{ tMess.label }}
                      </option>
                    </select>
                  </div>

                
                </div>
              </div>
              <p class="error-message">
                {{ errorMessage }}
              </p>
              <div class="modal-body">
                <img :src="imageUrl" height="150" v-if="imageUrl" />

                <div class="form-group">
                  <textarea
                    class="form-control"
                    id="textArea"
                    rows="3"
                    type="text"
                    v-model="content"
                    placeholder="Publier un commentaire ..."
                    v-if="typeMessageValue == 1"
                  ></textarea>
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
                <button type="submit" class="btn btn-primary" :disabled="!this.titre">
                  <i class="fas fa-paper-plane"></i> Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="containerLabelThread">
      <div class="containerLabel">
        <div class="category" :key="category" v-for="category in categories">
          <a @click="getCategory(category.idcategories)"
            ><div class="label">
              {{ category.label }}
            </div></a
          >
        </div>
      </div>

      <div class="container">
        <div :key="thread" v-for="thread in threads">
          <div class="containerThread">
            <div class="cards">
              <div class="title-container">
                <div class="title">
                  <p class="userId">{{ thread.email }}</p>
                  <p class="titre">{{ thread.titre }}</p>

                  <p class="titre" v-if="thread.typeMessage == 1">
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

              <form @submit.prevent="thread">
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
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="findOne(thread.idthread)"
                  >
                    <i class="fas fa-comment-alt"></i> Répondre
                  </button>

                  

                  <!-- Button trigger modal -->
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#enerveModal"
                    v-if="user == thread.email || roleUser == 1"
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
  </div>
</template>

<script>
import { instance } from "../api";
import moment from "moment";
import dayjs from "dayjs";

export default {
  name: "HelloWorld",

  data() {
    return {
      categories: "",
      threads: "",
      threadPost: "",
      titre: "",
      content: "",
      user: localStorage.getItem("user"),
      userId: localStorage.getItem("userId"),
      roleUser: localStorage.getItem("roleUser"),
      imageUrl: "",
      image: null,
      selectedFile: null,
      file: "",
      idthread: "",
      idCategory: 1,
      typeMessage: "",
      typeMessageValue: null,
      errorMessage: "",
    };
  },

  created() {
    this.page = 1;

    const data = localStorage.getItem("authToken");

    if (data) {
      instance
        .get(`/threads/${this.$route.params.categoryId}?page=1&size=5`)
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
          ++this.page;
          console.log(this.page);

          instance
            .get(
              `/threads/${this.$route.params.categoryId}?page=${this.page}&size=5`
            )
            .then((reponse) => {
              this.threads = this.threads.concat(reponse.data);
              console.log(this.threads);
            });
        }
      });

      // instance.get("/category").then((reponse) => {
      //   this.categories = reponse.data;
      // });
      instance.get("/category/typeMessage").then((reponse) => {
        this.typeMessage = reponse.data;
      });
    } else {
      alert("Veuillez vous inscrire pour accèder à Groupomania");
      this.$router.push("/signup");
    }
  },

  methods: {
    findOne(idthread) {
      instance
        .get(`/threads/${idthread}`)     
        .then((reponse) => {
          this.thread = reponse.data;
          this.$router.push(`/thread/${idthread}`);
          //this.$router.push({ name: "Thread", params: { threadId: idthread } });
          
         
        })
        .catch((error) => {
          console.log(error);
          console.log("FAILURE findOne !!");
        });

       //this.$router.push({ name: "Thread", params: { threadId: idthread } });
      
    },
    getCategory(idcategories) {
      this.$router.push({ name: "Home", params: { categoryId: idcategories } });
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

    deletePost(idthread) {
      instance
        .delete(`/threads/${idthread}`)
        .then((reponse) => {
          this.threads = reponse.data;
          this.$router.go();
          console.log("Thread supprimé !");
        })
        .catch((error) => {
          console.log(error);
          console.log("FAILURE !!!");
        });
    },

    onFilePicked(event) {
      this.image = this.$refs.meuh; //[0];
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
      console.log(this.image);
    },

    postThread() {
     
      if (this.titre == "" ) {
      

        this.errorMessage = "Veuillez remplir tous les champs";
        return false;
      } else {
        const formData = new FormData();
        if (this.image) {
          formData.append("image", this.image.files[0]);
        }

        formData.append("userId", this.userId);
        formData.append("email", this.user);
        formData.append("titre", this.titre);
        formData.append("content", this.content);
        formData.append("typeMessage", this.typeMessageValue);
        formData.append("idCategory", this.idCategory);

        instance
          .post("/threads/", formData, {
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
      }
    },
    getFormatedDate(date) {
      return dayjs(String(date)).format("DD-MM-YYYY hh:mm");
    },

    disconnect() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); //cela supprime un élément précis contrairement au CLEAR qui supprime tout le local alors qu'on pourrait avoir besoin d'autres éléments du local
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #022c63;
  height: 70px;
  line-height: 70px;
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
  margin-left: 7%;
}

.containerLabel {
  border-radius: 5px;
  margin: 4px auto;
  margin-right: 5px;
  width: 10%;
  text-align: start;
  font-size: 2rem;
}

p.error-message {
  color: red;
  margin: 0;
  padding: 0;
}

.publication {
  border: black solid 1px;
  border-radius: 10px;
  padding: 10px;
  width: 40%;
  margin: auto;
  margin-bottom: 10px;
  background: whitesmoke;
  cursor: pointer;
}

.publication:hover {
  background: white;
}

.publication {
  color: black;
}

.label {
  /* background-color: whitesmoke; */
  margin-right: 10px;
  color: whitesmoke;
  border-radius: 5px;
  cursor: pointer;
}

.label:hover {
  background-color: whitesmoke;
  color: #022c63;
}

/* -----------------------------------MODAL ------------------------ */
.input-file {
  display: none;
}

.btnPublication {
  display: flex;
}

.lapizzadelamamma a {
  text-decoration: none;
}

.selectLabel {
  height: 40px;
  cursor: pointer;
  border-radius: 5px;
}

.sendImage {
  display: flex;
  height: 38px;
  justify-content: space-around;
}

/* ----------------------------------- FIN MODAL ------------------------ */
.cardThread {
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.171);
  padding: 5px;
  border-radius: 5px;
  margin: 10px auto;
  width: 50%;
  display: flex;
}

.cardThread input {
  border: none;
}

.postThread {
  padding: 5px;
  border-radius: 0;
  margin: 4px auto;
  width: 40%;
}

input.postThread {
  margin: 0;
}

/* ---------------------- CARDS ------------------------------*/

.cards {
  background-color: whitesmoke;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.171);
  padding: 10px;
  border-radius: 5px;
  width: 62%;
  margin-bottom: 20px;
  margin-left: 9%;
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

.cardThread p {
  width: 100%;
}

/*----------------------------------- RESPONSIVE -----------------------------------*/

@media all and (max-width: 800px) {
  .containerLabel {
    display: none;
  }

  .containerLabelThread {
    display: inline;
  }

  .publication {
    margin: 0px 20px 0px 20px;
    width: auto;
  }

  .cards {
    margin: 0;
    margin-bottom: 10px;
    width: auto;
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
