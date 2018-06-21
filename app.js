// use dal (data access layer)
var dal = require('./models/dal');

dal.city.all(function(result){
    console.log('first city in database : ');
    console.log(result.data[0]);
    console.log('--------------------------');
});

dal.note.all(function(result){
    console.log('all notes : ');
    console.log(result);
    console.log('--------------------------');
});

// Intentional mistake : is a field not in database 
// so it is not in model and do not affect the db-operations
var user = {
    UserID: 0,
    Fake_Field : "Intentional mistake" , 
    Str_FullName: 'MR TESTER',
    Str_UserName: 'MR_TESTER',
    Str_Password: '123456',
    Str_Phone: '+989120000000',
    Str_Email: 'mrt@test.com',
    Str_ACL: 'tester',
    Bol_IsActive: true
};

dal.users.insert(user,function(result){
    console.log('insert result : ');
    console.log(result);
    console.log('--------------------------');

    if(result.success){
        dal.users.get(result.lastID,function(newResult){
            console.log('new inserted data with id : ' + result.lastID );
            console.log(newResult);
            console.log('--------------------------');

        });
    }
});