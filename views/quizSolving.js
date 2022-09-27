const promise = fetch("http://localhost:5000/image")
  .then(response => response.json())
  .then(json => console.log(json));