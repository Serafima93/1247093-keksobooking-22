const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const flatPhotoChooser = document.querySelector('#images');
const previewflatPhoto = document.querySelector('.ad-form__photo');


avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});



flatPhotoChooser.addEventListener('change', () => {
  const file = flatPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {

      const newElement = document.createElement('img');
      newElement.setAttribute('src', '1');
      newElement.setAttribute('style', 'width:60px; height: 60px;');
      newElement.src = reader.result;
      previewflatPhoto.appendChild(newElement);
    });

    reader.readAsDataURL(file);
  }
});

export { avatarPreview, previewflatPhoto };
