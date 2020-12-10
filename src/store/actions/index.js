const actions = {
  // eslint-disable-next-line no-unused-vars
  setTodo({ commit }, value) {
    localStorage.setItem("todo", JSON.stringify(value))
  },
  updateTodo({ commit }) {
    commit("SET_TODO", JSON.parse(localStorage.getItem("todo")) || [])
  }
}

export default actions
