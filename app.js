const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-num-input');
const tipPercents = document.querySelectorAll('.percents div:not(.input)');

const bill = document.querySelector('.bill');
const people = document.querySelector('.people-nums');
const tipPercent = document.querySelector('.tip-percent');

const totalTip = document.getElementById('total-tip');
const tipAmount = document.getElementById('tip-amount');

billInput.addEventListener('focusout', () => {
	billInputHandler();
});

peopleInput.addEventListener('focusout', () => {});

for (percent of tipPercents) {
	percent.addEventListener('click', function (event) {
		tipPercentsHandler(event);
		const tip = tipCalc(event);
		totalTip.innerText = tip.toFixed(2);
		const peopleNum = peopleNumInputHandler();
		const tipAmountNum = tip / peopleNum;
		tipAmount.innerText = tipAmountNum.toFixed(2);
	});
}

const billInputHandler = () => {
	if (billInput.value <= 0) {
		bill.classList.add('warn');
	} else {
		bill.classList.remove('warn');
		return +billInput.value;
	}
};

const peopleNumInputHandler = () => {
	if (peopleInput.value <= 0) {
		people.classList.add('warn');
	} else {
		people.classList.remove('warn');
		return +peopleInput.value;
	}
};

const tipPercentsHandler = (event) => {
	if (tipPercent.querySelector('.select')) {
		tipPercent.querySelector('.select').classList.remove('select');
	}
	event.target.closest('div').classList.toggle('select');
	const percent = event.target.closest('div').innerText;
	const num = +percent.replace('%', '');
	return num;
};

const tipCalc = (event) => {
	const bill = billInputHandler();
	const tipPercent = tipPercentsHandler(event);

	return bill * (tipPercent / 100);
};
