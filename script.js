import { menu } from "./app.js";


// menu butonlarının yerleştirileceği alana erişim için değişken atandı. 
let btnArea = document.getElementsByClassName('btn-container')[0];

// yemek kartlarının yerleştirileceği alana erişim için değişken atandı. 
let cardsArea = document.getElementsByClassName('menu-items')[0];


// yemek kayıtlarının olduğu menu nesnesinin içinden ketogori adları alındı 
function setCategories(recipeData){
    let typeSet = new Set();
    typeSet.add('All');
    for(let x = 0; x < recipeData.length; x++){
        typeSet.add(recipeData[x].category);
    }

    return Array.from(typeSet);
}

//  ketogori adları diziye atandı.
let categoryBtns = setCategories(menu);



// kategori butonlarını yaratıp buton alanına yerleştirecek fonksiyon yazıldı.
function createButtons(buttonArea, btnCategory){
    for(let x = 0; x < btnCategory.length; x++){
        let newbtn = document.createElement('button');
        newbtn.id=btnCategory[x];
        newbtn.classList.add('btn-item', 'btn-style');
        newbtn.innerText = btnCategory[x];
        newbtn.addEventListener('click', addCards);
        buttonArea.appendChild(newbtn);
    }
}

// kategori butonları yerlerine kondu.
createButtons(btnArea, categoryBtns);


// tek bir yemek kartını oluşturup yemek kartlarının bulunduğu alana koyan fonksiyon yazıldı. 
function putCard(x, menu){

    let newCard = document.createElement('div');
    newCard.classList.add('menu-card');

    let ncphoto = document.createElement('img');
    ncphoto.src = menu[x].img;
    ncphoto.classList.add('photo');

    let menuCover = document.createElement('div');
    menuCover.classList.add('menu-info');

            let menuTitle = document.createElement('div');
            menuTitle.classList.add('menu-title');

                let recipeName = document.createElement('h4');
                recipeName.innerHTML = menu[x].title;

                let recipePrice = document.createElement('h4');
                recipePrice.innerHTML = menu[x].price;

                menuTitle.appendChild(recipeName);
                menuTitle.appendChild(recipePrice);


            let recipeText = document.createElement('p');
            recipeText.innerHTML = menu[x].desc;
            recipeText.classList.add('menu-text');


            menuCover.appendChild(menuTitle);
            menuCover.appendChild(recipeText);

    newCard.appendChild(ncphoto);
    newCard.appendChild(menuCover);
    cardsArea.appendChild(newCard);

} // function end 



// kategori butonlarının tıklanması ile çalışacak fonksiyon yazıldı.
function addCards(e){

    // ilk olarak yemek kartları alanı temizlendi.
    cardsArea.innerHTML = "";

    // gösterilecek kartların konulacağı bir dizin tanımlandı.
    let gosterilecek = [];

    // eğer seçilen kategori 'All'dan farklı ise, tüm kartların olduğu diziyi filter ile araştırıp, sadece seçilen kategoriye ait elemanları,  gosterilecek kartlar için hazırlanan diziye atan if yazıldı. 
    if(e.target.id != 'All'){
        gosterilecek = menu.filter((item)=>item.category === e.target.id ? item : null); // kategori varsa filter yap.
    }else{
        gosterilecek = [...menu]; // yoksa filter yapma
    }
    
    for(let x = 0; x < gosterilecek.length; x++){
        putCard(x, gosterilecek);  // gosterilmesi için seçilen yemek kartları, for döngüsü içinde daha önce hazırlanan ve tek tek kartları hazırlayıp yemek kartı alanına koyan fonksiyon çalıştırıldı.
    }
}




// assCards  fonksiyonu için alternatif
function addCards2(e){
        cardsArea.innerHTML = "";

        for(let x = 0; x < menu.length; x++){

            if(e.target.id == 'All'){
                putCard(x, menu);
            }else{
                if(menu[x].category == e.target.id){
                    putCard(x, menu);
                }
            } // All kontrolü

        } //  for döngüsü

}


