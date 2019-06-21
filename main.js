


function myFunction() {
    var search=document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = search;
//'https://api.github.com/search/repositories?q={{'+search+'}}'
    // var ourRequest = new XMLHttpRequest();
    // ourRequest.open('GET','fdfjfdj' );
    


    fetch('https://api.github.com/search/repositories?q={{'+search+'}}').then(
        res=>res.json()).then(


            function(data){
  console.log(data.items[0].branches_url);
                var apiRequest1 = fetch(data.items[0].owner.url).then(function(response){ 
                    return response.json()
           });
           var apiRequest2 = fetch(data.items[0].branches_url).then(function(response){
                    return response.json()
           });
           var combinedData = {"apiRequest1":{},"apiRequest2":{}};
           Promise.all([apiRequest1,apiRequest2]).then(function(values){
               combinedData["apiRequest1"] = values[0];
               combinedData["apiRequest2"] = values[1];
               return combinedData;
           }).catch(err=>console.log(err));

            }

        );

}
        
        
        
        
        
        
        
    

       

   





