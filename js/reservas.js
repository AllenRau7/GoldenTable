
        const form = document.getElementById('reservationForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');
        const guestsInput = document.getElementById('guests');
        const submitButton = form.querySelector('button');

        const errorMessages = document.getElementById('errorMessages');
        const loadingIndicator = document.getElementById('loadingIndicator');

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

            if (dateInput.value === '') {
                addErrorMessage('La fecha es obligatoria.');
                isValid = false;
            }

            if (timeInput.value === '') {
                addErrorMessage('La hora es obligatoria.');
                isValid = false;
            }

            if (guestsInput.value < 1) {
                addErrorMessage('Debe haber al menos una persona.');
                isValid = false;
            }

            return isValid;
        }

        function submitReservation() {
            if (!validateForm()) {
                return;
            }

            loadingIndicator.style.display = 'block';

            submitButton.disabled = true;
            submitButton.textContent = 'Reservando...';

            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 10;
                loadingIndicator.innerHTML = `<p>Realizando la reserva... ${progress}%</p><div class="loader"></div>`;
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    simulateReservation(); 
                }
            }, 200);
        }

        
        function simulateReservation() {
            setTimeout(() => {
                loadingIndicator.innerHTML = '<p>¡Reserva confirmada en GoldenTable!</p>';
                setTimeout(() => {
                    form.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Reservar';
                    loadingIndicator.style.display = 'none';
                    clearErrorMessages();
                }, 2000); 
            }, 1000); 
        }

        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            submitReservation(); 
        });