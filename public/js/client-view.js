fetch("http://localhost:3000/data/client/tasks")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		var list = document.getElementById("tasksList");
		for (let i = 0; i < data.length; i++) {
			list.innerHTML +=
				"<li class='col-md-12 col-sm-12'>" +
				"  <div class='time task' id='task.id'>" +
				` <div class='text'>${data[i].clientID} ${data[i].details} ${data[i].createdAt}</div>` +
				"<button>cancal</button>" +
				" </div>" +
				"</li>";
		}
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});
