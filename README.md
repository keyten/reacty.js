# reacty.js
A small library with Virtual DOM.

## Example of Tasks App:
App class:
```js
class App {
    render(){
        return {
            elem: 'div',
            children: [{
                elem: TasksView
            }]
        };
    }
}
```

Tasks View class (contains state):
```js
class TasksView {
    constructor(){
        // we have to define here all the props that must be watched
        this.state = {
            tasks: []
        };
    }

    render(){
        return {
            elem: 'div',
            className: 'tasks',
            children: this.state.tasks.map((task) => ({
                elem: TaskItem,
                data: task,
                key: task.name
            }))
        }
    }
}
```

TaskItem class (receives props):
```js
class TaskItem {
    render(props){
        const {data} = props;
        return {
            elem: 'div',
            className: data.checked ? 'checked' : '',
            children: [
                data.name
            ],
            listeners: {
                // todo: do not create a new function every time
                click: (e) => data.checked = !data.checked
            }
        };
    }
}
```

And now add it to the page:
```js
reacty(App, document.body);
```
