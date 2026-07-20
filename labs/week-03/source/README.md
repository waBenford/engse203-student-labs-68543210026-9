# ENGSE203 LAB 03 — Responsive Web UI & Form Interaction

- ชื่อ-นามสกุล: นายธนกร กองใจ
- รหัสนักศึกษา: 68543210026-9
- ระบบปฏิบัติการที่ใช้: Linux

## วัตถุประสงค์ของงาน
สร้างหน้าเว็บ responsive สำหรับระบบจัดการงานขนาดย่อม ฝึก semantic HTML, CSS layout, mobile-first design, event และ form validation.

## เครื่องมือที่ใช้

Vs code

## วิธีติดตั้งและรัน

npm install
npm run start
npm run build
npm run dev


## โครงสร้างไฟล์

.
├── docs/
├── node_modules/
├── src/
│   ├── main.js
│   └── style.css
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

## หลักฐานผลลัพธ์

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)

## References & AI Assistance

- Source / Documentation:
-----------------------------------------------------
Main
import './style.css';

const form = document.querySelector('#request-form');

// TODO 1: query preview/status/list elements
const status = document.querySelector('#form-status');
const goalCount = document.querySelector('#goal-count');

const preview = {
    requesterName: document.querySelector('#preview-name'),
    requestType: document.querySelector('#preview-type'),
    requestDetails: document.querySelector('#preview-details'),
};

// TODO 2: readForm()
function readForm() {
    return Object.fromEntries(new FormData(form).entries());
}

// TODO 3: renderPreview(data)
function renderPreview(data) {
    preview.requesterName.textContent = data.requesterName?.trim() || 'ยังไม่ระบุชื่อ';
    preview.requestType.textContent = data.requestType || 'ยังไม่เลือกประเภท';
    preview.requestDetails.textContent = data.requestDetails?.trim() || 'ยังไม่มีรายละเอียด';
    goalCount.textContent = `${data.requestDetails?.length || 0} ตัวอักษร`;
}

// TODO 4: validate(data)
function validate(data) {
    const errors = {};

    if (data.requesterName?.trim().length < 2) {
        errors.requesterName = 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
    }

    if (!data.requestType) {
        errors.requestType = 'กรุณาเลือกประเภทการแจ้ง';
    }

    if (data.requestDetails?.trim().length < 10) {
        errors.requestDetails = 'กรุณาเขียนรายละเอียดอย่างน้อย 10 ตัวอักษร';
    }

    return errors;
}

// TODO 5: renderErrors(errors)
function renderErrors(errors) {
    for (const name of ['requesterName', 'requestType', 'requestDetails']) {
        const field = form.elements[name];
        const output = document.querySelector(`#${name}-error`);
        const message = errors[name] ?? '';

        output.textContent = message;
        field.setAttribute('aria-invalid', String(Boolean(message)));
    }
}


function renderStatus(state, message) {
    status.dataset.state = state;
    status.textContent = message;
}

// TODO 6: input and submit listeners
form.addEventListener('input', () => {
    const data = readForm();
    renderPreview(data);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = readForm();
    const errors = validate(data);
    renderErrors(errors);

    if (Object.keys(errors).length > 0) {
        renderStatus('invalid', 'ยังบันทึกไม่ได้ กรุณาตรวจสอบข้อมูล');
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
    }

    renderStatus('success', `พร้อมแล้ว ${data.requesterName}! ข้อมูลผ่านการตรวจสอบ`);
});

console.log('LAB 3 starter ready', form);

-----------------------------------------------------

style.css
*, *::before, *::after { box-sizing: border-box; }

:root {
  --navy: #0c5d09;
  --blue: #2cd51d;
  --cyan: #80fa75;
  --yellow: #f3c64d;
  --text: #054714;
  --muted: #5b855b;
  --surface: #ffffff;
  --surface-alt: #eff7ff;
  --background: #f4f7fc;
  --border: #cbd9ef;
  --danger: #b42318;
  --success: #157347;
  --shadow: 0 18px 45px rgb(26 58 112 / 0.12);
  --radius: 1.15rem;
}

