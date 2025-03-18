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

    // Function to filter and display courses
    function filterCourses(category) {
        let courseList;
        // Display all courses if 'ALL' is selected
        if (category === 'ALL') {
            courseList = courses; // Restore all courses
        } else {
            // Filter courses based on the category (CSE or WDD)
            courseList = courses.filter(course => course.code.startsWith(category));
        }
        displayCourses(courseList); // Call displayCourses with the filtered list
    }

    // Function to display courses on the page
    function displayCourses(courseList) {
        const coursesContainer = document.getElementById('courses');
        coursesContainer.innerHTML = ''; // Clear the container

        // Loop through the courseList to dynamically create and display courses
        courseList.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course'; // Base class for all courses
            courseDiv.textContent = course.code; // Set the course name

            // Add specific styling classes based on type (CSE or WDD)
            if (course.cse) {
                courseDiv.classList.add('cse'); // Styling for CSE courses
            } else {
                courseDiv.classList.add('wdd'); // Styling for WDD courses
            }

            coursesContainer.appendChild(courseDiv); // Add the course to the container
        });
    }

    // Initialize the page by displaying all courses
    filterCourses('ALL');

    // Attach event listeners to the filtering buttons
    document.querySelectorAll('.button-container button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.textContent.toUpperCase(); // Get the category (ALL, CSE, WDD)
            filterCourses(category); // Trigger filtering based on category
        });
    });

    // Hamburger menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Toggle icon between hamburger and close
            if (menuToggle.classList.contains('active')) {
                menuToggle.textContent = '×'; // Close icon
            } else {
                menuToggle.textContent = '☰'; // Hamburger icon
            }
        });
    }
});
