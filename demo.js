let boxdate = {};
const addbox = document.querySelector("#add");
const bigParent = document.querySelector("#bigParentNotes");

function addBox(text = "", date = new Date().toDateString()) {
    const randombg = "#" + Math.floor(Math.random() * 16777215).toString(16);

    let div = document.createElement("div");
    div.classList.add("notebox");
    div.style.display = "flex";
    div.style.backgroundColor = randombg;

    let ptag = document.createElement("p");
    ptag.contentEditable = true;
    ptag.innerHTML = text;

    let dateAndDelet = document.createElement("div");
    dateAndDelet.classList.add("time-date");

    let datetd = document.createElement("div");
    datetd.classList.add("date");
    datetd.innerText = date;

    let del = document.createElement("button")
    del.classList.add("remove")
    del.innerText = "Delete";
    del.style.backgroundColor = randombg;

    bigParent.appendChild(div);
    div.append(ptag, dateAndDelet);
    dateAndDelet.append(datetd, del);

    ptag.addEventListener("input", storeageOfDate);
    ptag.addEventListener("blur", storeageOfDate);
    ptag.addEventListener("keyup", storeageOfDate);


    del.addEventListener("click", function () {
        div.remove();
        storeageOfDate();
    })

}

function storeageOfDate() {
    const notes = [];

    document.querySelectorAll(".notebox").forEach(box => {
        notes.push({
            content: box.querySelector("p").innerText,
            datetd: box.querySelector(".date").innerHTML
        })
    })
    localStorage.setItem("notes", JSON.stringify(notes));
}
function getData() {

    const saved_data = JSON.parse(localStorage.getItem("notes")) || [];
    saved_data.forEach(saved_notes => addBox(saved_notes.content, saved_notes.datetd))

}
getData();
addbox.addEventListener("click", function () {
    addBox();
    storeageOfDate();

}) 
