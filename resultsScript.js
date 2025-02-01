document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const resultsDiv = document.getElementById('results');

    if (query) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
            .then(response => response.json())
            .then(data => {
                const books = data.items;
                if (!books || books.length === 0) {
                    resultsDiv.innerHTML = '<p>No results found.</p>';
                    return;
                }

                books.forEach(book => {
                    const bookInfo = book.volumeInfo;
                    const bookElement = document.createElement('div');
                    bookElement.classList.add('book');

                    const description = bookInfo.description
                        ? bookInfo.description.length > 100
                            ? bookInfo.description.substring(0, 100) + '...'
                            : bookInfo.description
                        : 'No description available';

                    bookElement.innerHTML = `
                        <img src="${bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192.png?text=No+Cover'}" alt="Book Cover">
                        <h3>${bookInfo.title}</h3>
                        <p>${bookInfo.authors ? 'By: ' + bookInfo.authors.join(', ') : 'No author information'}</p>
                        <p>${description}</p>
                        <button onclick="openBook('${book.id}')">Read book</button>
                    `;
                    resultsDiv.appendChild(bookElement);
                });
            })
            .catch(error => {
                resultsDiv.innerHTML = '<p>An error occurred while fetching book data.</p>';
                console.error('Error fetching book data:', error);
            });
    }
});

function openBook(bookId) {
    window.location.href = `book.html?id=${bookId}`;
}
