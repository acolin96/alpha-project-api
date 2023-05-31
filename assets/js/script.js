var main = document.querySelector('#image')
var century= ' ';





var apiKey = '05db0d97-ee00-45e4-8ca1-d7ec5749659b';
var apiParameter = 'object?image?size=30&sort=random';
var apiURL = `https://api.harvardartmuseums.org/${apiParameter}&apikey=${apiKey}`;



var start = function () {
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            for (let index = 0; index < data.records.length; index++) {
                century = data.records[index].century;
                var image = data.records[index].primaryimageurl;
                if(image){
                var imageDisplay = document.createElement('img');
                imageDisplay.setAttribute('src', image);
                main.appendChild(imageDisplay);
                }
            }

        })
};


start();

