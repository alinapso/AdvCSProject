var navbar = document.getElementById("navbar");
navbar.innerHTML += createNav("client");

fetch("/api/tasks/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    var list = document.getElementById("tasksList");
    for (let i = 0; i < data.length; i++) {
      list.innerHTML += buildFORM(
        data[i].name,
        data[i].address,
        data[i].details,
        data[i].status,
        data[i].email
      );
    }
  })
  .catch((err) => {
    console.log(err);
    // Do something for an error here
  });

function getStatus(status) {
  if (status === 0) return "sent";
  if (status === 1) return "on progress";
  return "fixed";
}

function buildFORM(typeIssue, address, details, status, worker) {
  // let statusText = getStatus(status);

  let form =
    '<li class="col-md-12 col-sm-12">' +
    '<div class="card">' +
    buildFirstRow("Type Issue:", typeIssue, "Status:", status) +
    buildRow("Address:", address) +
    buildRow("Details:", details) +
    // buildRow("status:", status) +
    buildRow("Worker's Email:", worker) +
    "</div>" +
    "</li>";
  return form;
}

function buildFirstRow(label1, info1, label2, info2, isReqPresence) {
  return (
    '<div class="row ml-2">' +
    `<label  class="col-form-label mr-2">${label1}</label>
     <label  class="col-form-label mr-4"> ${info1}</label>` +
    `<label  class="col-form-label mr-2">${label2}</label>
		 <label  class="col-form-label mr-4"> ${getStatus(info2)}</label>` +
    `<label  class="col-form-label mr-2">Presence:</label>
      <label  class="col-form-label"> ${
        isReqPresence === 1 ? "yes" : "no"
      }</label>` +
    "</div>"
  );
}

function buildRow(text1, text2) {
  if (text1 === "status:") {
    return (
      '<div class="row ml-2">' +
      `<label  class="col-form-label mr-2">${text1}</label>
		 <label  class="col-form-label"> ${getStatus(text2)}</label>` +
      "</div>"
    );
  }
  return (
    '<div class="row ml-2">' +
    `<label  class="col-form-label mr-2">${text1}</label>
		 <label  class="col-form-label"> ${
       text2 === null ? "not assigend yet" : text2
     }</label>` +
    "</div>"
  );
}
