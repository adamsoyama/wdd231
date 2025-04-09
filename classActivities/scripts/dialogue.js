document.addEventListener('DOMContentLoaded', () => {
    const currentYear = document.getElementById('currentyear');
    const lastUpdated = document.getElementById('lastUpdated');
    currentYear.textContent = new Date().getFullYear();
    lastUpdated.textContent = `Last Updated: ${document.lastModified}`;
  
    const courseDetails = document.getElementById('course-details');
  
    const courses = [
      {
        subject: "CSE", number: "110",
        title: "Introduction to Programming",
        credits: 2,
        description: "An introduction to problem-solving and programming logic using Python.",
        certificate: "No",
        technology: ["Python"],
        cse: true
      },
      {
        subject: "WDD", number: "130",
        title: "Web Fundamentals",
        credits: 2,
        description: "Covers the basics of HTML, CSS, and creating static web pages.",
        certificate: "Yes",
        technology: ["HTML", "CSS"],
        cse: false
      },
      {
        subject: "CSE", number: "111",
        title: "Programming with Functions",
        credits: 2,
        description: "Focuses on writing and using functions effectively in Python.",
        certificate: "No",
        technology: ["Python"],
        cse: true
      },
      {
        subject: "WDD", number: "231",
        title: "Web Frontend Development I",
        credits: 3,
        description: "Frontend development with responsive design, JavaScript, and APIs.",
        certificate: "Yes",
        technology: ["JavaScript", "APIs", "CSS"],
        cse: false
      }
    ];
  
    function displayCourseDetails(course) {
      courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
      `;
      courseDetails.showModal();
  
      document.getElementById('closeModal').addEventListener('click', () => {
        courseDetails.close();
      });
    }
  
    function filterCourses(category) {
      const list = (category === 'ALL') ? courses :
        courses.filter(c => c.subject === category);
      displayCourses(list);
    }
  
    function displayCourses(courseList) {
      const container = document.getElementById('courses');
      container.innerHTML = '';
  
      courseList.forEach(course => {
        const div = document.createElement('div');
        div.className = 'course';
        div.classList.add(course.cse ? 'cse' : 'wdd');
        div.textContent = `${course.subject} ${course.number} - ${course.title}`;
  
        div.addEventListener('click', () => {
          displayCourseDetails(course);
        });
  
        container.appendChild(div);
      });
    }
  
    document.querySelectorAll('.button-container button').forEach(btn => {
      btn.addEventListener('click', () => {
        filterCourses(btn.textContent.toUpperCase());
      });
    });
  
    // Menu toggle (optional)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuToggle.textContent = menuToggle.classList.contains('active') ? '×' : '☰';
      });
    }
  
    // Close modal on backdrop click
    courseDetails.addEventListener("click", (e) => {
      const rect = courseDetails.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        courseDetails.close();
      }
    });
  
    // Initial load
    filterCourses('ALL');
  });
  