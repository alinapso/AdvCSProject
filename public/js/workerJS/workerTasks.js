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
				`<button  id  = "accept" onclick="updateTask(${data[i].status},${data[i].id})">Accecpt    </button>` +
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


    fetch("/data/worker/presonal-tasks")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		var list = document.getElementById("taskList2");
		for (let i = 0; i < data.length; i++) {
            if(data[i].status === 2) continue;
			list.innerHTML +=
				' <div class="card">' +
				`<div class="card-header" id ="${data[i].id}">` +
				' <h2 class="mb-0">' +
				` <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${data[i].id}" aria-expanded="false" aria-controls="collapse${data[i].id}">` +
				`Email: ${data[i].email} 	Address: ${data[i].address} Status: ${getStatus(data[i].status)}` +
				` </button>` +
				`</h2>` +
				`</div>` +
				`<div id="collapse${data[i].id}" class="collapse" aria-labelledby = "${data[i].id}" data-parent="#taskList">` +
				`<div class="card-body">` +
				`<ul>Client ID: ${data[i].clientID}, Client presence required?: ${data[i].presence} ID: ${data[i].id}</ul>` +
				`<textarea style="text-align: left" rows="4" cols="25" readonly> ${data[i].details} </textarea>` +
				`<br /><br />` +
				`<button id= "finished" onclick="updateTask(${data[i].status},${data[i].id})" >Finished job </button>` +
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
    // status 0 = sent, 1 in progress, 2 finished
    function getStatus(status) {
        if (status === 0) return "sent";
        if (status === 1) return "on progress";
        return "fixed";
    }
    function updateTask(statusTask,taskID2){
        console.log("THIS IS TASK ID MY FRIEND LOOK AT IT NOW HERE ->" + taskID2);
        if(statusTask == 0){
            statusTask = 1;
            
            
        } else if(statusTask == 1){
            statusTask = 2;
        }


        const body = JSON.stringify({
            status: statusTask,  
            taskID: taskID2
        });
        console.log("type of body: ", typeof body);
    
        fetch("/worker-tasks/update-task", {
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
                //     window.location.replace(responseJson.url);
                // }
                location.reload();
            })
            .catch((error) => {
                console.log("ERROR:", error);
            });
    }
