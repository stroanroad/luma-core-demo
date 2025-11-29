// HUB DEFINITIONS
const hubs = {
  finance: {
    title: "Finance Hub",
    actions: [
      ["invoice", "Create Sample Invoice"],
      ["payment", "Record Payment Event"]
    ]
  },
  cannabis: {
    title: "Cannabis Hub",
    actions: [
      ["prescription", "Create Prescription"],
      ["dispense", "Dispense Medication"]
    ]
  },
  government: {
    title: "Government Hub",
    actions: [
      ["open-case", "Open Case"],
      ["close-case", "Close Case"]
    ]
  }
};

// DOM
const hubContent = document.getElementById("hub-content");
const receiptList = document.getElementById("receipt-list");
const navBtns = document.querySelectorAll(".hub-btn");

// RENDER HUB
function renderHub(key) {
  const hub = hubs[key];

  hubContent.innerHTML = `
      <h2>${hub.title}</h2>
      <p style="opacity:.8;margin-bottom:.6rem;">Simulated Workflow Actions</p>
      ${hub.actions
        .map(
          (a) =>
            `<button class="action-btn" data-action="${a[0]}" data-hub="${key}">
              ${a[1]}
            </button>`
        )
        .join("")}
  `;

  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.onclick = () => {
      const action = btn.dataset.action;
      createReceipt(key, action);
    };
  });
}

// RECEIPT GENERATOR
function createReceipt(hub, action) {
  const now = new Date().toISOString();
  const id = Math.random().toString(36).slice(2, 10);

  const li = document.createElement("li");
  li.classList.add("receipt-item");
  li.textContent = `[${now}] • hub=${hub} • action=${action} • id=${id}`;

  receiptList.prepend(li);
}

// NAVIGATION HANDLER
navBtns.forEach((btn) => {
  btn.onclick = () => {
    navBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderHub(btn.dataset.hub);
  };
});

// Default Hub
renderHub("finance");

// PWA SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
