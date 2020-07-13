import elements from '../view/dom-elements';

export default class TableRow {
  constructor(type, description, amount) {
    this.type = type;
    this.description = description;
    this.amount = amount;
  }

  appendRow() {
    const rowMarkup = `
      <tr class=" ${this.type === 'expense' ? 'negative' : 'positive'}">
        <td>${this.type}</td>
        <td>${this.description}</td>
        <td class="relative">
        ${this.amount}
        <button class='remove-button row-button ui button red'>remove</button>
        </td>
      </tr>
    `;

    elements.tableBody.insertAdjacentHTML('beforeend', rowMarkup);
  }
}
