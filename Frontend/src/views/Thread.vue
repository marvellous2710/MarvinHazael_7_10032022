<template>
  <div class="oneThread">
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
</template>

<script>
import { instance } from "../api";

export default {
    data() {
        return {
        
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
        // idthread: this.$route.params.idthread,
        currentValue: 0,
        
        };
    },

    created() {
     
        instance.get(`/threads/${idthread}`) 
        .then((reponse) => {
        this.threads = reponse.data;
        console.log("eeeeeeeeee");
        
        })
        .catch((error) => {
          console.log(error);
          console.log("le thread s'affiche pas");
        });
    }
};
</script>

<style scoped></style>
