var navbar = document.getElementById("navbar");
navbar.innerHTML += createNav("admin");

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

	fetch("/admin/workers/create-job-type", {
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
