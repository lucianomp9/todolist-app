// Call the dataTables jQuery plugin
$(document).ready(function() {
    manageTasks();
});

async function manageTasks() {
    const request = await fetch('api/tasks', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const tasks = await request.json();
    let dataTable = document.getElementById('dataTable');

    for (let task of tasks) {
        let newRow = dataTable.insertRow();
        let numberCell = newRow.insertCell(0);
        let taskCell = newRow.insertCell(1);
        let statusCell = newRow.insertCell(2);
        let actionsCell = newRow.insertCell(3);

        numberCell.classList.add('text-center');
        taskCell.classList.add('text-center');
        statusCell.classList.add('text-center');
        actionsCell.classList.add('text-center');

        numberCell.innerHTML = task.id;
        taskCell.innerHTML = task.task;
        statusCell.innerHTML = task.status;
        actionsCell.innerHTML = '<button class="btn btn-danger mx-1" id="delTaskBtn"  onclick="deleteTask(' + task.id + ')">Eliminar</button>';
        const storedTask = localStorage.getItem('task-' + task.id);
        if (storedTask) {
            const storedStatus = JSON.parse(storedTask).status;
            if (storedStatus === 'Finalizada') {
                numberCell.style.textDecoration = 'line-through';
                numberCell.style.color = 'red';
                taskCell.style.textDecoration = 'line-through';
                taskCell.style.color = 'red';
                statusCell.style.textDecoration = 'line-through';
                statusCell.style.color = 'red';
                statusCell.innerHTML = 'Finalizada';
            }
        }

        let statusButton = document.createElement('button');
        statusButton.classList.add('btn', 'btn-success', 'mx-1');
        statusButton.innerText = 'Finalizada';
        statusButton.addEventListener('click', async () => {
            if (task.status !== 'Finalizada') {
                numberCell.style.textDecoration = 'line-through';
                numberCell.style.color = 'red';
                taskCell.style.textDecoration = 'line-through';
                taskCell.style.color = 'red';
                statusCell.style.textDecoration = 'line-through';
                statusCell.style.color = 'red';
                statusCell.innerHTML = 'Finalizada';
                task.status = 'Finalizada';

                // Update status in Local Storage
                localStorage.setItem('task-' + task.id, JSON.stringify(task));

                // Send request to server to update status in the database
                try {
                    const updateRequest = await fetch('api/tasks/' + task.id, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status: 'Finalizada' })
                    });

                    if (updateRequest.ok) {
                        console.log('Status updated on database');
                    } else {
                        console.error('Error while updating Status on database');
                    }
                } catch (error) {
                    console.error('Request error:', error);
                }
            }
        });
        actionsCell.appendChild(statusButton);
    }
}

async function deleteTask(id) {
    if (!confirm('Do you want to delete this task?')) {
        return;
    }

    const request = await fetch('api/tasks/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    localStorage.removeItem('task-' + id);
    location.reload();
}

const addButton = document.getElementById('addButton');
const taskInput = document.querySelector('#form1');

// Add event to the button
addButton.addEventListener('click', async () => {
    await addTask();
});

// Add event to the input field
taskInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        await addTask();
    }
});

async function addTask() {
    let task = {};
    task.task = taskInput.value;
    task.status = 'Pendiente';

    try {
        const request = await fetch('api/tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        location.reload();
    } catch (error) {
        console.error('Error adding the task:', error);
    }
}
