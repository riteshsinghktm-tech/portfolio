const dbForm = document.getElementById('dbForm');
const displayArea = document.getElementById('displayArea');

// Fetch and show only latest 2 messages
async function loadMessages() {
    try {
        const res = await fetch('/all-messages');
        const data = await res.json();
        
        displayArea.innerHTML = ""; 
        
        // slice(-2) gets the last two, reverse() puts newest at top
        data.slice(-2).reverse().forEach(item => {
            const div = document.createElement('div');
            div.className = 'post-entry';
            div.innerHTML = `
                <h4 style="color:#38bdf8">${item.name}</h4>
                <p>${item.message}</p>
                <small style="color:#64748b">${item.time}</small>
            `;
            displayArea.appendChild(div);
        });
    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

// Handle form submission without reloading page
dbForm.onsubmit = async (e) => {
    e.preventDefault();
    
    const userPayload = {
        name: document.getElementById('name').value,
        message: document.getElementById('msg').value
    };

    await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
    });

    dbForm.reset();
    loadMessages();
};

// Initial run
loadMessages();