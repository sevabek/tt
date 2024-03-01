window.addEventListener("DOMContentLoaded", () => {

	//табы
	const tabs = document.querySelectorAll(".tabheader__item");
	const tabsContent = document.querySelectorAll(".tabcontent");
	const tabsParent = document.querySelector(".tabheader__items");

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});

		tabs.forEach(item => {
			item.classList.remove("tabheader__item_active");
		});
	}

	function showTabContent(num = 0) {
		tabsContent[num].classList.add("show", "fade");
		tabsContent[num].classList.remove("hide");
		tabs[num].classList.add("tabheader__item_active");
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, index) => {
				if (target == item) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});

	// таймер

	const deadline = "2024-01-12T12:00"; // может приходить из разных источников

	function getTimeRemains(endtime) {
		let days = 0, hours = 0, minutes = 0, seconds = 0;
		const t = new Date(Date.parse(endtime) - Date.now());

		if (t > 0) {
			days = Math.floor(t / (1000 * 60 * 60 * 24)), // потому что может быть дней больше 30
			hours = t.getUTCHours(),
			minutes = t.getUTCMinutes(),
			seconds = t.getUTCSeconds();
		}

		return {
			"total": t,
			"days": days,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds
		};
	}

	function addZeroBefore(number) {
		if (number >= 0 && number < 10) {
			return "0" + number;
		} else return number;
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		updateClock(); // чтобы не ждать 1 сек у таймера

		function updateClock() {
			const t = getTimeRemains(endtime);

			days.textContent = addZeroBefore(t.days);
			hours.textContent = addZeroBefore(t.hours);
			minutes.textContent = addZeroBefore(t.minutes);
			seconds.textContent = addZeroBefore(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(".timer", deadline);

	// модальное окно

	const modalTrigger = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(".modal"),
		modalCloseBtn = document.querySelector("[data-close]");
		
	let modalIsOpen = false;

	function openModal() {
		if (!modalIsOpen) {
			modal.classList.add("show");
			modal.classList.remove("hide");
			document.body.style.overflow = "hidden";
			clearInterval(modalTimerId);
			modalIsOpen = true;
		}
	}

	modalTrigger.forEach((item) => {
		item.addEventListener("click", () => {
			openModal();
		});
	});

	function closeModal() {
		if (modalIsOpen) {
			modal.classList.add("hide");
			modal.classList.remove("show");
			document.body.style.overflow = "scroll";
			modalIsOpen = false;
		}
	}

	modalCloseBtn.addEventListener("click", () => {
		closeModal();
	});

	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 15_000);
	
	window.addEventListener("scroll", (e) => {
		if (Math.ceil(window.scrollY + document.documentElement.clientHeight) >= 
		document.documentElement.scrollHeight) {
			console.log("scrolled down");
			openModal();
		}
	});
});

