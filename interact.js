document.addEventListener("DOMContentLoaded", () => {
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const stepCompliments = document.getElementById("step-compliments");
  const step3a = document.getElementById("step-3a");
  const step3b = document.getElementById("step-3b");
  const step4 = document.getElementById("step-4");
  const step5 = document.getElementById("step-5");
  const step6 = document.getElementById("step-6");
  const stepSuccess = document.getElementById("step-success");

  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const toComplimentsBtn = document.getElementById("to-compliments-btn");
  const toDateBtn = document.getElementById("to-date-btn");
  const selectedDateDisplay = document.getElementById("selected-date-display");
  const toReadyBtn = document.getElementById("to-ready-btn");
  const toFinalBtn = document.getElementById("to-final-btn");
  const payBtn = document.getElementById("pay-btn");

  const monthTitle = document.getElementById("month-title");
  const calendarDays = document.getElementById("calendar-days");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  let currentMonth = 8;

  const monthsData = {
    8: {
      name: "September 2026",
      startDay: 2,
      totalDays: 30,
    },
    9: {
      name: "October 2026",
      startDay: 4,
      totalDays: 31,
    },
  };

  function showStep(step) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.remove("active");
      card.classList.add("hidden");
    });
    step.classList.remove("hidden");
    step.classList.add("active");
  }

  function dodgeNoButton(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const cardRect = step1.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    noBtn.style.position = "absolute";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  }

  noBtn.addEventListener("mouseover", dodgeNoButton);
  noBtn.addEventListener("touchstart", dodgeNoButton, { passive: false });
  noBtn.addEventListener("click", dodgeNoButton);

  yesBtn.addEventListener("click", () => {
    showStep(step2);
  });

  toComplimentsBtn.addEventListener("click", () => {
    showStep(stepCompliments);
  });

  toDateBtn.addEventListener("click", () => {
    renderCalendar();
    showStep(step3a);
  });

  function renderCalendar() {
    const data = monthsData[currentMonth];
    monthTitle.innerText = data.name;
    calendarDays.innerHTML = "";

    for (let i = 0; i < data.startDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("date-cell", "disabled");
      calendarDays.appendChild(emptyCell);
    }

    for (let day = 1; day <= data.totalDays; day++) {
      const cell = document.createElement("div");
      cell.classList.add("date-cell");
      cell.innerText = day;

      cell.addEventListener("click", () => {
        document
          .querySelectorAll(".date-cell")
          .forEach((c) => c.classList.remove("active-date"));
        cell.classList.add("active-date");
        const monthName = currentMonth === 8 ? "September" : "October";
        selectedDateDisplay.innerText = `${monthName} ${day}, 2026 — pick a time`;
        showStep(step3b);
      });

      calendarDays.appendChild(cell);
    }
  }

  prevMonthBtn.addEventListener("click", () => {
    if (currentMonth > 8) {
      currentMonth--;
      renderCalendar();
    }
  });

  nextMonthBtn.addEventListener("click", () => {
    if (currentMonth < 9) {
      currentMonth++;
      renderCalendar();
    }
  });

  const timeSlots = document.querySelectorAll(".time-slot");
  timeSlots.forEach((slot) => {
    slot.addEventListener("click", () => {
      timeSlots.forEach((s) => s.classList.remove("active-time"));
      slot.classList.add("active-time");
      showStep(step4);
    });
  });

  const foodCards = document.querySelectorAll(".food-card");
  foodCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("selected");
    });
  });

  toReadyBtn.addEventListener("click", () => {
    showStep(step5);
  });

  toFinalBtn.addEventListener("click", () => {
    showStep(step6);
  });

  payBtn.addEventListener("click", () => {
    showStep(stepSuccess);
  });
});
