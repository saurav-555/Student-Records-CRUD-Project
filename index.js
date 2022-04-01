const addStudentButton = document.querySelector(".add button");
const mockStudent = document.querySelector("#id0");
const studentList = document.querySelector(".list-container");
const fNameInput = document.querySelector(".fname input");
const lNameInput = document.querySelector(".lname input");
const genderInput = document.querySelector("#gender");
const marksInput = document.querySelector(".marks input");
let id = 0;

const records = new Map();

function addNewStudent(fname , lname , gender, marks){
    const cloneStudent = mockStudent.cloneNode(true);
    cloneStudent.style.display = "flex";
    const studentId = "id" + (++id);
    records.set(studentId , {fname, lname , gender, marks});
    cloneStudent.id = studentId;
    cloneStudent.querySelector(".fnameTag").innerHTML = fname;
    cloneStudent.querySelector(".lnameTag").innerHTML = lname;
    cloneStudent.querySelector(".genderTag").value = gender;
    cloneStudent.querySelector(".marksTag").innerHTML = marks;
    cloneStudent.querySelector(".setting-x").addEventListener('click' , handleEditOrCheckEvent);
    cloneStudent.querySelector(".setting-y").addEventListener('click' , handleDeleteOrCloseEvent);
    studentList.appendChild(cloneStudent);
}

addStudentButton.addEventListener('click' , function(evt){    
    addNewStudent(fNameInput.value , lNameInput.value, genderInput.value , marksInput.value);
});

const handleDeleteOrCloseEvent = (evt) => {
    const element = evt.target;
    const student = evt.target.parentElement;
    let fname = student.querySelector(".fnameTag");
    let lname = student.querySelector(".lnameTag");
    let gender = student.querySelector(".genderTag");
    let marks = student.querySelector(".marksTag");
    if(element.innerHTML === 'delete'){
        records.delete(student.id);
        studentList.removeChild(student);
    }else{
        const previousData = records.get(student.id);
        console.log(previousData);
        fname.innerHTML = previousData['fname'];
        lname.innerHTML = previousData['lname'];
        gender.value = previousData['gender'];
        marks.innerHTML = previousData['marks'];
        fname.setAttribute("contenteditable" , "false");
        lname.setAttribute("contenteditable" , "false");
        gender.setAttribute("disabled" , "true");
        marks.setAttribute("contenteditable" , "false");
        student.querySelector(".setting-x").innerHTML = "edit";
        student.querySelector(".setting-y").innerHTML = "delete";
    }
}

const handleEditOrCheckEvent = (evt) => {
    const element = evt.target;
    const student = evt.target.parentElement;
    let fname = student.querySelector(".fnameTag");
    let lname = student.querySelector(".lnameTag");
    let gender = student.querySelector(".genderTag");
    let marks = student.querySelector(".marksTag");

    if(element.innerHTML === 'edit'){
        fname.setAttribute("contenteditable" , "true");
        lname.setAttribute("contenteditable" , "true");
        gender.removeAttribute("disabled");
        marks.setAttribute("contenteditable" , "true");
        student.querySelector(".setting-x").innerHTML = "check";
        student.querySelector(".setting-y").innerHTML = "close";
    }else{
        fname.setAttribute("contenteditable" , "false");
        lname.setAttribute("contenteditable" , "false");
        gender.setAttribute("disabled" , "true");
        marks.setAttribute("contenteditable" , "false");
        student.querySelector(".setting-x").innerHTML = "edit";
        student.querySelector(".setting-y").innerHTML = "delete";
        records.set(student.id , {
            fname : fname.innerHTML,
            lname : lname.innerHTML,
            gender : gender.value,
            marks : marks.innerHTML  
        });
    }
}
