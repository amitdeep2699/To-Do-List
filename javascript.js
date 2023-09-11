var row_id = 1;
var flag_edit = false;
var value_id;
let array;
if (JSON.parse(localStorage.getItem("data") == null)) {
    array = [];
}
else {
    array = JSON.parse(localStorage.getItem("data"));
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== undefined) {
            var g = document.getElementById("task");
            var row = createRow("row borderbottom mt-4");
            var col1 = createCol("col-10");
            var col2 = createCol("col-2 d-flex justify-content-around");
            col2.style.display = "inline-flex";
            col1.style.overflowwrap = "break-word";
            col1.style.fontSize = "20px";
            col1.innerHTML = array[i].text;
            row.appendChild(col1);
            row.appendChild(createAllicon(col2));
            g.appendChild(row);
            if (array[i].checked) {
                setcheckoncreatetime(row_id - 1);
            }

        }
    }

}
function setcheckoncreatetime(value) {
    var row = document.getElementById(value);
    row.lastChild.firstChild.checked = true;
    row.firstChild.style.textDecoration = "line-through";
}
function storedata() {
    var temp_arr = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i]) {
            temp_arr.push(array[i]);
        }
    }
    localStorage.setItem("data", JSON.stringify(temp_arr));
}

function onchecked(value) {
    var row = document.getElementById(value);
    if (row.lastChild.firstChild.checked == true) {
        row.firstChild.style.textDecoration = "line-through";
        array[value - 1].checked = true;
    }
    else {
        row.firstChild.style.textDecoration = "none";
        array[value - 1].checked = false;
    }
    storedata();
}
function crossdelete(value) {
    var row = document.getElementById(value);

    delete array[value - 1];

    row.remove();
    storedata();
}
function forEdit(value) {
    var row = document.getElementById(value);
    let inp = document.getElementById("txt");
    inp.value = row.innerText;
    flag_edit = true;
    value_id = value;

}

function createRow(cls = "row") {
    var row = document.createElement("div");
    row.setAttribute("class", cls);
    row.setAttribute("id", row_id);
    row_id++;
    return row;
}
function createCol(cls = "col") {
    var col = document.createElement("div");
    col.setAttribute("class", cls);
    return col;
}

function createAllicon(ele) {
    var c_box = document.createElement("input");
    c_box.setAttribute("type", "checkbox");
    c_box.setAttribute("value", row_id - 1);
    c_box.setAttribute("onclick", "onchecked(this.value)");
    var edit = document.createElement("li");
    edit.setAttribute("onclick", "forEdit(this.value)");
    edit.setAttribute("value", row_id - 1);
    edit.setAttribute("class", "fa fa-pencil ml-2 pt-1");
    var cross = document.createElement("li");
    cross.setAttribute("class", "fa fa-close ml-2 pt-1");
    cross.setAttribute("value", row_id - 1);
    cross.setAttribute("onclick", "crossdelete(this.value)");
    ele.appendChild(c_box);
    ele.appendChild(edit);
    ele.appendChild(cross);
    return ele;
}
function set() {
    var row = document.getElementById(value_id);
    let inp = document.getElementById("txt");
    row.firstChild.innerText = inp.value;
    flag_edit = false;
    array[value_id - 1].text = inp.value;
    value_id = null;
    storedata();
    inp.value="";

}
function checkspace(datatext) {
    var count = 0;
    for (var i = 0; i < datatext.length; i++) {
        if (datatext[i] == " ") {
            count++;
        }
    }
    if (datatext.length == count) {
        return true;
    }
    return false;
}
function enterclick(event) {
    var inp = document.getElementById("txt");
    if (event.key === "Enter") {
        event.preventDefault();
        if (flag_edit == true) {
            if (checkspace(inp.value)) {
                flag_edit = false;
                value_id=null;
                alert("empty string not allow update again");
                return
            }
            else{
                set();
            }
        }
        else {
            if (checkspace(inp.value)) {
                inp.value = "";
                inp.style.placeholder = "I need to ....";
                alert("empty string not allow");
                return
            }
            else {
                var g = document.getElementById("task");
                var row = createRow("row borderbottom mt-4");
                var col1 = createCol("col-10");
                var col2 = createCol("col-2 d-flex justify-content-around");
                col2.style.display = "inline-flex";
                col1.style.overflowwrap = "break-word";
                col1.style.fontSize = "20px";
                col1.innerHTML = inp.value;
                row.appendChild(col1);
                row.appendChild(createAllicon(col2));
                g.appendChild(row);

                let obj = {
                    text: inp.value,
                    checked: false
                };

                array.push(obj);
                console.log(array);
                storedata();

                inp.value = "";
                inp.style.placeholder = "I need to ....";
            }
        }


    }

}