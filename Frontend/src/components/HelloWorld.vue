<template>
  <div class="hello" >
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

    <form
      @submit.prevent="postThread"
      enctype="multipart/form-data"
      id="formulaire"
    >
      <div class="cardThread">
        <div class="user">{{ user }}</div>

        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Publier un commentaire ...
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
                  placeholder="Publier ..."
                />
                <label for="file" class="btn btn-primary"
                  ><i class="fas fa-image"></i
                ></label>

                <div class="btnPublication">
                  <input
                    id="file"
                    type="file"
                    class="input-file"
                    accept="image/*"
                    ref="meuh"
                    @change="onFilePicked"
                  />
                  <div class="dropdown">
                    <button
                      class="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Catégories
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <div class="containerLabelModal">
                        <div
                          class="lapizzadelamamma"
                          :key="categories"
                          v-for="categories in categories"
                        >
                          <a class="dropdown-item" href="#scrollspyHeading5">{{
                            categories.label
                          }}</a>

                          <hr class="dropdown-divider" />
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="modal-body">
                <img :src="imageUrl" height="150" />
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
                  type="submit"
                  class="btn btn-primary"
                  :disabled="!titre.length"
                >
                  <i class="fas fa-paper-plane"></i> Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <p
      class="publication"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <i class="fas fa-globe"></i> Publier un commentaire ...
    </p>

    <div class="containerLabelThread">
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

      <div class="container">
        <div :key="thread" v-for="thread in threads">
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

              <form @submit.prevent="t">
                <div class="mt-3">
                  <button 
                   type="submit"
                   class="btn btn-primary" 
                   @click="likeDislikePost()">
                    <i class="fas fa-thumbs-up"></i> {{ currentValue }}
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
  </div>
</template>

<script>
import { instance } from "../api";
import moment from "moment";


export default {
  name: "HelloWorld",

  data() {
    return {
      categories: "",
      threads: "",
      threadPost: "",
      titre: "",
      user: localStorage.getItem("user"),
      //email: localStorage.getItem("user"),
      userId: localStorage.getItem("userId"),
      imageUrl: "",
      image: null,
      selectedFile: null,
      file: "",
      //idthread: this.$route.params.idthread,
      currentValue: 0,
    };
  },

  created() {
    this.page = 1;

    const data = localStorage.getItem("authToken");

    if (data) {
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
        //this.page = this.page + 1;
        ++this.page;
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

    // instance.get("/like").then((reponse) => {
    //   this.like = reponse.data;
    // });
    } else {
      alert('Veuillez vous inscrire pour accèder à Groupomania');
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
        })
        .catch((error) => {
          console.log(error);
          console.log("FAILURE!!");
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

    disconnect() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); //cela supprime un élément précis contrairement au CLEAR qui supprime tout le local alors qu'on pourrait avoir besoin d'autres éléments du local
      this.$router.push("/login");
    },

    postThread() {
      const formData = new FormData();
      if (this.image) {
        formData.append("image", this.image.files[0]);
      }

      
      formData.append("userId", this.userId);
      formData.append("email", this.user);
      formData.append("titre", this.titre);

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
    },
    getFormatedDate(date) {
      return moment(String(date)).format("DD-MM-YYYY hh:mm");
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });

      console.log(this.selectedFile);
    },

    disconnect() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); //cela supprime un élément précis contrairement au CLEAR qui supprime tout le local alors qu'on pourrait avoir besoin d'autres éléments du local
      this.$router.push("/login");
    },
    // likeDislikePost() {
    //   this.currentValue = this.currentValue + 1;
    // },

    likeDislikePost() {

    instance
        .post(
          "/threads/like", {
            idUser   : this.userId,
            idThread : this.idThread,        
        })
        .then((response) => {
          console.log(response);
          //this.$router.go();
          console.log("liké SUCCESS!!");
        })
        .catch((error) => {
          console.log(error);
          console.log("pas liké !!");
        });
    },
  },

  props: {
    msg: String,
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

.sendImage {
  display: flex;
  height: 38px;
  justify-content: space-around;
}

/* ----------------------------------- FIN MODAL ------------------------ */
.cardThread {
  background-color: whitesmoke;
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
  /* margin: 4px auto; */
  /* margin: 50px 0px 0px 245px; */
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

/*----------------------------------- RESPONSIVE -----------------------------------*/

@media all and (max-width: 800px) {

.containerLabel {
  display: none;
}

.containerLabelThread {
  display: inline;
}

.publication{
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
