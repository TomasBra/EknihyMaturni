let booksinlist = JSON.parse(localStorage.getItem("booksInList"));
let booksCountElement = document.getElementById("bookCount");
let dramataCountElement = document.getElementById("dramataCount");
let poezieCountElement = document.getElementById("poezieCount");
let prozaCountElement = document.getElementById("prozaCount");
let centuryOneCountElement = document.getElementById("centuryOneCount");
let centuryTwoCountElement = document.getElementById("centuryTwoCount");
let centuryThreeCountElement = document.getElementById("centuryThreeCount");
let centuryFourCountElement = document.getElementById("centuryFourCount");
let tableListOfBooks = document.getElementById("booksInListTable");
let divOfBooks = document.getElementById("Books");
let ShowListBtn = document.getElementById("ShowListBtn");
let YearOfMaturation = JSON.parse(localStorage.getItem("YearOfMaturation"));


window.onload = function main() {
    if (booksinlist == undefined)
        booksinlist = [];
    DisplayChanges();
}

function DisplayChanges() {
    let table = document.getElementById("booksTable");

    let proza = booksinlist.filter(book => book.fields.genre === "próza").length;
    let dramata = booksinlist.filter(book => book.fields.genre === "drama").length;
    let poezie = booksinlist.filter(book => book.fields.genre === "poezie").length;
    let centuryOne = booksinlist.filter(book => book.fields.season === "literatura do konce 18. století").length;
    let centuryTwo = booksinlist.filter(book => book.fields.season === "literatura do konce 19. století").length;
    let centuryThree = booksinlist.filter(book => book.fields.season === "světová literatura 20. a 21. století").length;
    let centuryFour = booksinlist.filter(book => book.fields.season === "česká literatura 20. a 21. století").length;
    let books = booksinlist.length;

    booksCountElement.innerText = "Knihy " + books + "/20";
    dramataCountElement.innerText = "Dramata " + dramata + "/2";
    poezieCountElement.innerText = "Poezie " + poezie + "/2";
    prozaCountElement.innerText = "Próza " + proza + "/2";
    centuryOneCountElement.innerText = "literatura do konce 18. století " + centuryOne + "/2";
    centuryTwoCountElement.innerText = "literatura do konce 19. stolet " + centuryTwo + "/3";
    centuryThreeCountElement.innerText = "světová literatura 20. a 21. století " + centuryThree + "/4";
    centuryFourCountElement.innerText = "česká literatura 20. a 21. století " + centuryFour + "/5";


    localStorage.setItem("booksInList", JSON.stringify(booksinlist));
    localStorage.setItem("YearOfMaturation", JSON.stringify(YearOfMaturation));
    YearOfMaturation = JSON.parse(localStorage.getItem("YearOfMaturation"));
    booksinlist = JSON.parse(localStorage.getItem("booksInList"));


}

function addBookToList(book_pk) {
    if (booksinlist.length === 0) {
        YearOfMaturation = searchedMaturity;
    }

    let book = books.find(book => book.pk == book_pk);


    if (booksinlist.find(everybook => everybook.pk === book.pk) === undefined)
        if (booksinlist.filter(bookInList => bookInList.fields.author === book.fields.author).length < 2)
            if (book.fields.maturity.includes(YearOfMaturation))
                booksinlist.push(book);
            else
                window.alert("Tato kniha není v daném roce maturit.");
        else
            window.alert("Od jednoho autora můžete mít v seznamu pouze dvě knihy.");
    else
        window.alert("Váš seznam tuto knihu již obsahuje.");


    DisplayChanges();
}

function deleteBook(book_pk) {
    booksinlist = booksinlist.filter(Book => Book.pk !== book_pk);
    RenderListOfBooksTable();
    DisplayChanges();
    RenderListOfBooksTable();
}

function ClearMemory() {
    booksinlist = [];
    localStorage.removeItem("booksInList");
    localStorage.removeItem("YearOfMaturation");
    DisplayChanges();
    RenderListOfBooksTable();
}

