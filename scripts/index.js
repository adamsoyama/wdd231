document.addEventListener('DOMContentLoaded', () => {
    // Handle the year and last updated date
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastUpdated').textContent = `Last Updated: ${document.lastModified}`;

    // Course filtering and display logic
    const courses = [
        { code: 'CSE 110 - Introduction to Programming', cse: true },
        { code: 'WDD 130 - Web Fundamentals', cse: false },
        { code: 'CSE 111 - Programming with Functions', cse: true },
        { code: 'CSE 210 - Programming with Classes', cse: true },
        { code: 'WDD 131 - Dynamic Web Fundamentals', cse: false },
        { code: 'WDD 231 - Web Frontend Development I', cse: false },
    ];

    function filterCourses(category) {
        const filteredCourses = category === 'all' ? courses : courses.filter(course => course.code.startsWith(category));
        displayCourses(filteredCourses);
    }

    function displayCourses(courseList) {
        const coursesContainer = document.getElementById('courses');
        coursesContainer.innerHTML = '';
        courseList.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course';
            courseDiv.textContent = course.code;
            if (course.cse) {
                courseDiv.classList.add('cse');
            } else {
                courseDiv.classList.add('wdd');
            }
            coursesContainer.appendChild(courseDiv);
        });
    }

    // Initialize course filtering
    filterCourses('all');

    // Hamburger menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Change the menu toggle icon to a close sign when the menu is active
            if (menuToggle.classList.contains('active')) {
                menuToggle.textContent = '×'; // Close icon
            } else {
                menuToggle.textContent = '☰'; // Hamburger icon
            }
        });
    }
});
