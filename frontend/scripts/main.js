var Input = React.createClass({
    getInitialState: function () {
        return {value: ''};
    },
    handleChange: function(e) {
        var value = e.target.value;
        this.setState({value: value});
    },
    clearSelf: function () {
        this.setState({value: ''});
    },
    onSubmit: function (e) {
        var value = e.target.value;
        if(e.keyCode !== 13 || !value.length) return false;
        this.props.onAddedTodo({ title:  value});
        this.clearSelf();
    },
    componentDidMount: function() {
        var input = document.getElementById('todo-input');
        input.addEventListener('keyup', this.onSubmit);
    },
    componentWillUnmount: function() {
        var input = document.getElementById('todo-input');
        input.removeEventListener('keyup', this.onSubmit);
    },
    render: function() {
        return (
            <input
                id="todo-input"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Название задачи..."
            />
        );
    }
});
var TodoList = React.createClass({
    render: function() {
        var list = [];
        if(this.props.data) {
            list = this.props.data.map(function(item) {
                return (
                    <TodoItem title={item} />
                );
            });
        }
        return (
            <ul class="todo-list">
                {list}
            </ul>
        );
    }
});
var TodoItem = React.createClass({
    render: function() {
        return (
            <li>{this.props.title}</li>
        );
    }
});
var TodoApplication = React.createClass({
    getInitialState: function () {
        return {list: this.props.data};
    },
    onAddedTodo: function (todo) {
        var oldTodoList = JSON.parse(Utils.getFromLocalStorage("todoList"));
        if(oldTodoList) {
            oldTodoList.push(todo);
        } else {
            oldTodoList = [todo];
        }
        this.setState({list: oldTodoList});
        Utils.setToLocalStorage("todoList", JSON.stringify(oldTodoList));
    },
    render: function() {
        return (
            <div class="todo">
                <Input onAddedTodo={this.onAddedTodo} />
                <TodoList
                    data={this.state.list} />
            </div>
        );
    }
});

var data = JSON.parse(Utils.getFromLocalStorage('todoList')) || [];

React.render(
    <TodoApplication data={data} />,
    document.getElementById('app')
);
