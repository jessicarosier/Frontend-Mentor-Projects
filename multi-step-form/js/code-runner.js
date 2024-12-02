import { listenForNextBtn, listenForPrevBtn, listenForConfirmBtn, listenForPlanSelection, listenForAddOnSelection } from './main.js';

(async () => {

    listenForNextBtn();
    listenForPrevBtn();
    listenForConfirmBtn();
    listenForPlanSelection();
    listenForAddOnSelection();

})();