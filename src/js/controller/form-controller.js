import elements from '../view/dom-elements';
import TableRow from '../model/table-model';

let state = {
  markUp: [],
};

function saveLocalStorage(obj) {
  localStorage.setItem(`${state.user.Ea} - ${state.user.Qt.Bd}`, JSON.stringify(obj));
}

function updateTotal() {
  const amountElements = document.querySelectorAll('.amount');
  const amounts = Array.from(amountElements).map((el) => el.innerText);

  const total = amounts.reduce((acc, cur) => {
    const curNumber = +cur.replace(',', '').slice(3);
    if (cur.startsWith('+')) {
      return acc + curNumber;
    }
    return acc - curNumber;
  }, 0);

  elements.total.innerText = `$${new Intl.NumberFormat().format(total)}`;
  state = { ...state, total };
}

function RemoveFeature(idString) {
  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((i) => {
    i.addEventListener('click', (e) => {
      const { rowIndex } = e.target.parentElement.parentElement;
      if (rowIndex > -1) {
        elements.table.deleteRow(rowIndex);
        updateTotal();
        const id = e.target.parentElement.parentElement.getAttribute('data-id');
        // update state
        const filteredMarkup = state.markUp
          .filter((row) => !row.includes(`data-id=${id}`));
        state = { ...state, markUp: filteredMarkup };

        // update local storage state
        localStorage.setItem(idString, JSON.stringify(state));
      }
    });
  });
}

export function renderState(appState, idString) {
  state = { ...appState };
  appState.markUp.forEach((item) => {
    elements.tableBody.insertAdjacentHTML('beforeend', item);
  });
  elements.total.innerText = state.total;

  RemoveFeature(idString);
  updateTotal();
}

function addError(el) {
  el.parentElement.parentElement.classList.add('error');
}
function removeError(el) {
  el.parentElement.parentElement.classList.remove('error');
}
export function clearFields() {
  elements.description.value = '';
  elements.amount.value = '';
}

function addItem(idString) {
  const { type, description, amount } = elements;
  const Row = new TableRow(type.value, description.value, amount.value);

  if (description.value === '') {
    addError(description);
  }
  if (amount.value === '') {
    addError(amount);
  }
  if (description.value === '' || amount.value === '') {
    return;
  }
  if (amount.value !== '') {
    removeError(amount);
  }
  if (description.value !== '') {
    removeError(description);
  }

  Row.appendRow(state);
  RemoveFeature(idString);
  updateTotal();
  saveLocalStorage(state);
}

export function showUser() {
  elements.user.innerText = `${state.user.Qt.Bd} - loged in`;
}
export function hideUser() {
  elements.user.innerText = '';
}

export function updateUser(oauth) {
  state = { ...state, user: oauth.currentUser.get() };
  showUser();
}

//               START APP ------------------------

export function startApp(oauth) {
  if (oauth.isSignedIn.get('')) {
    const { Ea: id, Qt: { Bd: name } } = oauth.currentUser.get();
    const idString = `${id} - ${name}`;
    const appState = JSON.parse(localStorage.getItem(idString));
    if (appState && appState.markUp) {
      renderState(appState, idString);
    }
    state = { ...state, user: oauth.currentUser.get() };
  }
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (oauth.isSignedIn.get()) {
      const { Ea: id, Qt: { Bd: name } } = oauth.currentUser.get();
      const idString = `${id} - ${name}`;
      addItem(idString);
      showUser();
    } else {
      alert('please sign in');
      clearFields();
    }
  });
}

//               START APP -----------------------
