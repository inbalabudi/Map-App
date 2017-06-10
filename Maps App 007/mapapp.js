(function(){
    
            //First - user Name and Id :*//

    var user_btn = document.querySelector('#user-btn');
    var send_btn = document.querySelector('#send-btn');

    
    user_btn.addEventListener('click', userDetails);
    
        function userDetails(event){


            var users = [{loged_user:{}}];    
            users[0].loged_user = {
            name:document.querySelector('.user-name-box').value,
            id:document.querySelector('.user-id-box').value

        }


        localStorage.setItem("User", JSON.stringify(users[0].loged_user));
            
        localStorage.setItem("My User Name", JSON.stringify(users[0].loged_user.name));
            
        localStorage.setItem("My User ID", JSON.stringify(users[0].loged_user.id));    

   
    window.location.href = "searchmap.html?user_id" + users[0].loged_user.id;
        
        
      }

})();