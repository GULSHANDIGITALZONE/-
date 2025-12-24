<input type="file" id="file">
<button onclick="send()">Remove BG</button>
<img id="img" width="300">
<button id="download" style="display:none">Download</button>

<script>
let blobData;

function send(){
  const file = document.getElementById("file").files[0];
  const form = new FormData();
  form.append("image", file);

  fetch("https://bg-remover.onrender.com/remove-bg", {
    method: "POST",
    body: form
  })
  .then(res => res.blob())
  .then(blob => {
    blobData = blob;
    document.getElementById("img").src = URL.createObjectURL(blob);
    document.getElementById("download").style.display = "block";
  });
}

document.getElementById("download").onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blobData);
  a.download = "bg_removed.png";
  a.click();
};
</script>
