document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    
    if (bookId) {
        const bookFrame = document.getElementById('bookFrame');
        bookFrame.src = `https://books.google.com/books?id=${bookId}&printsec=frontcover&output=embed`;
    }
});
