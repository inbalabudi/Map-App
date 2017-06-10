(function(){
         
                    //Search Map :*//
                            //Variables :*//
 
    var user_name =   JSON.parse(localStorage.getItem("My User Name"));
    
    var select_target = document.querySelector('#city-select'); 
    
    var input = document.getElementById('user-city-input');   
    
    var app_data = JSON.parse(localStorage.getItem("app_data"));  
    
    var temporary_location_array = JSON.parse(localStorage.getItem("temporary_location_array"));
   
    var updated_city = JSON.parse(localStorage.getItem("clicked city")); 
    
    var map_reviews_box = document.querySelector('#map-reviews-box');

    var footer = document.querySelector(".map-page-footer");
    
    var city;   
    var first_place_id;
    var lat;    
    var lng;

    
            console.log("app_data: " , app_data);
            console.log("updated city:" , updated_city);
 
                 //Creat a Temperary array for last place display :*// 
                
        if  (! temporary_location_array) {
            temporary_location_array = [];          
                console.log("! temp location array false: ", temporary_location_array);
         };
                
                //Creat app data for all locations and reviews :*//
   
        if  (app_data){
        
            first_place_id = updated_city.place_id;
                console.log("first place id: ", first_place_id);


            temporary_location_array.push( app_data[0].location[first_place_id]);
            
                console.log("temporary location array : " , temporary_location_array);

         temporary_location_array.forEach((key)=>{

             var id_place = key.place_id;  
             lat = key.lat;
             lng = key.lng;
             var name = key.formatted_address;
             var reviews_num = key.reviews.length;
             var temp_reviews = key.reviews;

                 console.log("place_id: ", id_place);
                 console.log("temp reviews: ", temp_reviews);
                 console.log("reviews - num = ", reviews_num);
                 console.log("name: ", name);
              
             //display location reviews on map page - img, title and name :*//
              
         temp_reviews.forEach((key)=>{
                
            var map_reviews = `
                     <div class="map-form-done">
                          <div class="pmain-map">
                            <img class="map-profil-box" src="${key.img_url}" alt=""/>
                    </div> 
                        <h5 class="review-done-title">${key.title}</h5>
                        <span class="topic">${key.topic}</span><br>
                         <div class="review-footer"><span class="anchor-stamt"> ⚓  </span>  By:${key.user_name}</div>

                    </div> `
        
          map_reviews_box.innerHTML += map_reviews; 
               
          }) 
        });   

        } else {
            
            //If first time show default and create app_data :*//
        
            app_data = [{location:{}}];
            lat =  52.379189;
            lng =  4.899431;
            
        };
    
         //Get Google Map; Autocomplete; Place Map Value; Array Place And InfoWindow :*//
     
      window.initMap = function () {
            var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat , lng: lng},
            zoom: 12
            });
        
      var options = {
          types: ['(cities)']
           };    

      var autocomplete = new google.maps.places.Autocomplete(input , options);
      autocomplete.bindTo('bounds', map);

      var infowindow = new google.maps.InfoWindow();
          
      var marker = new google.maps.Marker   ({
            map: map,
            title: "Click Yellow Button ⇗"
          });
      
          marker.addListener    ('click', function(){
            infowindow.open(map, marker);
            });

         autocomplete.addListener('place_changed', function() {
                infowindow.close();
             
        var place = autocomplete.getPlace();
            if (!place.geometry) {
              return;
             }

            if  (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(19);
            }

         marker.setPlace({
              placeId: place.place_id,
              location: place.geometry.location   
            });
      
         marker.setVisible(true);

            infowindow.setContent('<div class="infowindow"><strong>' + place.formatted_address + '</strong><br>' + " ⛵ to add Your review" );
         infowindow.open(map, marker);
             
      
         //Create city Object according to place    ID Key/Values//
      
      city = place.place_id;
      
                console.log("place id" , place.place_id);
          localStorage.setItem("last place id" , JSON.stringify(place.place_id));
 
         
         city = {
                place_id : place.place_id,
                formatted_address : place.formatted_address,
                lat : place.geometry.location.lat(),
                lng : place.geometry.location.lng(),
                reviews : []
           };
      
        //If place id exist on app_data Create a new Object, else Display reviews :*//
    
      if    (! app_data[0].location[place.place_id]){
          
          app_data[0].location[place.place_id]  = city;   
              console.log("create new city:  " , city );
              console.log("this is a new city: ");
              
      };
             
             
          map_reviews_box.innerHTML = "";
        
             
          var show_reviews = app_data[0].location[place.place_id].reviews.length;
                      console.log("show me this city reviews num: " , show_reviews);
             
       if     (show_reviews > 0){
            app_data[0].location[place.place_id].reviews.forEach((key)=>{
                
                map_reviews = `  <div class="map-form-done">
                          <div class="pmain-map">
                            <img class="map-profil-box" src="${key.img_url}" alt=""/>
                    </div> 
                        <h5 class="review-done-title">${key.title}</h5>
                        <span class="topic">${key.topic}</span><br>
                         <div class="review-footer"><span class="anchor-stamt"> ⚓  </span>  By:${key.user_name}</div>

                      </div> `
                                                       
            map_reviews_box.innerHTML += map_reviews; 
                
         });
     };
     
localStorage.setItem("clicked city" , JSON.stringify(city)); 
localStorage.setItem("app_data" , JSON.stringify(app_data)); 
      
var city_name = document.querySelector('.input-box').value;
    
localStorage.setItem("city" , JSON.stringify(city_name));
          
   });

 };
        
        //Seleted Target move over to our very intersting next page :*//
    
        select_target.addEventListener('click' , function(event){
     
        window.location.href = "rrr.html?place_id" + city;
    
        });



})();