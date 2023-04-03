// Controller with functions exported to routes

const TodoLists = require('../models/todo_list')
// function for redirecting to main home page
module.exports.home = function (req, res) {
    // fetching all data using mongoose
    TodoLists.find({}, function (err, todo) {
        if (err) {
            console.log('error in fetching data');
            return
        }
        return res.render('homePage', {
            title: "To Do List App",
            todoList: todo
        })
    })
}

// Function for fetching month string from number entered in UI
function DateValue(dueDate) {
    // static value for implementing month value
    let months = ['jan', 'feb', 'mar', 'Apr', 'May', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec']
    newdate = '';
    let monapp = '';
    // checking months 
    if (dueDate[1] == '01') {
        monapp = months[0];
    }
    else if (dueDate[1] == '02') {
        monapp = months[1];
    } else if (dueDate[1] == '03') {
        monapp = months[2];
    } else if (dueDate[1] == '04') {
        monapp = months[3];
    } else if (dueDate[1] == '04') {
        monapp = months[3];
    } else if (dueDate[1] == '05') {
        monapp = months[4];
    } else if (dueDate[1] == '06') {
        monapp = months[5];
    } else if (dueDate[1] == '07') {
        monapp = months[6];
    } else if (dueDate[1] == '08') {
        monapp = months[7];
    } else if (dueDate[1] == '09') {
        monapp = months[8];
    } else if (dueDate[1] == '10') {
        monapp = months[9];
    } else if (dueDate[1] == '11') {
        monapp = months[10];
    } else if (dueDate[1] == '12') {
        monapp = months[11];
    }
    newdate = dueDate[2] + '-' + monapp + '-' + dueDate[0] // displaying date in dd-mm-yyyy formate
    return newdate;
}

// function for creating todo list
module.exports.createTodo = function (req, res) {
    dueDate = req.body.dateValue.split('-'); // creating array by splitting
    let newdate = '';
    newdate = DateValue(dueDate);
    TodoLists.create({ // crating new todo and storing into DB
        desc: req.body.desc,
        category: req.body.category,
        dueDate: newdate
    }, function (err, newArr) {
        if (err) {
            console.log('Oops error occoured');
            return;
        }
        return res.redirect('/') //Redirecting to the home page.
    })
}

// function for deleting todo list
module.exports.deleteTodo = function (req, res) {
    sp = req.query.id; // getting the id from ui
    newsp = sp.split(',');
    for (let i = 0; i < newsp.length; i++) { // looping over newsp  to delete all the checked value
        TodoLists.findByIdAndDelete(newsp[i], function (err) {
            if (err) {
                console.log('err')
                return;
            }
        })
    }
    return res.redirect('/');
}

// function for fetching data for edit page
module.exports.EditPage = function (req, res) {
    // here we are fetching the data which needs to be edited
    TodoLists.findById(req.query.id, function (err, task) {
        if (err) { console.log('hi man!! it an error'); return }
        return res.render('editPage', {
            title: 'Edit Task',
            todolist: task
        })
    })
}
// function for updating data after the todo is being edited
module.exports.editDetails = function (req, res) {
    dueDate = req.body.dueDate.split('-'); // splitting date and taking month as value.
    let newdate = '';
    newdate = DateValue(dueDate);
    TodoLists.updateOne({ _id: req.query.id }, { $set: { desc: req.body.desc, category: req.body.category, dueDate: newdate } }, function (err, todoData) {
        if (err) { console.log('erroe while updating'); return }
        return res.redirect('/')
    })
}

