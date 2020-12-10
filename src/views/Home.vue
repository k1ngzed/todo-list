<template>
  <div class="container">
    <todoList />
  </div>
</template>

<script>
import TodoList from "@/components/Todo/TodoList.vue"
export default {
  name: "Home",
  components: {
    TodoList
  }
}
</script>
