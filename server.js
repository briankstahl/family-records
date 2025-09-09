const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // serve CSS/images

// In-memory "database"
let records = [];

/* ===== Landing Page ===== */
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome - Family Records</title>
      <link rel="stylesheet" href="/style.css">
      <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700&display=swap" rel="stylesheet">
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #121212;
          color: white;
          font-family: 'Oxanium', cursive;
        }
        .landing {
          text-align: center;
          animation: fadeIn 2s ease-in;
        }
        .landing img {
          width: 300px;
          max-width: 90%;
          display: block;
          margin: 0 auto;
          cursor: pointer;
          border-radius: 20px;
          transition: transform 0.3s;
          background: white;
          padding: 10px;
        }
        .landing img:hover {
          transform: scale(1.05);
        }
        .landing h1 {
          margin-top: 20px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>
    </head>
    <body>
      <div class="landing">
        <a href="/rules">
          <img src="/logo.png" alt="Family Records Logo">
        </a>
        <h1>Click the logo to continue</h1>
      </div>
    </body>
    </html>
  `);
});

/* ===== Rules & History Page (Collapsible + Dark Mode + Arrows) ===== */
app.get("/rules", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Stahl Book of World Records - Rules & History</title>
  <link rel="stylesheet" href="/style.css">
  <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Oxanium', cursive;
      background: #f4f4f4;
      color: #222;
      margin: 0;
      padding: 20px;
      line-height: 1.7;
      transition: background 0.3s, color 0.3s;
    }
    body.dark-mode {
      background: #121212;
      color: #f0f0f0;
    }
    .container {
      max-width: 900px;
      margin: auto;
    }
    h1, h2 {
      text-align: center;
    }
    .collapsible {
      background-color: #007bff;
      color: white;
      cursor: pointer;
      padding: 10px 20px;
      width: 100%;
      border: none;
      text-align: left;
      outline: none;
      font-size: 1.1rem;
      border-radius: 5px;
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.3s;
    }
    .dark-mode .collapsible {
      background-color: #1f6feb;
      color: #f0f0f0;
    }
    .collapsible:hover {
      background-color: #0056b3;
    }
    .collapsible .arrow {
      transition: transform 0.3s;
    }
    .collapsible.active .arrow {
      transform: rotate(90deg);
    }
    .content {
      padding: 0 20px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      background-color: #f4f4f4;
      margin-bottom: 10px;
      border-left: 4px solid #007bff;
    }
    .dark-mode .content {
      background-color: #1e1e1e;
      border-left: 4px solid #1f6feb;
    }
    .content p, .content li {
      margin: 8px 0;
      text-indent: 20px;
    }
    ul {
      margin-left: 20px;
    }
    .enter-btn, .dark-mode-toggle {
      display: block;
      width: 220px;
      margin: 20px auto;
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      transition: background 0.3s;
    }
    .enter-btn:hover, .dark-mode-toggle:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Stahl Book of World Records</h1>
    <h2>Rules & History</h2>

    <button class="dark-mode-toggle">Toggle Dark Mode</button>

    <button class="collapsible">The Founding of SBWR <span class="arrow">▶</span></button>
    <div class="content">
      <p>Since time immemorial, the Stahl family has been renowned for its competitive spirit and a deep-seated belief that every member possesses a unique, record-breaking talent. The founding of the Stahl Book of World Records (SBWR) was not a single event, but the culmination of decades worth of experiences starting with the eldest brother Matthew (b.1969), then Brian (b.1973), then Keith (b.1976).</p>
      <p>The three original "Founding Fathers" came to a consensus to establish the Supreme Council of the Stahls (SCS), acting as the sole arbiters of record claims, maintaining integrity, fairness, and worthiness.</p>
    </div>

    <button class="collapsible">SBWR Official By-Laws <span class="arrow">▶</span></button>
    <div class="content">
      <h4>Article 1: Membership and Eligibility</h4>
      <ul>
        <li><strong>1.1 The Stahl Bloodline:</strong> Direct descendants or family members by marriage are recognized and may submit records.</li>
        <li><strong>1.2 Past and Future Generations:</strong> Previous generations may be considered by majority SCS vote; future generations automatically have membership.</li>
        <li><strong>1.3 Claim of Membership:</strong> The SCS verifies membership claims to maintain integrity.</li>
      </ul>
      <h4>Article 2: Submission and Worthiness of Records</h4>
      <ul>
        <li><strong>2.1 Submission Process:</strong> Record claims must be submitted online with all relevant evidence (photos, videos, witness statements).</li>
        <li><strong>2.2 Worthiness and Review:</strong> The SCS reviews submissions to ensure integrity, fairness, and humor.</li>
      </ul>
      <h4>Article 3: Nullification of Records</h4>
      <ul>
        <li><strong>3.1 The Grandfather Clause:</strong> SCS can review and nullify any record in perpetuity.</li>
        <li><strong>3.2 Grounds for Nullification:</strong> Deception, fraudulent actions, acts of "douchebagery," or changes in family status.</li>
        <li><strong>3.3 Final Authority:</strong> SCS judgments are final and binding.</li>
      </ul>
    </div>

    <button class="collapsible">Official Rules & Submission Process <span class="arrow">▶</span></button>
    <div class="content">
      <h4>1. General Principles</h4>
      <ul>
        <li>Spirit of the Records: Fun, sportsmanship, and celebrating unique talents.</li>
        <li>Originality: Records must be unique and verifiable.</li>
        <li>Fair Play: Attempts to falsify records lead to disqualification.</li>
      </ul>
      <h4>2. Submission Guidelines</h4>
      <ul>
        <li>Who Can Submit: Any family member on behalf of themselves or another.</li>
        <li>Record Title: Must be clear and descriptive.</li>
        <li>Description: Detailed, defining the achievement and rules.</li>
        <li>Evidence: Photos, videos, witness statements, dated.</li>
        <li>Submission Form: Include Title, Name, Date, Description, Evidence link/upload.</li>
      </ul>
      <h4>3. The Review Process</h4>
      <ul>
        <li>Review SCS: Verifies all submissions; membership passes to eldest descendant.</li>
        <li>Verification: Ensures validity and rules compliance.</li>
        <li>Approval/Rejection: SCS approves or rejects; appeals allowed but final decision rests with SCS.</li>
      </ul>
      <h4>4. Maintaining the Records</h4>
      <ul>
        <li>Challenging a Record: Members can challenge existing records with new evidence; SCS updates if a new record is set.</li>
      </ul>
    </div>

    <a href="/home" class="enter-btn">Enter the SBWR</a>
  </div>

  <script>
    // Collapsible sections with arrows
    const coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        const arrow = this.querySelector(".arrow");
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          arrow.textContent = "▶";
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          arrow.textContent = "▼";
        }
      });
    }

    // Dark mode toggle
    const darkBtn = document.querySelector(".dark-mode-toggle");
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  </script>
</body>
</html>
  `);
});


