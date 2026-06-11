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
	return `
	Book Title: ${this.name}
	Author${this.author}
	Released Year ${this.release}
	You are up to page ${this.upTo} / ${this.totalPages}`;
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
		book.read == true
			? (card.style.backgroundColor = "lightgreen")
			: (card.style.backgroundColor = "lightcoral");
		card.setAttribute("id", book.id);
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
		bookGrid.append(card);
	});
}

updateBooks();

`

	Author${this.author}
	Released Year ${this.release}
	You are up to page ${this.upTo} / ${this.totalPages}`;
