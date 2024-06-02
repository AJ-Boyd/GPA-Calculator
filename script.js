/*
name: AJ Boyd
date: 5/31/24
file: script.js
description: javascript file handles the simple calculations and DOM interactions the website requires
*/
var numCourses = 1;
const grades = ['A', 'B', 'C', 'D', 'F']
const gradeTable = document.getElementById("table-body")

//adds another row to the course table
function addCourse(){
    var tableRow = document.createElement("tr");
    tableRow.id = "tr" + numCourses;
    tableRow.className = "table-row"
    // HTML for course name
    var course = document.createElement("td");
    var courseInput = document.createElement("input");
    courseInput.type = "text"; courseInput.placeholder = "Optional";
    course.appendChild(courseInput);
    //HTML for course credits
    var credits = document.createElement("td");
    var creditsInput = document.createElement("input");
    creditsInput.type = "text";
    creditsInput.className = "credits"
    credits.appendChild(creditsInput);
    //HTML for course grade
    var grade = document.createElement("td");
    var dropID = "dropdown" + numCourses;
    const daHTML = `<div class="dropdown">
    <button id = "${dropID}" type="button" class="btn btn-light dropdown-toggle grade" data-bs-toggle="dropdown">A</button>
    <ul class="dropdown-menu">
        <li onclick="selectGrade(${dropID}, 'A')" class="dropdown-item">A</li>
        <li onclick="selectGrade(${dropID}, 'B')" class="dropdown-item">B</li>
        <li onclick="selectGrade(${dropID}, 'C')" class="dropdown-item">C</li>
        <li onclick="selectGrade(${dropID}, 'D')" class="dropdown-item">D</li>
        <li onclick="selectGrade(${dropID},'F')" class="dropdown-item">F</li>
    </ul>
    </div>`
    grade.insertAdjacentHTML('beforeend', daHTML)
    //HTML for remove button
    var remove = document.createElement("td");
    var button = document.createElement("button")
    button.classList = "btn btn-danger"
    button.innerText = "Remove";
    button.id = "remove" + numCourses;
    button.addEventListener("click", function(){removeCourse(button.id)});
    remove.appendChild(button);

    //append all row elements to row
    tableRow.appendChild(course);
    tableRow.appendChild(credits);
    tableRow.appendChild(grade);
    tableRow.appendChild(remove);
    //append row to table
    gradeTable.appendChild(tableRow);
    numCourses++; //increase number of courses
}

//removes a row from the table
function removeCourse(id){
    id = id.substring(("remove".length))
    var row = document.getElementById("tr" + id);
    row.remove();
}

//handles changing the text for the 'grade' dropdown
function selectGrade(elem, grade){
    if(document.getElementById(elem) != null){
        document.getElementById(elem).innerText = grade;
    }else{
        elem.innerText = grade;
    }
    
}

//calculates the cumulative GPA of the courses
function calcGPA(){
    document.getElementById("GPA-container").style.display = "block";
    credElems = document.getElementsByClassName("credits");
    gradeElems = document.getElementsByClassName("grade");
    var totalCredits = 0;
    var gradePoints = 0;
    var creditPoints = 0;
    for(var i = 0; i < credElems.length; i++){
        if(Number.isInteger(Number(credElems[i].value)) && credElems[i].value !== ''){
            if(gradeElems[i].innerText == 'A'){
                gradePoints = 4;
            }else if(gradeElems[i].innerText == 'B'){
                gradePoints = 3;
            }else if(gradeElems[i].innerText == 'C'){
                gradePoints = 2;
            }else if(gradeElems[i].innerText == 'D'){
                gradePoints = 1;
            }
            creditPoints += parseInt(credElems[i].value) * gradePoints;
            totalCredits += parseInt(credElems[i].value)
        }
    }

    if(totalCredits == 0)
        totalCredits = 1;

    var GPA = parseFloat((creditPoints / totalCredits).toFixed(3)).toString();
    if(!GPA.includes('.')){
        GPA += ".0"
    }
    document.getElementById("GPA").innerHTML = GPA;
    document.getElementById("total-credits").innerHTML = totalCredits
}

//clears the table for all but 3 courses
function clearTable(){
    var x = document.getElementsByClassName("table-row");
    for(var i = x.length - 1; i >= 0; i--){
        x[i].remove();
    }
}

var idAssignments = [2]
var numAssignments = [2]

//adds assignment to group
function addAssignment(id){
    var table = document.getElementById("table" + id); //table to append to
    var row = document.createElement("tr");
    row.id = "table" + id + "-assignment" + idAssignments[id];
    //HTML for assignment name
    var nameData = document.createElement("td");
    var name = document.createElement("input");
    name.placeholder="Optional";
    nameData.appendChild(name);
    row.appendChild(nameData);
    //HTML for points earned / points total
    var ptsData = document.createElement("td");
    var ptsEarned = document.createElement("input");
    var ptsTotal = document.createElement("input");
    ptsEarned.placeholder = 0; ptsTotal.placeholder = 0;
    ptsEarned.className = "pE"+id; ptsTotal.className = "pE"+id;
    ptsEarned.size = 5; ptsTotal.size = 5;
    ptsData.appendChild(ptsEarned)
    ptsData.innerHTML += "/";
    ptsData.appendChild(ptsTotal)
    //HTML for remove button
    var removeData = document.createElement("td")
    var help = idAssignments[id]
    var remove = document.createElement("button")
    remove.classList = "btn btn-danger";
    remove.innerText = "Remove";
    remove.addEventListener("click", function(){
        removeAssignment(id, help)
    })
    removeData.appendChild(remove);

    //append children to row
    row.appendChild(nameData);
    row.appendChild(ptsData)
    row.appendChild(removeData)
    //append row to table
    table.appendChild(row)

    //increase number of assignents at given group
    idAssignments[id]++; 
    numAssignments[id]++;
}

