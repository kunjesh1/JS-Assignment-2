var result1= [];






function myFunction() {
    var search = document.getElementById("myText").value;
    





    fetch('https://api.github.com/search/repositories?q={{' + search + '}}').then(
        res => res.json()).then(d=>d["items"].filter((d,index)=>index<=2)).then(function (data) {
                console.log(data);



             
                data.forEach((d,i)=>{
                  console.log(i);

               
               
                result1.push({ "name": data[i].name,
                "full_name": data[i].full_name,
                "private": data[i].private,

                "licenseName":data[i].licenseName,
                "score": data[i].score,
                "owner":"",
                "numberOfBranch":""
            
              });
                 
                });

                console.log(result1);





              


                var apiRequest1 = Promise.all(
                    data.map(d=>fetch(d.owner.url).then(res=>res.json())
                
                ));
                
               



                var apiRequest2 = Promise.all(data.map(d=>fetch(d.branches_url.split("{")[0])
                .then(res=>res.json())))
                
            
                

              //Using Promise All 
              return Promise.all([apiRequest1, apiRequest2])
             
               

            

        //      async function fetchResult()
        //      {
        //          try{
        //           const x=await apiRequest1;

        //          } catch(err){console.log(err);}

        //          try{
        //           const y=await apiRequest2;
        //          }
        //          catch(err) {console.log(err);}
               

        //      }

        //      fetchResult().then(

        //         function print(){
        //          document.getElementById("output").innerHTML=JSON.stringify(result,undefined,2);
                 

        //     }

        // );

    //console.log(result);
    //console.log(jfkdj);

}








).then(function (data) {
    console.log(data[0]);
    

    console.log(result1[1].owner);
    data[0].forEach((d,i)=>{
    result1[i].owner=
     {
        "login": d.login,
        "name": d.name,
        "followersCount": d.followers,
        "followingCount": d.following
    };
    
     });


     data[1].forEach((d,i)=>{
      result1[i].numberOfBranch=Object.values(d).map(d2=>d2.name).length;

     


     });





    console.log(data[1]);
    document.getElementById("output").innerHTML=JSON.stringify(result1,undefined,2);
}).catch(err => (console.log(err)));

}

