import elements from '../view/dom-elements';
import TableRow from '../model/table-model';

const appState = JSON.parse(localStorage.getItem('state'));

let state = {
  markUp: [],
};

function saveLocalStorage(obj) {
  localStorage.setItem('state', JSON.stringify(obj));
}

function updateTotal() {
  const amountElements = document.querySelectorAll('.amount');
  const amounts = Array.from(amountElements).map((el) => el.innerText);

  const total = amounts.reduce((acc, cur) => {
    const curNumber = +cur.replace(',', '').slice(3);
    console.log(curNumber);
    if (cur.startsWith('+')) {
      return acc + curNumber;
    }
    return acc - curNumber;
  }, 0);

  elements.total.innerText = `$${new Intl.NumberFormat().format(total)}`;

  state = { ...state, total };
}

function RemoveFeature() {
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
        localStorage.setItem('state', JSON.stringify(state));
      }
    });
  });
}

function renderState() {
  if (appState && appState.markUp) {
    appState.markUp.forEach((item) => {
      elements.tableBody.insertAdjacentHTML('beforeend', item);
    });
    elements.total.innerText = state.total;
  }
  RemoveFeature();
  updateTotal();
}

function startApp() {
  renderState();
  if (appState) {
    state = { ...appState };
  }
}

function addError(el) {
  el.parentElement.parentElement.classList.add('error');
}
function removeError(el) {
  el.parentElement.parentElement.classList.remove('error');
}

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
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
  RemoveFeature();

  description.value = '';
  amount.value = '';

  updateTotal();
  saveLocalStorage(state);
});

startApp();
