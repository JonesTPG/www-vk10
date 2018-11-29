
<template>
  <div id="app">
    <div class="container">
      
        <create-todo></create-todo>
        <list-todo></list-todo>
     
    </div>
  </div>
</template>


<script>
  import CreateTodo from './CreateTodo.vue';
  import ListTodo from './ListTodo.vue';
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {CreateTodo,  ListTodo},
  }
</script>
<style>
  
</style>