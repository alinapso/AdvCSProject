fetch("http://localhost:3000/data/groups")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		var select = document.getElementById("groupsOptions");

		for (let i = 0; i < data.length; i++) {
			console.log(data[i]);
			let option = document.createElement("option");
			option.text = data[i].name;
			option.value = data[i].id;
			select.add(option);
		}
	})
	.catch((err) => {
		console.log(err);
		// Do something for an error here
	});
