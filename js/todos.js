Vue.component('todos', {
	template: `<!-- This section should be hidden by default and shown when there are todos -->
				<section class="main">
					<input id="toggle-all" class="toggle-all" type="checkbox" />
					<label for="toggle-all">Mark all as complete</label>
					<ul class="todo-list">
						<!-- These are here just to show the structure of the list items -->
						<!-- List items should get the class editing when editing and completed when marked as completed -->
						<li :class="{completed:item.isCompleted,editing:item.id===currentEditId}" v-for="item in todoListShow" :key="item.id">
							<div class="view">
								<input class="toggle" type="checkbox" v-model="item.isCompleted" @change="toggleTodo(item.id)"/>
								<label @dblclick="editTodo(item.id)">{{item.todo}}</label>
								<button class="destroy" @click="delclick(item.id)"></button>
							</div>
							<input class="edit" v-model="item.todo" @keyup.enter='finishEditTodo' v-focus/>
						</li>
					</ul>
				</section>`,
	data() {
		return {
			currentEditId: -1,
			screen: 'all'
		}
	},
	props: ['todolist'],
	methods: {
		// 删除  把id传给父组件
		delclick(id) {
			this.$emit('deltodo', id)
		},
		// 编辑
		editTodo(id) {
			this.currentEditId = id
		},
		finishEditTodo() {
			let todoEdit = this.todolist.find(item => item.id == this.currentEditId)
			this.$emit('finishedit', todoEdit)
			// console.log(todoEdit)

			this.currentEditId = -1
		},
		// 切换复选框
		toggleTodo(id) {
			let todoToggle = this.todolist.find(item => item.id == id)
			console.log(todoToggle)
			this.$emit('toggletodo', todoToggle)
			// console.log(id)
		},
		// 非父子通信
		getScreen(value) {
			// console.log(value)
			this.screen = value
		}
	},
	directives: {
		focus: {
			update(el, value) {
				if (value) {
					el.focus()
				}
			}
		}
	},
	created() {
		bus.$on('setscreen', this.getScreen)
	},
	computed: {
		todoListShow() {
			switch (this.screen) {
				case 'all':
					return this.todolist.filter(item => true)
				case 'active':
					return this.todolist.filter(item => !item.isCompleted)
				case 'completed':
					return this.todolist.filter(item => item.isCompleted)
			}
		}
	}
})
