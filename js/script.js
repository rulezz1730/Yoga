window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let info = document.querySelector('.info-header'),
        tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    // console.log(tabContent);

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tabContent.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                }
            }
        }
    });

    hideTabContent(1);

    let deadline = '2020-05-03';

    function getTimeToEnd(endtime) {
        let total = Date.parse(endtime) - Date.parse(new Date),
            seconds = Math.floor((total / 1000) % 60),
            minutes = Math.floor((total / 1000 / 60) % 60),
            hours = Math.floor((total / 1000 / 60 / 60));

        return {
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'total': total,
        }
    }

    function currentTimeToEnd(id, endtime) {
        let timer = document.getElementById(id),
            hour = timer.querySelector('.hours'),
            min = timer.querySelector('.minutes'),
            sec = timer.querySelector('.seconds'),
            timerInterval = setInterval(updateTimeToEnd, 1000);

        function updateTimeToEnd() {
            let t = getTimeToEnd(endtime);
            if (t.hours <= 9) {
                hour.textContent = '0' + t.hours
            } else {
                hour.textContent = t.hours;
            };

            if (t.minutes <= 9) {
                min.textContent = '0' + t.minutes
            } else {
                min.textContent = t.minutes;
            };

            if (t.seconds <= 9) {
                sec.textContent = '0' + t.seconds
            } else {
                sec.textContent = t.seconds;
            }

            if (t.total == 0) {
                clearInterval(timerInterval);
            }
        }
    }

    currentTimeToEnd('timer', deadline);


    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');


    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    // Form;

    let message = {
        loading: 'Загрузка...',
        success: 'Все Ок! Скоро мы с Вами свяжемся!',
        error: 'Ой! Что-то пошло не так!'
    }

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let objForJson = {};

        formData.forEach(function(value, key) {
            objForJson[key] = value;
        });

        let json = JSON.stringify(objForJson);
        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerText = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerText = message.success;
            } else {
                statusMessage.innerText = message.error;
            }
        });
        for (let j = 0; j < input.length; j++) {
            input[j].value = '';
        }
    });

    let sendForm = document.querySelector('#form'),
        //     sendEmail = sendForm.getElementsByTagName('input')[0],
        //     sendPhone = sendForm.getElementsByTagName('input')[1];
        // sendEmail.setAttribute('name', 'email');
        // sendPhone.setAttribute('name', 'phone');
        input2 = sendForm.getElementsByTagName('input');
    for (let i = 0; i < input2.length; i++) {
        if (input2[i].type == 'email') {
            input2[i].setAttribute('name', 'email');
        } else if (input2[i].type == 'tel') {
            input2[i].setAttribute('name', 'phone')
        }
    }


    sendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        sendForm.appendChild(statusMessage);

        let req = new XMLHttpRequest();
        req.open('POST', 'server.php');
        req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let data = new FormData(sendForm);
        let obj = {};

        data.forEach(function(val, key) {
            obj[key] = val;
        });

        let json2 = JSON.stringify(obj);
        req.send(json2);

        req.addEventListener('readystatechange', function() {
            if (req.readyState < 4) {
                statusMessage.innerText = message.loading;
            } else if (req.readyState === 4 && req.status == 200) {
                statusMessage.innerText = message.success;
            } else {
                statusMessage.innerText = message.error;
            }
        })

        for (let i = 0; i < input2.length; i++) {
            input2[i].value = '';
        }
    });


});