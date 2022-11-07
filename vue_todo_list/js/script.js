Vue.component('like-btn', {
    props: ["counter"],
    template: `<div><button type="button" @click="increment">Лайк: {{ counter }}</button></div>`,
    methods: {
      increment(){
        this.$emit('update:counter', this.counter + 1)
      }
    }
  })
  
  Vue.component('task-list', {
    props: ['tasks'],
    template:`
      <div class="list">
      <div class="item" :class="{done: task.done}" v-for="task in tasks" :key="task.text">
        <input type="checkbox" v-model="task.done">
        {{ task.text }}
        <like-btn :counter.sync='task.likes'></like-btn>
      </div>
    </div>
    `
  })
  
  var app = new Vue ({
    el: `#app`,
    data: {
      headerLikes: 0,
      formLikes: 0,
      message: ``,
      tasks: [
        {text: `Развернуть окружение в Codepen`, done: true, likes: 0},
        {text: `Пройти курс по Vue`, done: false, likes: 0},
        {text: `Сделать интернет-магазин на Vue`, done: false, likes: 0}
            ],
    }, 
    methods: {
    addTask(){
      this.tasks.push({text: this.message, done: false, likes: 0});
      this.message = '' 
      },
     submit(){
      this.tasks.push({text: this.message, done: false});
      this.message = '' 
     },
  },
    computed: {
      count(){
        return this.tasks.filter(task => !task.done).length;
     },
       completedTasks(){
      return this.tasks.filter(task => task.done)
     },
     uncompletedTasks(){
      return this.tasks.filter(task => !task.done)
     },
      countCompletedTasks(){
      return this.tasks.filter(task => task.done).length
     },
     countUncompletedTasks(){
      return this.tasks.filter(task => !task.done).length
     },
     countLikes(){
       return this.headerLikes + this.formLikes + this.tasks.reduce((value, task) => value + task.likes, 0)
     }
    }
  })