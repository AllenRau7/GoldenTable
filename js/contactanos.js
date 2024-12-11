const form = document.getElementById('fakeForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitButton = form.querySelector('button');

const errorMessages = document.getElementById('errorMessages');
const loadingIndicator = document.createElement('div');
loadingIndicator.classList.add('loading-indicator');
loadingIndicator.innerHTML = '<p>Enviando datos...</p><div class="loader"></div>';
document.body.appendChild(loadingIndicator);

function clearErrorMessages() {
    errorMessages.innerHTML = '';
}

function addErrorMessage(message) {
    const errorMessageElement = document.createElement('p');
    errorMessageElement.classList.add('error');
    errorMessageElement.textContent = message;
    errorMessages.appendChild(errorMessageElement);
}

function validateForm() {
    let isValid = true;

    clearErrorMessages();

    if (nameInput.value.trim() === '') {
        addErrorMessage('El nombre es obligatorio.');
        isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        addErrorMessage('Por favor ingrese un correo electrónico válido.');
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        addErrorMessage('El mensaje es obligatorio.');
        isValid = false;
    }

    return isValid;
}

function submitForm() {
    // Validar el formulario
    if (!validateForm()) {
        return; 
    }

    loadingIndicator.style.display = 'block';

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        loadingIndicator.innerHTML = `<p>Enviando datos... ${progress}%</p><div class="loader"></div>`;
        if (progress >= 100) {
            clearInterval(progressInterval);
            simulateSubmission();
        }
    }, 200); 

    function simulateSubmission() {
        setTimeout(() => {
            loadingIndicator.innerHTML = '<p>Formulario enviado correctamente (pero en realidad no lo ha sido).</p>';
            setTimeout(() => {
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar';
                loadingIndicator.style.display = 'none';
                clearErrorMessages();
            }, 2000); 
        }, 1000); 
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío real

});

const style = document.createElement('style');
style.innerHTML = `
    .error {
        color: red;
        font-size: 0.9em;
    }
    #errorMessages {
        margin-top: 10px;
    }
    .loading-indicator {
        display: none;
        text-align: center;
        font-size: 1.2em;
        margin-top: 20px;
    }
    .loader {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin-top: 10px;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
