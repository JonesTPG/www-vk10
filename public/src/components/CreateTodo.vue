
<template>
  <div>
    <h2>Lisää muistilistaan</h2>
    <form @submit.prevent>
      <div>
        <input type="text"
               placeholder="Mitä haluat tehdä?" v-model="todo">
        <button type="submit" v-on:click="addTodo($event)">Lisää</button>

        
        
      </div>
    </form>


  </div>
</template>

<script>
  import axios from 'axios';  
  import bus from "./../bus.js";

  export default {
    data() {
      return {
        todo: '',
        username: ''

      }
    },
    methods: {
      addTodo(event) {
        
        if (event) event.preventDefault();


        let url = 'http://localhost:4000/api/add';
        
        axios.get('http://localhost:4000/username').then((response)=> {
       
          this.username = response.data

          let param = {
          name: this.todo,
          done: 0,
          author: this.username
          };

          axios.post(url, param).then((response) => {
            console.log(response);
            this.clearTodo();
            this.refreshTodo();
          
        }).catch((error) => {
          console.log(error);
        })

        }) 

        
      },
      clearTodo() {
        this.todo = '';
      },
      refreshTodo() {
        bus.$emit("refreshTodo")
      }
    }
  }
</script>

<style>
      
</style>
