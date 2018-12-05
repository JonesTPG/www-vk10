
<template>
  <div id="app">
    <div class="container">
        <info></info>
        <create-todo></create-todo>
        <list-todo></list-todo>
     
    </div>
  </div>
</template>


<script>
  import CreateTodo from './CreateTodo.vue';
  import ListTodo from './ListTodo.vue';
  import Info from './Info.vue';
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {CreateTodo,  ListTodo, Info},
  }
</script>
<style>
  
</style>