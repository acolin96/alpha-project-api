var main = document.querySelector('#image')
var apiKey = '05db0d97-ee00-45e4-8ca1-d7ec5749659b';
var apiParameter = 'object?size=10&sort=random';
var apiURL = `https://api.harvardartmuseums.org/${apiParameter}&apikey=${apiKey}`;
var imageInfo = {
    artistName:'',
    date:'',
    primaryUrl:'',
    harvUrl:''
}



var start = function () {
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            for (let index = 0; index < data.records.length; index++) {

                var classification = data.records[index].classification;
                var image = data.records[index].primaryimageurl;
                if (image) {
                    var imageDisplay = document.createElement('img');
                    imageDisplay.setAttribute('src', image);
                    main.appendChild(imageDisplay);
                    wikipedia(classification);
                }


            }

        })
};

var wikipedia = function (classification) {
    var wikiURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${classification}&limit=3&namespace=0&format=json`;

    fetch(wikiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        })

};



start();


