document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('last-modified');
    const memberList = document.getElementById('member-list');
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');

    let membersData = [];

    // Footer Dynamic Content
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    // Fetch Member Data
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            membersData = data;
            displayMembers(membersData);
        })
        .catch(error => {
            console.error('Error fetching member data:', error);
            memberList.innerHTML = '<p>Error loading member directory. Please try again later.</p>';
        });

    // Display Members function
    function displayMembers(members) {
        memberList.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');

            if (memberList.classList.contains('table-view')) {
                card.innerHTML = `
                    <div>${member.name}</div>
                    <div>${member.tagline}</div>
                    <div><a href="mailto:${member.email}">${member.email}</a></div>
                    <div>${member.phone}</div>
                    <div><a href="${member.url}" target="_blank">${member.url}</a></div>
                `;
            } else {
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
        memberList.classList.remove('table-view');
        memberList.classList.add('grid-view');
        displayMembers(membersData);
        setActiveButton(gridView);
    });

    listView.addEventListener('click', () => {
        memberList.classList.remove('grid-view');
        memberList.classList.add('table-view');
        displayMembers(membersData);
        setActiveButton(listView);
    });

    function setActiveButton(activeBtn) {
        [gridView, listView].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
});
