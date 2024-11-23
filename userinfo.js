function submitted(e){
             
    e.preventDefault();

    let namee = document.forms["id"]["name"].value;
    sessionStorage.setItem("name", namee);

    window.location ='index.html';
}

let user_name = sessionStorage.getItem("name").toUpperCase();
document.querySelector("span#name").innerHTML = user_name;

