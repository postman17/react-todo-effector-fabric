import {firstTodoList, secondTodoList, thirdTodoList} from './models';
import TodoList from './TodoList';

const App = () => {
    return (
        <>
            <TodoList
                label="First TODO list"
                model={firstTodoList}
            />
            <hr/>
            <TodoList
                label="Second TODO list"
                model={secondTodoList}
            />
            <hr/>
            <TodoList
                label="Third TODO list"
                model={thirdTodoList}
            />
        </>
    );
}

export default App;
