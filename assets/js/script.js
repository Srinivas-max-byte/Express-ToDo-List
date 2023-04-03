// This is the javascript file for adding different event listeners.


//Creating class for implementing design to different category 
let designcl = ['Work', 'Personal', 'Cleaning', 'Others']
$(document).ready(function () {

    let categories = document.getElementsByClassName('catesec'); // getting all the class name category 
    for (let i = 0; i < categories.length; i++) { // looping in the  categories to find the which categry class belongs and implement according sesign check home.css to get the color of eact section
        if (categories[i].innerHTML.trim() == 'Work') {
            categories[i].classList.add(designcl[0])
            categories[i].classList.add('commonClass')
        }
        else if (categories[i].innerHTML.trim() == 'Personal') {
            categories[i].classList.add(designcl[1])
            categories[i].classList.add('commonClass')
        } else if (categories[i].innerHTML.trim() == 'Cleaning') {
            categories[i].classList.add(designcl[2])
            categories[i].classList.add('commonClass')
        } else if (categories[i].innerHTML.trim() == 'Others') {
            categories[i].classList.add(designcl[3])
            categories[i].classList.add('commonClass')
        }
    }
});

// this in responsible for making  making cross line when the idem is  checked for deleting
function checkedOrNot() {
    let cb = document.querySelectorAll('.delecheck'); // getting all the check-box class 
    let descdisp = document.querySelectorAll('.dispdsc'); // getting all the class where descripting of TODO is defined
    let ddsp = document.querySelectorAll('.dueDate'); // getting all the class for dueDate
    for (let i = 0; i < descdisp.length; i++) {
        let dueDate = ddsp[i].innerHTML;
        // checking if checkbox is checked  if checked a line will pass through the text(-) else if it is unchecked no line will pass through date and description
        if (cb[i].checked == true) {
            document.getElementById(cb[i].getAttribute('uid')).style.textDecoration = 'line-through'
            document.getElementById(cb[i].getAttribute('uid') + dueDate).style.textDecoration = 'line-through'
        }
        else if (cb[i].checked == false) {
            document.getElementById(cb[i].getAttribute('uid')).style.textDecoration = 'none'
            document.getElementById(cb[i].getAttribute('uid') + dueDate).style.textDecoration = 'none'
        }

    }

}

// this addEventListener  come into action when we click on delete button after we checked which list of items need to be deleted
document.getElementById('deleteButton').addEventListener('click', function () {
    let checkedvalues = document.querySelectorAll('.delecheck:checked') // getting only checked vale
    let arrcheck = []  // creating the list of checked array
    for (let i of checkedvalues) {
        let gg = ''
        gg = i.getAttribute('uid')    // getting uniue id from and pushing it into array
        console.log(gg)
        arrcheck.push(gg);
    }
    if (arrcheck.length === 0) { // checking if array is null 
        console.log('no item is checked')
        swal("No item is checked!!", "please select item to remove!", "error"); // using show alert to show if there is no items in the array
        return;
    }
    //here we are making delete request with the help of Ajax request 
    let url = '/delete_todo/?id=' + arrcheck
    fetch(url, {
        // Adding method type
        method: "POST",
    })
        .then(() => swal("Item is deleted ", "click ok to go back Home ", "success"))
        .then(() => {
            window.location = '/';
        })
})