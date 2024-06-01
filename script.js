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