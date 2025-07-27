const authForm = document.querySelector("#auth-form");
const authFormEmail = document.querySelector("#auth-form-email");
const authFormPassword = document.querySelector("#auth-form-password");
const authFormSubmit = document.querySelector("#auth-form-submit");
const validationRules = {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/,
}

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('Form submitted - entered account');
    const formData = new formData(e.target)
    const formDataValues = Object.fromEntries(formData);

    if(formData.email.match(validationRules.emailRegex) && 
    formData.password.match(validationRules.passwordRegex)) {
        
    }
})

authFormEmail.addEventListener("input", (e) => {
    if (authFormEmail.value.match(validationRules.emailRegex)) {
        authFormPassword.disabled = false;
    } else {
        authFormPassword.disabled = true;
    }

  }
)
