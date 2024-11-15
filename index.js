function store() {
    let text = document.getElementById('store').value;
    localStorage.setItem('store', text);
}

function show() {
    document.getElementById('show').innerHTML = localStorage.getItem('store');
}