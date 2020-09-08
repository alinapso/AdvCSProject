fetch("/data/tasks")
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
				` <div class='text' >Client ID: ${data[i].clientID} <br>CreatedAt: ${data[i].createdAt} </div>` +
				`<div style="height:100px;width:180px;border:1px solid #4e4e4e;font:16px Arial, Serif;overflow:auto;">${data[i].details}</div>`+
				" </div>" +
				"</li>";
		}
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});
