let state = {
  todo: []
}

if (localStorage.getItem("todo") !== null) {
  state.todo = JSON.parse(localStorage.getItem("todo"))
}

export default state
