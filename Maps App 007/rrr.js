(function (){
    
            //Reviews Page :*//
                //Variables :*//
    
    var user = JSON.parse(localStorage.getItem("My User Name"));

    var city_name = JSON.parse(localStorage.getItem("city"));

    var anchor_btn = document.querySelector('#send-form-button');

    document.querySelector('#review-city-name').innerHTML = city_name;

    var page_header = document.querySelector('#review-page-header')

    var footer = document.querySelector('#footer');

    var app_data = JSON.parse(localStorage.getItem("app_data"));

    var reviews_box = document.querySelector('#reviews-box');

    var last_place_id = JSON.parse(localStorage.getItem("last place id"));

    var updated_city = JSON.parse(localStorage.getItem("clicked city"));
    
    var city;    
    var review_length;
    var local_reviews;
    var review_done;
    var form;
    var btn_style;
    

            console.log ("app_data", app_data);   
            console.log("last place id review page: " , last_place_id);
    
    
    if  (! last_place_id && !app_data){
        app_data = [{location:{}}];
    } 
       
    //Check if Clicked location reviews exist :*//
            //Display old reviews to User :*//
    
            review_length = app_data[0].location[last_place_id].reviews.length;

            console.log("review-length: " , review_length); 
    
     if  (review_length === 0 ){

            console.log ("No Old reviews");
            page_header.innerHTML = "Be The First and Add your review";
         }
         else {
            local_reviews = app_data[0].location[last_place_id].reviews;
            console.log("local reviews: " , local_reviews); 
            console.log("local reviews title: " , local_reviews[0].title);        
             
           
            local_reviews.forEach((key) => {
              
                review_done =  `  <div class="review-form-done">
                  <div class="pmain">
                    <img class="freind-profil-box" src="${key.img_url}" alt=""/>
            </div> 
                <h5 class="review-done-title">${key.title}</h5>
                <p class="review-done-description">${key.description}</p>
                <span class="city-name">//${city_name}  </span>
                <span class="topic"> //${key.topic} </span><br>
                <div class="review-footer"><span class="anchor-stamt"> ⚓  </span>  By: ${key.user_name}</div>
            
         </div> `  ;
            reviews_box.innerHTML +=review_done;
           
                }); 
       
                console.log("We have old reviews");

            };

    
                //Form Variabels :*//
    
    
    anchor_btn.addEventListener ('click' , function(event){  
    

    var img_input = document.querySelector('#review-img').value;
    
    var img_box = document.querySelector('.form-image');

    var title_input = document.querySelector('#form-review-title').value; 
    
    var title_box = document.querySelector('.form-review-title');

    var description_input = document.querySelector('#review-form-substance').value; 
    
    var description_box = document.querySelector('.form-review-description');

    var topic_value = document.querySelector('#items').value;
    
    var topic_box = document.querySelector('#select-form-box');

    var name_input = document.querySelector('#form-name-varification').value;
    
    var name_box = document.querySelector('.form-name-varification');  
    
            
        form = {


        img_url: img_input, 
        title: title_input,
        description: description_input,
        topic: topic_value,
        user_name: name_input

        };
    
      console.log("form" , form);
    
            // Form Values check :*//
                    
    
   btn_style = document.querySelector('#form-box-add-button');  
                
            //URL Test//
        
            function isUrl  (pic) {
                    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                    return regexp.test(pic);
            
                };
            
            var is_url = isUrl(form.img_url);
                console.log("is url? :", is_url);        
        
       
        
    if  (is_url == false || form.title == false || form.description == false || form.topic == "☮" || form.user_name == false || form.user_name !== user ){
        
        
        
                console.log("some False values");
        
            img_box.style.borderBottomColor = "red";
            title_box.style.borderBottomColor = "red";
            description_box.style.borderBottomColor = "red";
            topic_box.style.borderBottomColor = "red";
            name_box.style.borderBottomColor = "red";
            name_box.style.borderTopColor = "red";
            btn_style.style.backgroundColor = "rgba(19, 0, 248, 0.92)";
        
          alert(" Some Fields Empty ");
          btn_style.style = false; 
          return false;
        
        }  
           
        else {
            
            img_box.style = false;
       /*     form.img_url = "pic/road.jpg";*/
            title_box.style = false;
            description_box.style = false;
            topic_box.style = false;
            name_box.style = false;       
            
        };
        
        

    
                //Form Output :*//
    
    review_done =   `  <div class="review-form-done">
                  <div class="pmain">
                    <img class="freind-profil-box" src="${form.img_url}" alt=""/>
            </div> 
                <h5 class="review-done-title">${form.title}</h5>
                <p class="review-done-description">${form.description}</p>
                <span class="city-name">//${city_name}  </span>
                <span class="topic"> //${form.topic} </span><br>
                <div class="review-footer"><span class="anchor-stamt"> ⚓  </span>  By: ${form.user_name}</div>
            
         </div> `  ;
    
    reviews_box.innerHTML +=review_done;
    page_header.innerHTML = " 🌐  Vacation Review Page" ; 
    alert("✔ Review was added to location succefully");
    
            //Save review to app_data :*//
    
    
    app_data[0].location[last_place_id].reviews.push(form);
  
    updated_city.reviews.push(form);
  
    console.log("updated with all reviews: " , updated_city);

    localStorage.setItem("app_data" , JSON.stringify(app_data));
    localStorage.setItem("clicked city" , JSON.stringify(updated_city));
  

}) ; 
       
    
})();