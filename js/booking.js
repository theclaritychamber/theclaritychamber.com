(function () {
  'use strict';

  var form = document.getElementById('booking-form');
  if (!form) return;

  var PACKAGE_INFO = {
    'live-30': { label: 'Live video · 30 minutes', price: 'AUD $60' },
    'live-60': { label: 'Live video · 60 minutes', price: 'AUD $80' },
    'live-90': { label: 'Live video · 90 minutes', price: 'AUD $100' },
    'rec-5': { label: 'Recorded video · 5 questions', price: 'AUD $60' },
    'rec-7': { label: 'Recorded video · 7 questions', price: 'AUD $80' },
    'rec-11': { label: 'Recorded video · 11 questions', price: 'AUD $100' }
  };

  var PAYMENT_LINKS = {
    'live-30': 'https://book.stripe.com/3cI7sFaOA3zJ1R5b5C3AY00',
    'live-60': 'https://book.stripe.com/fZu28lf4Qfir8ft7Tq3AY01',
    'live-90': 'https://book.stripe.com/dRm8wJaOA3zJ8ftddK3AY02',
    'rec-5': 'https://book.stripe.com/dRmbIV8Gsc6fdzNa1y3AY03',
    'rec-7': 'https://book.stripe.com/5kQfZb5ugc6fbrFb5C3AY04',
    'rec-11': 'https://book.stripe.com/9B6bIV3m80nx8ft0qY3AY05'
  };

  var AVAILABILITY = {
    timeZone: 'Australia/Sydney',
    slotMinutes: 15,
    bufferMinutes: 15,
    minHoursNotice: 24,
    maxDate: '2027-08-22',
    sheetStart: '2026-10-01',
    blockedDates: [
      '2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08', '2026-10-09',
      '2026-12-25', '2026-12-26', '2026-12-28', '2027-01-01', '2027-01-26',
      '2027-03-26', '2027-03-27', '2027-03-28', '2027-03-29', '2027-04-25',
      '2027-04-26', '2027-06-14'
    ],
    hours: {
      1: { startHour: 10, endHour: 15 },
      2: { startHour: 10, endHour: 15 },
      3: { startHour: 10, endHour: 15 },
      4: { startHour: 10, endHour: 15 },
      5: { startHour: 10, endHour: 15 }
    }
  };

  var FREE_HOURS = {
    '2026-10-01': [480, 720], '2026-10-02': [480, 720], '2026-10-03': [480, 1080], '2026-10-04': [480, 1080],
    '2026-10-10': [480, 1080], '2026-10-11': [480, 1080], '2026-10-12': [480, 720], '2026-10-13': [480, 720],
    '2026-10-14': [480, 720], '2026-10-15': [480, 1080], '2026-10-16': [480, 1080], '2026-10-17': [1020, 1080],
    '2026-10-18': [1020, 1080], '2026-10-19': [1020, 1080], '2026-10-20': [1020, 1080], '2026-10-21': [480, 1080],
    '2026-10-22': [480, 1080], '2026-10-23': [1020, 1080], '2026-10-24': [1020, 1080], '2026-10-25': [1020, 1080],
    '2026-10-26': [480, 1080], '2026-10-27': [480, 1080], '2026-10-28': [480, 720], '2026-10-29': [480, 720],
    '2026-10-30': [480, 720], '2026-10-31': [480, 1080], '2026-11-01': [480, 1080], '2026-11-02': [480, 1080],
    '2026-11-03': [1020, 1080], '2026-11-04': [1020, 1080], '2026-11-05': [1020, 1080], '2026-11-06': [1020, 1080],
    '2026-11-07': [1020, 1080], '2026-11-08': [1020, 1080], '2026-11-09': [1020, 1080], '2026-11-10': [480, 1080],
    '2026-11-11': [480, 1080], '2026-11-12': [1020, 1080], '2026-11-13': [1020, 1080], '2026-11-14': [1020, 1080],
    '2026-11-15': [1020, 1080], '2026-11-16': [1020, 1080], '2026-11-17': [480, 1080], '2026-11-18': [480, 1080],
    '2026-11-19': [480, 720], '2026-11-20': [480, 720], '2026-11-21': [480, 720], '2026-11-22': [480, 720],
    '2026-11-23': [480, 720], '2026-11-24': [480, 720], '2026-11-25': [480, 1080], '2026-11-26': [480, 1080],
    '2026-11-27': [480, 1080], '2026-11-28': [1020, 1080], '2026-11-29': [1020, 1080], '2026-11-30': [1020, 1080],
    '2026-12-01': [1020, 1080], '2026-12-02': [1020, 1080], '2026-12-03': [1020, 1080], '2026-12-04': [1020, 1080],
    '2026-12-05': [480, 1080], '2026-12-06': [480, 1080], '2026-12-07': [1020, 1080], '2026-12-08': [1020, 1080],
    '2026-12-09': [1020, 1080], '2026-12-10': [1020, 1080], '2026-12-11': [1020, 1080], '2026-12-12': [480, 1080],
    '2026-12-13': [480, 1080], '2026-12-14': [480, 1080], '2026-12-15': [480, 1080], '2026-12-16': [1020, 1080],
    '2026-12-17': [1020, 1080], '2026-12-18': [1020, 1080], '2026-12-19': [1020, 1080], '2026-12-20': [1020, 1080],
    '2026-12-21': [1020, 1080], '2026-12-22': [1020, 1080], '2026-12-23': [480, 1080], '2026-12-24': [480, 1080],
    '2026-12-27': [1020, 1080], '2026-12-29': [1020, 1080], '2026-12-30': [1020, 1080], '2026-12-31': [1020, 1080],
    '2027-01-02': [480, 1080], '2027-01-03': [480, 1080], '2027-01-04': [480, 1080], '2027-01-05': [480, 1080],
    '2027-01-06': [480, 1080], '2027-01-07': [480, 1080], '2027-01-08': [480, 1080], '2027-01-09': [480, 1080],
    '2027-01-10': [480, 1080], '2027-01-11': [1020, 1080], '2027-01-12': [1020, 1080], '2027-01-13': [1020, 1080],
    '2027-01-14': [1020, 1080], '2027-01-15': [1020, 1080], '2027-01-16': [480, 1080], '2027-01-17': [480, 1080],
    '2027-01-18': [480, 720], '2027-01-19': [480, 720], '2027-01-20': [480, 720], '2027-01-21': [480, 1080],
    '2027-01-22': [480, 1080], '2027-01-23': [1020, 1080], '2027-01-24': [1020, 1080], '2027-01-25': [1020, 1080],
    '2027-01-27': [480, 1080], '2027-01-28': [480, 1080], '2027-01-29': [1020, 1080], '2027-01-30': [1020, 1080],
    '2027-01-31': [1020, 1080], '2027-02-01': [1020, 1080], '2027-02-02': [1020, 1080], '2027-02-03': [1020, 1080],
    '2027-02-04': [1020, 1080], '2027-02-05': [480, 1080], '2027-02-06': [480, 1080], '2027-02-07': [480, 1080],
    '2027-02-08': [480, 1080], '2027-02-09': [480, 1080], '2027-02-10': [480, 1080], '2027-02-11': [480, 1080],
    '2027-02-12': [480, 1080], '2027-02-13': [480, 1080], '2027-02-14': [480, 1080], '2027-02-15': [1020, 1080],
    '2027-02-16': [1020, 1080], '2027-02-17': [1020, 1080], '2027-02-18': [1020, 1080], '2027-02-19': [1020, 1080],
    '2027-02-20': [1020, 1080], '2027-02-21': [1020, 1080], '2027-02-22': [480, 1080], '2027-02-23': [480, 1080],
    '2027-02-24': [480, 1080], '2027-02-25': [480, 1080], '2027-02-26': [480, 1080], '2027-02-27': [480, 1080],
    '2027-02-28': [480, 1080], '2027-03-01': [1020, 1080], '2027-03-02': [1020, 1080], '2027-03-03': [1020, 1080],
    '2027-03-04': [480, 1080], '2027-03-05': [480, 1080], '2027-03-06': [1020, 1080], '2027-03-07': [1020, 1080],
    '2027-03-08': [1020, 1080], '2027-03-09': [1020, 1080], '2027-03-10': [1020, 1080], '2027-03-11': [1020, 1080],
    '2027-03-12': [1020, 1080], '2027-03-13': [480, 1080], '2027-03-14': [480, 1080], '2027-03-15': [480, 1080],
    '2027-03-16': [1020, 1080], '2027-03-17': [1020, 1080], '2027-03-18': [1020, 1080], '2027-03-19': [1020, 1080],
    '2027-03-20': [1020, 1080], '2027-03-21': [1020, 1080], '2027-03-22': [480, 1080], '2027-03-23': [480, 1080],
    '2027-03-24': [1020, 1080], '2027-03-25': [1020, 1080], '2027-03-30': [480, 1080], '2027-03-31': [480, 1080],
    '2027-04-01': [480, 1080], '2027-04-02': [480, 1080], '2027-04-03': [480, 1080], '2027-04-04': [480, 1080],
    '2027-04-05': [480, 1080], '2027-04-06': [480, 1080], '2027-04-07': [1020, 1080], '2027-04-08': [1020, 1080],
    '2027-04-09': [1020, 1080], '2027-04-10': [1020, 1080], '2027-04-11': [1020, 1080], '2027-04-12': [1020, 1080],
    '2027-04-13': [1020, 1080], '2027-04-14': [480, 1080], '2027-04-15': [480, 1080], '2027-04-16': [1020, 1080],
    '2027-04-17': [1020, 1080], '2027-04-18': [1020, 1080], '2027-04-19': [1020, 1080], '2027-04-20': [1020, 1080],
    '2027-04-21': [1020, 1080], '2027-04-22': [1020, 1080], '2027-04-23': [480, 1080], '2027-04-24': [480, 1080],
    '2027-04-27': [1020, 1080], '2027-04-28': [1020, 1080], '2027-04-29': [480, 1080], '2027-04-30': [480, 1080],
    '2027-05-01': [480, 1080], '2027-05-02': [480, 1080], '2027-05-03': [480, 1080], '2027-05-04': [480, 1080],
    '2027-05-05': [480, 1080], '2027-05-06': [480, 1080], '2027-05-07': [1020, 1080], '2027-05-08': [1020, 1080],
    '2027-05-09': [1020, 1080], '2027-05-10': [1020, 1080], '2027-05-11': [1020, 1080], '2027-05-12': [1020, 1080],
    '2027-05-13': [1020, 1080], '2027-05-14': [480, 1080], '2027-05-15': [480, 1080], '2027-05-16': [480, 1080],
    '2027-05-17': [1020, 1080], '2027-05-18': [1020, 1080], '2027-05-19': [1020, 1080], '2027-05-20': [480, 1080],
    '2027-05-21': [480, 1080], '2027-05-22': [1020, 1080], '2027-05-23': [1020, 1080], '2027-05-24': [1020, 1080],
    '2027-05-25': [1020, 1080], '2027-05-26': [1020, 1080], '2027-05-27': [1020, 1080], '2027-05-28': [1020, 1080],
    '2027-05-29': [480, 1080], '2027-05-30': [480, 1080], '2027-05-31': [480, 1080], '2027-06-01': [480, 720],
    '2027-06-02': [480, 720], '2027-06-03': [480, 720], '2027-06-04': [480, 720], '2027-06-05': [480, 720],
    '2027-06-06': [480, 720], '2027-06-07': [480, 1080], '2027-06-08': [480, 1080], '2027-06-09': [480, 1080],
    '2027-06-10': [1020, 1080], '2027-06-11': [1020, 1080], '2027-06-12': [1020, 1080], '2027-06-13': [1020, 1080],
    '2027-06-15': [1020, 1080], '2027-06-16': [480, 1080], '2027-06-17': [480, 1080], '2027-06-18': [480, 1080],
    '2027-06-19': [1020, 1080], '2027-06-20': [1020, 1080], '2027-06-21': [1020, 1080], '2027-06-22': [1020, 1080],
    '2027-06-23': [1020, 1080], '2027-06-24': [1020, 1080], '2027-06-25': [1020, 1080], '2027-06-26': [480, 1080],
    '2027-06-27': [480, 1080], '2027-06-28': [1020, 1080], '2027-06-29': [1020, 1080], '2027-06-30': [1020, 1080],
    '2027-07-01': [1020, 1080], '2027-07-02': [480, 1080], '2027-07-03': [480, 1080], '2027-07-04': [480, 1080],
    '2027-07-05': [1020, 1080], '2027-07-06': [1020, 1080], '2027-07-07': [1020, 1080], '2027-07-08': [480, 1080],
    '2027-07-09': [480, 1080], '2027-07-10': [480, 1080], '2027-07-11': [480, 1080], '2027-07-12': [480, 1080],
    '2027-07-13': [480, 1080], '2027-07-14': [480, 1080], '2027-07-15': [480, 1080], '2027-07-16': [480, 1080],
    '2027-07-17': [1020, 1080], '2027-07-18': [1020, 1080], '2027-07-19': [1020, 1080], '2027-07-20': [1020, 1080],
    '2027-07-21': [1020, 1080], '2027-07-22': [1020, 1080], '2027-07-23': [1020, 1080], '2027-07-24': [480, 1080],
    '2027-07-25': [480, 1080], '2027-07-26': [480, 1080], '2027-07-27': [480, 1080], '2027-07-28': [480, 1080],
    '2027-07-29': [480, 1080], '2027-07-30': [480, 1080], '2027-07-31': [480, 1080], '2027-08-01': [480, 1080],
    '2027-08-02': [480, 1080], '2027-08-03': [480, 1080], '2027-08-04': [1020, 1080], '2027-08-05': [1020, 1080],
    '2027-08-06': [1020, 1080], '2027-08-07': [480, 1080], '2027-08-08': [480, 1080], '2027-08-09': [1020, 1080],
    '2027-08-10': [1020, 1080], '2027-08-11': [1020, 1080], '2027-08-12': [1020, 1080], '2027-08-13': [1020, 1080],
    '2027-08-14': [480, 1080], '2027-08-15': [480, 1080], '2027-08-16': [480, 1080], '2027-08-17': [1020, 1080],
    '2027-08-18': [1020, 1080], '2027-08-19': [1020, 1080], '2027-08-20': [1020, 1080], '2027-08-21': [1020, 1080],
    '2027-08-22': [1020, 1080]
  };

  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function sydneyNow() {
    var parts = new Intl.DateTimeFormat('en-AU', {
      timeZone: AVAILABILITY.timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(new Date());
    var get = function (type) { var match = parts.find(function (p) { return p.type === type; }); return match ? match.value : ''; };
    return {
      year: Number(get('year')),
      month: Number(get('month')),
      day: Number(get('day')),
      hour: Number(get('hour')),
      minute: Number(get('minute'))
    };
  }

  function formatYmd(y, m, d) {
    return y + '-' + pad(m) + '-' + pad(d);
  }

  function parseYmd(ymd) {
    var parts = ymd.split('-').map(Number);
    return { year: parts[0], month: parts[1], day: parts[2] };
  }

  function weekdayOfYmd(ymd) {
    var parts = parseYmd(ymd);
    var utcGuess = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0));
    var dayName = new Intl.DateTimeFormat('en-AU', {
      timeZone: AVAILABILITY.timeZone,
      weekday: 'short'
    }).format(utcGuess);
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return map[dayName];
  }

  function updatePackageSummary() {
    var box = document.getElementById('package-summary');
    if (!box) return;
    var type = document.getElementById('reading-type').value;
    var pkg = document.getElementById('reading-option').value;
    var info = PACKAGE_INFO[pkg];
    var strong = box.querySelector('strong');
    var span = box.querySelector('span');
    if (info) {
      strong.textContent = info.label;
      span.textContent = info.price + ' · pay on Stripe after this booking number is emailed';
      return;
    }
    if (type === 'live') {
      strong.textContent = 'Live video reading';
      span.textContent = 'Choose 30, 60 or 90 minutes to see the price.';
      return;
    }
    if (type === 'recorded') {
      strong.textContent = 'Recorded video reading';
      span.textContent = 'Choose 5, 7 or 11 questions to see the price.';
      return;
    }
    strong.textContent = 'Select a format and package';
    span.textContent = 'The price will appear here in Australian dollars.';
  }

  function setupDateLimits() {
    var dateInput = document.getElementById('booking-date');
    if (!dateInput) return;
    var now = sydneyNow();
    var today = formatYmd(now.year, now.month, now.day);
    dateInput.min = today;
    dateInput.max = AVAILABILITY.maxDate;
  }

  function hoursForDate(ymd) {
    if (FREE_HOURS[ymd]) {
      return { startMinutes: FREE_HOURS[ymd][0], endMinutes: FREE_HOURS[ymd][1] };
    }
    if (ymd >= AVAILABILITY.sheetStart && ymd <= AVAILABILITY.maxDate) {
      return null;
    }
    var weekday = weekdayOfYmd(ymd);
    var hours = AVAILABILITY.hours[weekday];
    if (!hours) return null;
    return { startMinutes: hours.startHour * 60, endMinutes: hours.endHour * 60 };
  }

  function hhmmToMinutes(hhmm) {
    var parts = String(hhmm).split(':');
    return Number(parts[0]) * 60 + Number(parts[1] || 0);
  }

  function overlapsBusy(slotStart, duration, busy) {
    var slotEnd = slotStart + duration;
    var buffer = AVAILABILITY.bufferMinutes || 0;
    return (busy || []).some(function (entry) {
      var busyStart = hhmmToMinutes(entry.start);
      var busyEnd = hhmmToMinutes(entry.end) + buffer;
      if (isNaN(busyStart) || isNaN(busyEnd)) return false;
      return slotStart < busyEnd && slotEnd > busyStart;
    });
  }

  function loadBusySlots(ymd) {
    return new Promise(function (resolve, reject) {
      var callbackName = 'busyCb_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
      var scriptNode = null;
      var settled = false;
      var timeout = setTimeout(function () {
        cleanup();
        if (!settled) {
          settled = true;
          reject(new Error('timeout'));
        }
      }, 10000);

      function cleanup() {
        clearTimeout(timeout);
        delete window[callbackName];
        if (scriptNode && scriptNode.parentNode) {
          scriptNode.parentNode.removeChild(scriptNode);
        }
      }

      window[callbackName] = function (data) {
        cleanup();
        if (settled) return;
        settled = true;
        resolve(Array.isArray(data && data.busy) ? data.busy : []);
      };

      scriptNode = document.createElement('script');
      scriptNode.src = 'https://script.google.com/macros/s/AKfycbyrLcMbIha3Gs2lwjKD54c92xmXx4fpSSGXcvXGLikhXQGUaK8PgD_qZfqyK7ARiY5K7Q/exec?date=' + encodeURIComponent(ymd) + '&callback=' + encodeURIComponent(callbackName) + '&_=' + Date.now();
      scriptNode.onerror = function () {
        cleanup();
        if (!settled) {
          settled = true;
          reject(new Error('network'));
        }
      };
      document.body.appendChild(scriptNode);
    });
  }

  function formatDisplayTime(hour, minute) {
    var ampm = hour >= 12 ? 'pm' : 'am';
    var h = hour % 12;
    if (h === 0) h = 12;
    return h + ':' + pad(minute) + ' ' + ampm;
  }

  function getSelectedDurationMinutes() {
    var selected = document.getElementById('reading-option').value;
    if (selected === 'live-60') return 60;
    if (selected === 'live-90') return 90;
    return 30;
  }

  async function updateTimeSlots() {
    var dateInput = document.getElementById('booking-date');
    var timeSelect = document.getElementById('booking-time');
    var note = document.getElementById('availability-note');
    var ymd = dateInput.value;

    timeSelect.innerHTML = '<option value="" disabled selected>Select</option>';
    note.textContent = '';

    if (!ymd) {
      timeSelect.innerHTML = '<option value="" disabled selected>Select a date first</option>';
      return;
    }

    if (AVAILABILITY.blockedDates.indexOf(ymd) !== -1) {
      dateInput.value = '';
      note.textContent = 'That date is unavailable. Please choose another day.';
      return;
    }

    var hours = hoursForDate(ymd);
    if (!hours) {
      dateInput.value = '';
      note.textContent = 'Live readings are not available on that date.';
      return;
    }

    var duration = getSelectedDurationMinutes();
    var endLimitMinutes = hours.endMinutes;
    var now = sydneyNow();
    var today = formatYmd(now.year, now.month, now.day);
    var nowMinutes = now.hour * 60 + now.minute;

    note.textContent = 'Checking available times...';

    var busy = [];
    try {
      busy = await loadBusySlots(ymd);
    } catch (error) {
      timeSelect.innerHTML = '<option value="" disabled selected>Times unavailable</option>';
      note.textContent = 'Could not load booked times for that date. Please wait a moment and choose the date again.';
      return;
    }

    var slots = [];
    for (var minutes = hours.startMinutes; minutes + duration <= endLimitMinutes; minutes += AVAILABILITY.slotMinutes) {
      if (ymd === today && minutes < nowMinutes + AVAILABILITY.minHoursNotice * 60) continue;
      if (overlapsBusy(minutes, duration, busy)) continue;
      var hh = Math.floor(minutes / 60);
      var mm = minutes % 60;
      slots.push(pad(hh) + ':' + pad(mm));
    }

    if (!slots.length) {
      timeSelect.innerHTML = '<option value="" disabled selected>No times left this day</option>';
      note.textContent = 'No remaining times on that date. Please choose another day.';
      return;
    }

    timeSelect.innerHTML = '<option value="" disabled selected>Select</option>';
    slots.forEach(function (value) {
      var parts = value.split(':').map(Number);
      var option = document.createElement('option');
      option.value = value;
      option.textContent = formatDisplayTime(parts[0], parts[1]);
      timeSelect.appendChild(option);
    });

    var weekday = weekdayOfYmd(ymd);
    var startH = Math.floor(hours.startMinutes / 60);
    var startM = hours.startMinutes % 60;
    var endH = Math.floor(hours.endMinutes / 60);
    var endM = hours.endMinutes % 60;
    note.textContent = DAY_NAMES[weekday] + ' availability: ' + formatDisplayTime(startH, startM) + '–' + formatDisplayTime(endH, endM) + ' Australian Eastern Time (Sydney). Booked times are hidden.';
  }

  function resetDynamicContainers() {
    var datetimeContainer = document.getElementById('live-datetime-container');
    var questionsContainer = document.getElementById('recorded-questions-container');
    var platform = document.getElementById('platform');
    var bookingDate = document.getElementById('booking-date');
    var bookingTime = document.getElementById('booking-time');

    if (datetimeContainer) datetimeContainer.style.display = 'none';
    if (platform) platform.required = false;
    if (bookingDate) bookingDate.required = false;
    if (bookingTime) bookingTime.required = false;

    if (questionsContainer) {
      questionsContainer.style.display = 'none';
      questionsContainer.innerHTML = '';
    }
  }

  function updateOptions() {
    var readingType = document.getElementById('reading-type').value;
    var optionSelect = document.getElementById('reading-option');

    Array.from(optionSelect.options).forEach(function (opt) {
      if (!opt.value) return;
      var match = !readingType || opt.getAttribute('data-type') === readingType;
      opt.hidden = !match;
      opt.disabled = !match;
    });
    var current = optionSelect.value;
    var stillValid = current && optionSelect.querySelector('option[value="' + current + '"]:not([disabled])');
    optionSelect.value = stillValid ? current : '';
    handlePackageSelection();
    updatePackageSummary();
  }

  function handlePackageSelection() {
    var readingType = document.getElementById('reading-type').value;
    var selectedOption = document.getElementById('reading-option').value;
    var datetimeContainer = document.getElementById('live-datetime-container');
    var questionsContainer = document.getElementById('recorded-questions-container');
    var platform = document.getElementById('platform');
    var bookingDate = document.getElementById('booking-date');
    var bookingTime = document.getElementById('booking-time');

    resetDynamicContainers();

    if (readingType === 'live') {
      if (datetimeContainer) datetimeContainer.style.display = 'block';
      if (platform) platform.required = true;
      if (bookingDate) bookingDate.required = true;
      if (bookingTime) bookingTime.required = true;
      setupDateLimits();
      updateTimeSlots();
    } else if (readingType === 'recorded' && selectedOption) {
      var count = 0;
      if (selectedOption === 'rec-5') count = 5;
      else if (selectedOption === 'rec-7') count = 7;
      else if (selectedOption === 'rec-11') count = 11;

      if (count > 0 && questionsContainer) {
        questionsContainer.style.display = 'block';

        var note = document.createElement('p');
        note.innerHTML = '<em>Readings will be delivered within 3 business days of your questions being submitted.</em>';
        questionsContainer.appendChild(note);

        var hint = document.createElement('p');
        hint.className = 'question-hint';
        hint.textContent = 'Tip: be as specific as you can. e.g. "What do I need to know about my relationship with X?" or "What is blocking my progress in my career right now?"';
        questionsContainer.appendChild(hint);

        for (var i = 1; i <= count; i++) {
          var p = document.createElement('p');
          p.innerHTML = '<label for="question-' + i + '">Question ' + i + '</label><input type="text" id="question-' + i + '" name="question-' + i + '" required placeholder="e.g. What do I need to know about...">';
          questionsContainer.appendChild(p);
        }
      }
    }

    updatePackageSummary();
    updateNextSteps();
  }

  function updateNextSteps() {
    var type = document.getElementById('reading-type').value;
    var step3 = document.getElementById('next-step-3');
    if (!step3) return;
    if (type === 'live') {
      step3.textContent = 'A calendar invitation follows once payment is received, in Australian Eastern Time (Sydney).';
    } else if (type === 'recorded') {
      step3.textContent = 'Your recorded reading will be delivered by email within 3 business days of your questions being submitted.';
    } else {
      step3.textContent = 'For live readings, a calendar invitation follows once payment is received. For recorded readings, your video will be delivered by email within 3 business days of your questions being submitted.';
    }
  }

  function makeBookingNumber() {
    var now = sydneyNow();
    var stamp = pad(now.day) + pad(now.month) + String(now.year) + pad(now.hour) + pad(now.minute);
    var suffix = pad(Math.floor(Math.random() * 100));
    return stamp + '-' + suffix;
  }

  function showSuccess(bookingNumber) {
    var successMsg = document.getElementById('success-message');
    var formNode = document.getElementById('booking-form');
    var readingType = document.getElementById('reading-type').value;
    var firstName = (document.getElementById('first-name').value || '').trim();
    var lead = document.getElementById('success-lead');
    var detail = document.getElementById('success-detail');
    var bookingEl = document.getElementById('success-booking');
    var payBtn = document.getElementById('success-pay');
    var pkg = document.getElementById('reading-option').value;
    var payUrl = PAYMENT_LINKS[pkg];

    if (lead) {
      lead.textContent = firstName ? 'Thank you, ' + firstName + '. We’ve received your booking.' : 'Thank you. We’ve received your booking.';
    }

    if (detail) {
      if (readingType === 'live') {
        detail.textContent = 'Please check your confirmation email for the booking number. A calendar invitation follows once payment is received. The reading time is in Australian Eastern Time (Sydney). If the invite subject shows UTC, use your local time and confirm the Sydney slot.';
      } else if (readingType === 'recorded') {
        detail.textContent = 'Please check your confirmation email for the booking number. Your recorded reading will be delivered within 3 business days of your questions being submitted.';
      }
    }

    if (bookingEl && bookingNumber) {
      bookingEl.textContent = 'Booking number: ' + bookingNumber;
    }

    if (payBtn && payUrl) {
      payBtn.href = payUrl;
      payBtn.style.display = 'inline-block';
    } else if (payBtn) {
      payBtn.style.display = 'none';
    }

    formNode.style.display = 'none';
    successMsg.style.display = 'block';
    window.scrollTo({ top: successMsg.offsetTop - 40, behavior: 'smooth' });
  }

  function prefillFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    var topic = params.get('topic');
    var pkg = params.get('package');

    if (type === 'live' || type === 'recorded') {
      document.getElementById('reading-type').value = type;
      updateOptions();
    }

    if (pkg) {
      var optionSelect = document.getElementById('reading-option');
      var match = Array.from(optionSelect.options).find(function (opt) { return opt.value === pkg; });
      if (match && !match.disabled) {
        optionSelect.value = pkg;
        handlePackageSelection();
      }
    }

    if (topic) {
      var remarks = document.getElementById('remarks');
      if (remarks) {
        remarks.placeholder = 'Topic: ' + topic;
        if (!remarks.value) remarks.value = 'I would like guidance on ' + topic + '.';
      }
    }

    updatePackageSummary();
  }

  function initBookingForm() {
    form.setAttribute('novalidate', 'novalidate');
    var status = document.getElementById('form-status');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var missing = [];
      var need = function (id, label) {
        var el = document.getElementById(id);
        if (!el) return;
        var value = el.type === 'checkbox' ? (el.checked ? 'yes' : '') : (el.value || '').trim();
        if (!value) {
          missing.push(label);
          el.classList.add('is-invalid');
          el.setAttribute('aria-invalid', 'true');
        } else {
          el.classList.remove('is-invalid');
          el.setAttribute('aria-invalid', 'false');
        }
      };

      need('reading-type', 'format');
      need('reading-option', 'package');

      var type = (document.getElementById('reading-type').value || '').trim();
      if (type === 'live') {
        need('platform', 'video platform');
        need('booking-date', 'preferred date');
        need('booking-time', 'preferred time');
      }

      var questions = document.getElementById('recorded-questions-container');
      if (questions && questions.style.display !== 'none') {
        var boxes = questions.querySelectorAll('input[type="text"]');
        boxes.forEach(function (box, index) {
          if (!((box.value || '').trim())) {
            missing.push('question ' + (index + 1));
            box.classList.add('is-invalid');
            box.setAttribute('aria-invalid', 'true');
          } else {
            box.classList.remove('is-invalid');
            box.setAttribute('aria-invalid', 'false');
          }
        });
      }

      need('first-name', 'first name');
      need('last-name', 'last name');
      need('email', 'email');
      need('consent', 'consent');

      if (missing.length) {
        if (status) {
          status.style.display = 'block';
          status.style.color = '#8a2a2a';
          status.textContent = missing.length === 1
            ? 'Please add your ' + missing[0] + ' before continuing.'
            : 'Please complete these fields: ' + missing.join(', ') + '.';
        }
        var firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
        return;
      }

      if (status) {
        status.style.display = 'block';
        status.style.color = '#2e1f3d';
        status.textContent = 'Sending your booking request...';
      }

      var bookingNumber = makeBookingNumber();
      window.setTimeout(function () {
        if (status) status.textContent = '';
        showSuccess(bookingNumber);
      }, 250);
    });

    document.getElementById('reading-type').addEventListener('change', updateOptions);
    document.getElementById('reading-option').addEventListener('change', handlePackageSelection);
    if (document.getElementById('booking-date')) {
      document.getElementById('booking-date').addEventListener('change', updateTimeSlots);
    }

    prefillFromQuery();
    updatePackageSummary();
  }

  initBookingForm();
})();
