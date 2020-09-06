fetch("/admin-workers/get-workers")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);

		// var list = document.getElementById("tasksList");
		// for (let i = 0; i < data.length; i++) {
		// 	list.innerHTML +=
		// 		"<li class='col-md-12 col-sm-12'>" +
		// 		"  <div class='time task' id='task.id'>" +
		// 		` <div class='text'>${data[i].clientID} ${data[i].details} ${data[i].createdAt}</div>` +
		// 		"<button>cancal</button>" +
		// 		" </div>" +
		// 		"</li>";
		// }
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});

$("#register-btn").click(() => {
	// const email = $("#inputEmail");
	const email = String($("#inputEmail").val());
	const pass = String($("#inputPassword").val());
	const pass2 = String($("#reInputPassword").val());
	const textModal = document.getElementById("parModal");

	console.log("EMAIL:", email, "\n PASS", pass, "\n PASS2:", pass2);
	if (!allFilled(email, pass, pass2)) {
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
	if (pass !== pass2) {
		console.log("INSIDE PASSWORDS ARE NOT MATCHING");
		textModal.innerHTML = "Password are not matching";
		$("#myModal").modal("show");
		return;
	}
	if (pass == "" || pass2 == "") {
		console.log("Password field empty");
		textModal.innerHTML = "Empty field";
		$("#myModal").modal("show");
		return;
	}

	if (!ValidateEmail(email)) {
		console.log("INSIDE EMAIL INVALID");
		textModal.innerHTML = "Invalid email";
		$("#myModal").modal("show");
		return;
	}
	if (pass !== pass2) {
		console.log("INSIDE PASSWORDS ARE NOT MATCHING");
		textModal.innerHTML = "Password are not matching";
		$("#myModal").modal("show");
		return;
	}
	if (pass == "" || pass2 == "") {
		console.log("Password field empty");
		textModal.innerHTML = "Empty field";
		$("#myModal").modal("show");
		return;
	}

	console.log("REACHED END OF THE FUNC");

	const body = JSON.stringify({
		email: email,
		password: pass,
		rePassword: pass2,
	});
	console.log("type of body: ", typeof body);

	fetch("/admin-workers", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	})
		.then((response) => {
			return response;
		})
		.then((responseJson) => {
			console.log("RESPONSE:", responseJson);
			// if (responseJson.redirected) {
			// 	window.location.replace(responseJson.url);
			// }
		})
		.catch((error) => {
			console.log("ERROR:", error);
		});
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

$("#job-btn").click(() => {
	const textModal = document.getElementById("parModal");
	const headerModal = document.getElementById("hModal");
	const jobName2 = String($("#inputJob").val()).trim();
	if (jobName2 == "") {
		console.log("Field is empty");
		textModal.innerHTML = "Field is empty";
		$("#myModal").modal("show");
		return;
	}
	const body = JSON.stringify({
		name: jobName2,
	});
	console.log("type of body: ", typeof body);

	fetch("/admin-workers/create-job-type", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	})
		.then((response) => {
			console.log("BODY: ", body);
			console.log("RESPONSE:", response);
			if (response.status === 200) {
				headerModal.innerHTML = "SUCCESS";
			} else {
				headerModal.innerHTML = "ERROR";
			}
			return response.json();
		})
		.then((responseJson) => {
			textModal.innerHTML = responseJson.msg;
			$("#myModal").modal("show");
		})
		.catch((error) => {
			console.log("ERROR:", error);
		});
});
