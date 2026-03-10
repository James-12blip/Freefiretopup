const API_URL = 'https://freefiretopup-hd4w.onrender.com/api/orders';

const paystackLinks = {
  "19999 Diamonds": "https://paystack.shop/pay/tllxmb78ri",
  "31000 Diamonds": "https://paystack.shop/pay/937dw7dkgf",
  "50200 Diamonds": "https://paystack.shop/pay/uh0uz-e0jo",
  "100060 Diamonds": "https://paystack.shop/pay/cmi0magsg5"
};

function openForm(packageName) {
  document.getElementById("paymentModal").style.display = "flex";
  document.getElementById("selectedPackage").innerText = "Package: " + packageName;
  localStorage.setItem("currentPackage", packageName);
}

function closeForm() {
  document.getElementById("paymentModal").style.display = "none";
  document.getElementById("message").innerText = "";
  document.getElementById("uid").value = "";
}

function goToPaystack() {
  const uid = document.getElementById("uid").value.trim();
  const packageName = localStorage.getItem("currentPackage");
  const messageEl = document.getElementById("message");

  if (!uid) {
    messageEl.style.color = "#ff4444";
    messageEl.innerText = "❌ Please enter your Free Fire UID";
    return;
  }

  // Save UID + package to backend
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ package: packageName, uid })
  });

  // Redirect to the correct live Paystack page
  window.location.href = paystackLinks[packageName];
}

window.onclick = function(event) {
  const modal = document.getElementById("paymentModal");
  if (event.target === modal) closeForm();
}