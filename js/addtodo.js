Vue.component('addtodo', {
	template: `<header class="header">
					<h1>todos</h1>
					<input
						class="new-todo"
						placeholder="What needs to be done?"
						autofocus
						@keyup.enter="addTodo"
						v-model="newTodo"
					/>
				</header>`,
	data() {
		return {
			newTodo: ''
		}
	},
	methods: {
		addTodo() {
			this.$emit('addtodo', this.newTodo)
			this.newTodo = ''
		}
	}
})
