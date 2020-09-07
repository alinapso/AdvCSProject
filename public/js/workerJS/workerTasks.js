fetch("/data/users/worker/tasks")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		var list = document.getElementById("taskList");
		for (let i = 0; i < data.length; i++) {
			list.innerHTML +=
				' <div class="card">' +
				`<div class="card-header" id ="${data[i].id}">` +
				' <h2 class="mb-0">' +
				` <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${data[i].id}" aria-expanded="false" aria-controls="collapse${data[i].id}">` +
				`Email: ${data[i].email} 	Address: ${data[i].address} Status: ${data[i].status}` +
				` </button>` +
				`</h2>` +
				`</div>` +
				`<div id="collapse${data[i].id}" class="collapse" aria-labelledby = "${data[i].id}" data-parent="#taskList">` +
				`<div class="card-body">` +
				`<ul>Client ID: ${data[i].clientID}, Client presence required?: ${data[i].presence} ID: ${data[i].id}</ul>` +
				`<textarea style="text-align: left" rows="4" cols="25" readonly> ${data[i].details} </textarea>` +
				`<br /><br />` +
				`<button onclick="AcceptApplication(${data[i].id})" margin-left = 10%>Accecpt    </button>` +
				`<button onclick="RejectApplication(${data[i].id})"> Reject</button>` +
				`</div>` +
				`</div>` +
				`</div>`;

			console.log(list);
		}
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});

fetch("/data/users/workerEmail")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log("here");
		console.log(data);
		var list = document.getElementById("emailz");
		list.setAttribute("placeholder", `${data.email}`);
		list.setAttribute("readonly", "");

		console.log(list);
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});
