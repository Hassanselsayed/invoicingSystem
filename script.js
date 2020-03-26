const invoiceApp = {};


invoiceApp.$itemInput = $('input[type=text]#item');
invoiceApp.$priceInput = $('input[type=number]#price');
invoiceApp.$quantityInput = $('input[type=number]#quantity');
invoiceApp.$toDoList = $('ol');

invoiceApp.totalItemPrice = 0;
invoiceApp.beforeTax = 0;
invoiceApp.tax = 0;
invoiceApp.afterTax = 0;

invoiceApp.$billBeforeTax = $('span.beforeTax');
invoiceApp.$taxAmount = $('span.tax');
invoiceApp.$billAfterTax = $('span.afterTax');

invoiceApp.calculations = function() {
    invoiceApp.tax = invoiceApp.beforeTax * 0.13;
    invoiceApp.afterTax = invoiceApp.beforeTax + invoiceApp.tax;

    invoiceApp.$billBeforeTax.text(invoiceApp.beforeTax.toFixed(2));
    invoiceApp.$taxAmount.text(invoiceApp.tax.toFixed(2));
    invoiceApp.$billAfterTax.text(invoiceApp.afterTax.toFixed(2));
};

invoiceApp.formListener = (event) => {
    event.preventDefault();
    const toDoItem = invoiceApp.$itemInput.val().trim();
    const itemPrice = invoiceApp.$priceInput.val();
    const itemQuantity = invoiceApp.$quantityInput.val();

    invoiceApp.totalItemPrice = itemPrice * itemQuantity;
    if (toDoItem !== '') {
        invoiceApp.$toDoList.append(`
            <li>
                <span class="item">${toDoItem}</span>
                <span class="itemPrice">${itemPrice}</span>
                <span class="itemQuantity">${itemQuantity}</span>
                <span class="totalItemPrice">${invoiceApp.totalItemPrice.toFixed(2)}</span>
                <button id="remove" title="remove the item from invoice">x</button>
            </li>
        `);
    }
    invoiceApp.$itemInput.val('').focus();
    invoiceApp.$priceInput.val('');
    invoiceApp.$quantityInput.val('');

    invoiceApp.beforeTax += invoiceApp.totalItemPrice;
    invoiceApp.calculations();

};

invoiceApp.removeItemListener = function() {
    const $removeElement = $(this).parent('li');
    $removeElement.remove();

    const $removedItem = $(this).prev('span');
    const removedPrice = $removedItem.text();

    invoiceApp.beforeTax -= removedPrice;
    invoiceApp.calculations();

};

invoiceApp.init = () => {
    $('ol').on('click', '#remove', invoiceApp.removeItemListener);
    $('form.addingItem').on('submit', invoiceApp.formListener);
};

$(() => {
    invoiceApp.init();
});