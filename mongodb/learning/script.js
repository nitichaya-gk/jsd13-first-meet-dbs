document.addEventListener('DOMContentLoaded', function () {

  /* Mobile Nav Toggle */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  toggle.addEventListener('click', function () {
    links.classList.toggle('nav__links--open');
  });

  document.querySelectorAll('.nav__links a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('nav__links--open');
    });
  });

  /* APR Calculator */
  var amountSlider = document.getElementById('loanAmount');
  var rateSlider = document.getElementById('interestRate');
  var amountDisplay = document.getElementById('amountDisplay');
  var rateDisplay = document.getElementById('rateDisplay');
  var monthlyPayment = document.getElementById('monthlyPayment');
  var effectiveApr = document.getElementById('effectiveApr');
  var totalInterest = document.getElementById('totalInterest');
  var totalPayment = document.getElementById('totalPayment');
  var periodButtons = document.querySelectorAll('.calc__periods button');
  var selectedMonths = 12;

  function formatNumber(n) {
    return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function calculate() {
    var principal = parseFloat(amountSlider.value);
    var annualRate = parseFloat(rateSlider.value);
    var months = selectedMonths;

    amountDisplay.textContent = formatNumber(principal);
    rateDisplay.textContent = annualRate;

    var monthlyRate = (annualRate / 100) / 12;
    var payment = 0;

    if (annualRate === 0) {
      payment = principal / months;
    } else {
      payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    var totalPaid = payment * months;
    var interest = totalPaid - principal;

    monthlyPayment.textContent = '\u0E3F' + formatNumber(payment);
    totalInterest.textContent = '\u0E3F' + formatNumber(interest);
    totalPayment.textContent = '\u0E3F' + formatNumber(totalPaid);
    effectiveApr.textContent = annualRate.toFixed(1) + '%';

    /* Update phone mock */
    var mockAmount = document.querySelector('.phone-mock__amount');
    if (mockAmount) {
      mockAmount.textContent = '\u0E3F' + formatNumber(principal);
    }
  }

  amountSlider.addEventListener('input', calculate);
  rateSlider.addEventListener('input', calculate);

  periodButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      periodButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      selectedMonths = parseInt(btn.getAttribute('data-months'));
      calculate();
    });
  });

  calculate();

  /* Form Submit Handler */
  var form = document.getElementById('applyForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.textContent = '\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23...';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = '\u0E2A\u0E48\u0E07\u0E04\u0E33\u0E02\u0E2D\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E32\u0E07\u0E44\u0E25\u0E19\u0E4C\u0E20\u0E32\u0E22\u0E43\u0E19 24 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07';
      btn.disabled = false;
    }, 1500);
  });

});
