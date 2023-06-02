var main = document.querySelector('#image')
var apiKey = '06109596-113b-4976-abd2-d879493e72e8';
var apiParameter = 'object?size=10&sort=random';
var apiURL = `https://api.harvardartmuseums.org/${apiParameter}&apikey=${apiKey}`;


$(document).ready(function () {
    $(document).foundation();
});


var start = function () {
    var container = document.querySelector('.grid-x')
    container.innerHTML = "";

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (let index = 0; index < data.records.length; index++) {
                var imageInfo = {};

                if (data.records[index].people) {
                    imageInfo.artistName = data.records[index].people[0].name;
                }

                imageInfo.dated = data.records[index].dated;
                imageInfo.department = data.records[index].department;
                imageInfo.classification = data.records[index].classification;
                imageInfo.century = data.records[index].century;
                imageInfo.primaryUrl = data.records[index].primaryimageurl;
                imageInfo.harvUrl = data.records[index].url;
                imageInfo.title = data.records[index].title;
                imageInfo.technique = data.records[index].technique;
                imageInfo.culture = data.records[index].culture;



                if (imageInfo.primaryUrl) {
                    localStorage.setItem(index, JSON.stringify(imageInfo));
                    console.log(imageInfo);
                    generate(imageInfo.primaryUrl, index);
                }
            }
        })
};



var wikipedia = async function (example) {
    var wikiURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${example}&limit=3&namespace=0&format=json`;
    var url;

    return fetch(wikiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            url = data[3][0];
            return(url);
        })
};


var Links = async function (link) {
    var imglinks = {};

    if (link.artistName || link.artistName !='Unidentified Artist') {
        var test =  await wikipedia(link.artistName);
        imglinks.artistName=test;
    }
    if (link.classification) {
        var test2 = await wikipedia(link.classification);
        imglinks.classification = test2;


    }
    if (link.century) {
        var test3 = await wikipedia(link.century);
        imglinks.century = test3;

    }
    return imglinks;


};


var generate = function (imgURL, index) {

    var container = document.querySelector('.grid-x')
    var cell = document.createElement('div');
    var card = document.createElement('div');
    var img = document.createElement('img');


    cell.classList.add("cell");
    card.classList.add("card");
    card.setAttribute('data-open', "imgModal")

    img.classList.add('modalClick');
    img.setAttribute('object-fit', 'cover');
    img.setAttribute('height', '200px');
    img.setAttribute('width', '300px');
    img.setAttribute('id', index);
    img.setAttribute('src', imgURL);


    container.appendChild(cell)
    cell.appendChild(card);
    card.appendChild(img);

}

$('.generate-container').on('click', function (event) {
    var imgTarget = $(event.target);
    var imgID = event.target.id;
    if (imgTarget.is("img")) {
        modal(event, imgID);
    }
});




var modal = async function (event, id) {
    event.preventDefault();
    var info = JSON.parse(localStorage.getItem(id));


    var imglinks = {};
    imglinks=await Links(info)
    var modalInfo = document.createElement('div')
    var ArtName=document.createElement('h2');
    var Pcentury = document.createElement('p');
    var Pclassificiation= document.createElement('p');
    var Ptitle = document.createElement('p');
    var Ptechnique = document.createElement('p');
    var Pculture = document.createElement('p');
    var Pdated = document.createElement('p');
    var Pdepartment = document.createElement('p');


    if(info.dated){
        Pdated.textContent = info.dated;
        modalInfo.appendChild(Pdated);
    }






    ArtName.textContent = `Artists Name:${info.artistName}`;
    Pcentury.textContent = info.century;
    Pclassificiation.textContent = info.classification;
    Pdepartment.textContent=info.department;



    Pdated.textContent = info.dated;
    Ptitle.textContent = info.title;
    Ptechnique.textContent = info.technique;
    Pculture.textContent = info.culture;




    modalInfo.appendChild(Pdepartment);
    modalInfo.appendChild(Pdated);
    modalInfo.appendChild(Ptitle);
    modalInfo.appendChild(Ptechnique);
    modalInfo.appendChild(Pculture);
    modalInfo.appendChild(ArtName);
    modalInfo.appendChild(Pcentury);
    modalInfo.appendChild(Pclassificiation);
    modalInfo.appendChild(Pdepartment);



    var img = document.createElement('img');
    img.setAttribute('id', id);
    img.setAttribute('src', info.primaryUrl);


    var container = document.querySelector('.reveal')
    container.innerHTML="";
    container.appendChild(img);
    container.appendChild(modalInfo);


};





start();


var random = document.querySelector('.random');
random.addEventListener('click', start);


