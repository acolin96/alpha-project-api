var userSelection = ' ';

$(document).ready(function () {
    $(document).foundation();
});

//Based on the user selection the Harvard API is called and the data is asigned to the object and stored to the localstorage.
var start = function () {

    var apiKey = '06109596-113b-4976-abd2-d879493e72e8';
    var apiParameter = `${userSelection}?size=30&sort=random`;
    var apiURL = `https://api.harvardartmuseums.org/${apiParameter}&apikey=${apiKey}`;

    var container = document.querySelector('.grid-x')
    container.innerHTML = "";

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (userSelection == 'object') {
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
                        generate(imageInfo.primaryUrl, index);
                    }
                }
            }
            else if (userSelection == 'image') {
                for (let index = 0; index < data.records.length; index++) {
                    var imageInfo = {};
                    imageInfo.baseimageurl = data.records[index].baseimageurl;
                    localStorage.setItem(index, JSON.stringify(imageInfo));
                    generate(imageInfo.baseimageurl, index)

                }
            }
        })
};


//Key words from the Harvard data are searched using the Wikipedia api. The top url is return. This is only done when a user cicks on the modal. If this was done for each image preemptively it would be very slow.
var wikipedia = async function (example) {
    var wikiURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${example}&limit=3&namespace=0&format=json`;
    var url;

    return fetch(wikiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            url = data[3][0];
            return (url);
        })
};

//We dont want to send null values to the Wiki api. There is not point in displaying the search results for null. This function filters out null values. Sends a legitimate word to Wiki,saves the data and returns it.
var Links = async function (link) {
    var imglinks = {};

    if (link.artistName || link.artistName != 'Unidentified Artist') {
        var name = await wikipedia(link.artistName);
        imglinks.artistName = name;
    }
    if (link.classification) {
        var classif = await wikipedia(link.classification);
        imglinks.classification = classif;
    }
    if (link.century) {
        var cent = await wikipedia(link.century);
        imglinks.century = cent;
    }
    return imglinks;
};

//This function generates the containers for the images. Creates, setsAttributes and appends them accordingly.
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

//adds a click event to the container with the images. If a user clicks on the image it calls the modal function tp be displayed
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
    var container = document.querySelector('.reveal')

    if (info.artistName) {
        var imglinks = {};
        imglinks = await Links(info)
        var modalInfo = document.createElement('div')
        var ArtName = document.createElement('h3');
        var Pcentury = document.createElement('p');
        var Pclassificiation = document.createElement('p');
        var Ptitle = document.createElement('p');
        var Ptechnique = document.createElement('p');
        var Pculture = document.createElement('p');
        var Pdated = document.createElement('p');
        var Pdepartment = document.createElement('p');
        var wikiLinks = document.createElement('div');
        var textWiki = document.createElement('h5');
        var link1 = document.createElement('a');
        var link2 = document.createElement('a');
        var link3 = document.createElement('a');


        textWiki.textContent = "Wikipedia Links"

        if (imglinks.artistName) {
            link1.setAttribute('href', imglinks.artistName);
            link1.setAttribute('target', '_blank');
            link1.textContent = info.artistName;
        };
        if (imglinks.century) {
            link2.setAttribute('href', imglinks.century)
            link2.setAttribute('target', '_blank');

            link2.textContent = info.century;
        };
        if (imglinks.classification) {
            link3.setAttribute('href', imglinks.classification)
            link3.setAttribute('target', '_blank');

            link3.textContent = info.classification;
        };


        if (typeof info.artistName === 'undefined') {
            ArtName.textContent = `Artists Name: Unidentifed Artist`;

        } else {
            ArtName.textContent = `Artists Name:${info.artistName}`;
        }

        Pcentury.textContent = info.century;
        Pclassificiation.textContent = info.classification;
        Pdepartment.textContent = info.department;
        Pdated.textContent = info.dated;
        Ptitle.textContent = info.title;
        Ptechnique.textContent = info.technique;
        Pculture.textContent = info.culture;


        modalInfo.appendChild(Ptitle);
        modalInfo.appendChild(ArtName);
        modalInfo.appendChild(Pcentury);
        modalInfo.appendChild(Pclassificiation);
        modalInfo.appendChild(Pdepartment);
        modalInfo.appendChild(Ptechnique);
        modalInfo.appendChild(Pculture);
        modalInfo.appendChild(Pdated);
        modalInfo.appendChild(wikiLinks);
        wikiLinks.appendChild(textWiki);
        wikiLinks.appendChild(link1);
        wikiLinks.appendChild(link2);
        wikiLinks.appendChild(link3);

        var img = document.createElement('img');
        img.setAttribute('id', id);
        img.setAttribute('src', info.primaryUrl);
        container.innerHTML = "";
        container.appendChild(img);
        container.appendChild(modalInfo);

    }
    else if (info.baseimageurl) {
        var img = document.createElement('img');
        img.setAttribute('id', id);
        img.setAttribute('src', info.baseimageurl);
        container.innerHTML = "";
        container.appendChild(img);
    };

    var favButton = document.createElement('button');
    favButton.classList.add('button');
    favButton.classList.add('favorite-button')
    favButton.innerHTML = '&#x2764;';
    container.appendChild(favButton);

    $('.favorite-button').on('click', function () {
        var count = JSON.parse(localStorage.getItem("count")) || 0;
        count++;
        localStorage.setItem("count", JSON.stringify(count));
        localStorage.setItem(`fav${count}`, JSON.stringify(info));
    });

}


//Object button at top of page. Changes the user selection and calls the start function.
var object = document.querySelector('.object');
object.addEventListener('click',
    function () {
        userSelection = "object";
        start();
    });

//Image button at top of page. Changes the user selection and calls the start function.
var images = document.querySelector('.images');
images.addEventListener('click',
    function () {
        userSelection = "image";
        start();
    });


//Favorite button at top of page. It searches through local storage for all favorited items then calls the generate function.
var favorites = document.querySelector('.favorites')
favorites.addEventListener('click',
    function () {
        var container = document.querySelector('.grid-x')
        container.innerHTML = "";
        let count = JSON.parse(localStorage.getItem('count'));
        for (let index = 1; index <= count; index++) {
            var fav = `fav${index}`;
            var info = JSON.parse(localStorage.getItem(fav));

            if (info) {
                if (info.artistName) {
                    generate(info.primaryUrl, fav);
                }
                else if (info.baseimageurl) {
                    generate(info.baseimageurl, fav)
                }
            }
        };
    });

