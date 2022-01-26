//Selectors
const shopInput = document.querySelector('.shop-input');
const shopButton = document.querySelector('.shop-button');
const shopList = document.querySelector('.shop-list');
const filterOption = document.querySelector('.shop-filter');

//Event Listeners
shopButton.addEventListener('click', addShop);
shopList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', shopFilter);

//Functions
function addShop(event){ //Function that adds new items to the list
    //prevent form from submitting
    event.preventDefault();
    //create shop Div
    const shopDiv = document.createElement("div");
    shopDiv.classList.add("shop");
    //create li
    const newShop = document.createElement('li');
    newShop.innerText = shopInput.value;
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

function shopFilter(e) {
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

