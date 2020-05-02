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

});