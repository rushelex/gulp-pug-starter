const fileInputs = document.querySelectorAll('.custom-inputfile__input');

if (fileInputs) {
    Array.prototype.forEach.call(fileInputs, input => {
        const label = input.nextElementSibling;
        const labelVal = label.innerHTML;

        input.addEventListener('change', e => {
            let fileName = '';
            if (this.files && this.files.length > 1)
                fileName = (
                    this.getAttribute('data-multiple-caption') || ''
                ).replace('{count}', this.files.length);
            else fileName = e.target.value.split('\\').pop();

            if (fileName) label.querySelector('span').innerHTML = fileName;
            else label.innerHTML = labelVal;
        });

        input.addEventListener('focus', () => {
            input.classList.add('has-focus');
        });
        input.addEventListener('blur', () => {
            input.classList.remove('has-focus');
        });
    });
}
