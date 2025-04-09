document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastUpdated').textContent = `Last Updated: ${document.lastModified}`;

    const courses = [
        { code: 'CSE 110 - Introduction to Programming', cse: true, description: 'An introduction to problem-solving and programming logic using Python.' },
        { code: 'WDD 130 - Web Fundamentals', cse: false, description: 'Covers the basics of HTML, CSS, and creating static web pages.' },
        { code: 'CSE 111 - Programming with Functions', cse: true, description: 'Focuses on writing and using functions effectively in Python.' },
        { code: 'CSE 210 - Programming with Classes', cse: true, description: 'Object-oriented programming principles using classes and design patterns.' },
        { code: 'WDD 131 - Dynamic Web Fundamentals', cse: false, description: 'Introduces JavaScript and DOM manipulation for dynamic websites.' },
        { code: 'WDD 231 - Web Frontend Development I', cse: false, description: 'Frontend development with responsive design, JavaScript, and APIs.' }
    ];

    const modal = document.getElementById("courseModal");
    const titleEl = document.getElementById("courseTitle");
    const descEl = document.getElementById("courseDescription");
    const closeBtn = document.querySelector(".close-btn");

    function filterCourses(category) {
        let filtered = (category === 'ALL') ? courses : courses.filter(c => c.code.startsWith(category));
        displayCourses(filtered);
    }

    function displayCourses(list) {
        const container = document.getElementById('courses');
        container.innerHTML = '';
        list.forEach(course => {
            const div = document.createElement('div');
            div.className = 'course';
            div.classList.add(course.cse ? 'cse' : 'wdd');
            div.textContent = course.code;

            div.addEventListener('click', () => {
                titleEl.textContent = course.code;
                descEl.textContent = course.description;
                modal.style.display = 'flex';
            });

            container.appendChild(div);
        });
    }

    document.querySelectorAll('.button-container button').forEach(btn => {
        btn.addEventListener('click', () => {
            filterCourses(btn.textContent.toUpperCase());
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.textContent = menuToggle.classList.contains('active') ? '×' : '☰';
        });
    }

    if (modal && closeBtn) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', e => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    filterCourses('ALL');
});
