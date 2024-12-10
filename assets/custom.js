document.addEventListener('DOMContentLoaded', () => {
  const optionSelector = document.querySelector('[data-option-selector]');
  const legend = document.querySelector('.variant-picker__option-info legend');

  function updateSelectedSize() {
    const checkedOption = optionSelector.querySelector('input[type="radio"]:checked');
    if (checkedOption) {
      const labelSpan = optionSelector.querySelector(`label[for="${checkedOption.id}"] span`);
      if (labelSpan) {
        legend.textContent = 'Size: ' + labelSpan.textContent;
      }
    }
  }

  updateSelectedSize();
  optionSelector.addEventListener('change', updateSelectedSize);

  const labels = document.querySelectorAll('.color-swatch');
  const inputs = document.querySelectorAll('.sr-only[type="radio"]');

  function updateActiveClass() {
    labels.forEach(label => label.classList.remove('active'));
    inputs.forEach(input => {
      if (input.checked) {
        const activeLabel = document.querySelector(`label[for="${input.id}"]`);
        if (activeLabel) {
          activeLabel.classList.add('active');
        }
      }
    });
  }

  updateActiveClass();

  inputs.forEach(input => {
    input.addEventListener('change', updateActiveClass);
  });
});
