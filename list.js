const template = document.querySelector('#productTemplate').content;
const article = document.querySelector('#MENU');
const h1 = document.querySelector('h1');
const subnav = document.querySelector('#subnav');
const link = "http://kea-alt-del.dk/t5/api/productlist";
const catlink = "http://kea-alt-del.dk/t5/api/categories";
const imglink = "http://kea-alt-del.dk/t5/site/imgs";

var modal = document.getElementById('myModal');

fetch(catlink).then(result => result.json()).then(data => createCatContainers(data));



function createCatContainers(data) {

    data.forEach(cat => {
        const section = document.createElement("section");

        //problem down

        const a = document.createElement('a');
        a.textContent = cat;
        a.href = "#";
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
    console.log(document.querySelectorAll("#MENU section"));
    document.querySelectorAll("#MENU section").forEach(section => {
        console.log(section.id + " " + myFilter);
        if (section.id == myFilter) {
            section.classList.add("product");
            section.classList.remove("hide");
        } else {
            section.classList.remove("product");
            section.classList.add("hide");
        }
    })
}

function show(data) {
    data.forEach(elem => {
        const cate = elem.category;
        const section = document.querySelector('#' + cate);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
        clone.querySelector("h3").textContent = elem.name;
        clone.querySelector(".price-nr").textContent = elem.price;



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
        } else {
            clone.querySelector('.sold_out').classList.add('hide');
        }

        if (elem.vegetarian) {
            //console.log(elem.vegetarian);
            const vege = " YES";
            clone.querySelector('.no').textContent = vege;
        }



        clone.querySelector(".btn").addEventListener("click", evt => {
            modal.style.display = "block";
        })


        section.appendChild(clone);

    })
}



window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
