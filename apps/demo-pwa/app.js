/* ----------------------------------------------------------
   LUMA CORE DEMO — APP LOGIC
   Simulated Hubs + Receipt Engine (Demo Only)
-----------------------------------------------------------*/

/* DOM ELEMENTS */
const hubButtons = document.querySelectorAll(".hub-btn");
const hubContent = document.getElementById("hub-content");
const receiptList = document.getElementById("receipt-list");

/* ACTIVE HUB STATE */
let activeHub = "finance";

/* SIMPLE RECEIPT COUNTER (DEMO ONLY) */
let receiptCounter = 1;

/* ----------------------------------------------------------
   HUB DEFINITIONS (DEMO ONLY)
-----------------------------------------------------------*/

const hubs = {
  finance: {
    title: "Finance Hub",
    actions: [
      { id: "invoice", label: "Create Invoice" },
      { id: "payment", label: "Record Payment" },
      { id: "vat", label: "Run VAT Check" }
    ]
  },

  cannabis: {
    title: "Cannabis / Health Hub",
    actions: [
      { id: "prescription", label: "Issue Prescription" },
      { id: "dispense", label: "Dispense Product" },
      { id: "verify", label: "Verify Patient" }
    ]
  },

  government: {
    title: "Government Hub",
    actions: [
      { id: "case_open", label: "Open Case" },
      { id: "case_update", label: "Update Case" },
      { id: "case_close", label: "Close Case" }
    ]
  }
};

/* ----------------------------------------------------------
   SWITCH HUB VIEW
-----------------------------------------------------------*/

function renderHub(hubKey) {
  const hub = hubs[hubKey];

  hubContent.innerHTML = `
    <h2>${hub.title}</h2>
    ${hub.actions
      .map(
        (action) => `
        <button class="action-btn" onclick="createReceipt('${hubKey}', '${action.id}')">
          ${action.label}
        </button>`
      )
      .join("")}
  `;
}

/* ----------------------------------------------------------
   CREATE RECEIPT (SIMULATED)
-----------------------------------------------------------*/

function createReceipt(hub, action) {
  const timestamp = new Date().toLocaleString();

  const receiptText = `#${receiptCounter++} • ${hub.toUpperCase()} • ${action} • ${timestamp}`;

  const li = document.createElement("li");
  li.classList.add("receipt-item");
  li.textContent = receiptText;

  receiptList.prepend(li); // newest at top
}

/* ----------------------------------------------------------
   EVENT LISTENERS — HUB TABS
-----------------------------------------------------------*/

hubButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // update active state
    hubButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    activeHub = btn.dataset.hub;
    renderHub(activeHub);
  });
});

/* ----------------------------------------------------------
   INIT — LOAD DEFAULT HUB
-----------------------------------------------------------*/

renderHub(activeHub);

