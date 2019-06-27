Vue.component('todolist', {
	template: `<section class="todoapp">
				<addtodo @addtodo="addtodo"></addtodo>
				<todos :todolist="todoList" @deltodo="delTodo" @finishedit="finishEdit" @toggletodo="toggleTodo"></todos>
				<filters :todolist="todoList" @clearcmp="clearCmp"></filters>
			</section>`,
	data() {
		return {
			todoList: []
		}
	},
	methods: {
		getTodo() {
			axios({
				url: 'http://localhost:3000/todolist'
			}).then(res => {
				console.log(res.data)
				this.todoList = res.data
			})
		},
		// 添加 数据
		addtodo(value) {
			// console.log(value)
			let newTodo = {
				id: this.todoList.length
					? this.todoList[this.todoList.length - 1].id + 1
					: 1,
				todo: value,
				isCompleted: false
			}
			console.log(newTodo)
			axios({
				url: 'http://localhost:3000/todolist',
				method: 'post',
				data: newTodo
			}).then(res => {
				if (res.status === 201) {
					this.todoList.push(newTodo)
				}
				console.log(res)
			})
		},
		// 删除数据
		delTodo(id) {
			console.log(id)
			axios({
				url: `http://localhost:3000/todolist/${id}`,
				method: 'delete'
			}).then(res => {
				this.getTodo()
				console.log(res)
			})
		},
		// 获取编辑后回车键的数据
		finishEdit(value) {
			console.log(value)
			axios({
				url: `http://localhost:3000/todolist/${value.id}`,
				method: 'patch',
				data: {
					todo: value.todo
				}
			}).then(res => {
				if (res.status === 200) {
					console.log('修改成功')
				}
			})
		},
		// 切换复选框
		toggleTodo(value) {
			// console.log(id)
			axios({
				url: `http://localhost:3000/todolist/${value.id}`,
				method: 'patch',
				data: {
					isCompleted: value.isCompleted
				}
			}).then(res => {
				if (res.status === 200) {
					console.log('修改成功')
				}
			})
		},
		// 清除已完成
		clearCmp(value) {
			console.log(value)
			let count = 0
			value.forEach(item => {
				axios({
					url: `http://localhost:3000/todolist/${item.id}`,
					method: 'delete'
				}).then(res => {
					if (res.status === 200) {
						count++
						if (count === value.length) {
							this.getTodo()
						}
					}
				})
			})
		}
	},
	// 渲染数据
	created() {
		this.getTodo()
	}
})
