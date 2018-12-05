
<template>
  <div>

      <p> Tervetuloa: {{ user }} </p>

  </div>
</template>


<script>
  import axios from 'axios'; 

  export default {
    data() {
      return {
          user: ''

      }
    },

    created: function() {  
            this.getUserName();
        },

    methods: {
        getUserName() {
            axios.get('http://localhost:4000/username').then((response)=> {
                    this.user = response.data;
        }

     )}

    }
   
  }
</script>
<style>
  
</style>