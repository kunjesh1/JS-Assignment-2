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
    "numberOfBranch":""
}



function myFunction() {
    var search = document.getElementById("myText").value;
    



    fetch('https://api.github.com/search/repositories?q={{' + search + '}}').then(
        res => res.json()).then(


            function (data) {
               // console.log(data);



                result.name = data.items[0].name;
                result.full_name = data.items[0].full_name;
                result.private = data.items[0].private;
                result.licenseName = data.items[0].licenseName;
                result.score = data.items[0].score;

                console.log(data.items[0].branches_url.split("{")[0]);



                var apiRequest1 = fetch(data.items[0].owner.url).then(res => res.json()).then(d1 => {
                    
                    result.owner.login = d1.login;
                    result.owner.name = d1.name;
                    result.owner.followersCount = d1.followers;
                    result.owner.followingCount = d1.following;
                })




                var apiRequest2 = fetch(data.items[0].branches_url.split("{")[0]).then(res=>res.json).then((d2
                )=>{
                 
                    result.numberOfBranch=Object.values(d2).map(d2=>d2.name).length;




                });
                

               
                Promise.all([apiRequest1, apiRequest2]).then(function () {
                      document.getElementById("output").innerHTML=JSON.stringify(result,undefined,2);
                   
                }).catch(err=>console.log(err));

            }

        );

    console.log(result);

}


