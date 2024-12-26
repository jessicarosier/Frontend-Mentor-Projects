import {
    listenForNextBtn,
    listenForPrevBtn,
    listenForConfirmBtn,
    listenForPlanSelection,
    listenForAddOnSelection,
    listenForSwitchChange,
} from "./main.js";

(async () => {

    listenForNextBtn();
    listenForPrevBtn();
    listenForConfirmBtn();
    listenForPlanSelection();
    listenForAddOnSelection();
    listenForSwitchChange();
})();