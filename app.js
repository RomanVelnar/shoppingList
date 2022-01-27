//Selectors
const shopInput = document.querySelector('.shop-input');
const shopButton = document.querySelector('.shop-button');
const shopList = document.querySelector('.shop-list');
const filterOption = document.querySelector('.shop-filter');

//Event Listeners
document.addEventListener('DOMContentLoaded', getShops)
shopButton.addEventListener('click', addShop);
shopList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', shopFilter);

//Functions
function addShop(event){ //Function that adds new items to the list
    //prevent form from submitted
    event.preventDefault();
    //create shop Div
    const shopDiv = document.createElement("div");
    shopDiv.classList.add("shop");
    //create li
    const newShop = document.createElement('li');
    newShop.innerText = shopInput.value;
    newShop.classList.add('shop-item');
    shopDiv.appendChild(newShop); //adds the new item to the shopDiv above
    //add shop to local storage
    saveLocalShops(shopInput.value);
    //adding completed button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    shopDiv.appendChild(completeButton);
    //adding delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    shopDiv.appendChild(deleteButton);
    //append to list
    shopList.appendChild(shopDiv);
    //clear the input value
    shopInput.value = "";
};

function deleteCheck(e){ //Function that deletes items listed on the shopping list
    const item = e.target;
    // Delete shoping list
    if (item.classList[0] === "delete-btn") {
        const shop = item.parentElement;
        //animation
        shop.classList.add('fall');
        removeLocalShops(shop);
        shop.addEventListener('transitionend', function(){
            shop.remove();
        })
    }
    // Check mark
    if(item.classList[0] === "complete-btn"){
        const shop = item.parentElement;
        shop.classList.toggle('completed');
    }
};

function shopFilter(e) { //function that filters between different states of a task
    const shops = shopList.childNodes;
    shops.forEach(function (shop) { 
        const mStyle = shop.style;  
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (shop.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (shop.classList.contains('completed')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    });
}

function saveLocalShops(shop){ //Function that saves listed items to local storage
    let shops; //First part checks if we have shops, items selected
    if(localStorage.getItem("shops") === null){
        shops = []; //If we dont have a shops item, creates an empty array
    } else {
        shops = JSON.parse(localStorage.getItem("shops"));
    }
    shops.push(shop);
    localStorage.setItem("shops", JSON.stringify(shops));
}

function getShops(){
    let shops;
    if(localStorage.getItem("shops") === null){
        shops = [];
    } else {
        shops = JSON.parse(localStorage.getItem("shops"));
    }
    shops.forEach(function(shop){
    //create shop Div
    const shopDiv = document.createElement("div");
    shopDiv.classList.add("shop");
    //create li
    const newShop = document.createElement('li');
    newShop.innerText = shop;
    newShop.classList.add('shop-item');
    shopDiv.appendChild(newShop); //adds the new item to the shopDiv above
    //adding completed button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    shopDiv.appendChild(completeButton);
    //adding delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    shopDiv.appendChild(deleteButton);
    //append to list
    shopList.appendChild(shopDiv);
    });
}

function removeLocalShops(shop){
    let shops;
    if(localStorage.getItem("shops") === null){
        shops = [];
    } else {
        shops = JSON.parse(localStorage.getItem("shops"));
    }
    const shopIndex = shop.children[0].innerText;
    shops.splice(shops.indexOf(shopIndex), 1);
    localStorage.setItem("shops", JSON.stringify(shops));
}
