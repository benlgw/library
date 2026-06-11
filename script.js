function Book(id, name, author, release, totalPages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}

	this.id = id;
	this.name = name;
	this.author = author;
	this.release = release;
	this.totalPages = +totalPages;
	this.read = read;
	this.upTo = Math.floor(this.totalPages * Math.random());
}

Book.prototype.info = function () {
	return `${this.name} by ${this.author} released in ${this.release}. You are up to page ${this.upTo} out of ${this.totalPages}`;
};

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
const bookGrid = document.querySelector(".book-grid");
const modal = document.querySelector("dialog");
const modalForm = document.querySelector("form");
const formButton = document.querySelector("#modalAddButton");

addNewBook.addEventListener("click", () => {
	modal.classList.remove("close");
});

const hasRead = document.querySelector("#read");

formButton.addEventListener("click", () => {
	event.preventDefault();

	let read;
	hasRead == "yes" ? (read = true) : (read = false);

	createBook({
		book: modalForm.title.value,
		author: modalForm.author.value,
		release: modalForm.release.value,
		totalPages: modalForm.totalPages.value,
		read: read,
	});

	modal.classList.add("close");
	updateBooks();
});

function updateBooks() {
	bookGrid.innerHTML = "";
	books.forEach((book) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.setAttribute("id", book.id);
		card.textContent = book.info();
		bookGrid.append(card);
	});
}

updateBooks();
