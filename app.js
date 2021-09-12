// Inputs
const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-num-input');
const tipPercents = document.querySelectorAll('.percents div:not(.input)');
const percentInput = document.getElementById('percent-input');

// Elements
const bill = document.querySelector('.bill');
const people = document.querySelector('.people-nums');
const tipPercent = document.querySelector('.tip-percent');

const totalTip = document.getElementById('total-tip');
const tipAmount = document.getElementById('tip-amount');

const resetBtn = document.getElementById('reset');

billInput.addEventListener('focusout', () => {
	warnClassHandler(bill, billInput);
});

peopleInput.addEventListener('focusout', () => {
	warnClassHandler(people, peopleInput);
});

const hasValue = (input) => (input.value ? true : false);

const warnClassHandler = (el, input) => {
	hasValue(input) ? el.classList.remove('warn') : el.classList.add('warn');
};

const selectHandler = (event) => {
	if (tipPercent.querySelector('.select')) {
		tipPercent.querySelector('.select').classList.remove('select');
	}
	event.target.closest('div').classList.toggle('select');
};

const getPercent = (event) => {
	let percent;
	if (hasValue(percentInput)) {
		percent = +percentInput.value;
		return percent;
	} else {
		percent = event.target.closest('div').innerText;
		const num = +percent.replace('%', '');
		return num;
	}
};

const tipCalc = (event) => {
	const bill = +billInput.value;
	const tipPercent = getPercent(event);

	return bill * (tipPercent / 100);
};

const showTip = (event) => {
	if (hasValue(billInput) && hasValue(peopleInput)) {
		const tip = tipCalc(event);
		totalTip.innerText = tip.toFixed(2);
		const peopleNum = +peopleInput.value;
		const tipAmountNum = tip / peopleNum;
		tipAmount.innerText = tipAmountNum.toFixed(2);
		resetBtn.classList.add('on');
		turnResetBtn();
	}
};

if (!hasValue(percentInput)) {
	for (percent of tipPercents) {
		percent.addEventListener('click', function (event) {
			// Checking for selection of percents
			selectHandler(event);

			warnClassHandler(bill, billInput);
			warnClassHandler(people, peopleInput);

			// Checking inputs has value
			showTip(event);
		});
	}
}

percentInput.addEventListener('click', function (event) {
	warnClassHandler(bill, billInput);
	warnClassHandler(people, peopleInput);

	// Checking inputs has value
	showTip(event);
});

percentInput.addEventListener('input', function (event) {
	warnClassHandler(bill, billInput);
	warnClassHandler(people, peopleInput);

	// Checking inputs has value
	showTip(event);
});

const turnResetBtn = () => {
	resetBtn.addEventListener(
		'click',
		() => {
			billInput.value = '';
			percentInput.value = '';
			peopleInput.value = '';
			totalTip;
			totalTip.innerText = '0.00';
			tipAmount.innerText = '0.00';
			resetBtn.classList.remove('on');
		},
		{ once: true }
	);
};
