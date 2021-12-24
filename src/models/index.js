import {createStore, createEvent, sample, forward} from 'effector'


function createTodoListApi(initial = []) {
    function* idMaker() {
        let index = 0;
        while(true)
            yield index++;
    }
    const getId = idMaker();
    const initialData = () => {
        let result = []
        initial.forEach((value) => {
            result.push({value: value, id: getId.next().value})
        })
        return result
    }
    const insertFn = createEvent()
    const removeFn = createEvent()
    const changeFn = createEvent()
    const resetFn = createEvent()
    const changeTaskFn = createEvent()
    const $todos = createStore(initialData())
    const $input = createStore('')
    const addFn = createEvent()
    const resetTempFn = createEvent()
    const $temp = createStore({})

    $temp
        .on(addFn, (state, {value, id}) => {
            const newState = {...state}
            newState[id] = value
            return newState
        })
        .reset(resetTempFn)
    $todos
        .on(insertFn, (state, value) => [...state, {value: value, id: getId.next().value}])
        .on(removeFn, (state, id) => state.filter(record => (record.id !== id)))
        .on(changeTaskFn, (state, {value, id}) => {
            const newState = [...state]
            newState.forEach((data, index) => {
                if (data.id === id) {
                    newState[index].value = value
                }
            })
            return newState
        })
    $input
        .on(changeFn, (state, value) => value)
        .on(resetFn, () => '')
        .on(insertFn, () => '')

    const submitFn = createEvent()
    submitFn.watch(e => e.preventDefault())

    sample({
        clock: submitFn,
        source: $input,
        target: insertFn,
    })

    forward({
        from: changeTaskFn,
        to: resetTempFn
    })

    return {
        list: $todos,
        submitFn,
        $input,
        removeFn,
        changeFn,
        resetFn,
        changeTaskFn,
        addFn,
        $temp,
    }
}


export const firstTodoList = createTodoListApi(['Task for first todo list']);
export const secondTodoList = createTodoListApi(['Task for second todo list']);
export const thirdTodoList = createTodoListApi(['Task for third todo list']);