Vue.component('filters', {
	template: `<!-- This footer should hidden by default and shown when there are todos -->
				<footer class="footer" v-show="todolist.length">
					<!-- This should be 0 items left by default -->
					<span class="todo-count"><strong>{{leftCount}}</strong> item left</span>
					<!-- Remove this if you don't implement routing -->
					<ul class="filters">
						<li>
							<a href="#/" @click='getScreen("all")'>All</a>
						</li>
						<li>
							<a href="#/active" @click='getScreen("active")'>Active</a>
						</li>
						<li>
							<a href="#/completed" @click='getScreen("completed")'>Completed</a>
						</li>
					</ul>
					<!-- Hidden if no completed items are left ↓ -->
					<button @click="clearAllTodo" class="clear-completed" v-show="rightClear">Clear completed</button>
				</footer>`,
	props: ['todolist'],
	computed: {
		// 左侧已完成数量
		leftCount() {
			return this.todolist.filter(item => item.isCompleted).length
		},
		// 右侧显示隐藏
		rightClear() {
			return this.todolist.some(item => item.isCompleted)
		}
	},
	methods: {
		getScreen(filter) {
			bus.$emit('setscreen', filter)
		},
		// 清除已完成
		clearAllTodo() {
			let todoCompleteds = this.todolist.filter(item => item.isCompleted)
			// console.log(todoCompleteds)
			this.$emit('clearcmp', todoCompleteds)
		}
	}
})
