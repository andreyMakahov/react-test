'use strict';

var Input = React.createClass({
    displayName: 'Input',

    getInitialState: function getInitialState() {
        return { value: '' };
    },
    handleChange: function handleChange(e) {
        var value = e.target.value;
        this.setState({ value: value });
    },
    clearSelf: function clearSelf() {
        this.setState({ value: '' });
    },
    onSubmit: function onSubmit(e) {
        var value = e.target.value;
        if (e.keyCode !== 13 || !value.length) return false;
        this.props.onAddedTodo({ title: value });
        this.clearSelf();
    },
    componentDidMount: function componentDidMount() {
        var input = document.getElementById('todo-input');
        input.addEventListener('keyup', this.onSubmit);
    },
    componentWillUnmount: function componentWillUnmount() {
        var input = document.getElementById('todo-input');
        input.removeEventListener('keyup', this.onSubmit);
    },
    render: function render() {
        return React.createElement('input', {
            id: 'todo-input',
            type: 'text',
            value: this.state.value,
            onChange: this.handleChange,
            placeholder: 'Название задачи...'
        });
    }
});
var TodoList = React.createClass({
    displayName: 'TodoList',

    render: function render() {
        var list = [];
        if (this.props.data) {
            list = this.props.data.map(function (item) {
                return React.createElement(TodoItem, { title: item });
            });
        }
        return React.createElement(
            'ul',
            { 'class': 'todo-list' },
            list
        );
    }
});
var TodoItem = React.createClass({
    displayName: 'TodoItem',

    render: function render() {
        return React.createElement(
            'li',
            null,
            this.props.title
        );
    }
});
var TodoApplication = React.createClass({
    displayName: 'TodoApplication',

    getInitialState: function getInitialState() {
        return { list: this.props.data };
    },
    onAddedTodo: function onAddedTodo(todo) {
        var oldTodoList = JSON.parse(Utils.getFromLocalStorage("todoList"));
        if (oldTodoList) {
            oldTodoList.push(todo);
        } else {
            oldTodoList = [todo];
        }
        this.setState({ list: oldTodoList });
        Utils.setToLocalStorage("todoList", JSON.stringify(oldTodoList));
    },
    render: function render() {
        return React.createElement(
            'div',
            { 'class': 'todo' },
            React.createElement(Input, { onAddedTodo: this.onAddedTodo }),
            React.createElement(TodoList, {
                data: this.state.list })
        );
    }
});

var data = JSON.parse(Utils.getFromLocalStorage('todoList')) || [];

React.render(React.createElement(TodoApplication, { data: data }), document.getElementById('app'));