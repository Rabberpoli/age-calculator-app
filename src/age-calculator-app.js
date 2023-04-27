function checkInputValidity(inputForm) {
    if (!inputForm) {
        return;
    }

    const input = document.getElementById(inputForm);
    const innerText = input.value;

    console.log(innerText)

    if (!input) {
        return;
    }

    switch(inputForm) {
        case 'day':
            innerText && (innerText > 31 || innerText < 1) ? applyErrorStyle(input, 'Must be a valid day') : removeErrorStyle(input);
            break;
        case 'month':
            innerText && (innerText > 12 || innerText < 1) ? applyErrorStyle(input, 'Must be a valid month') : removeErrorStyle(input);
            break;
        case 'year':
            innerText && (innerText > moment().year()) ? applyErrorStyle(input, 'Must be in the past') : removeErrorStyle(input);
            break;
    }
}

function checkInputEmpty() {
    const inputDay = document.getElementById('day');
    const inputMonth = document.getElementById('month');
    const inputYear = document.getElementById('year');

    const htmlElems = [inputDay, inputMonth, inputYear];

    if (!inputDay || !inputMonth || !inputYear) {
        return;
    }

    htmlElems.forEach(element => {
        if (!element.value) {
            applyErrorStyle(element, 'The field is required');
        }
    });

}

function applyErrorStyle(input, innerText) {
    const label = input.previousElementSibling;
    const labelError = input.nextElementSibling;

    input.classList.add('input-error')
    label.classList.add('error-label')

    labelError.classList.remove('error-label-msg')
    labelError.classList.add('error-label-msg-visible')
    labelError.innerText = innerText;
}

function removeErrorStyle(input) {
    const label = input.previousElementSibling;
    const labelError = input.nextElementSibling;

    input.classList.remove('input-error')
    label.classList.remove('error-label')

    labelError.innerText = null;
    labelError.classList.remove('error-label-msg-visible');
    labelError.classList.add('error-label-msg')
}

function computeAge() {
    const inputDay = document.getElementById('day');
    const inputMonth = document.getElementById('month');
    const inputYear = document.getElementById('year');

    
    if (!inputDay || !inputMonth || !inputYear || !inputDay.value || !inputMonth.value || !inputYear.value) {
        return;
    }

    
    const completeDate = moment([inputYear.value, inputMonth.value-1, inputDay.value]);
    console.log(!moment(completeDate).isValid());
    console.log(inputYear.value > moment().year());
    if (!moment(completeDate).isValid() || inputYear.value > moment().year()) {
        applyErrorStyle(inputDay, 'Must be a valid date');
        applyErrorStyle(inputMonth, '');
        applyErrorStyle(inputYear, '');
        return;
    }

    removeErrorStyle(inputDay);
    removeErrorStyle(inputMonth);
    removeErrorStyle(inputYear);
    
    const inputsAge = moment([Number(inputYear.value), Number(inputMonth.value)-1, Number(inputDay.value) ]).endOf('day')
    const today = moment([moment().year(), moment().month(), Number(moment(new Date()).format('DD'))]).endOf('day')
    
    var diffDuration = moment.duration(today.diff(inputsAge));

    const dayLabel = document.getElementById('day-label');
    const monthLabel = document.getElementById('month-label');
    const yearLabel = document.getElementById('year-label');

    dayLabel.innerText = diffDuration.days();
    monthLabel.innerText = diffDuration.months();
    yearLabel.innerText = diffDuration.years();

    animateValue(dayLabel, 0, dayLabel.innerText, 1500);
    animateValue(monthLabel, 0, monthLabel.innerText, 2000);
    animateValue(yearLabel, 0, yearLabel.innerText, 4000);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
}