//removes an assignment from a group
function removeAssignment(table, assignment){
    var elem = document.getElementById("table" + table + "-assignment" + assignment)
    elem.remove()
    numAssignments[table]--; //decrease number of assignemnts
}

function addGroup(){
    //add to global arrays
    idAssignments.push(0); numAssignments.push(0);
    var id = (idAssignments.length - 1);
    var group = document.createElement("div")
    group.id = "group"+ id;
    group.className = "group";

    //HTML for header
    var header = document.createElement("h3");
    header.innerHTML = "Group " + (id + 1);
    group.appendChild(header);
    //HTML for table
    var table = document.createElement("table");
    table.classList = "table table-borderless";
    var tBody = document.createElement("tbody");
    tBody.id = "table" + id;
    var tRow = document.createElement("tr");
    tRow.id = "table" + id + "-assignment" + idAssignments[id];
    //HTML for table data
    var td1 = document.createElement("td");
    var name = document.createElement("input");
    name.placeholder="Optional";
    td1.appendChild(name)
    var td2 = document.createElement("td");
    var ptsEarned = document.createElement("input");
    var ptsTotal = document.createElement("input");
    ptsEarned.size = "5"; ptsTotal.size = "5";
    ptsEarned.className = "pE" + id; ptsTotal.className = "pT" + id
    td2.appendChild(ptsEarned);
    td2.innerHTML += "/";
    td2.appendChild(ptsTotal);
    var td3 = document.createElement("td");
    var btn = document.createElement("button");
    btn.classList = "btn btn-danger";
    btn.innerHTML = "Remove";
    var help = idAssignments[id]
    btn.addEventListener("click", function(){
        removeAssignment(id, help)
    });
    td3.appendChild(btn);
    //HTML for add assignment btn
    var add = document.createElement("button");
    add.classList = "btn btn-link";
    add.innerHTML = "Add assignment+"
    add.addEventListener("click", function(){
        addAssignment(id);
    })

    //append children
    tRow.appendChild(td1); tRow.appendChild(td2); tRow.appendChild(td3);
    tBody.appendChild(tRow);
    table.append(tBody);
    group.appendChild(table);
    group.appendChild(add)
    document.getElementById("assignment-container").append(group)
    
    //add group info to container
    var weight = document.createElement("div")
    weight.innerHTML = "Group " + (id + 1) + "  ";
    var input = document.createElement("input");
    input.id = "group" + id + "-weight";
    input.className = "weight"  
    weight.appendChild(input)
    weight.innerHTML += "%";
    document.getElementById("group-info").appendChild(weight);

    //increase number of assignents at given group
    idAssignments[id]++; 
    numAssignments[id]++;
}

function calcGrade(){
    var points = 0, total = 0, weights = 0, weightedTotal = 0;
    
    //sum up the total weight percentage
    for(var i = 0; i < idAssignments.length; i++){
        var x = document.getElementsByClassName("weight")[i];
        if(x.value != "" && Number.isInteger(Number(x.value)))
            weights += parseFloat(x.value);
    } 
    alert(weights)
    alert(numAssignments)
    for(var i = 0; i < numAssignments.length; i++){
        alert(("pE"+i) + " " +document.getElementsByClassName("pE" + i).length)
        for(var j = 0; j < document.getElementsByClassName("pE" + i).length; j++){
            pE = document.getElementsByClassName("pE" + i)[j];
            pT = document.getElementsByClassName("pT" + i)[j]
            console.log(document.getElementsByClassName("pE" + i)[j].value, document.getElementsByClassName("pT" + i)[j].value)
            if(pE != "" && pT != "" && Number.isInteger(Number(pE.value)) && Number.isInteger(Number(pT.value))){
                points += parseFloat(pE.value);
                total += parseFloat(pT.value);
            }
        }
        console.log(points)
        alert(points + "/" + total)
        var percentage = (points / total) * 100;
        alert(percentage)
        var weight = (parseFloat(document.getElementById("group" + i + "-weight").value) / weights) 
        alert("weight: " + weight)
        if(!Number.isNaN(weight))
            weightedTotal += (percentage * weight);
        points = 0; total = 0;
    }
    //alert(weightedTotal);
    document.getElementById("grade").innerHTML = weightedTotal.toFixed(1) + "%";
    document.getElementById("total-percentage").innerHTML = weights;
    document.getElementById("grade-container").style.display = "block";
    console.log("Class grade:", weightedTotal)
    if(weights > 100 || weights < 0){
        document.getElementById("warning").style.display = "block"
    }else{
        document.getElementById("warning").style.display = "hidden"
    }

}