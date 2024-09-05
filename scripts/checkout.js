import { renderCartSummary } from './ordersummary.js';
import { renderpaymentSummary } from './paymentsummary.js';

document.addEventListener('DOMContentLoaded', () => {
  renderCartSummary();
  renderpaymentSummary();
});