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