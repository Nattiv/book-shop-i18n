
function onInit() {
    renderbooks()
}


function renderbooks() {
    var books = getBooks()
    var strHTMLs = ''
    books.forEach(function (book) {
        var bookId = book.id;
        strHTMLs +=
            `<tr> <td>${bookId}</td> <td> ${book.name} </td> <td class="price" data-trans="price"> ${book.price} ש"ח </td> 
            <td><img src="${book.imgUrl}"/></td>
            <td>${book.rate}</td>
            <td><button onclick="renderBookDetails(${bookId})" data-trans="read">${gTrans.read[gCurrLang]}</button> 
            <button onclick="onToggleModalUpdate(${bookId})" data-trans="update">${gTrans.update[gCurrLang]}</button>
             <button onclick="onToggleModalDelete(${bookId})" data-trans="delete">${gTrans.delete[gCurrLang]}</button></td> </tr>
            `
    })
    var elBookShop = document.querySelector('.books-table');
    elBookShop.innerHTML = strHTMLs;
    doTrans()
}

function renderBookDetails(bookId) {
    var book = getBook(bookId);
    var elBookDetailsModal = document.querySelector('.modal-read');
    elBookDetailsModal.innerHTML = `<p>${gTrans.id[gCurrLang]} = ${book.id} <p> <p>${gTrans.title[gCurrLang]}: ${book.name}</p>
    <p> ${gTrans.img[gCurrLang]}:  <img class=img-book-details src="${book.imgUrl}"/> </p>
    <p>${gTrans.about[gCurrLang]}:Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga excepturi et quo eos nobis exercitationem, 
    expedita molestiae quasi temporibus voluptas cum explicabo, sequi error maxime cumque laboriosam illo commodi aut</p>
    <div class="display"> <p>${gTrans.rateTheBook[gCurrLang]}</p><img class="img-rate" onclick="onRateBook(this, ${book.id})" data-id="+" src="img/plus-big-circle-512.png">
    <img class="img-rate" onclick="onRateBook(this, ${book.id})" data-id="-" src="img/minus-icon-12.png"></div>
    <p>${gTrans.currentRate[gCurrLang]} ${book.rate}</p>
    <img src="img/x close.png" onclick="onCloseModalRead()" class="close-img-modal">`
    onOpenModalRead()
}

function onToggleModal() {
    var elModal = document.querySelector('.modal');
    var modalShown = elModal.classList.contains('display');
    if (!modalShown) {
        elModal.classList.add('display');
    } else {
        elModal.classList.remove('display');
    }
}

function onToggleModalUpdate(bookId) {
    var elModal = document.querySelector('.modal-update');
    document.querySelector('.update-price-book-id').value = bookId
    var modalShown = elModal.classList.contains('display');
    if (!modalShown) {
        elModal.classList.add('display');
    } else {
        elModal.classList.remove('display');
    }
}

function onToggleModalDelete(bookId) {
    document.querySelector('.delete-book-id').value = bookId
    var elModal = document.querySelector('.modal-delete');
    var modalShown = elModal.classList.contains('display');
    if (!modalShown) {
        elModal.classList.add('display');
    } else {
        elModal.classList.remove('display');
    }
}

function onOpenModalRead() {
    var elModalRead = document.querySelector('.modal-read');
    elModalRead.classList.add('display');
}

function onCloseModalRead() {
    var elModalRead = document.querySelector('.modal-read');
    elModalRead.classList.remove('display');
}

function onUpdateBook() {
    var bookId = document.querySelector('.update-price-book-id').value;
    var priceUpdated = document.querySelector('.price-update-input').value;
    updateBook(bookId, priceUpdated);
    renderbooks()
}

function onRateBook(rateBtn, bookId) {
    var rateId = rateBtn.dataset.id;
    updateBookRating(rateId, bookId);
    renderBookDetails(bookId)
    renderbooks()
}

function onDeleteBook() {
    var bookId = document.querySelector('.delete-book-id').value;
    bookId = parseInt(bookId)
    removeBook(bookId);
    onToggleModalDelete()
    renderbooks();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'en') {
        document.body.classList.add('rtl');
        var elModals = document.querySelectorAll('.modal');
        elModals.forEach(elModal => elModal.classList.add('modal-en'))
    } else {
        document.body.classList.remove('rtl')
    }
    renderbooks()
}

function onAddBook() {
    var elTitle = document.querySelector('.title-input').value;
    var elPrice = document.querySelector('.price-input').value;
    var elImgUrl = document.querySelector('.img-url-input').value;
    addBook(elTitle, elPrice, elImgUrl)
    renderbooks()
    onToggleModal()
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var transkey = el.dataset.trans;
        var txt = getTrans(transkey);
        if (el.nodeName === "INPUT") el.setAttribute('placeholder', txt)
        if (el.className === "price") {
            txt = convertCurrency(el.innerText);
            txt = formatCurrency(txt)
            el.innerHTML = txt;
        }
        else el.innerHTML = txt
    })
}

