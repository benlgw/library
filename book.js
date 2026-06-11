function Book(name, author, release, totalPages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}

	this.name = name;
	this.author = author;
	this.release = release;
	this.totalPages = +totalPages;
	this.upTo = Math.floor(this.totalPages * Math.random());
	this.read = read;
}

Book.prototype.info = function () {
	return `${this.name} by ${this.author} released in ${this.release}. You are up to page ${this.upTo} out of ${this.totalPages}`;
};

// const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 1937, 295, false);

// console.log(hobbit.info());
// console.log(hobbit.valueOf());
