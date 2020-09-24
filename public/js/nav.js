function createNav(type) {
	var items = [];
	if (type === "admin") {
		items = [
			{ text: "Tasks", url: "/admin/tasks" },
			{ text: "Workers List", url: "/admin/workers" },
			{ text: "Add new Worker", url: "/admin/workers/add" },
			{ text: "Groups list", url: "/admin/groups/" },
			{ text: "add new Group", url: "/admin/groups/add" },
		];
	}
	if (type === "worker") {
		items = [{ text: "My tasks", url: "/worker/orders" }];
	}
	if (type === "client") {
		items = [
			{ text: "My Orders", url: "/client/orders" },
			{ text: "New Order", url: "/client/add" },
		];
	}
	return createFromList(items);
}
function createFromList(list) {
	var lis = [];
	for (let i = 0; i < list.length; i++) {
		lis += `<li class="nav-item">
      <a class="nav-link" href="${list[i].url}">${list[i].text}</a>
    </li>`;
	}
	lis +=
		'<li class="nav-item"><a class="nav-link" href="/profile">Profile</a></li>';
	lis +=
		'<li class="nav-item"><a class="nav-link" href="/logout">Logout</a></li>';

	return lis;
}
