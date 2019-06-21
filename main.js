var result =

{
    "name": "",
    "full_name": "",
    "private": "",
    "owner": {
        "login": "",
        "name": "",
        "followersCount": "",
        "followingCount": ""
    },
    "licenseName": "",
    "score": "",
    "numberOfBranch": ""
}



function myFunction() {
    var search = document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = search;
    //'https://api.github.com/search/repositories?q={{'+search+'}}'
    // var ourRequest = new XMLHttpRequest();
    // ourRequest.open('GET','fdfjfdj' );



    fetch('https://api.github.com/search/repositories?q={{' + search + '}}').then(
        res => res.json()).then(


            function (data) {
               // console.log(data);



                result.name = data.items[0].name;
                result.full_name = data.items[0].full_name;
                result.private = data.items[0].private;
                result.licenseName = data.items[0].licenseName;
                result.score = data.items[0].score;

                //console.log(data.items[0].owner.url);



                var apiRequest1 = fetch(data.items[0].owner.url).then(res => res.json()).then(d1 => {
                    
                    result.owner.login = d1.login;
                    result.owner.name = d1.name;
                    result.owner.followersCount = d1.followers;
                    result.owner.followingCount = d1.following;
                }).catch(err=>console.log(err));




                var apiRequest2 = fetch(data.items[0].branches_url).then(function (response) { 
                    return response.json();
                }).catch(err=>console.log(err));

                var combinedData = { "apiRequest1": {}, "apiRequest2": {} };
                Promise.all([apiRequest1, apiRequest2]).then(function (values) {
                    combinedData["apiRequest1"] = values[0];
                    combinedData["apiRequest2"] = values[1];
                    return combinedData;
                });

            }

        );

    console.log(result);

}