function RenderListOfBooksTable() {
    tableListOfBooks.innerHTML = "";

    let prozaList = booksinlist.filter(book => book.fields.genre === "próza");
    let poezieList = booksinlist.filter(book => book.fields.genre === "poezie");
    let dramataList = booksinlist.filter(book => book.fields.genre === "drama");
    let id = 0;

    tableListOfBooks.insertRow(-1).innerHTML = "<h4>Dramata</h4>";
    dramataList.forEach(book => {
        id++;

        let row = tableListOfBooks.insertRow(-1);

        let order = row.insertCell(0);
        let name = row.insertCell(1);
        let author = row.insertCell(2);
        let genre = row.insertCell(3);
        let season = row.insertCell(4);
        let deletebtn = row.insertCell(5);


        order.innerHTML = id;
        name.innerHTML = book.fields.name;
        author.innerHTML = book.fields.author;
        genre.innerHTML = book.fields.genre;
        season.innerHTML = book.fields.season;
        deletebtn.innerHTML = `<button class="btn btn-danger" onClick="deleteBook(${book.pk})">Odstranit</button>`
    });

    tableListOfBooks.insertRow(-1).innerHTML = "<h4>Próza</h4>";
    prozaList.forEach(book => {
        id++;

        let row = tableListOfBooks.insertRow(-1);

        let order = row.insertCell(0);
        let name = row.insertCell(1);
        let author = row.insertCell(2);
        let genre = row.insertCell(3);
        let season = row.insertCell(4);
        let deletebtn = row.insertCell(5);


        order.innerHTML = id;
        name.innerHTML = book.fields.name;
        author.innerHTML = book.fields.author;
        genre.innerHTML = book.fields.genre;
        season.innerHTML = book.fields.season;
        deletebtn.innerHTML = `<button class="btn btn-danger" onClick="deleteBook(${book.pk})">Odstranit</button>`
    });

    tableListOfBooks.insertRow(-1).innerHTML = "<h4>Poezie</h4>";
    poezieList.forEach(book => {
        id++;

        let row = tableListOfBooks.insertRow(-1);

        let order = row.insertCell(0);
        let name = row.insertCell(1);
        let author = row.insertCell(2);
        let genre = row.insertCell(3);
        let season = row.insertCell(4);
        let deletebtn = row.insertCell(5);


        order.innerHTML = id;
        name.innerHTML = book.fields.name;
        author.innerHTML = book.fields.author;
        genre.innerHTML = book.fields.genre;
        season.innerHTML = book.fields.season;
        deletebtn.innerHTML = `<button class="btn btn-danger" onClick="deleteBook(${book.pk})">Odstranit</button>`
    });
}

function ShowListOfBooks() {
    RenderListOfBooksTable();

    divOfBooks.style.display = "none";
    tableListOfBooks.parentElement.className = "d-block mt-5";
    ShowListBtn.innerText = "Zobrazit knihy";
    ShowListBtn.onclick = HideListOfBooks;

}


function HideListOfBooks() {
    tableListOfBooks.innerHTML = "";
    divOfBooks.style.display = "block";
    tableListOfBooks.parentElement.className = "d-none mt-5";
    ShowListBtn.innerText = "Zobrazit seznam";
    ShowListBtn.onclick = ShowListOfBooks;
}

function PrintListOfBooks() {
    newWin = window.open("");
    //
    newWin.document.write("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3' crossOrigin='anonymous'>");
    newWin.document.write(tableListOfBooks.outerHTML);
    //
    let printTable = newWin.document.getElementsByTagName("table")[0];

    printTable.innerHTML = "";
    printTable.className = "mx-auto table table-bordered";
    printTable.style ="width:95%";

    let prozaList = booksinlist.filter(book => book.fields.genre === "próza");
    let poezieList = booksinlist.filter(book => book.fields.genre === "poezie");
    let dramataList = booksinlist.filter(book => book.fields.genre === "drama");
    let id = 0;

    printTable.insertRow(-1).innerHTML = "<h4 class='my-0'>Dramata</h4>";

    dramataList.forEach(book => {
        id++;

        let row = printTable.insertRow(-1);

        let order = row.insertCell(0);
        let name = row.insertCell(1);
        let author = row.insertCell(2);
        let genre = row.insertCell(3);
        let season = row.insertCell(4);


        order.innerHTML = id;
        name.innerHTML = book.fields.name;
        author.innerHTML = book.fields.author;
        genre.innerHTML = book.fields.genre;
        season.innerHTML = book.fields.season;
    });

    printTable.insertRow(-1).innerHTML = "<h4 class='my-0''>Próza</h4>";
    prozaList.forEach(book => {
        id++;

        let row = printTable.insertRow(-1);


        let order = row.insertCell(0);
        let name = row.insertCell(1);
        let author = row.insertCell(2);
        let genre = row.insertCell(3);
        let season = row.insertCell(4);


        order.innerHTML = id;
        name.innerHTML = book.fields.name;
        author.innerHTML = book.fields.author;
        genre.innerHTML = book.fields.genre;
        season.innerHTML = book.fields.season;
    });

    printTable.insertRow(-1).innerHTML = "<h4 class='my-0''>Poezie</h4>";
    poezieList.forEach(book => {
        id++;

        let row = printTable.insertRow(-1);

        let order = row.insertCell(0);
        let name = row.insertCell(1);
        let author = row.insertCell(2);
        let genre = row.insertCell(3);
        let season = row.insertCell(4);


        order.innerHTML = id;
        name.innerHTML = book.fields.name;
        author.innerHTML = book.fields.author;
        genre.innerHTML = book.fields.genre;
        season.innerHTML = book.fields.season;
    });

    newWin.print();
    newWin.close();
}