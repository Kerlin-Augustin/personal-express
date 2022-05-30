const update = document.querySelector('#update-button')
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");
const changeContent = document.querySelector("#changeContent")

update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Wisdom',
      quote: 'Life is but a dream.'
    })
  })
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((response) => {
    window.location.reload(true);
  });
})

update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Wisdom',
      quote: `Your light is just fire. You've never truly seen the sun.`
    })
  })
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((response) => {
    window.location.reload(true);
  });
})

update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Wisdom',
      quote: `What is the meaning of life?`
    })
  })
  .then((res) => {
    if (res.ok) return res.json();
  })
  .then((response) => {
    window.location.reload(true);
  });
})

deleteButton.addEventListener("click", () => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Wisdom",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data)
      if (data === "No quote to delete") {
        messageDiv.textContent = "No Wisdom quote to delete.";
      } else {
        window.location.reload(true);
      }
    })
    .catch(console.error)
})

const changeText = function(e){
  const target = e.target.innerText = 'Life is but a dream'
  console.log(e)
}

changeContent.addEventListener('click', changeText)
