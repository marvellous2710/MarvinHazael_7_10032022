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

    <form
      @submit.prevent="postThread"
      enctype="multipart/form-data"
      id="formulaire"
    >
      <div class="cardThread">
        <div class="user">{{ user }}</div>

        <input
          type="text"
          class="postThread"
          v-model="titre"
          placeholder="Publier ..." 
        />

        <div>
          <img :src="imageUrl" height="150" />
        </div>

        <div class="btnPublication">
          <label for="file" class="btn btn-primary"
            ><i class="fas fa-image"></i
          ></label>
          <input
            id="file"
            type="file"
            class="input-file"
            accept="image/*"
            ref="meuh"
            @change="onFilePicked"
          />
          <div class="mt-3"></div>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!titre.length"
          >
            <i class="fas fa-paper-plane"></i> Publier
          </button>
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

            <form @submit.prevent="">
              <div class="mt-3">
                <button class="btn btn-primary">
                  <i class="fas fa-thumbs-up" @click="likeDislikePost()"></i> {{ currentValue }}
                </button>
                <button type="submit" class="btn btn-primary" @click="findOne( thread.idthread )">
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
      titre: "",
      //email: "",
      user: localStorage.getItem("user"),    
      //email: localStorage.getItem("user"),
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
        //++this.page;
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
  },

  methods: {
     findOne(idthread){
        instance.get(`/threads/${idthread}`) 
        .then((reponse) => {
        this.threads = reponse.data;
        this.$router.push("/thread");
        
        })
        .catch((error) => {
          console.log(error);
          console.log("FAILURE!!");
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

      formData.append("email", this.user);
      formData.append("titre", this.titre);

      instance
        .post(
          "/threads/",
          formData,
          // {
          //   email: this.email,
          //   titre: this.titre,
          //   text: this.threadPost,
          //   imageUrl: this.text,
          //   image: this.image.files[0],
          //   file: this.text,
          // },

          {
            "Content-Type": "multipart/form-data",
          }
        )
        .then((response) => {
          console.log(response);
          //this.$router.go();
          console.log("SUCCESS!!");
        })
        .catch((error) => {
          console.log(error);
          console.log("FAILURE!!");
        });
    },
    getFormatedDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
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
    likeDislikePost() {
      this.currentValue =  this.currentValue + 1;
    }

    // likeDislikePost() {
    // instance
    //     .post(
    //       "/like/"
      
    //     )
    //     .then((response) => {
    //       console.log(response);
    //       //this.$router.go();
    //       console.log("SUCCESS!!");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       console.log("FAILURE!!");
    //     });
    // },
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
  background: #022c63;
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
  padding: 10px;
  border-radius: 5px;
  margin: 4px auto;
  width: 50%;
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
</style>
