
<template>
    <div>
        <div class="col-md-12" v-show="todos.length>0">
            <h3>Muistilista</h3>
             <div class="row mrb-10" v-for="todo in todos" v-bind:key="todo.name">
                <div style="float:left; clear:none;">
                    
                    <input type="text" v-model="todo.name">
                    <span style="float: right;" class="waves-effect waves-light btn" title="Delete todo?" v-on:click="deleteTodo(todo._id)">Poista</span>

                </div>
                
            </div>
        </div>
        <div v-show="todos.length==0">
            <p>
              <strong>Kaikki asiat on tehty!</strong>
            <br/>
            Sinulla ei ole yhtään asiaa tehtävänä.</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import bus from './../bus.js'

    export default {
        data() {
            return {
                todos: []
            }
        },
        created: function() { // hae data tietokannasta ja 
            this.fetchTodo();
            this.listenToEvents();
        },
        methods: {
            fetchTodo() {
                let uri = 'http://localhost:4000/api/all';
                axios.get(uri).then((response) => {
                    this.todos = response.data;
                });
            },
            updateTodo(todo) {
                let id = todo._id;
                let uri = 'http://localhost:4000/api/update/' + id;
                todo.editing = false;
                axios.post(uri, todo).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })
            },
            deleteTodo(id) { //poista todo-item
                let uri = 'http://localhost:4000/api/delete/' + id;
                axios.get(uri);
                this.fetchTodo();
            },
            listenToEvents() {
                bus.$on('refreshTodo', ($event) => {
                    this.fetchTodo(); //päivitä koko lista
                })
            }
        }
    }
</script>
<style scoped>
    
    .todo__done {
        text-decoration: line-through !important
    }
    .no_border_left_right {
        border-left: 0px;
        border-right: 0px;
    }
    .flat_form {
        border-radius: 0px;
    }
    .mrb-10 {
        margin-bottom: 10px;
    }
    .addon-left {
        background-color: none !important;
        border-left: 0px !important;
        cursor: pointer !important;
    }
    .addon-right {
        background-color: none !important;
        border-right: 0px !important;
    }
</style>
