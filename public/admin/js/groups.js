var navbar = document.getElementById("navbar");
navbar.innerHTML += createNav("admin");

/* eslint-disable quotes */
fetch("/api/groups")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		var list = document.getElementById("groupsList");

		for (let i = 0; i < data.length; i++) {
			list.innerHTML +=
				' <div class="card">' +
				`<div class="card-header" id ="${data[i].id}">` +
				' <h2 class="mb-0">' +
				` <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${data[i].id}" aria-expanded="false" aria-controls="collapse${data[i].id}">` +
				`Group name: ${data[i].name} ` +
				` </button>` +
				`</h2>` +
				`</div>` +
				`<div id="collapse${data[i].id}" class="collapse" aria-labelledby = "${data[i].id}" data-parent="#groupsList">` +
				`<div class="card-body">` +
				`</div>` +
				`</div>` +
				`</div>`;
		}
		list.innerHTML += "<br><br>";
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});
