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
            console.log(data);

            for (let index = 0; index < data.records.length; index++) {
                var imageInfo = {};
                if (data.records[index].people) {
                    imageInfo.artistName = data.records[index].people[0].name;}
                else {imageInfo.artistName = null;};

                imageInfo.classification = data.records[index].classification;
                imageInfo.century = data.records[index].century;
                imageInfo.primaryUrl = data.records[index].primaryimageurl;
                imageInfo.harvUrl = data.records[index].url;


                if (imageInfo.primaryUrl) {
                    localStorage.setItem(index, JSON.stringify(imageInfo));
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
            return (url);
        })
};


var Links = async function (link) {
    // var imglinks = {};

    // if (link.artistName && link.artistName !='Unidentified Artist') {
    //     var test = await wikipedia(link.artistName);
    //     imglinks.artistName=test;
    //     // console.log(test);
    // }
    // if (link.classification) {
    //     var test2 = await wikipedia(link.classification);
    //     imglinks.classification = test2;
    //     // console.log(test2);

    // }
    // if (link.century) {
    //     var test3 = await wikipedia(link.century);
    //     imglinks.century = test3;
    //     // console.log(test3);
    // }

    // return imglinks;


};


var generate = function (imgURL, index) {

    var container = document.querySelector('.grid-x')
    var cell = document.createElement('div');
    var card = document.createElement('div');
    var img = document.createElement('img');


    cell.classList.add("cell");
    card.classList.add("card");

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

$('.generate-container').on('click', function(event) {
    //alert("working")
    var imgTarget = $(event.target);
    var imgID = event.target.id;
    if(imgTarget.is("img")) {
        modal(event, imgID);
    }
});

var modal = function(event, id){
    event.preventDefault();
    //var id = $(this).attr('id');
    console.log(id);


    // var id = $(this).attr('id');
    // console.log(id);

     var info = localStorage.getItem(id);
     console.log(info);

};



start();


var random = document.querySelector('.random');
random.addEventListener('click', start );


// $('.btn').on('click', function () {
//     var id = $(this).parent().attr('id');
//     var task = $(this).siblings(".description").val();
//     localStorage.setItem(id, task);
// });
// var favButton = document.createElement('img');
// favButton.setAttribute('height', '94px');
// favButton.setAttribute('width', '94px');
// favButton.setAttribute('src', './assets/generic/icons8-heart-94.png');
// favButton.setAttribute('title', 'plus icons');
// card.appendChild(favButton);


// onclick of image the modal needs to be generated.
// the html structer and then the Links.



