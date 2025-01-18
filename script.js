const userListContainer = document.getElementById('user-list');

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Помилка при завантаженні даних:', error);
    }
}

function displayUsers(users) {
    const userList = document.createElement('ul');
    
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
            <span>${user.name} (${user.email})</span>
            <div>
                <button class="details-btn" data-id="${user.id}">Детальніше</button>
                <button class="delete-btn" data-id="${user.id}">Видалити</button>
            </div>
        `;
        userList.appendChild(userItem);
    });

    userListContainer.appendChild(userList);

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removeUser(id, userList);
        });
    });

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            console.log(`Деталі користувача з ID ${id}:`, users.find(user => user.id == id));
        });
    });
}

function removeUser(id, userList) {
    const itemToDelete = Array.from(userList.children).find(item =>
        item.querySelector('.delete-btn').dataset.id === id
    );
    if (itemToDelete) {
        itemToDelete.remove();
    }
}

fetchUsers();
