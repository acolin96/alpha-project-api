var main = document.querySelector('#image')
var apiKey = '05db0d97-ee00-45e4-8ca1-d7ec5749659b';
var apiParameter = 'object?size=50&sort=random';
var apiURL = `https://api.harvardartmuseums.org/${apiParameter}&apikey=${apiKey}`;




var start = function () {
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (let index = 0; index < data.records.length; index++) {

                var imageInfo = {
                    // artistName: null,
                    // classification: null,
                    // century: null,
                    // primaryUrl: null,
                    // harvUrl: null
                };


                if (data.records[index].people){
                    imageInfo.artistName = data.records[index].people[0].name;

                }



                imageInfo.classification = data.records[index].classification;
                imageInfo.century = data.records[index].century;
                imageInfo.primaryUrl = data.records[index].primaryimageurl;
                imageInfo.harvUrl = data.records[index].url;

                if (imageInfo.primaryUrl) {
                    var imageDisplay = document.createElement('img');
                    imageDisplay.setAttribute('src', imageInfo.primaryUrl);
                    main.appendChild(imageDisplay);
                    wikipedia(imageInfo);
                }


            }

        })
};

var wikipedia = function (examp) {


    // console.log("test");

    console.log(examp);

    // for (let index = 0; index < ; index++) {
    //     const element = array[index];

    // }
    var wikiURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${examp.classification}&limit=3&namespace=0&format=json`;

    fetch(wikiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        })

};



start();


