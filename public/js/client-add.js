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
	});

fetch("/data/users/workerEmail")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log("DATA", data);
		const emailInput = document.getElementById("email-id");
		emailInput.setAttribute("placeholder", `${data.email}`);
		emailInput.setAttribute("readonly", "");
	})
	.catch((err) => {
		console.log("ERROR:", err);
	});

$("#btn-order").click(() => {
	// const email = String($("#email-id").val());
	const address = String($("#address").val());
	const details = String($("#details").val());
	const textModal = document.getElementById("parModal");
	const cb = document.getElementById("cb-pressence").checked;

	console.log("\n ADDRESS", address, "\n DETAILS:", details);
	if (!allFilled(address, details)) {
		console.log("INSIDE ALLL FILLED");
		textModal.innerHTML = "You must fill all the boxes";
		$("#myModal").modal("show");
		return;
	}
	const sel = document.getElementById("groupsOptions");
	const opt = sel.options[sel.selectedIndex];

	const body = JSON.stringify({
		address: address,
		details: details,
		presence: cb,
		groupID: opt.value,
	});
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
			if (responseJson.redirected) {
				window.location.replace(responseJson.url);
			}
		})
		.catch((error) => {
			console.log("ERROR:", error);
		});
});

function allFilled(...args) {
	let temp = true;
	args.map((x) => {
		if (!String(x)) temp = false;
	});
	return temp;
}
