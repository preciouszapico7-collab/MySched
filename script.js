/* ================= COURSES ================= */

let courses = [

    [
        "CC 101",
        "Introduction to Computing (HTML/CSS)",
        "Mrs. Jackelyn Trinidad"
    ],

    [
        "CC 102A",
        "Computer Programming 1 (JAVA)",
        "Teacher"
    ],

    [
        "PIIS",
        "Professional Issues in Information System",
        "Teacher"
    ],

    [
        "FIS",
        "Fundamentals of Information Systems",
        "Teacher"
    ],

    [
        "FIL",
        "Panitikang Filipino",
        "Teacher"
    ],

    [
        "PATHFit 1",
        "PATHFit 1",
        "Teacher"
    ],

    [
        "NSTP 1",
        "National Service Training Program 1",
        "Teacher"
    ],

    [
        "TCW",
        "The Contemporary World",
        "Teacher"
    ],

    [
        "MMW",
        "Mathematics in the Modern World",
        "Teacher"
    ]

];


/* ================= VARIABLES ================= */

let currentRole = "student";

let selectedType = "Activity";

let todos = [

    {
        id: 1,
        code: "CC 102A",
        course: "Computer Programming 1 (JAVA)",
        task: "Java Activity",
        date: "2026-10-08",
        type: "Activity",
        notes: "",
        done: false
    },

    {
        id: 2,
        code: "CC 101",
        course: "Introduction to Computing (HTML/CSS)",
        task: "HTML/CSS Activity",
        date: "2026-10-06",
        type: "Activity",
        notes: "",
        done: false
    }

];


let schedules = [

    {
        course:
        "Introduction to Computing (HTML/CSS)",

        day: "Tuesday",

        time: "07:30",

        room: "109"
    },

    {
        course:
        "Computer Programming 1 (JAVA)",

        day: "Thursday",

        time: "13:00",

        room: "109"
    }

];


/* ================= LOGIN ROLE ================= */

document
.getElementById("studentRole")
.addEventListener("click", function () {

    currentRole = "student";

    this.classList.add("active");

    document
        .getElementById("teacherRole")
        .classList.remove("active");

});


document
.getElementById("teacherRole")
.addEventListener("click", function () {

    currentRole = "teacher";

    this.classList.add("active");

    document
        .getElementById("studentRole")
        .classList.remove("active");

});


/* ================= LOGIN ================= */

function login() {

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    let correct = false;


    if (
        currentRole === "student" &&
        username === "student" &&
        password === "1234"
    ) {

        correct = true;

    }


    if (
        currentRole === "teacher" &&
        username === "teacher" &&
        password === "1234"
    ) {

        correct = true;

    }


    if (!correct) {

        document
            .getElementById("loginError")
            .textContent =
            "Incorrect username or password.";

        return;
    }


    document
        .getElementById("loginPage")
        .classList.add("hidden");


    document
        .getElementById("mainApp")
        .classList.remove("hidden");


    document
        .getElementById("accountType")
        .textContent =
        currentRole === "teacher"
            ? "👨‍🏫 Teacher Account"
            : "🎓 Student Account";


    document
        .getElementById("settingsAccount")
        .textContent =
        "Logged in as " + currentRole;


    document
        .getElementById("welcome")
        .textContent =
        currentRole === "teacher"
            ? "Teacher Dashboard"
            : "BSIS 1A Academic Planner";


    renderCourses();

    renderTodos();

    renderSchedules();

    fillCourses();


    if (currentRole === "student") {

        document
            .getElementById("teacherCourseButton")
            .style.display = "none";

        document
            .getElementById("teacherScheduleButton")
            .style.display = "none";

    }

}


/* ================= LOGOUT ================= */

function logout() {

    document
        .getElementById("mainApp")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    document
        .getElementById("username")
        .value = "";

    document
        .getElementById("password")
        .value = "";

}


/* ================= NAVIGATION ================= */

function showPage(page, button) {

    let pages =
        document.querySelectorAll(".page");

    pages.forEach(function (p) {

        p.classList.add("hidden");

    });


    document
        .getElementById(page)
        .classList.remove("hidden");


    let menus =
        document.querySelectorAll(".menu");

    menus.forEach(function (m) {

        m.classList.remove("active");

    });


    button.classList.add("active");


    let titles = {

        overview: "Overview",

        schedule: "Class Schedule",

        todo: "To-Do List",

        courses: "Courses",

        settings: "Settings"

    };


    document
        .getElementById("pageTitle")
        .textContent =
        titles[page];

}


/* ================= TODO ================= */

function openTodo() {

    document
        .getElementById("todoModal")
        .classList.remove("hidden");

}


function saveTodo() {

    let code =
        document
        .getElementById("todoCode")
        .value;

    let course =
        document
        .getElementById("todoCourse")
        .value;

    let task =
        document
        .getElementById("todoTask")
        .value;

    let date =
        document
        .getElementById("todoDate")
        .value;

    let notes =
        document
        .getElementById("todoNotes")
        .value;


    if (task === "") {

        alert("Please enter a task.");

        return;

    }


    todos.push({

        id: Date.now(),

        code: code,

        course: course,

        task: task,

        date: date,

        type: selectedType,

        notes: notes,

        done: false

    });


    renderTodos();

    closeModal("todoModal");


    document
        .getElementById("todoTask")
        .value = "";

}


