<template>
  <div>
    <div class="todo">
      <div class="todo-header">
        <span>TODO list</span>
        <el-button
          @click="modal = true"
          type="primary"
          icon="el-icon-plus"
          size="mini"
        ></el-button>
      </div>
      <div class="todo-list">
        <div class="todo-list__item" v-for="(item, index) in todo" :key="index">
          <span class="item-number">{{ index + 1 }}.</span>
          <div class="item-header">
            <span class="item-header__title">{{ item.title }}</span>
            <div class="item-header__actions">
              <el-button
                @click="editTodo(item.id)"
                type="default"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
              <el-button
                @click="deleteTodo(index)"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </div>
          </div>
          <div class="item-footer">
            <span>Who: {{ item.user_name }}</span>
            <span>Deadline: {{ $moment(item.date).format("MM/DD/YYYY") }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="modal" title="Add todo" :visible.sync="modal">
      <el-form label-width="100px">
        <el-form-item label="Name" required>
          <el-input v-model="todoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Zone" required>
          <el-select v-model="todoForm.user_name" placeholder="Choose user">
            <el-option
              v-for="(item, index) in users"
              :key="index"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Dedline" required>
          <el-col>
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="todoForm.date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modal = false">Cancel</el-button>
        <el-button type="primary" @click="todoHandler">{{
          editModal ? "Edit" : "Confirm"
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "Todo",
  data() {
    return {
      modal: false,
      editModal: false,
      todoForm: {
        id: null,
        title: null,
        user_name: null,
        date: null
      },
      users: ["John", "Peter", "Clars"]
    }
  },
  computed: {
    ...mapState(["todo"])
  },
  methods: {
    todoHandler() {
      let value = this.todoForm
      if (!this.editModal) {
        this.todo.push({
          id: new Date().valueOf(),
          title: value.title,
          user_name: value.user_name,
          date: value.date
        })
      } else {
        const todoIdx = this.todo.findIndex(i => i.id === value.id)
        this.todo[todoIdx] = value
      }

      this.todoForm = {
        id: null,
        title: null,
        user_name: null,
        date: null
      }

      this.$store.dispatch("setTodo", this.todo)

      this.modal = false
      this.editModal = false
    },
    editTodo(id) {
      const fetchTodo = this.todo.find(i => i.id === id)
      this.todoForm = {
        id: fetchTodo.id,
        title: fetchTodo.title,
        user_name: fetchTodo.user_name,
        date: fetchTodo.date
      }

      this.editModal = true
      this.modal = true
    },
    deleteTodo(index) {
      this.$confirm("Are you sure to delete this item?")
        .then(() => {
          this.todo.splice(index, 1)
          this.$store.dispatch("setTodo", this.todo)
        })
        .catch(() => {})
    }
  },
  created() {
    setInterval(() => this.$store.dispatch("updateTodo"), 2000)
  }
}
</script>

<style lang="sass">
.todo
    padding-top: 5em
.modal
  .el-dialog
    width: 30%
    @media (max-width: 1000px)
      width: 100%
</style>
