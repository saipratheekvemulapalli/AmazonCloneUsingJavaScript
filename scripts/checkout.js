import { renderCartSummary } from './ordersummary.js';
import { renderpaymentSummary } from './paymentsummary.js';

document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM fully loaded and parsed');
  renderCartSummary();
  renderpaymentSummary();
});