function renderTodos() {

    let list =
        document
        .getElementById("todoList");

    let overview =
        document
        .getElementById("overviewTodos");


    list.innerHTML = "";

    overview.innerHTML = "";


    todos.forEach(function (todo) {

        let html = `

        <div class="todo-item">

            <span class="tag">
                ${todo.code}
            </span>

            <span class="tag">
                ${todo.type}
            </span>

            <h3>
                ${todo.task}
            </h3>

            <p>
                ${todo.course}
            </p>

            <p>
                Due:
                ${formatDate(todo.date)}
            </p>

            <button
                onclick="completeTodo(${todo.id})">

                ${todo.done
                    ? "Undo"
                    : "Complete"}

            </button>

            <button
                onclick="deleteTodo(${todo.id})">

                Delete

            </button>

        </div>

        `;


        list.innerHTML += html;

    });


    todos.slice(0, 5)
        .forEach(function (todo) {

            overview.innerHTML += `

                <div class="todo-item">

                    <span class="tag">
                        ${todo.code}
                    </span>

                    <b>
                        ${todo.task}
                    </b>

                    <p>
                        ${formatDate(todo.date)}
                    </p>

                </div>

            `;

        });

}


function completeTodo(id) {

    let todo =
        todos.find(
            function (t) {
                return t.id === id;
            }
        );


    todo.done = !todo.done;

    renderTodos();

}


function deleteTodo(id) {

    todos =
        todos.filter(
            function (todo) {

                return todo.id !== id;

            }
        );


    renderTodos();

}


function selectType(button) {

    document
        .querySelectorAll(".type")
        .forEach(function (b) {

            b.classList.remove("active");

        });


    button.classList.add("active");

    selectedType =
        button.textContent;

}


/* ================= COURSES ================= */

function renderCourses() {

    let list =
        document
        .getElementById("courseList");


    list.innerHTML = "";


    courses.forEach(function (course) {

        list.innerHTML += `

        <div class="course-card">

            <span class="course-code">

                ${course[0]}

            </span>

            <h3>

                ${course[1]}

            </h3>

            <p>

                👨‍🏫 ${course[2]}

            </p>

        </div>

        `;

    });

}


function openCourse() {

    if (currentRole !== "teacher") {

        alert(
            "Only teachers can add courses."
        );

        return;

    }


    document
        .getElementById("courseModal")
        .classList.remove("hidden");

}


function saveCourse() {

    let code =
        document
        .getElementById("courseCode")
        .value;

    let name =
        document
        .getElementById("courseName")
        .value;

    let teacher =
        document
        .getElementById("courseTeacher")
        .value;


    if (code === "" || name === "") {

        alert(
            "Please complete the course information."
        );

        return;

    }


    courses.push([
        code,
        name,
        teacher
    ]);


    renderCourses();

    fillCourses();

    closeModal("courseModal");

}


/* ================= COURSE DROPDOWN ================= */

function fillCourses() {

    let todoCourse =
        document
        .getElementById("todoCourse");

    let scheduleCourse =
        document
        .getElementById("scheduleCourse");


    todoCourse.innerHTML = "";

    scheduleCourse.innerHTML = "";


    courses.forEach(function (course) {

        let option = new Option(
            course[1],
            course[1]
        );

        todoCourse.add(option);


        let option2 = new Option(
            course[1],
            course[1]
        );

        scheduleCourse.add(option2);

    });

}


/* ================= SCHEDULE ================= */

function openSchedule() {

    if (currentRole !== "teacher") {

        alert(
            "Only teachers can add classes."
        );

        return;

    }


    document
        .getElementById("scheduleModal")
        .classList.remove("hidden");

}


function saveSchedule() {

    let course =
        document
        .getElementById("scheduleCourse")
        .value;

    let day =
        document
        .getElementById("scheduleDay")
        .value;

    let time =
        document
        .getElementById("scheduleTime")
        .value;

    let room =
        document
        .getElementById("scheduleRoom")
        .value;


    schedules.push({

        course: course,

        day: day,

        time: time,

        room: room

    });


    renderSchedules();

    closeModal("scheduleModal");

}


function renderSchedules() {

    let list =
        document
        .getElementById("scheduleList");


    list.innerHTML = "";


    schedules.forEach(function (schedule) {

        list.innerHTML += `

        <div class="schedule-item">

            <b>

                ${schedule.day}

                <br>

                ${formatTime(schedule.time)}

            </b>


            <div>

                <b>

                    ${schedule.course}

                </b>

                <p>

                    Room ${schedule.room}

                </p>

            </div>

        </div>

        `;

    });

}


/* ================= MODAL ================= */

function closeModal(id) {

    document
        .getElementById(id)
        .classList.add("hidden");

}


/* ================= DATE ================= */

function formatDate(date) {

    if (!date) {

        return "No date";

    }


    let d =
        new Date(date + "T00:00:00");


    return d.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


/* ================= TIME ================= */

function formatTime(time) {

    if (!time) {

        return "";

    }


    let parts =
        time.split(":");


    let hour =
        Number(parts[0]);


    let minute =
        parts[1];


    let period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return hour +
        ":" +
        minute +
        " " +
        period;

}


/* ================= THEME ================= */

function darkMode() {

    document
        .body
        .classList.add("dark");

}


function lightMode() {

    document
        .body
        .classList.remove("dark");

}
