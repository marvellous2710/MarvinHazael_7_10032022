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
        <div class="titre">{{ email }}</div>

        <input type="text" class="postThread" v-model="email" />

        <input
          type="text"
          class="postThread"
          v-model="titre"
          placeholder="Poster un titre ..."
        />

        <div>
          <img :src="imageUrl" height="150" />
        </div>

        <input
          type="text"
          class="postThread"
          v-model="threadPost"
          placeholder="Poster un commentaire ..."
        />

        <!-- <button raised class="primary" @click="onPickFile">Upload Image</button> -->
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked"
        />
        <div class="mt-3">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!titre.length"
          >
            Publier
          </button>
          <!-- <div class="buttonUpload">
            <input name="transfertFile" type="file" accept="image/*" @change="onFileSelected" />
          </div> -->
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
            <div class="userId">User : {{ threads.email }}</div>
            <div class="titre">Titre : {{ threads.titre }}</div>

            <div class="content">Image : {{ threads.imageUrl }}</div>

            <div class="content">Text : {{ threads.text }}</div>
            <div class="date">
              Posté le : {{ getFormatedDate(threads.datePost) }}
            </div>

            <form @submit.prevent="findOne">
              <div class="mt-3">
                <button type="submit" class="btn btn-primary">Répondre</button>
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
      email: localStorage.getItem("user"),
      //selectedFile: null,
      imageUrl: "",
      image: null,
      selectedFile: null,
      file: "",
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
  },

  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("please add a valid file !");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },

    postThread() {


      instance
        .post("/threads/", {
          email: this.email,
          titre: this.titre,
          text: this.threadPost,
          imageUrl: this.text,
          image: this.image,
          file: this.text,

          headers: {
            "Content-Type": "multipart/form-data",
          },
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

    //CHANGE-----------------------------------------//
    findOne(req) {
      const idthread = req.params.idthread;

      instance
        .get(`/:threadId/${idthread}`, {
          // .get("/threads/:threadId", {
          email: this.email,
          titre: this.titre,
          text: this.threadPost,
        })
        .then((response) => {
          console.log(response);
          //this.$router.go();
          //this.$router.push("/thread");
        })
        .catch((error) => {
          console.log(error);
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
