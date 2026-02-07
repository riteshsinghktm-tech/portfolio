document.addEventListener('DOMContentLoaded', () => {
    const dbForm = document.getElementById('dbForm');
    const displayArea = document.getElementById('displayArea');

    // 1. FUNCTION TO GET DATA FROM SERVER
    const loadData = async () => {
        try {
            const response = await fetch('/api/data');
            const data = await response.json();
            
            displayArea.innerHTML = '<h3>Stored Messages:</h3>';
            data.forEach(item => {
                const p = document.createElement('p');
                p.className = 'data-item';
                p.innerHTML = `<strong>${item.name}:</strong> ${item.message}`;
                displayArea.appendChild(p);
            });
        } catch (err) {
            console.error('Error loading data:', err);
        }
    };

    // 2. FUNCTION TO SEND DATA TO SERVER
    dbForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop page from refreshing

        const name = document.getElementById('name').value;
        const message = document.getElementById('msg').value;

        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message })
            });

            if (response.ok) {
                dbForm.reset(); // Clear the form
                loadData();    // Refresh the list immediately
            }
        } catch (err) {
            console.error('Error saving data:', err);
        }
    });

    // Load data when page first opens
    loadData();
});