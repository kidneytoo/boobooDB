var app = require('express')
var router = app.Router();
var { con } = require('../server');

router.post('/register/req', function (req, res){
  console.log("in request all section process");
  var regSubj = req.body.subject;

  var sql = "SELECT sec_no FROM section WHERE cid='" + regSubj + "'";
  console.log("SQL: " + sql);

  con.query(sql, function (err, result, field) {
    if (err){
      console.log("ERROR");
      throw err;
    }
    console.log(result);
    if(result.length == 0){
      console.log("There is no this subject");
      res.send({"msg" : "There is no this subject"});
    }
    else{
      console.log("success");
      res.send({  "msg" : "success" ,
                  "data" : result
                });
    }

  });
})

router.post('/register/storeToRegIn', function (req, res){
  console.log("IN Reg_IN Storing process");

  var sid = req.body.studentID;
  var regSubj = req.body.registSubject; // {subjectID:registSubject_before[i].subjectID,section:sect}

  for (var i = 0; i < regSubj.length ; i++) {
    for(var j = 0; j < regSubj[i].section.length ; j++){
      console.log(j);

      (async (i,j) => {
        try{
          var sql = "INSERT INTO reg_in (sid, cid, sec_no, status, req_streak) VALUES ('" + sid + "', '" + regSubj[i].subjectID + "', '" + regSubj[i].section[j] + "', 'registered', '0')";
          console.log("SQL: " + sql);

          await con.query(sql, function (err, result, field) {
            if (err){
              console.log("Storing reg_in ERROR : Subject - " + regSubj[i].subjectID + ", section - " + regSubj[i].section[j]);
              throw err;
            }
            console.log("Storing reg_in successful : Subject - " + regSubj[i].subjectID + ", section - " + regSubj[i].section[j]);
          });

        }catch(e){
          console.log("Storing ERROR");
        }

      })(i,j);

    }
  }
})

module.exports = router ;
