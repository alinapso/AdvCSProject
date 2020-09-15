var navbar = document.getElementById("navbar");
navbar.innerHTML += createNav("worker");

/* eslint-disable quotes */
fetch("/api/tasks/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var listWorker = document.getElementById("taskList");
    var listUnAssigned = document.getElementById("taskList2");
    for (let i = 0; i < data.length; i++) {
      if (data[i].workerID === 0)
        listWorker.innerHTML += createTaskUnAssigend(data[i]);
      else {
        listUnAssigned.innerHTML += createTaskWorker(data[i]);
      }
    }
  })
  .catch((err) => {
    console.log(err);
    // Do something for an error here
  });
function createTaskUnAssigend(task) {
  return (
    ' <div class="card">' +
    `<div class="card-header" id ="${task.id}">` +
    ' <h2 class="mb-0">' +
    ` <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${task.id}" aria-expanded="false" aria-controls="collapse${task.id}">` +
    `Email: ${task.email} 	Address: ${task.address} Status: ${getStatus(
      task.status
    )}` +
    ` </button>` +
    `</h2>` +
    `</div>` +
    `<div id="collapse${task.id}" class="collapse" aria-labelledby = "${task.id}" data-parent="#taskList">` +
    `<div class="card-body">` +
    `<ul>Client ID: ${task.clientID}, Client presence required?: ${task.presence} ID: ${task.id}</ul>` +
    `<textarea style="text-align: left" rows="4" cols="25" readonly> ${task.details} </textarea>` +
    `<br /><br />` +
    `<button  id  = "accept" onclick="updateTask(${task.status},${task.id})">Accecpt    </button>` +
    `</div>` +
    `</div>` +
    `</div>`
  );
}

function createTaskWorker(task) {
  return (
    ' <div class="card">' +
    `<div class="card-header" id ="${task.id}">` +
    ' <h2 class="mb-0">' +
    ` <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${task.id}" aria-expanded="false" aria-controls="collapse${task.id}">` +
    `Email: ${task.email} 	Address: ${task.address} Status: ${getStatus(
      task.status
    )}` +
    ` </button>` +
    `</h2>` +
    `</div>` +
    `<div id="collapse${task.id}" class="collapse" aria-labelledby = "${task.id}" data-parent="#taskList">` +
    `<div class="card-body">` +
    `<ul>Client ID: ${task.clientID}, Client presence required?: ${task.presence} ID: ${task.id}</ul>` +
    `<textarea style="text-align: left" rows="4" cols="25" readonly> ${task.details} </textarea>` +
    `<br /><br />` +
    `<button id= "finished" onclick="updateTask(${task.status},${task.id})" >Finished job </button>` +
    `</div>` +
    `</div>` +
    `</div>`
  );
}
// status 0 = sent, 1 in progress, 2 finished
function getStatus(status) {
  if (status === 0) return "sent";
  if (status === 1) return "on progress";
  return "fixed";
}
// eslint-disable-next-line no-unused-vars
function updateTask(statusTask, taskID2) {
  console.log("THIS IS TASK ID MY FRIEND LOOK AT IT NOW HERE ->" + taskID2);
  if (statusTask == 0) {
    statusTask = 1;
  } else if (statusTask == 1) {
    statusTask = 2;
  }

  const body = JSON.stringify({
    status: statusTask,
    taskID: taskID2,
  });
  console.log("type of body: ", typeof body);

  fetch("/worker/orders/", {
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
