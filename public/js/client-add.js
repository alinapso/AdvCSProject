fetch("http://localhost:3000/data/groups")
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

$("#btn-order").click(() => {
	// const email = $("#inputEmail");
	const email = String($("#email-id").val());
	// const name = String($("#user_name").val());
	const address = String($("#address").val());
	const details = String($("#details").val());
	const textModal = document.getElementById("parModal");
	const cb = document.getElementById("cb-pressence").checked;

	console.log("EMAIL:", email, "\n ADDRESS", address, "\n DETAILS:", details);
	// if (!allFilled(email, name, address, details)) {
	// 	console.log("INSIDE ALLL FILLED");
	// 	textModal.innerHTML = "You must fill all the boxes";
	// 	$("#myModal").modal("show");
	// 	return;
	// }

	console.log("REACHED END OF THE FUNC");
	const sel = document.getElementById("groupsOptions");
	const opt = sel.options[sel.selectedIndex];

	console.log("OPT: ", opt);

	const body = JSON.stringify({
		clientID: email,
		address: address,
		details: details,
		presence: cb,
		groupID: opt.value,
	});
	console.log("BODY: ", body);
	console.log("type of body: ", typeof body);

	fetch("/client-add-orders/add-order", {
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

function allFilled(...args) {
	let temp = true;
	args.map((x) => {
		console.log("X", String(x));
		if (!String(x)) temp = false;
	});
	console.log("returning FALSE", temp);
	return temp;
}
