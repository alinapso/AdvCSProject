fetch("/data/users/workers")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log("here");
		console.log(data);
		setupdata(
			data[0].email,
			data[0].groupname,
			data[0].id,
			data[0].firstName,
			data[0].familyName
		);
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});

function setupdata(email, groupname, id, name, famName) {
	const _email = document.getElementById("emailz");
	const _serviceType = document.getElementById("serviceType");
	const _id = document.getElementById("idHolder");
	const _name = document.getElementById("firstName");
	const _fName = document.getElementById("lastName");

	_serviceType.setAttribute("placeholder", groupname);
	_serviceType.setAttribute("readonly", "");
	_email.setAttribute("placeholder", `${email}`);
	_email.setAttribute("readonly", "");
	_id.setAttribute("placeholder", `${id}`);
	_id.setAttribute("readonly", "");

	if (name !== "null" && name !== null && name !== undefined)
		_name.setAttribute("value", name);
	if (famName !== "null" && famName !== null && famName !== undefined)
		_fName.setAttribute("value", famName);
}

$("#btn-update").click(() => {
	const textModal = document.getElementById("parModal");
	const headerModal = document.getElementById("hModal");
	const _name = String($("#firstName").val()).trim();
	const _fName = String($("#lastName").val()).trim();

	const body = JSON.stringify({
		firstName: _name,
		familyName: _fName,
	});
	console.log("type of body: ", typeof body);

	fetch("/worker-profile/set-profile", {
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
