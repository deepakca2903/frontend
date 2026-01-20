const app = document.getElementById("app");
const footer = document.getElementById("footer");

function submitFeedback(event) {
  event.preventDefault(); // stop page reload

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const message = document.getElementById("message").value;
  const errorMsg = document.getElementById("errorMsg");

  // Mobile validation: exactly 10 digits
  // const mobilePattern = /^[0-9]{10}$/;

  // if (!mobilePattern.test(mobile)) {
  //   errorMsg.style.color = "red";
  //   errorMsg.innerText = "Mobile number must be exactly 10 digits";
  //   return false;
  // }

  // Send data to backend
  fetch("http://localhost:5000/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, mobile, message })
  })
    .then(res => res.json())
    .then(data => {
      errorMsg.style.color = "green";
      errorMsg.innerText = data.message;
    })
    .catch(() => {
      errorMsg.style.color = "red";
      errorMsg.innerText = "Error submitting feedback";
    });

  return false;
}


/* ---------- CART STATE ---------- */
let cartItems = [];
let totalCost = 0;

/* ---------- DATA ---------- */
const resources = [
  {
    subject: "Python",
    notes: [
      { id: 1, title: "Python Notes (Module 1)", link: "/requirements/Python M1.pdf", price: 150 },
      { id: 2, title: "Python RE", link: "/requirements/Python RE.pdf", price: 120 },
      { id: 3, title: "Python Files", link: "/requirements/Python Files.pdf", price: 100 },
      { id: 4, title: "Python Functions", link: "/requirements/Python Functions.pdf", price: 130 },
      { id: 5, title: "Python Lists and Dictionary", link: "/requirements/Python Lists and Dictionary.pdf", price: 140 },
      { id: 6, title: "Python Regex", link: "/requirements/Python regex.pdf", price: 110 },
      { id: 7, title: "Python Strings", link: "/requirements/Python Strings.pdf", price: 100 },
      { id: 8, title: "Python Variables", link: "/requirements/Python Variables.pdf", price: 90 }
    ]
  },
  {
    subject: "Mathematics",
    notes: [
      { id: 9, title: "Vector Spaces, Sampling Theory & Optimization", link: "/requirements/Module 1-Notes.pdf", price: 200 },
      { id: 10, title: "Eigen Values and Eigen Vectors", link: "/requirements/Mod 2 -QB.pdf", price: 180 },
      { id: 11, title: "Statistics", link: "/requirements/Mod 3-Statistics.pdf", price: 160 },
      { id: 12, title: "Probability Distribution", link: "/requirements/Mod 4-PD.pdf", price: 170 }
    ]
  },
  {
    subject: "DSA",
    notes: [
      { id: 13, title: "Stacks and Queues", link: "/requirements/DSA Module 1.pdf", price: 190 },
      { id: 14, title: "Linked List", link: "/requirements/DSA Linked list.pdf", price: 180 },
      { id: 15, title: "Trees", link: "/requirements/DSA Trres.pdf", price: 200 },
      { id: 16, title: "Graphs", link: "/requirements/Graphs.pdf", price: 210 },
      { id: 17, title: "Hashing", link: "/requirements/DSA Hashing.pdf", price: 170 },
      { id: 18, title: "BST", link: "/requirements/DSA BST.pdf", price: 190 }
    ]
  },
  {
    subject: "Java",
    notes: [
      { id: 19, title: "OOPS (Module 1)", link: "/requirements/OOPS M1.pdf", price: 160 },
      { id: 20, title: "OOPS (Module 2)", link: "/requirements/OOPS M2.pdf", price: 170 },
      { id: 21, title: "OOPS (Module 3)", link: "/requirements/OOPS M3.pdf", price: 180 },
      { id: 22, title: "Multithreading", link: "/requirements/OOPS Multithreading.pdf", price: 200 }
    ]
  },
  {
    subject: "COA",
    notes: [
      { id: 23, title: "Computer Organization and Architecture (M1 & M2)", link: "/requirements/COA Module 1 and 2.pdf", price: 190 },
      { id: 24, title: "Computer Organization and Architecture (M3)", link: "/requirements/COA Module 3.pdf", price: 180 },
      { id: 25, title: "Computer Organization and Architecture (M4)", link: "/requirements/COA Module 4.pdf", price: 170 }
    ]
  }
];

const announcements = [
  { text: "Library closed this Saturday." },
  { text: "New paid PDFs added in Resources." }
];

