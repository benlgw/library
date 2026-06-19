class Book {
	constructor(id, name, author, release, totalPages, read) {
		this.id = id;
		this.name = name;
		this.author = author;
		this.release = release;
		this.totalPages = +totalPages;
		this.read = read;
		this.upTo = this.upTo();
	}

	upTo() {
		if (this.read === true) {
			return this.totalPages;
		} else {
			return Math.floor(this.totalPages * Math.random());
		}
	}
}

const books = [];

function createBook({ book, author, release, totalPages, read }) {
	books.push(
		new Book(crypto.randomUUID(), book, author, release, totalPages, read),
	);
}

// Create PlaceHolder Books Here

createBook({
	book: "The Innocent Man",
	author: "John Grisham",
	release: 2006,
	totalPages: 368,
	read: true,
});

createBook({
	book: "Harry Potter: Philosopher's Stone",
	author: "J.K. Rowling",
	release: 1997,
	totalPages: 223,
	read: false,
});

// End PlaceHolder Books

const addNewBook = document.querySelector("#addNewBook");
const modal = document.querySelector("dialog");
const modalForm = document.querySelector("form");
const formButton = document.querySelector("#modalAddButton");
const formExitButton = document.querySelector("#exitForm");
const bookGrid = document.querySelector(".book-grid");

addNewBook.addEventListener("click", () => {
	modal.classList.remove("close");
});

formExitButton.addEventListener("click", () => {
	modal.classList.add("close");
});

const hasRead = document.querySelector("#read");

const inputNoRadio = modalForm.querySelectorAll("input:not([type='radio'])");
const inputRadio = modalForm.querySelectorAll("input:type='radio");

formButton.addEventListener("click", () => {
	event.preventDefault();
	if (!modalForm.checkValidity()) return;

	createBook({
		book: modalForm.title.value,
		author: modalForm.author.value,
		release: modalForm.release.value,
		totalPages: modalForm.totalPages.value,
		read: modalForm.read.value == "yes" ? true : false,
	});

	modal.classList.add("close");
	updateBooks();
});

function updateBooks() {
	bookGrid.innerHTML = "";
	books.forEach((book) => {
		const card = document.createElement("div");
		card.classList.add("card");
		book.read == true
			? (card.style.backgroundColor = "lightgreen")
			: (card.style.backgroundColor = "lightcoral");
		const title = document.createElement("p");
		title.textContent = `Book Title: ${book.name}`;
		card.append(title);
		const author = document.createElement("p");
		author.textContent = `Book Author: ${book.author}`;
		card.append(author);
		const release = document.createElement("p");
		release.textContent = `Release Year: ${book.release}`;
		card.append(release);
		const pages = document.createElement("p");
		pages.textContent = `You are up to page ${book.upTo} / ${book.totalPages}`;
		card.append(pages);
		const buttonDivs = document.createElement("div");
		buttonDivs.classList.add("buttons");
		const deleteBook = document.createElement("button");
		deleteBook.setAttribute("id", book.id);
		deleteBook.textContent = "Delete";
		buttonDivs.append(deleteBook);

		deleteBook.addEventListener("click", () => {
			books.forEach((book, index) => {
				if (book.id == deleteBook.id) {
					books.splice(index, 1);
				}
			});
			updateBooks();
		});

		const changeReadStatus = document.createElement("button");
		changeReadStatus.setAttribute("id", book.id);
		changeReadStatus.textContent = "Read/Unread";
		buttonDivs.append(changeReadStatus);

		changeReadStatus.addEventListener("click", () => {
			books.forEach((book) => {
				if (book.id == changeReadStatus.id) {
					book.read = !book.read;
				}
			});
			updateBooks();
		});

		card.append(buttonDivs);
		bookGrid.append(card);
	});
}

updateBooks();
