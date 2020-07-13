import elements from '../view/dom-elements';
import TableRow from '../model/table-model';

function addRemoveFeature() {
  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((i) => {
    i.addEventListener('click', (e) => {
      const { rowIndex } = e.target.parentElement.parentElement;
      if (rowIndex > -1) {
        elements.table.deleteRow(rowIndex);
      }
    });
  });
}

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { type, description, amount } = elements;
  const Row = new TableRow(type.value, description.value, amount.value);
  Row.appendRow();
  addRemoveFeature();
});
