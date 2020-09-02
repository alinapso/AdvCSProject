



$("#register-btn").click( () => {
  // const email = $("#inputEmail");
  const email = String($("#inputEmail").val());
  const pass = String($("#inputPassword").val());
  const pass2 = String($("#reInputPassword").val());
  const textModal =  document.getElementById("parModal");


  console.log("EMAIL:",email,"\n PASS" ,pass, "\n PASS2:",pass2);

  if(!ValidateEmail(email))
  {
    console.log("INSIDE EMAIL INVALID");
    textModal.innerHTML = "Invalid email";
    $('#myModal').modal('show');
    return;
  }
  if(pass !== pass2)
  {
    console.log("INSIDE PASSWORDS ARE NOT MATCHING");
    textModal.innerHTML = "Password are not matching";
    $('#myModal').modal('show');
    return;
  }
  if(pass == "" || pass2 == ""){
    console.log("Password field empty");
    textModal.innerHTML = "Empty field";
    $('#myModal').modal('show');
    return;
  }


  console.log("REACHED END OF THE FUNC");

  const body = JSON.stringify({email:email,password:pass,rePassword:pass2});
  console.log("type of body: ",typeof body);
  
  fetch("/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:body
  }).then(response => {
    return response;
  }).then(responseJson => {
    console.log("RESPONSE:", responseJson);
    if(responseJson.redirected){
      window.location.replace(responseJson.url);
    }
  }).catch(error => {
    console.log("ERRor", error);
  });
  
});



function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    // alert("You have entered an invalid email address!")
    return (false)
}