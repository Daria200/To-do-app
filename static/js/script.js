buildList();
function buildList() {
  let wrapper = document.getElementById("list-wrapper");
  let url = "http://127.0.0.1:8000/api/task-list/";
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log("Data:", data);
      let list = data;
      for (let i in list) {
        let item = `
        <div id="data-row-${i}" class="task-wrapper flex-wrapper todo-item">
        <div style="flex:7">
            <span class='title'>${list[i].title}</span>
        </div>
        <div style="flex:1">
            <button class="btn edit">Edit </button>
        </div>
        <div style="flex:1">
            <button class="btn delete">Delete</button>
        </div>
    </div>
      `;
        wrapper.innerHTML += item;
      }
    });
}

let form = document.getElementById("form-wrapper");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form submitted");
  let url = "http://127.0.0.1:8000/api/task-create/";
  let title = document.getElementById("title").value;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title: this.title }),
  }).then(function (response) {
    buildList();
  });
});
