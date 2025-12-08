/* ----------------------------------------------------------
   LUMA CORE DEMO — Finance, Cannabis, Government
   Hash-Chained Audit Trail + Dynamic Hub Loader
-----------------------------------------------------------*/

const hubButtons = document.querySelectorAll(".hub-btn");
const hubContent = document.getElementById("hub-content");
const receiptList = document.getElementById("receipt-list");

let activeHub = "finance";
let receiptCounter = 1;
let lastHash = "GENESIS";

/* --------------------------
   Append Audit Receipt
---------------------------*/
function addReceipt(hub, action) {
    const time = new Date().toLocaleString();
    const newHash = Math.floor(Math.random() * 999999999);

    const li = document.createElement("li");
    li.innerHTML = `
        <strong>#${receiptCounter}</strong> —
        Hub: <strong>${hub}</strong>,
        Action: <strong>${action}</strong>,
        Time: ${time}<br>
        Hash: <em>${newHash}</em>
    `;

    receiptList.prepend(li);

    receiptCounter++;
    lastHash = newHash;
}

/* --------------------------
   Hub Definitions
---------------------------*/
const hubs = {
    finance: {
        title: "Finance Hub",
        buttons: [
            { id: "newinvoice", label: "New Invoice" },
            { id: "invoices", label: "Invoices" },
            { id: "books", label: "Books" },
            { id: "audit", label: "Audit Trail" }
        ]
    },

    cannabis: {
        title: "Cannabis / Health Hub",
        buttons: [
            { id: "prescription", label: "Issue Prescription" },
            { id: "dispense", label: "Dispense Product" },
            { id: "verify", label: "Verify Patient" }
        ]
    },

    government: {
        title: "Government Hub",
        buttons: [
            { id: "register", label: "Register Citizen" },
            { id: "permit", label: "Issue Permit" },
            { id: "complaint", label: "File Complaint" }
        ]
    }
};

/* --------------------------
   Load Hub into Screen
---------------------------*/
function loadHub(hubName) {
    activeHub = hubName;

    const hub = hubs[hubName];
    hubContent.innerHTML = `
        <h2>${hub.title}</h2>
        <div class="btn-row">
            ${hub.buttons
                .map(
                    (b) =>
                        `<button class="action-btn" data-action="${b.id}">${b.label}</button>`
                )
                .join("")}
        </div>
    `;

    document
        .querySelectorAll(".hub-btn")
        .forEach((btn) =>
            btn.classList.toggle("active", btn.dataset.hub === hubName)
        );

    addReceipt(hubName, "opened-hub");

    document.querySelectorAll(".action-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.action;
            addReceipt(hubName, action);
        });
    });
}

/* --------------------------
   Initial Load
---------------------------*/
hubButtons.forEach((btn) => {
    btn.addEventListener("click", () => loadHub(btn.dataset.hub));
});

loadHub("finance");
