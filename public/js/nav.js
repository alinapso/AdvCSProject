function createNav(type) {
  if (type === "admin") {
    var items = [
      { text: "Tasks", url: "/admin/tasks" },
      { text: "Workers", url: "/admin/workers" },
    ];
    return createFromList(items);
  }
  if (type === "worker") {
    var items = [{ text: "My tasks", url: "/worker/orders" }];
    return createFromList(items);
  }
  if (type === "client") {
    var items = [
      { text: "My Orders", url: "/client/orders" },
      { text: "New Order", url: "/client/add" },
    ];
    return createFromList(items);
  }
}
function createFromList(list) {
  var lis = [];
  for (let i = 0; i < list.length; i++) {
    lis += `<li class="nav-item">
      <a class="nav-link" href="${list[i].url}">${list[i].text}</a>
    </li>`;
  }
  lis += `<li class="nav-item"><a class="nav-link" href="/profile">Profile</a></li>`;
  lis += `<li class="nav-item"><a class="nav-link" href="/logout">Logout</a></li>`;

  return lis;
}
