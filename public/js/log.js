
//remove input and input2 to cancal onEnter functionality and go back to onClick only
var input = document.getElementById("inputEmail");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("sign_in").click();
  }
});

var input2 = document.getElementById("inputPassword");
input2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("sign_in").click();
  }
});

$("#sign_in").click(() => {
	const headerModal = document.getElementById("hModal4");
	const email = String($("#inputEmail").val());
	const pass = String($("#inputPassword").val());
	const textModal = document.getElementById("parModal");

	if (!allFilled(email, pass)) {
		console.log("INSIDE ALLL FILLED");
		textModal.innerHTML = "You must fill all the boxes";
		$("#myModal").modal("show");
		return;
	}

	if (!ValidateEmail(email)) {
		console.log("INSIDE EMAIL INVALID");
		textModal.innerHTML = "Invalid email";
		$("#myModal").modal("show");
		return;
	}
	if (pass == "") {
		console.log("Password field empty");
		textModal.innerHTML = "Empty field";
		$("#myModal").modal("show");
		return;
	}

	const body1 = JSON.stringify({
		email: email,
		password: pass,
	});
	console.log("type of body: ", typeof body1);


    fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:body1,
    }).then((response)=>{
        if(response.redirected){
            window.location.replace(response.url);
        }
        return response;
    }).then((response)=>{
        if(response.status === 401){ //401 is returned by passport
            fetch("/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body1,
            })
                .then((response) => {
                    console.log("RESPONSE",response);
                    if (response.status === 400) { //returned by post /check
                        headerModal.innerHTML = "ERROR:";
                        textModal.innerHTML = "Email/password is incorrect"
                        $("#myModal").modal("show");
                    }
                })
                .catch((error) => {
                    console.log("ERRorrr", error);
                });
        }

    }).catch((error)=>{ console.log("Error2",error)});


});

function ValidateEmail(mail) {
	// eslint-disable-next-line no-useless-escape
	const newLocal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (newLocal.test(mail)) {
		return true;
	}
	// alert("You have entered an invalid email address!")
	return false;
}

function allFilled(...args) {
	let temp = true;
	args.map((x) => {
		console.log("X", String(x));
		if (!String(x)) temp = false;
	});
	console.log("returning FALSE", temp);
	return temp;
}