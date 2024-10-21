
const appDiv = document.getElementById('app');


function getAllCharacters() {
    fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(data => {
            const characters = data.results;
            const characterList = document.createElement('ul');
            characters.forEach((character, index) => {
                const characterItem = document.createElement('li');
                characterItem.textContent = character.name;

  
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.addEventListener('click', () => {
                    const newName = prompt('Enter new name:', character.name);
                    if (newName) {
                        updateCharacter(index + 1, newName);
                    }
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', () => {
                    deleteCharacter(index + 1); 
                    characterItem.remove(); 
                });

                characterItem.appendChild(updateButton);
                characterItem.appendChild(deleteButton);
                characterList.appendChild(characterItem);
            });
            appDiv.appendChild(characterList);
        })
        .catch(error => console.error('Error:', error));
}

function createCharacter(name) {
    const characterData = { name };
    fetch('https://swapi.dev/api/people/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(characterData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Character created:', data);
            getAllCharacters();
        })
        .catch(error => console.error('Error:', error));
}


function updateCharacter(id, name) {
    const characterData = { name };
    fetch(`https://swapi.dev/api/people/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(characterData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Character updated:', data);
            getAllCharacters();
        })
        .catch(error => console.error('Error:', error));
}


function deleteCharacter(id) {
    fetch(`https://swapi.dev/api/people/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            console.log('Character deleted:', data);
            getAllCharacters(); 
        })
        .catch(error => console.error('Error:', error));
}


const createForm = document.createElement('form');
createForm.innerHTML = `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <button type="submit">Create Character</button>
`;
appDiv.appendChild(createForm);


createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    createCharacter(name);
    createForm.reset(); 
});


getAllCharacters();