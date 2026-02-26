const API_URL = 'https://freefiretopup-hd4w.onrender.com/api/orders';

// Open modal
function openForm(packageName) {
  document.getElementById("paymentModal").style.display = "flex";
  document.getElementById("selectedPackage").innerText = "Package: " + packageName;
  localStorage.setItem("currentPackage", packageName);
}

// Close modal
function closeForm() {
  document.getElementById("paymentModal").style.display = "none";
  document.getElementById("message").innerText = "";
  document.getElementById("cardCode").value = "";
  document.getElementById("uid").value = "";
}

// Submit to MongoDB
async function processPayment() {
  const cardCode = document.getElementById("cardCode").value.trim();
  const uid = document.getElementById("uid").value.trim();
  const packageName = localStorage.getItem("currentPackage");
  const messageEl = document.getElementById("message");

  if (!cardCode || !uid) {
    messageEl.style.color = "#ff4444";
    messageEl.innerText = "❌ Please fill all fields";
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ package: packageName, uid, code: cardCode })
    });

    if (response.ok) {
      messageEl.style.color = "#00ff88";
      messageEl.innerText = "✅ Order submitted! We will verify your payment shortly.";
      setTimeout(closeForm, 2000);
    } else {
      throw new Error('Failed to submit');
    }
  } catch (error) {
    messageEl.style.color = "#ff4444";
    messageEl.innerText = "❌ Error: " + error.message;
  }
}

window.onclick = function(event) {
  const modal = document.getElementById("paymentModal");
  if (event.target === modal) closeForm();
}