/* ===== Main Home Page (Form) ===== */
app.get("/home", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Family Records</title>
      <link rel="stylesheet" href="/style.css">
      <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="container">
        <button class="toggle-mode" onclick="toggleDarkMode()">🌙 Toggle Dark Mode</button>

        <!-- Header / Logo -->
        <div class="header">
          <img src="/logo.png" alt="Family Logo">
          <h1>Family Records</h1>
        </div>

        <form method="POST" action="/add">
          <input name="name" placeholder="Family member name" required />
          <input name="title" placeholder="Record title" required />
          <input type="date" name="date" required />
          <input name="location" placeholder="Location (City, Place, etc.)" required />
          <input name="mapLink" placeholder="Google Maps link" />
          <textarea name="description" placeholder="Description" required></textarea>
          <input name="links" placeholder="Supporting links (comma separated)" />
          <input name="picture" placeholder="Picture URL" />
          <button type="submit">Add Record</button>
        </form>

        <p style="text-align:center; margin-top:20px;">
          <a href="/records">View All Records</a>
        </p>
      </div>

      <script>
        if (localStorage.getItem("theme") === "dark") {
          document.body.classList.add("dark");
        }
        function toggleDarkMode() {
          document.body.classList.toggle("dark");
          if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
          } else {
            localStorage.setItem("theme", "light");
          }
        }
      </script>
    </body>
    </html>
  `);
});

/* ===== Handle Form Submission ===== */
app.post("/add", (req, res) => {
  const { name, title, date, location, mapLink, description, links, picture } = req.body;
  const linkArray = links ? links.split(",").map(l => l.trim()) : [];
  records.push({ name, title, date, location, mapLink, description, links: linkArray, picture });
  res.redirect("/records");
});

/* ===== Records Page ===== */
app.get("/records", (req, res) => {
  let recordsHtml = records.map(r => `
    <div class="record">
      <h2>${r.title}</h2>
      <p><strong>By:</strong> ${r.name}</p>
      <p><strong>Date:</strong> ${r.date}</p>
      <p><strong>Location:</strong> ${r.location} ${r.mapLink ? `(<a href="${r.mapLink}" target="_blank">Map</a>)` : ""}</p>
      <p>${r.description}</p>
      ${r.picture ? `<img src="${r.picture}" alt="${r.name}'s record image" />` : ""}
      ${r.links.length > 0 ? `<p>Links: ${r.links.map(l => `<a href="${l}" target="_blank">${l}</a>`).join(", ")}</p>` : ""}
    </div>
  `).join("");

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Family Records - All Entries</title>
      <link rel="stylesheet" href="/style.css">
      <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="container">
        <button class="toggle-mode" onclick="toggleDarkMode()">🌙 Toggle Dark Mode</button>

        <!-- Header / Logo -->
        <div class="header">
          <img src="/logo.png" alt="Family Logo">
          <h1>Family Records</h1>
        </div>

        ${records.length > 0 ? recordsHtml : "<p>No records yet. Add one!</p>"}

        <p style="text-align:center; margin-top:20px;">
          <a href="/home">Back to form</a>
        </p>
      </div>

      <script>
        if (localStorage.getItem("theme") === "dark") {
          document.body.classList.add("dark");
        }
        function toggleDarkMode() {
          document.body.classList.toggle("dark");
          if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
          } else {
            localStorage.setItem("theme", "light");
          }
        }
      </script>
    </body>
    </html>
  `);
});

/* ===== Start Server ===== */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
