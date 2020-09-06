fetch("/data/users/get-workers")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);

		var list = document.getElementById("workerList");
		for (let i = 0; i < data.length; i++) {
			list.innerHTML +=
				"<li class='col-md-12 col-sm-12'>" +
				"  <div class='time task' id='task.id'>" +
				` <div class='text'>email:${data[i].email} type:${data[i].groupname}</div>` +
				`<button onclick='onClickBtn(${data[i].id})' >delete</button>` +
				" </div>" +
				"</li>";
		}
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});

fetch("/data/groups")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		var select = document.getElementById("groupsOptions");

		for (let i = 0; i < data.length; i++) {
			console.log(data[i]);
			let option = document.createElement("option");
			option.text = data[i].name;
			option.value = data[i].id;
			select.add(option);
		}
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});

// eslint-disable-next-line no-unused-vars
function onClickBtn(id) {
	console.log("CLICKED ITEM WITH ID :", id);
}

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
	const sel = document.getElementById("groupsOptions");
	const opt = sel.options[sel.selectedIndex];

	console.log("OPT: ", opt);

	// return;

	const body = JSON.stringify({
		email: email,
		password: pass,
		rePassword: pass2,
		groupID: opt.value,
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
