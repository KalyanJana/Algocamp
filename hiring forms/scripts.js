document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.querySelector('.file-input');
    const fileInputLabel = document.querySelector('.file-input-label .file-input-placeholder');

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            fileInputLabel.textContent = fileInput.files[0].name;
        } else {
            fileInputLabel.textContent = 'ATTACH RESUME/CV';
        }
    });
});
