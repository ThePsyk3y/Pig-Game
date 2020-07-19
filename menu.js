function loadPageSimp() {
    window.location = "simple.html";
}
function loadPageAdv(){
    window.location = "advanced.html";
}

document.querySelector(".btn-mode-simp").addEventListener("click",loadPageSimp);
document.querySelector(".btn-mode-adv").addEventListener("click",loadPageAdv);