/* ---------- CART BUTTON (TOP RIGHT) ---------- */
function renderCartButton() {
  if (document.getElementById("cartBtn")) return;

  const btn = document.createElement("button");
  btn.id = "cartBtn";
  btn.innerText = "🛒 Cart";
  btn.onclick = openCart;

  /* INLINE STYLE — NO CSS FILE TOUCHED */
  btn.style.position = "fixed";
  btn.style.top = "15px";
  btn.style.right = "20px";
  btn.style.padding = "10px 16px";
  btn.style.background = "#1266f1";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "30px";
  btn.style.cursor = "pointer";
  btn.style.zIndex = "2000";

  document.body.appendChild(btn);
}

/* ---------- PAGES ---------- */

function Home() {
  footer.style.display = "block";
  app.innerHTML = `
    <div class="hero home-bg">
      <h1 class="hero__title">Resources Hub for Students</h1>
    </div>
  `;
  renderCartButton();
}

function Announcements() {
  footer.style.display = "block";
  app.innerHTML = `
    <section class="containerf">
      <h3>Announcements</h3>
      <ul>
        ${announcements.map(a => `<li>${a.text}</li>`).join("")}
      </ul>
    </section>
  `;
  renderCartButton();
}
function Contact() {
  footer.style.display = "block";
  app.innerHTML = `
    <section class="containerf">
      <h3>Feedback</h3>

      <form onsubmit="return submitFeedback(event)">
        <input type="text" id="name" placeholder="Name" required>

        <input type="email" id="email" placeholder="Email" required>

        <input 
          type="text" 
          id="mobile" 
          placeholder="Mobile Number" 
          maxlength="10" 
          required
        >

        <textarea id="message" placeholder="Message" required></textarea>
        <button type="submit">Send</button>
      </form>

      <p id="errorMsg"></p>
    </section>
  `;
  renderCartButton();
}

function validateFeedback() {
  const mobile = document.getElementById("mobile").value;
  const errorMsg = document.getElementById("errorMsg");

  // Regular expression: exactly 10 digits
  // const mobilePattern = /^[0-9]{10}$/;

  // if (!mobilePattern.test(mobile)) {
  //   errorMsg.style.color = "red";
  //   errorMsg.innerText = "Mobile number must contain exactly 10 digits";
  //   return false; // stop form submission
  // }

  errorMsg.style.color = "green";
  errorMsg.innerText = "Feedback submitted successfully!";
  return false; // prevent page reload
}


function Resources() {
  footer.style.display = "none";
  let html = `<h2 class="container">Study Resources</h2>`;
  resources.forEach((r, i) => {
    html += `<div class="subject-box" onclick="openSubject(${i})">${r.subject}</div>`;
  });
  app.innerHTML = html;
  renderCartButton();
}

function openSubject(i) {
  const subject = resources[i];
  app.innerHTML = `
    <div class="subject-box active" onclick="Resources()">← ${subject.subject}</div>
    ${subject.notes.map(n => `
      <div class="pdf-card">
        <div class="pdf-card-content">
          <span class="pdf-icon">📄</span>
          <span class="pdf-title">${n.title}</span>
          <div class="pdf-right">
            <span class="price">₹${n.price}</span>
            <button onclick="addToCart('${n.title}', ${n.price})">Add</button>
          </div>
        </div>
      </div>
    `).join("")}
  `;
  renderCartButton();
}

/* ---------- CART LOGIC ---------- */

function addToCart(title, price) {
  cartItems.push({ title, price });
  totalCost += price;
  console.log(`Added: ${title} (₹${price})`);
}

function openCart() {
  app.innerHTML = `
    <section class="containerf">
      <h3>Your Cart</h3>
      ${
        cartItems.length === 0
          ? "<p>No items added.</p>"
          : `
            <ul>
              ${cartItems.map(i => `<li>${i.title} - ₹${i.price}</li>`).join("")}
            </ul>
            <h4>Total: ₹${totalCost}</h4>
            <button onclick="buyNow()">Buy</button>
          `
      }
    </section>
  `;
  renderCartButton();
}

function buyNow() {
  console.log("🛒 CART ITEMS:", cartItems);
  console.log("💰 TOTAL AMOUNT:", totalCost);
  alert("Purchase logged in console.");
}

/* ---------- ROUTER ---------- */
function router() {
  switch (location.hash) {
    case "#resources": Resources(); break;
    case "#announcements": Announcements(); break;
    case "#contact": Contact(); break;
    default: Home();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
