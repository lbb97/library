const addBookButton = document.querySelector("#add-new-book-button");
const showLibrary = document.querySelector("#show-library-button");
const submitNewBookBtn = document.querySelector("#add-button");
const closeButton = document.querySelector("#close-button");
const bookDialog = document.querySelector("#book-dialog");

const title = document.querySelector("#book-title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");
const read = document.querySelector("#read-input");
const inputs = document.querySelectorAll('[id*="-input"]');

const displayArea = document.querySelector("#active-display");

const emptyText = document.createElement("div");
emptyText.classList.add("empty-text");

addBookButton.addEventListener('click', () => {
    bookDialog.showModal();
});

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    bookDialog.close();
});

const myLibrary = [];

if (myLibrary.length === 0) {

    emptyText.innerHTML = `No books in your library yet. Click the <em>'Add new book'</em> <svg id="new-book-button-example" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Add New Book</title><path d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" /></svg> button to add a new one.`;
    
    displayArea.appendChild(emptyText);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return this.title + " by " + this.author + ". " + this.pages + " pages. " + "Read: " + this.read;
    };
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

submitNewBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayBooks(myLibrary);

    inputs.forEach(input => input.value = '');
    read.checked = false;
});

function displayBooks(myLibrary) {

    displayArea.innerHTML = "";

    if (myLibrary.length === 0) {
        emptyText.innerHTML = `No books in your library yet. Click the <em>'Add new book'</em> <svg id="new-book-button-example" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Add New Book</title><path d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" /></svg> button to add a new one.`;

        displayArea.appendChild(emptyText);

        return;
    }

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
            <p class="display-book-title">${book.title}</p>
            <p class="display-book-author">${book.author}</p>
            <p class="display-book-pages">${book.pages}</p>
            <p class="display-book-read">${book.read ? "Yes" : "No"}</p>
        `;

        displayArea.appendChild(bookDiv);
    };

    // fullLibrary;
    // console.log(displayBooks());

}

showLibrary.addEventListener('click', () => {
    displayBooks(myLibrary);
});