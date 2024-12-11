// Imágenes correctas (de gatos)
const correctSelections = ['checkbox1', 'checkbox3', 'checkbox5'];

// Función para validar la selección
function validateSelection() {
    const selectedImages = [];
    const allCheckboxes = document.querySelectorAll('.image-checkbox');

    // Verificar qué imágenes fueron seleccionadas
    allCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedImages.push(checkbox.id);
        }
    });

    // Obtener el mensaje de resultado
    const resultMessage = document.getElementById('resultMessage');
    const nextPageBtn = document.getElementById('nextPageBtn');

    // Verificar si las imágenes seleccionadas son correctas
    const isCorrect = correctSelections.every(value => selectedImages.includes(value)) &&
                      selectedImages.length === correctSelections.length;

    if (isCorrect) {
        resultMessage.textContent = '¡Correcto! Ahora serás redirigido al formulario de contacto.';
        resultMessage.style.color = 'green';
        // Redirigir automáticamente después de un corto tiempo
        setTimeout(() => {
            window.location.href = 'contactanos.html'; // Redirige a la página de contacto
        }, 2000); // Espera 2 segundos antes de redirigir
    } else {
        resultMessage.textContent = '¡Incorrecto! Intenta nuevamente.';
        resultMessage.style.color = 'red';
        nextPageBtn.style.display = 'none'; // Ocultar botón
    }
}
