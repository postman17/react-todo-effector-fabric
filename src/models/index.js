import {createStore, createEvent, sample} from 'effector'


function createTodoListApi(initial = []) {
    const insert = createEvent()
    const remove = createEvent()
    const change = createEvent()
    const reset = createEvent()
    const changeTask = createEvent()
    const todos = createStore(initial)
    const input = createStore('')
    todos
        .on(insert, (state, value) => [...state, value])
        .on(remove, (state, index) => state.filter((_, i) => i !== index))
        .on(changeTask, (state, [value, index]) => {
            const newState = [...state]
            newState[index] = value
            return newState
        })
    input.on(change, (state, value) => value)
    input.on(reset, () => '')
    input.on(insert, () => '')

    const submit = createEvent()
    submit.watch(e => e.preventDefault())

    sample({
        clock: submit,
        source: input,
        target: insert,
    })

    return {
        list: todos,
        submit,
        input,
        remove,
        change: change.prepend(e => e.currentTarget.value),
        reset,
        changeTask: changeTask.prepend(([e, index]) => [e.target.value, index])
    }
}


export const firstTodoList = createTodoListApi(['Task for first todo list']);
export const secondTodoList = createTodoListApi(['Task for second todo list']);
export const thirdTodoList = createTodoListApi(['Task for third todo list']);