let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.info = () => { 
        if(this.read) {
            return title + " by " + author + ", " + pages + " pages, read";
        }
        else {
            return title + " by " + author + ", " + pages + " pages, not read yet";
        };
    };
    
};

Book.prototype.toggle = function() {
    if(this.read) {
        this.read = false;
        }
    else {
        this.read = true;
        }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    localStorage.setItem("books", JSON.stringify(myLibrary));
}

function init() {
    let myLibraryStorage = JSON.parse(localStorage.getItem("books"));
    for (book in myLibraryStorage) {
        addBookToLibrary(myLibraryStorage[book].title, myLibraryStorage[book].author, myLibraryStorage[book].pages, myLibraryStorage[book].read);
    }
    console.log(myLibrary);
    render();
}

init();

function render() {
    document.getElementById("main").innerHTML = "";
    for (book in myLibrary) {
    let div = document.createElement("div");
    div.id = "" + myLibrary[book].title;
    div.style.border = "solid";
    console.log(myLibrary[book]);
    div.textContent = myLibrary[book].info();
    div.dataset.indexNumber = book;
    
    let removeButton = document.createElement("button");
    removeButton.className = "remove";
    removeButton.appendChild(document.createTextNode("remove " + myLibrary[book].title));
    removeButton.dataset.indexNumber = book;
    removeButton.addEventListener("click", () => {
        myLibrary.splice(removeButton.dataset.indexNumber, 1);
        localStorage.setItem("books", JSON.stringify(myLibrary));
        render();
    });
    div.appendChild(removeButton);
    
    let readButton = document.createElement("button");
    readButton.id = "read" + myLibrary[book].title;
    readButton.appendChild(document.createTextNode("change read status"));
    readButton.addEventListener("click", () => {
        myLibrary[book].toggle();
        localStorage.setItem("books", JSON.stringify(myLibrary));
        render();
    });
    div.appendChild(readButton);
    
    document.getElementById("main").appendChild(div);
    }
}


document.getElementById("newbookform").style.visibility = "hidden";

function getForm() {
    return document.getElementById("newbookform").style.visibility = "visible";
}

document.getElementById("newbookbutton").addEventListener("click", getForm);


document.getElementById("newbookform").addEventListener("submit", event => {
    event.preventDefault()
    const newTitle = event.currentTarget.elements["title"].value;
    const newAuthor = event.currentTarget.elements["author"].value;
    const newPages = event.currentTarget.elements["pages"].value;
    let newRead = event.currentTarget.elements["read"].checked;
       
    addBookToLibrary(newTitle, newAuthor, newPages, newRead);
    document.getElementById("newbookform").reset();
    document.getElementById("newbookform").style.visibility = "hidden";
    render();
})
