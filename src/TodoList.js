import {useStore, useList} from 'effector-react';

const TodoList = ({label, model}) => {
    const input = useStore(model.$input)
    const tasks = useStore(model.list)
    const temp = useStore(model.$temp)
    const todos = useList(
        model.list,
        {
            keys: [tasks, temp],
            getKey: (item) => item.id,
            fn: (data, key) => {
                return (
                    <li>
                        <label>{key}</label>
                        <input
                            type="text"
                            value={temp[key] || data.value}
                            onBlur={model.changeTaskFn.prepend((e) => ({'value': e.target.value, 'id': key}))}
                            onChange={model.addFn.prepend((e) => ({'value': e.target.value, 'id': key}))}
                        />
                        <button type="button" onClick={() => model.removeFn(key)}>Remove</button>
                    </li>
                )}
            }
    )
    return (
        <>
            <h1>{label}</h1>
            <ul>
                {todos}
            </ul>
            <form>
                <label>Insert todo: </label>
                <input type="text" value={input} onChange={model.changeFn.prepend((e) => e.currentTarget.value)}/>
                <input type="submit" onClick={model.submitFn} value="insert"/>
            </form>
        </>
    )
}

export default TodoList