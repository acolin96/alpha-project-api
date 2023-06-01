var main = document.querySelector('#image')
var apiKey = '05db0d97-ee00-45e4-8ca1-d7ec5749659b';
var apiParameter = 'object?size=30&sort=random';
var apiURL = `https://api.harvardartmuseums.org/${apiParameter}&apikey=${apiKey}`;




var start = function () {
    var container = document.querySelector('.grid-x')
    container.innerHTML="";

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);

            for (let index = 0; index < data.records.length; index++) {
                // console.log(data);

                var imageInfo = {};

                if (data.records[index].people) {
                    imageInfo.artistName = data.records[index].people[0].name;}
                else {imageInfo.artistName = null;};

                imageInfo.classification = data.records[index].classification;
                imageInfo.century = data.records[index].century;
                imageInfo.primaryUrl = data.records[index].primaryimageurl;
                imageInfo.harvUrl = data.records[index].url;

                if (imageInfo.primaryUrl) {
                    generate(imageInfo.primaryUrl);
                    Links(imageInfo);
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
            return (url);
        })
};


var Links = async function (link) {
    // // var imglinks = `${link.century} ${link.classification}`
    // // console.log(imglinks);

    // if (link.artistName && link.artistName !='Unidentified Artist') {
    //     var test = await wikipedia(link.artistName);
    //     console.log(test);
    // }
    // if (link.classification) {
    //     var test2 = await wikipedia(link.classification);
    //     console.log(test2);

    // }
    // if (link.century) {
    //     var test3 = await wikipedia(link.century);
    //     console.log(test3);
    // }
};


var generate = function (imgURL) {

    // var container = document.createElement('div');
    var container = document.querySelector('.grid-x')
    // var grid = document.createElement('div');
    var cell = document.createElement('div');
    var card = document.createElement('div');
    var img = document.createElement('img');
    var favButton = document.createElement('button');

    // container.classList.add("grid-container");
    // grid.classList.add("grid-x", "grid-margin-x", "small-up-2", "medium-up-3");
    cell.classList.add("cell");
    card.classList.add("card");
    img.setAttribute('src', imgURL);
    favButton.classList.add('button');
    favButton.innerHTML = '&#x2764;';

    // container.appendChild(grid);
    // grid.appendChild(cell);
    container.appendChild(cell)
    cell.appendChild(card);
    card.appendChild(img);
    card.appendChild(favButton)
    // main.appendChild(container);

    //  var button = document.createElement('button');

    

}
//  var randomButton = document.getElementById('randomButton');
//   randomButton.addEventListener('click', function() {
     
//   });
start();
var random = document.querySelector('.random');
random.addEventListener('click', start );