html { color-scheme: light; }
body {
  margin: 0;
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at 15% 0%, rgb(22 184 212 / .12), transparent 28rem),
    var(--background);
}

button, input, select, textarea { font: inherit; }
.container { width: min(100% - 2rem, 72rem); margin-inline: auto; }
.hero {
  color: white;
  background:
    linear-gradient(110deg, rgba(1, 46, 7, 0.96), rgba(46, 240, 71, 0.9)),
    linear-gradient(45deg, var(--navy), var(--blue));
  padding: 2.25rem 0 2.5rem;
  border-bottom: 6px solid var(--cyan);
}
.hero__content { max-width: 54rem; }
.eyebrow, .step-label {
  margin: 0 0 .45rem;
  font-size: .8rem;
  font-weight: 850;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.hero h1 { margin: 0; font-size: clamp(2.15rem, 7vw, 4rem); line-height: 1.05; }
.hero__lead { margin: .85rem 0 0; max-width: 50rem; font-size: clamp(1rem, 2.4vw, 1.25rem); color: #e9f4ff; }

.page-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; padding-block: 1.25rem 2.5rem; }
.panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.2rem; box-shadow: var(--shadow); }
.section-heading h2 { margin: 0; font-size: clamp(1.4rem, 4vw, 1.9rem); }
.section-heading > p:last-child { margin: .4rem 0 1.15rem; color: var(--muted); }
.step-label { color: var(--blue); }

.field { display: grid; gap: .45rem; margin-bottom: 1rem; }
.field label { font-weight: 750; }
input, select, textarea {
  width: 100%;
  border: 1px solid #9eb2d2;
  border-radius: .75rem;
  background: white;
  color: var(--text);
  padding: .8rem .9rem;
}
textarea { resize: vertical; min-height: 8rem; }
input:hover, select:hover, textarea:hover { border-color: var(--blue); }
input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: 2px;
}
input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"] { border-color: var(--danger); background: #fff8f7; }
.hint, .counter { color: var(--muted); }
.error { min-height: 1.2rem; color: var(--danger); font-weight: 650; }
.field-meta { display: flex; justify-content: space-between; gap: 1rem; }

