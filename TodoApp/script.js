const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [{
    id: new Date().getTime(),
    text: '밥먹기',
    complete: false
}];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    //새로운 아이템 객체 생성하기
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }

    //배열 처음에 새로운 아이템을 추가한다.
    todos.unshift(item); //배열의 첫번째에 엘리먼트를 insert 해준다.

    // 요소 생성하기
    const {itemEl, inputEl, editBtnEl, removeBtnEl} =
        createTodoElement(item);

    //리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl)

    inputEl.removeAttribute('disabled');

    inputEl.focus();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div'); //div 요소를 생성하니까 div 넣기
    itemEl.classList.add('item');

    const checkBoxEl = document.createElement('input');
    checkBoxEl.type = 'checkBox';

    if (item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circles';

    checkBoxEl.addEventListener('change', () => {
        item.complete = checkBoxEl.checked;

        if (item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
    })

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id);

        itemEl.remove();
    })

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkBoxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}