var navbar = document.getElementById("navbar");
navbar.innerHTML += createNav("admin");

fetch("/api/tasks/")
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
			` <div class='text' >Client ID: ${data[i].clientID} <br>CreatedAt: ${data[i].createdAt} <br> Address: ${data[i].address} <br>Status: ${getStatus(data[i])}  </div>` +
			`<div style="height:100px;width:180px;border:1px solid #4e4e4e;font:16px Arial, Serif;overflow:auto;">${data[i].details}</div>`+
			" </div>" +
			"</li>";
	}
  })
  .catch((err) => {
    console.log(err);
    // Do something for an error here
  });

  function getStatus(data) {
	if (data.status === 0) return "Waiting to be accepted";
	if (data.status === 1) return `Accepted by a workerID: ${data.workerID}`;
	if(data.status === 2) return `Job done by a workerID: ${data.workerID}`;
}