.actions { display: flex; flex-wrap: wrap; gap: .75rem; }
button {
  border: 0;
  border-radius: .75rem;
  padding: .78rem 1.05rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(135deg, var(--blue), #16a429);
  cursor: pointer;
  box-shadow: 0 8px 18px rgb(29 99 213 / .2);
}
button:hover { transform: translateY(-1px); }
.button-secondary { color: var(--navy); background: #e8eff9; box-shadow: none; }
.status { min-height: 1.5rem; margin: .9rem 0 0; font-weight: 750; }
.status[data-state="invalid"] { color: var(--danger); }
.status[data-state="success"] { color: var(--success); }
.status[data-state="idle"] { color: var(--muted); }

.preview-panel { background: linear-gradient(180deg, #f5fbff, #edf5ff); }
.profile-card {
  display: grid;
  gap: .55rem;
  min-height: 18rem;
  padding: 1.25rem;
  border-radius: 1rem;
  color: white;
  background:
    radial-gradient(circle at 85% 15%, rgb(22 184 212 / .75), transparent 8rem),
    linear-gradient(145deg, var(--navy), var(--blue));
  box-shadow: 0 16px 35px rgb(9 38 93 / .25);
}
.avatar { display: grid; place-items: center; width: 4rem; aspect-ratio: 1; border-radius: 1rem; font-size: 1.4rem; font-weight: 900; color: var(--navy); background: linear-gradient(135deg, white, #cceeff); }
.profile-card__label { margin: .15rem 0 0; font-size: .75rem; font-weight: 850; letter-spacing: .12em; color: #cdefff; }
.profile-card h3 { margin: 0; font-size: clamp(1.55rem, 5vw, 2.2rem); }
.profile-card .role { margin: 0; font-weight: 800; color: #bdefff; }
.profile-card .goal { margin: .25rem 0 0; line-height: 1.65; overflow-wrap: anywhere; }
.concept-box { margin-top: 1rem; padding: 1rem; border: 1px dashed #78a9e8; border-radius: .9rem; background: white; }
.concept-box ol { margin: .6rem 0 0; padding-left: 1.35rem; }
.concept-box code, .section-heading code { padding: .1rem .35rem; border-radius: .35rem; background: #e5efff; color: var(--navy); }
footer { padding: 1.2rem 0 2rem; color: var(--muted); text-align: center; }

@media (min-width: 48rem) {
  .page-grid { grid-template-columns: minmax(0, 1.5fr) minmax(20rem, 1fr); align-items: start; gap: 1.25rem; padding-top: 1.6rem; }
  .panel { padding: 1.5rem; }
  .preview-panel { position: sticky; top: 1rem; }
}



index---------------------------------------------------------
<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ENGSE203 LAB 3</title>
  <script type="module" crossorigin src="/engse203-lab03-68543210026-9/assets/index-CWS6llI3.js"></script>
  <link rel="stylesheet" crossorigin href="/engse203-lab03-68543210026-9/assets/index-QbtxeJ8P.css">
</head>
<body>
  <header class="hero">
    <div class="container">
      <p class="eyebrow">ENGSE203 • LAB 3</p>
      <h1>Campus Service Request</h1>
      <p>Responsive Web UI, Event and Form</p>
    </div>
  </header>

  <main class="container page-grid">
    <section class="panel" aria-labelledby="form-title">
      <h2 id="form-title">Create Service Request</h2>
      <form id="request-form" novalidate>
        
        <!-- TODO 1: Requester Name field -->
        <div class="field">
          <label for="requester-name">ชื่อผู้แจ้ง</label>
          <input
            id="requester-name"
            name="requesterName"
            type="text"
            minlength="2"
            placeholder="เช่น สมชาย ใจดี"
            aria-describedby="requesterName-hint requesterName-error"
            required />
          <small id="requesterName-hint" class="hint">อย่างน้อย 2 ตัวอักษร</small>
          <small id="requesterName-error" class="error"></small>
        </div>

        <!-- TODO 2: Request Type select -->
        <div class="field">
          <label for="request-type">ประเภทการแจ้ง</label>
          <select id="request-type" name="requestType" aria-describedby="requestType-error" required>
            <option value="">-- เลือกประเภท --</option>
            <option value="IT Support">IT Support</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Cleaning">Cleaning</option>
          </select>
          <small id="requestType-error" class="error"></small>
        </div>

        <!-- TODO 3: Details textarea -->
        <div class="field">
          <label for="request-details">รายละเอียด</label>
          <textarea
            id="request-details"
            name="requestDetails"
            rows="5"
            minlength="10"
            placeholder="ระบุรายละเอียดที่ต้องการแจ้ง..."
            aria-describedby="requestDetails-hint requestDetails-error"
            required></textarea>
          <div class="field-meta">
            <small id="requestDetails-hint" class="hint">อย่างน้อย 10 ตัวอักษร</small>
            <small id="goal-count" class="counter" aria-live="polite">0 ตัวอักษร</small>
          </div>
          <small id="requestDetails-error" class="error"></small>
        </div>

        <button type="submit">Submit Request</button>
        <p id="form-status" class="status" role="status"></p>
      </form>
    </section>

    <aside class="panel preview-panel" aria-labelledby="preview-title">
      <h2 id="preview-title">Live Preview</h2>
      <dl id="preview" aria-live="polite">
        <div><dt>Name</dt><dd id="preview-name">ยังไม่ระบุชื่อ</dd></div>
        <div><dt>Type</dt><dd id="preview-type">ยังไม่เลือกประเภท</dd></div>
        <div><dt>Details</dt><dd id="preview-details">ยังไม่มีรายละเอียด</dd></div>
      </dl>
      <h3>Submitted Requests</h3>
      <ul id="request-list" class="request-list"></ul>
    </aside>
  </main>
</body>
</html>


- AI tool used:Gemini
- Used for: 
- My adaptation: