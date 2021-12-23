import {useStore, useList} from 'effector-react'

const TodoList = ({label, model}) => {
    const input = useStore(model.input)
    const todos = useList(model.list, (value, index) => (
            <li>
                <input type="text" value={value} onChange={(e) => model.changeTask([e, index])}/>
                <button type="button" onClick={() => model.remove(index)}>Remove</button>
            </li>
    ))
    return (
        <>
            <h1>{label}</h1>
            <ul>
                {todos}
            </ul>
            <form>
                <label>Insert todo: </label>
                <input type="text" value={input} onChange={model.change}/>
                <input type="submit" onClick={model.submit} value="Insert"/>
            </form>
        </>
    )
}

export default TodoList