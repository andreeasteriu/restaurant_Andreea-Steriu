const template = document.querySelector('#productTemplate').content;
const article = document.querySelector('#MENU');
const subnav = document.querySelector('#subnav');
const modal = document.querySelector('#myModal');
const link = "http://kea-alt-del.dk/t5/api/productlist";
const catlink = "http://kea-alt-del.dk/t5/api/categories";
const imglink = "http://kea-alt-del.dk/t5/site/imgs";
const plink = "http://kea-alt-del.dk/t5/api/product?id=";

/*var modal = document.getElementById('myModal');*/

fetch(catlink).then(result => result.json()).then(data => createCatContainers(data));

modal.addEventListener("click",  function() {
    modal.style.display = "none";
})

function createCatContainers(data) {

    data.forEach(cat => {
        const section = document.createElement("section");

        //problem down

        const a = document.createElement('a');
        a.textContent = cat;
        a.href = "#" + cat;
        a.addEventListener("click", () => filter(cat));
        subnav.appendChild(a);

        //problem up


        const h2 = document.createElement("h2");
        section.id = cat;
        section.classList.add("product");
        h2.textContent = "- " + cat + " -";
        section.appendChild(h2);
        article.appendChild(section);
    });
    fetch(link).then(result => result.json()).then(data => show(data));
}

//another problem :(

function filter(myFilter) {
    document.querySelectorAll("#MENU section").forEach(section => {
        if (section.id == myFilter) {
            section.classList.add("product");
            section.classList.remove("hide");
        } else {
            section.classList.remove("product");
            section.classList.add("hide");
        }
    })
}


function showDetails(product) {
    modal.querySelector(".modal-title").textContent = product.name;
    modal.querySelector(".modal_text").textContent = product.longdescription;
    modal.querySelector(".modal-pictures").src = "http://kea-alt-del.dk/t5/site/imgs/medium/" + product.image + "-md.jpg";
    modal.querySelector(".modal-price").textContent = 'PRICE: ' + product.price + ',-';

}

function cleanModal() {

    modal.querySelector(".modal-title").textContent = '';
    modal.querySelector(".modal_text").textContent = '';
    modal.querySelector(".modal-pictures").src = "";
    modal.querySelector(".modal-price").textContent = '';
}


function show(data) {
    data.forEach(elem => {
        const cate = elem.category;
        const section = document.querySelector('#' + cate);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
        clone.querySelector("h3").textContent = elem.name;
        clone.querySelector(".price-nr").textContent = elem.price;
        clone.querySelector("i").textContent = "(" + elem.shortdescription + ")";

//----------------------------Problemm

        clone.querySelector(".btn").addEventListener("click", ()=> {
            cleanModal()
            fetch(plink + elem.id).then(result=>result.json()).then (product => showDetails(product));

            modal.style.display = "block";
        });

        clone.querySelector(".pictures").addEventListener("click", ()=> {
            cleanModal()
            fetch(plink + elem.id).then(result=>result.json()).then (product => showDetails(product));

            modal.style.display = "block";
        });


//-----------------------------


        if (elem.discount) {
            const newPrice = Math.ceil(elem.price - elem.price * elem.discount / 100);
            clone.querySelector('.price').classList.add('old-price');
            clone.querySelector('.discount span').textContent = newPrice;


        } else {
            clone.querySelector('.discount').classList.add('hide');
        }

        if (elem.soldout) {
            const sold = document.createElement('img');
            clone.querySelector('.sold_out').appendChild(sold);
            clone.querySelector('.list_item').classList.add('opacity');
        } else {
            clone.querySelector('.sold_out').classList.add('hide');
        }

        if (elem.vegetarian) {
            //console.log(elem.vegetarian);
           // const vege = " YES";
            clone.querySelector('.no').innerHTML = "<span>&#9989;</span>";
        } else {
            clone.querySelector('.no').innerHTML = "<span>&#10062;</span>";
        }


        section.appendChild(clone);

    })
}

