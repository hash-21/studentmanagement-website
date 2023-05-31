// Javascript file for Main Logic of Student Enrollment Form
function showTable() {
    const tableElements = document.querySelectorAll(".invisible");
    tableElements.forEach((node) => node.classList.remove("invisible"));
}

function createRow(name, gender, email, website, skills, image) {
    const nameElement = document.createElement("h6");
    nameElement.textContent = name;

    const genderElement = document.createElement("p");
    genderElement.textContent = gender;

    const emailElement = document.createElement("p");
    emailElement.textContent = email;

    const websiteElement = document.createElement("a");
    websiteElement.href = website;
    websiteElement.target = "_blank";
    websiteElement.textContent = website;

    const skillsElement = document.createElement("p");
    skillsElement.textContent = skills.join(", ");

    const imageElement = document.createElement("img");
    imageElement.src = image;

    const description = document.createElement("td");
    description.appendChild(nameElement);
    description.appendChild(genderElement);
    description.appendChild(emailElement);
    description.appendChild(websiteElement);
    description.appendChild(skillsElement);
    description.classList.add("description");

    const imageCell = document.createElement("td");
    imageCell.appendChild(imageElement);
    imageCell.classList.add("student-image");

    let row = document.createElement("tr");
    row.appendChild(description);
    row.appendChild(imageCell);
    return row;
}

function submitForm(e) {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const website = document.querySelector("#website").value;
    let image = document.querySelector("#image").value;
    const gender = document.querySelector("#male").checked ? "Male" : "Female";

    if(image === "") {
        image = gender === "Male" ? DEFAULT_IMAGES.male : DEFAULT_IMAGES.female;
     
    }

    const skills = [];
    const skillsId = ["Java", "HTML", "CSS"];
    skillsId.forEach((skill) => {
        if(document.querySelector(`#${skill.toLowerCase()}`).checked) {
            skills.push(skill);
        }
    });

    const newRow = createRow(name, gender, email, website, skills, image);
    const studentTable = document.querySelector(".student-table table");
    studentTable.appendChild(newRow);
    showTable();
    document.querySelector("form").reset();    
}

function setEventListeners() {
    const studentForm = document.querySelector("form");
    studentForm.addEventListener("submit", submitForm);
}

const email = document.getElementById("email");

email.addEventListener("input", function (event) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    if(!isValid) {
        email.setCustomValidity("Please input a valid email address!");
        email.reportValidity();
    } else {
        email.setCustomValidity("");
    }
});

const username = document.getElementById("name");

username.addEventListener("input", function (event) {
    const isValid = /^[a-z ]+$/i.test(username.value);
    if(!isValid) {
        username.setCustomValidity(
            "Name should consist of only english alphabets"
        );
        username.reportValidity();
    } else {
        username.setCustomValidity("");
    }
});

setEventListeners();