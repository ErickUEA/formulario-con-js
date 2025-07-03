document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interactive-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const ageInput = document.getElementById('age');
    const submitButton = document.getElementById('submit-button');
    const resetButton = document.getElementById('reset-button');

    const validationStatus = {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        age: false
    };

    const validateName = () => {
        const isValid = nameInput.value.trim().length >= 3;
        updateFieldValidation(nameInput, isValid, 'El nombre debe tener al menos 3 caracteres.');
        validationStatus.name = isValid;
        checkFormValidity();
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailInput.value);
        updateFieldValidation(emailInput, isValid, 'Por favor, introduce un correo electrónico válido.');
        validationStatus.email = isValid;
        checkFormValidity();
    };

    const validatePassword = () => {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isValid = passwordRegex.test(password);
        updateFieldValidation(passwordInput, isValid, 'La contraseña debe tener mínimo 8 caracteres, un número y un carácter especial.');
        validationStatus.password = isValid;
        validateConfirmPassword();
        checkFormValidity();
    };

    const validateConfirmPassword = () => {
        const isValid = confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value.length > 0;
        updateFieldValidation(confirmPasswordInput, isValid, 'Las contraseñas no coinciden.');
        validationStatus.confirmPassword = isValid;
        checkFormValidity();
    };

    const validateAge = () => {
        const isValid = parseInt(ageInput.value, 10) >= 18;
        updateFieldValidation(ageInput, isValid, 'Debes ser mayor de 18 años.');
        validationStatus.age = isValid;
        checkFormValidity();
    };

    const updateFieldValidation = (input, isValid, errorMessage) => {
        const errorElement = input.nextElementSibling;
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        } else {
            if (input.value.length > 0) {
                input.classList.remove('valid');
                input.classList.add('invalid');
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                input.classList.remove('valid', 'invalid');
                errorElement.style.display = 'none';
            }
        }
    };
    
    const checkFormValidity = () => {
        const isFormValid = Object.values(validationStatus).every(status => status);
        submitButton.disabled = !isFormValid;
    };

    const resetFormState = () => {
        Object.keys(validationStatus).forEach(key => validationStatus[key] = false);
        form.querySelectorAll('input').forEach(input => {
            input.classList.remove('valid', 'invalid');
            const errorElement = input.nextElementSibling;
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
        submitButton.disabled = true;
    };

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    ageInput.addEventListener('input', validateAge);

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        if (!submitButton.disabled) {
            alert('¡Formulario enviado con éxito!');
            form.reset();      
            resetFormState();
        }
    });

    resetButton.addEventListener('click', () => {
        resetFormState();
    });
});