import elements from '../dom-elements';

export default class TableRow {
  constructor(type, description, amount) {
    this.type = type;
    this.description = description;
    this.amount = amount;
  }

  appendRow(state) {
    const rowMarkup = `
      <tr data-id=${(Math.random() * 1000000000000).toFixed()} class=" ${this.type === 'expense' ? 'negative' : 'positive'}">
        <td>${this.type}</td>
        <td>${this.description}</td>
        <td class="relative">
          <span class="amount">${this.type === 'income' ? '+' : '-'} $${new Intl.NumberFormat().format(this.amount)}</span>
        <button class='remove-button row-button ui button red'>remove</button>
        </td>
      </tr>
    `;
    state.markUp.push(rowMarkup);
    elements.tableBody.insertAdjacentHTML('beforeend', rowMarkup);
  }
}
