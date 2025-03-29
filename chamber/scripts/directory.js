document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('last-modified');
    const memberList = document.getElementById('member-list');
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');

    let membersData = []; // Declare a variable to store the members data

    // Footer Dynamic Content
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    // Fetch Member Data
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            membersData = data;  // Store the fetched data in membersData
            displayMembers(membersData); // Display members initially
        });

    // Display Members function
    function displayMembers(members) {
        memberList.innerHTML = ''; // Clear any existing content

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card'); // Assign the member card class

            if (memberList.classList.contains('table-view')) {
                // Table view structure
                card.innerHTML = `
                    <div>Name</div><div>${member.name}</div>
                    <div>Tagline</div><div>${member.tagline}</div>
                    <div>Email</div><div><a href="mailto:${member.email}">${member.email}</a></div>
                    <div>Phone</div><div>${member.phone}</div>
                    <div>Website</div><div><a href="${member.url}" target="_blank">${member.url}</a></div>
                `;
            } else {
                // Grid view structure
                card.innerHTML = `
                    <div class="logo">
                        <img src="${member.logo}" alt="${member.name} logo">
                    </div>
                    <h3>${member.name}</h3>
                    <p>${member.tagline}</p>
                    <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
                    <p>Phone: ${member.phone}</p>
                    <p>Website: <a href="${member.url}" target="_blank">${member.url}</a></p>
                `;
            }

            memberList.appendChild(card);
        });
    }

    // Toggle Views
    gridView.addEventListener('click', () => {
        memberList.classList.remove('table-view'); // Remove table view class
        memberList.classList.add('grid-view'); // Add grid view class
        displayMembers(membersData); // Re-render the members in grid view
    });

    listView.addEventListener('click', () => {
        memberList.classList.add('table-view'); // Add table view class
        memberList.classList.remove('grid-view'); // Remove grid view class
        displayMembers(membersData); // Re-render the members in list view
    });
});
