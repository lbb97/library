const addBookButton = document.querySelector("#add-new-book-button");
const showLibrary = document.querySelector("#show-library-button");
const closeLibrary = document.querySelector("#library-close-button");
const submitNewBookBtn = document.querySelector("#add-button");
const closeButton = document.querySelector("#close-button");
const bookDialog = document.querySelector("#book-dialog");
const infoDialog = document.querySelector("#info-dialog");
const libraryDialog = document.querySelector("#library-dialog");
const bookInfo = document.querySelector(".book-info");

const bookForm = document.querySelector("#add-book-form");
const title = document.querySelector("#book-title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");
const read = document.querySelector("#read-input");

const titleError = document.querySelector(".title-error-output");
const authorError = document.querySelector(".author-error-output");
const pagesError = document.querySelector(".pages-error-output");

const inputs = document.querySelectorAll('[id*="-input"]');
const libraryTable = document.querySelector(".library-table");
const libraryTableDisplay = document.querySelector("#library-table-display");
const tableHeaders = document.querySelector("#table-headers");

const displayArea = document.querySelector("#active-display");

const emptyText = document.createElement("div");
emptyText.classList.add("empty-text");

// Add book button
addBookButton.addEventListener('click', () => {
    bookDialog.showModal();
});

// Cancel adding book & close book adding dialog
closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    bookDialog.close();
});

// Actual library
const myLibrary = [];

if (myLibrary.length === 0) {

    emptyText.innerHTML = `No books in your library yet. Click the <em>'Add new book'</em> <svg id="new-book-button-example" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Add New Book</title><path d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" /></svg> button to add a new one.`;
    
    displayArea.appendChild(emptyText);
}

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {

        let readStat = 'No';
        if (this.read) {
            readStat = 'Yes';
        };

        return this.title + " by " + this.author + ". " + this.pages + " pages. " + "Read: " + readStat;
    };
}

// Book addition funtion
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

// Error messages & validation
function verification() {

    let isValid = true;
    const alert = `<svg id='alert-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Error</title><path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" /></svg>`;
    
    // Title
    if (title.value == '') {
        titleError.style.display = 'flex';
        title.style.borderBottom = '1px solid red';
        titleError.innerHTML = alert;
        isValid = false;
    }
    else {
        titleError.style.display = 'none';
        titleError.innerHTML = '';
        title.style.borderBottom = 'none';
    }

    // Author
    if (author.value == '') {
        authorError.style.display = 'flex';
        author.style.borderBottom = '1px solid red';
        authorError.innerHTML = alert;
        isValid = false;
    }
    else {
        authorError.style.display = 'none';
        authorError.innerHTML = '';
        author.style.borderBottom = 'none';
    }

    // Pages
    if (pages.value == '') {
        pagesError.style.display = 'flex';
        pages.style.borderBottom = '1px solid red';
        pagesError.innerHTML = alert;
        isValid = false;
    }
    else {
        pagesError.style.display = 'none';
        pagesError.innerHTML = '';
        pages.style.borderBottom = 'none';
    }

    return isValid;
};

// Add book button
submitNewBookBtn.addEventListener('click', (e) => {

    e.preventDefault();
    
    if (!verification()) {
        return;
    }

    displayArea.innerHTML = '';
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayBooks(myLibrary);

    console.log(inputs);
    inputs.forEach(input => { // Reset input fields
        input.value = '';
    });
    read.checked = false; // Reset checkmark

    renderLibrary();
});

// Book display function
function displayBooks(myLibrary) {

    if (myLibrary.length === 0) {

        emptyText.innerHTML = `No books in your library yet. Click the <em>'Add new book'</em> <svg id="new-book-button-example" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Add New Book</title><path d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" /></svg> button to add a new one.`;

        displayArea.appendChild(emptyText); // Add text to display area

        // Check if display area already contains the text already
        if (!displayArea.contains(emptyText)) {
            displayArea.appendChild(emptyText);
        }

        return;
    }

    // Iterating over all the books in the entire library
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        // New div created for every book instance in library with own new class
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
            <p class="display-book-title">${book.title}</p>
            <p class="display-book-author">${book.author}</p>
            <p class="display-book-pages">${book.pages}</p>
            <p class="display-book-read">${book.read ? "Yes" : "No"}</p>
            <p class="display-book-info">${book.info()}</p>
        `;

        displayArea.appendChild(bookDiv); // Add book to DOM

    };

};

// Handle remove book button click
libraryTableDisplay.addEventListener('click', (e) => {
    if (e.target.closest('.remove-book-button')) {
        const bookRow = e.target.closest('.library-book');
        const bookIndex = parseInt(bookRow.getAttribute('data-index'), 10);
        if (!isNaN(bookIndex)) {
            myLibrary.splice(bookIndex, 1); // Remove selected book from the array
            renderLibrary(); // Re-render the table
        }
    }
});

// Re-render function
function renderLibrary() {

    // Clear talbe & re-run its table funtion
    libraryTableDisplay.innerHTML = '';
    viewlibrary(myLibrary);

    // Clear library display area & re-run its function
    displayArea.innerHTML = ''; 
    displayBooks(myLibrary);

    myLibrary.forEach((book, index) => {
        const bookRow = document.createElement("tr");
        bookRow.classList.add("library-book");
        bookRow.setAttribute('data-index', index);
    });

    // Handle checkbox change event
    libraryTableDisplay.addEventListener('change', (e) => {
        if (e.target.classList.contains('toggle-read-checkbox')) {
            const bookRow = e.target.closest('.library-book');
            const bookIndex = parseInt(bookRow.getAttribute('data-index'), 10);
            if (!isNaN(bookIndex)) {
                myLibrary[bookIndex].read = e.target.checked; // Update the read status
                renderLibrary(); // Re-render the table
            }
        }
    });
}

// Show library function
function viewlibrary(myLibrary) {
    libraryTableDisplay.innerHTML = `
        <tr id="table-headers">
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read</th>
            <th>Delete</th>
        </tr>
    `;

    myLibrary.forEach((book, index) => {
        const bookRow = document.createElement("tr");
        bookRow.classList.add("library-book");
        bookRow.setAttribute('data-index', index);

        bookRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>
                <input type="checkbox" class="toggle-read-checkbox" ${book.read ? 'checked' : ''}>
            </td>
            <td>
                <button class="remove-book-button">
                    <svg class='remove-book-button-svg' style="height: 16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Trash Can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>
                </button>
            </td>
        `;

        libraryTableDisplay.appendChild(bookRow);
    });
}

// Show library
showLibrary.addEventListener('click', () => {
    libraryDialog.showModal();
});

// Close library
closeLibrary.addEventListener('click', () => {
    libraryDialog.close();
});