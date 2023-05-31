var main = document.querySelector('#image')
var apiKey = '05db0d97-ee00-45e4-8ca1-d7ec5749659b';
var apiParameter = 'object?size=30&sort=random';
var apiURL = `https://api.harvardartmuseums.org/${apiParameter}&apikey=${apiKey}`;




var start = function () {
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
                else{
                    imageInfo.artistName=null;
                }
                imageInfo.classification = data.records[index].classification;
                imageInfo.century = data.records[index].century;
                imageInfo.primaryUrl = data.records[index].primaryimageurl;
                imageInfo.harvUrl = data.records[index].url;

                if (imageInfo.primaryUrl) {
                    var imageDisplay = document.createElement('img');
                    var test = document.createElement('p')
                    imageDisplay.setAttribute('src', imageInfo.primaryUrl);
                    test.textContent=index;
                    main.appendChild(imageDisplay);
                    imageDisplay.appendChild(test);
                    Links(imageInfo);
                }
            }
        })
};



//async
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


var Links = async function(link){
    // var imglinks = `${link.century} ${link.classification}`
    // console.log(imglinks);

    if (link.artistName && link.artistName !='Unidentified Artist') {
        var test = await wikipedia(link.artistName);
        console.log(test);
    }
    if (link.classification) {
        var test2 = await wikipedia(link.classification);
        console.log(test2);

    }
    if (link.century) {
        var test3 = await wikipedia(link.century);
        console.log(test3);
    }
};













start();


