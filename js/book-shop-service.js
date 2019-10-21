const BOOKS_KEY = 'books'
var gBooks = createBooks();
var gNextId = getNextId();
saveBooksToStorage()

var gCurrLang = 'he';
var gTrans = {
    title: {
        en: 'guest',
        he: 'אורח נטה ללון'
    },
    subtitle: {
        en: 'magical city',
        he: "עיר קסומה"
    },
    langselect: {
        en: 'choose language',
        he: "בחר שפה"
    },
    read: {
        en: "read",
        he: "קרא"
    },
    update: {
        en: "update",
        he: "עדכן"
    },
    delete: {
        en: "delete",
        he: "מחק"
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },

    addBook: {
        en: "Add new book",
        he: "הוסף ספר חדש"
    },
    rate: {
        en: 'rate',
        he: 'דירוג'
    },
    img: {
        en: 'Image',
        he: 'תמונה'
    },
    price: {
        en: 'price',
        he: 'מחיר'
    },
    title: {
        en: 'title',
        he: 'כותר'
    },
    id: {
        en: 'id',
        he: 'מספר סידורי'
    },
    h1: {
        en: "Book-Shop",
        he: "חנות-ספרים"
    },
    placeholder: {
        en: "Enter book's name",
        he: "הכנס כותר ספר"
    },
    addBook: {
        en: "Add book's title",
        he: "הכנס כותר ספר"
    },
    addBookPrice: {
        en: "Add book's price",
        he: "הכנס מחיר "
    },
    addImgUrl: {
        en: "Add image's url",
        he: "הכנס קישור לתמונה"
    },
    addBookBtn: {
        en: "Add",
        he: "הוסף"
    },
    updatePrice: {
        en: "Enter updated price",
        he: "הכנס מחיר חדש"
    },
    updateBtn: {
        en: "Update",
        he: "עדכן"
    },
    about: {
        en: "About",
        he: "אודות"
    },
    rateTheBook: {
        en: "Rate the book",
        he: "דרג את הספר"
    },
    currentRate: {
        en: "currentRate:",
        he: "דירוג נוכחי"
    },
    isSure: {
        en: "Are you sure>:",
        he: "הספר יימחק, מעוניין להמשיך?"
    },
    confirmBtn: {
        en: "Yes:",
        he: "אישור"
    },
    cancelBtn: {
        en: "Cancel",
        he: "ביטול"
    }
}

function createBooks() {
    var books = loadBooksFromStorage();
    if (!books || books.length === 0) {
        if (isNaN(gNextId)) gNextId = getNextId();
        return [
            createBook('עיר קסומה', 68.90, 'img/עיר קסומה.jpg', 0),
            createBook('אורח נטה ללון', 79.90, 'img/אורח נטה ללון.jpg', 0),
            createBook('Mort', 48.90, 'img/mort.jpg', 0)
        ]
    }
    return books
}

function createBook(name, price, imgUrl, rate) {
    if (!imgUrl) imgUrl = 'img/Book-PNG-HD.png'
    if (!rate) rate = 0;
    return {
        id: gNextId++,
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: rate
    }
}

function getBooks() {
    return gBooks
}

function getBook(bookId) {
    bookId = parseInt(bookId);
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    if (!book) return;
    return book
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveBooksToStorage()
    gNextId = getNextId();
}

function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks)
}

function loadBooksFromStorage() {
    return loadFromStorage(BOOKS_KEY)
}

function addBook(bookTitle, bookPrice, bookImgUrl) {
    var newBook = createBook(bookTitle, bookPrice, bookImgUrl);
    gBooks.unshift(newBook);
    console.log(gBooks)
    saveBooksToStorage()
}

function updateBook(bookId, updatedPrice) {
    updatedPrice = parseInt(updatedPrice);
    var bookUpdated = getBook(bookId)
    if (!bookUpdated) return;
    bookUpdated.price = updatedPrice
    saveBooksToStorage()
    console.log(gBooks)
}

function getNextId() {
    if (!gBooks || gBooks.length === 0) return 101;
    return findHighestIdx()
}

function findHighestIdx() {
    var max = 0;
    gBooks.forEach(function (book) {
        if (book.id > max) max = book.id
    })
    return ++max;
}

function updateBookRating(rateId, bookId) {
    var book = getBook(bookId)
    var bookRate = book.rate
    if (rateId === '+' && bookRate < 10) {
        book.rate++;
    }
    if (rateId === '-' && bookRate > 0) {
        book.rate--;
    }
    saveBooksToStorage()
}

function setLang(lang) {
    gCurrLang = lang
    console.log(gCurrLang);
}

function getTrans(transkey) {
    var keytrans = gTrans[transkey];
    if (!keytrans) return 'Unknown';
    var txt = keytrans[gCurrLang]
    if (!txt) txt = keytrans[en]
    return txt;
}

function convertCurrency(price) {
    price = parseInt(price);
    if (gCurrLang === "en") return (price / 3.53);
    else return price
}

function getgCurrLang() {
    return gCurrLang
}

function formatCurrency(num) {
    var lang = getgCurrLang()
    var currency
    if (lang === 'en') currency = 'usd';
    else currency = 'ILS'
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: currency }).format(num);
}