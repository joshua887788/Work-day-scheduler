document.addEventListener('DOMContentLoaded', function () {
    // Load the initial date options
    // Load the initial date options
    function loadDateOptions() {
        var select = document.getElementById('date-select');
        var currentDate = dayjs();
        for (var i = -7; i <= 7; i++) {
            var date = currentDate.add(i, 'day');
            var option = document.createElement('option');
            option.value = date.format('YYYY-MM-DD');
            option.textContent = date.format('MMM DD, YYYY');
            select.appendChild(option);
        }
        // Set the current date as the selected option
        select.value = currentDate.format('YYYY-MM-DD');
    }

    // Initialize the scheduler
    function initializeScheduler() {
        var select = document.getElementById('date-select');
        select.addEventListener('change', handleDateChange);

        // Load initial events for the selected date
        var selectedDate = select.value;
        loadEvents(selectedDate);
    }

    // Handle date change event
    function handleDateChange(event) {
        var selectedDate = event.target.value;
        loadEvents(selectedDate);
    }

    // Load events for the selected date
    // Load events for the selected date
    // Load events for the selected date
    // Load events for the selected date
    function loadEvents(selectedDate) {
        // Clear existing events
        var timeBlocksContainer = document.querySelector('.time-block');
        timeBlocksContainer.innerHTML = '';

        // Load events from local storage
        var events = JSON.parse(localStorage.getItem(selectedDate)) || {};

        // Create time blocks for each hour
        for (var i = 9; i <= 17; i++) {
            var currentTime = dayjs(selectedDate).hour(i);
            var eventText = events[i] || '';

            var timeBlock = createTimeBlock(i, currentTime, eventText);
            timeBlocksContainer.appendChild(timeBlock);
        }
    }




    // Create a time block element
    // Create a time block element
    // Create a time block element
    function createTimeBlock(hour, currentTime, eventText) {
        var timeBlock = document.createElement('div');
        timeBlock.id = 'hour-' + hour;
        timeBlock.className = 'row time-block';

        var hourText = document.createElement('div');
        hourText.className = 'col-2 col-md-1 hour text-center py-3';
        hourText.textContent = currentTime.format('ha');

        var textarea = document.createElement('textarea');
        textarea.className = 'col-8 col-md-10 description';
        textarea.rows = '3';
        textarea.value = eventText;

        var saveButton = document.createElement('button');
        saveButton.className = 'btn saveBtn col-2 col-md-1';
        saveButton.setAttribute('aria-label', 'save');
        saveButton.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';

        // Add event listener to save button
        saveButton.addEventListener('click', function () {
            var selectedDate = document.getElementById('date-select').value;
            var events = JSON.parse(localStorage.getItem(selectedDate)) || {};
            events[hour] = textarea.value;
            localStorage.setItem(selectedDate, JSON.stringify(events));
        });

        timeBlock.appendChild(hourText);
        timeBlock.appendChild(textarea);
        timeBlock.appendChild(saveButton);

        // Apply the appropriate class based on the current time
        var currentHour = dayjs().hour();
        if (currentTime.isBefore(dayjs().startOf('day').hour(currentHour), 'hour')) {
            timeBlock.classList.add('past');
        } else if (currentTime.isSame(dayjs().hour(currentHour), 'hour')) {
            timeBlock.classList.add('present');
        } else {
            timeBlock.classList.add('future');
        }

        return timeBlock;
    }


    // Update the current day display
    function updateCurrentDay() {
        var currentDay = document.getElementById('currentDay');
        currentDay.textContent = dayjs().format('dddd, MMMM D, YYYY');
    }

    // Initialize the scheduler
    loadDateOptions();
    initializeScheduler();
    updateCurrentDay();
});
