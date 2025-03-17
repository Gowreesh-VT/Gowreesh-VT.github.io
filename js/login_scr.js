const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link1");
const btnPopup = document.querySelector(".btnLogin-popup");
const closeIcon = document.querySelector(".icon-close");

registerLink.addEventListener("click", ()=> {
    wrapper.classList.add("active");
    wrapper.classList.remove("active-slide");
})

loginLink.addEventListener("click", ()=> {
    wrapper.classList.remove("active");
    wrapper.classList.add("active-slide");
})

btnPopup.addEventListener("click", ()=> {
    wrapper.classList.add("active-popup");
})

closeIcon.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
});


