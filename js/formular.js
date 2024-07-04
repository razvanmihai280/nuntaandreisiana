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
    var numarMeniuriStandard = document.querySelector("select[name='Numar Meniuri Standard']");
    var numarMeniuriVegetarian = document.getElementById('numarMeniuriVegetarian');
    var hiddenVegetarianMeniuri = document.getElementById('hiddenVegetarianMeniuri');
    var numarCopiiSelect = document.querySelector("select[name='Numar Copii']");

    function updateMeniuOptions() {
        var numarPersoaneVal = parseInt(numarPersoane.value) || 0;
        var numarCopiiVal = parseInt(numarCopiiSelect.value) || 0;
        var totalMeniuri = numarPersoaneVal + numarCopiiVal;

        var optionsHtml = '<option value="">-- Selectați o opțiune --</option>';
        for (var i = 0; i <= totalMeniuri; i++) {
            optionsHtml += `<option value="${i}">${i}</option>`;
        }

        numarMeniuriStandard.innerHTML = optionsHtml;
        updateVegetarianMenu();
    }

    function updateVegetarianMenu() {
        var totalMeniuri = (parseInt(numarPersoane.value) || 0) + (parseInt(numarCopiiSelect.value) || 0);
        var standardMeniuri = parseInt(numarMeniuriStandard.value) || 0;
        var vegetarianMeniuri = totalMeniuri - standardMeniuri;

        hiddenVegetarianMeniuri.value = vegetarianMeniuri;
        numarMeniuriVegetarian.innerHTML = `<option value="${vegetarianMeniuri}">${vegetarianMeniuri}</option>`;
    }

    function validateForm() {
        var valid = true;

        if (confirmarePrezenta.value === 'Nu') {
            if (campInvitat.querySelector('input').value.trim().length < 3) {
                valid = false;
            }
        } else {
            // Validare câmpuri vizibile când confirmarea este "Da"
            if (numarPersoane.value === '') {
                valid = false;
            } else {
                if (numarPersoane.value === '1') {
                    if (campInvitat.querySelector('input').value.trim().length < 3) {
                        valid = false;
                    }
                } else if (numarPersoane.value === '2') {
                    if (campInvitat.querySelector('input').value.trim().length < 3 || campInvitatPartener.querySelector('input').value.trim().length < 3) {
                        valid = false;
                    }
                }
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

            if (campMeniu.style.display !== 'none' && numarMeniuriStandard.value === '') {
                valid = false;
            }
        }

        submitButton.style.display = valid ? 'block' : 'none';
        return valid;
    }

    numarPersoane.addEventListener('change', function() {
        campInvitat.style.display = 'none';
        campInvitatPartener.style.display = 'none';
        if (numarPersoane.value === '1') {
            campInvitat.style.display = 'block';
            campInvitatPartener.querySelector('input').value = ""; // Resetează câmpul partener
        } else if (numarPersoane.value === '2') {
            campInvitat.style.display = 'block';
            campInvitatPartener.style.display = 'block';
        }
        updateMeniuOptions();
        validateForm();
    });

    numarCopiiSelect.addEventListener('change', function() {
        updateMeniuOptions();
        validateForm();
    });

    numarMeniuriStandard.addEventListener('change', function() {
        updateVegetarianMenu();
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
