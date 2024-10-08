document.addEventListener('DOMContentLoaded', function() {
    var numarPersoane = document.getElementById('numarPersoane');
    var confirmarePrezenta = document.getElementById('confirmarePrezenta');
    var campInvitat = document.getElementById('numeInvitat');
    var campInvitatPartener = document.getElementById('numePartenerInvitat');
    var campCopii = document.getElementById('campCopii');
    var campCazare = document.getElementById('campCazare');
    var campMeniu = document.getElementById('campMeniu');
    var campVegan = document.getElementById('campVegan');
    var campMesaj = document.getElementById('campMesaj');
    var submitButton = document.getElementById('submit');
    var form = document.getElementById('contact-form');

    function setDefaultValues() {
        campCopii.querySelector('select').value = '0';
        campCazare.querySelector('select').value = 'Nu';
        campMeniu.querySelector('select').value = '0';
        campVegan.querySelector('select').value = '0';
    }

    function validateForm() {
        var valid = true;

        if (confirmarePrezenta.value === 'Nu') {
            if (numarPersoane.value === '1' && campInvitat.querySelector('input').value.trim().length < 3) {
                valid = false;
            }
            setDefaultValues();
            
        } else {
            if (numarPersoane.value === '1') {
                if (campInvitat.querySelector('input').value.trim().length < 3) {
                    valid = false;
                }
                campInvitatPartener.querySelector('input').value = '-';
                campInvitatPartener.style.display = 'none';
            } else if (numarPersoane.value === '2') {
                if (campInvitat.querySelector('input').value.trim().length < 3 || campInvitatPartener.querySelector('input').value.trim().length < 3) {
                    valid = false;
                }
                campInvitatPartener.style.display = 'block';
            }

            if (confirmarePrezenta.value === '') {
                valid = false;
            }

            if (campCopii.style.display !== 'none' && campCopii.querySelector('select').value === '') {
                valid = false;
            }

            if (campCazare.style.display !== 'none' && campCazare.querySelector('select').value === '') {
                valid = false;
            }

            if (campMeniu.style.display !== 'none' && campMeniu.querySelector('select').value === '') {
                valid = false;
            }

            if (campVegan.style.display !== 'none' && campVegan.querySelector('select').value === '') {
                valid = false;
            }
        }

        //submitButton.style.display = valid ? 'block' : 'none';
        return valid;
    }

    numarPersoane.addEventListener('change', function() {
        if (numarPersoane.value === '1') {
            campInvitat.style.display = 'block';
            campInvitatPartener.style.display = 'none';
            campInvitatPartener.querySelector('input').value = '-';
        } else if (numarPersoane.value === '2') {
            campInvitat.style.display = 'block';
            campInvitatPartener.style.display = 'block';
            campInvitatPartener.querySelector('input').value = '';
        } else {
            campInvitat.style.display = 'none';
            campInvitatPartener.style.display = 'none';
        }
        validateForm();
    });

    confirmarePrezenta.addEventListener('change', function() {
        campCopii.style.display = 'none';
        campCazare.style.display = 'none';
        campMeniu.style.display = 'none';
        campVegan.style.display = 'none';
        campMesaj.style.display = 'none';
        if (confirmarePrezenta.value === 'Da') {
            campCopii.style.display = 'block';
            campCazare.style.display = 'block';
            campMeniu.style.display = 'block';
            campVegan.style.display = 'block';
            campMesaj.style.display = 'block';
        }
        validateForm();
    });

    form.addEventListener('input', validateForm);

    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
            alert('Te rog completează toate câmpurile obligatorii.');
        }
    });
});
