document.addEventListener('DOMContentLoaded', () => {
    fetchFeaturedBooks();
});

function fetchFeaturedBooks() {
    const featuredBooksDiv = document.getElementById('featured-books-list');
    const randomQuery = getRandomQuery();

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${randomQuery}&maxResults=20`)
        .then(response => response.json())
        .then(data => {
            const books = data.items;
            if (!books || books.length === 0) {
                featuredBooksDiv.innerHTML = '<p>No books found.</p>';
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
                featuredBooksDiv.appendChild(bookElement);
            });
        })
        .catch(error => {
            featuredBooksDiv.innerHTML = '<p>An error occurred while fetching featured books.</p>';
            console.error('Error fetching featured books:', error);
        });
}

function getRandomQuery() {
    const queries = ['programming', 'science', 'history', 'math', 'fiction', 'technology', 'engineering', 'art', 'medicine', 'education'];
    return queries[Math.floor(Math.random() * queries.length)];
}

function searchBooks() {
    const query = document.getElementById('searchInput').value;

    if (query === '') {
        alert('Please enter a search term.');
        return;
    }

    window.location.href = `results.html?query=${query}`;
}

function redirectToCategory(category) {
    window.location.href = `results.html?query=${category}`;
}

function openBook(bookId) {
    window.location.href = `book.html?id=${bookId}`;
}
