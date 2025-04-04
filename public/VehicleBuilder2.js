// JS for adding more spec fields dynamically
document.getElementById('addSpecBtn').addEventListener('click', function() {
    const newSpecField = document.createElement('textarea');
    newSpecField.setAttribute('name', 'specs[]');
    newSpecField.setAttribute('rows', '2');
    newSpecField.setAttribute('placeholder', 'Additional spec...');
    newSpecField.classList.add('border', 'border-gray-300', 'rounded', 'p-4', 'w-full', 'text-sm', 'text-gray-700', 'placeholder-gray-400', 'mt-2');
    document.getElementById('additionalSpecsContainer').appendChild(newSpecField);
});

// JS for media preview (supporting multiple images/videos)
document.getElementById('mediaUpload').addEventListener('change', function(event) {
    const previewContainer = document.getElementById('mediaPreview');
    previewContainer.innerHTML = '';  // Clear previous previews

    Array.from(event.target.files).forEach(file => {
        const mediaElement = document.createElement(file.type.startsWith('image') ? 'img' : 'video');
        mediaElement.src = URL.createObjectURL(file);
        mediaElement.classList.add('w-32', 'h-32', 'object-cover', 'border', 'border-gray-300', 'rounded', 'm-2');
        mediaElement.controls = file.type.startsWith('video');  // Add controls for video files
        previewContainer.appendChild(mediaElement);
    });
});
