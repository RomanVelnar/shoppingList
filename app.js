//Selectors
const shopInput = document.querySelector('.shop-input');
const shopButton = document.querySelector('.shop-button');
const shopList = document.querySelector('.shop-list');

//Event Listeners
shopButton.addEventListener('click', addShop);

//Functions
function addShop(event){
    //prevent form from submitting
    event.preventDefault();
    //create shop Div
    const shopDiv = document.createElement("div");
    shopDiv.classList.add("shop");
    //create li
    const newShop = document.createElement('li');
    newShop.innerText = 'yo';
    newShop.classList.add('shop-item');
    shopDiv.appendChild(newShop);
    //adding completed button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    shopDiv.appendChild(completeButton);
    //adding delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("complete-btn");
    shopDiv.appendChild(deleteButton);
    //append to list
    shopList.appendChild(deleteButton);
}