/**************************************************************/
// fb_io.js
// Written by ???   2021
/**************************************************************/

/**************************************************************/
// fb_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/

var users = {
    /*  uid:      'n/a',
      email:    'n/a',
      name:     'n/a',
      photoURL: 'n/a',
      score:    'n/a'*/
};

var admin = {};

function fb_initialise() {
    console.log('fb_initialise: ');
//   PLACE YOUR CONFIG FROM THE FIREBASE CONSOLE BELOW <========
    const firebaseConfig = {
        apiKey: "AIzaSyCljDUceuUs9oQKRxMmgeMgMQAqgch_4lk",
        authDomain: "comp-2022-elliott.firebaseapp.com",
        databaseURL: "https://comp-2022-elliott-default-rtdb.firebaseio.com",
        projectId: "comp-2022-elliott",
        storageBucket: "comp-2022-elliott.appspot.com",
        messagingSenderId: "3598821033",
        appId: "1:3598821033:web:490c18c50c28b4bd442bb8",
        measurementId: "G-5PNX3G5D1C"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //console.log(firebase);

    database = firebase.database();

}

/**************************************************************/
// fb_login(_dataRec)
// Called by setup
// Login to Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_login() {
    // console.log('fb_login: ');

    //firebase.auth().onAuthStateChanged(newLogin);
    console.log("login");
    let loginStatus = 'logged out';
    // console.log('fb_login: status = ' + loginStatus);

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {

        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;

        let user = result.user;
        users.uid      = user.uid;
        users.email    = user.email;
        users.name     = user.displayName;
        users.photoURL = user.photoURL;
        // console.log('fb_login: -- status = ' + user.keys);

        pages.show('game');
        // console.log('pages', pages);

        loginStatus = 'logged in via popup';
        console.log('fb_login: status = ' + loginStatus, user);
    })
        .catch(function(error) {
            console.log('ERROR!!!!!!!!!!!');
            if(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                loginStatus = 'error: ' + error.code;
                console.log('fb_login: error code = ' + errorCode + ' **  ' + errorMessage);
            }
        });
}

// function newLogin(user) {
//
//     if (user) {
//         // user is signed in, so save Google login details
//         users.uid      = user.uid;
//         users.email    = user.email;
//         users.name     = user.displayName;
//         users.photoURL = user.photoURL;
//         users.admin = user.admin;
//         loginStatus = 'logged in';
//         console.log('fb_login: status = ' + loginStatus);
//         console.log('users.uid = ' + users.uid);
//         pages.show('game');
//         console.log('write fix')
//     }
// }

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return:
/**************************************************************/
function fb_writeRec(_path, _key, _data) {
    console.log('fb_WriteRec: path= ' + _path + '  key= ' + _key +'  data= ' +  _data);
    writeStatus="Pending...";
    console.log("write outcome: ",writeStatus)
    firebase.database().ref(_path+'/' + _key).set(_data,
        function(error){
            if(error){
                writeStatus="Error: "+error;
            }else{
                writeStatus="Done";
            }
            console.log("write outcome: ",writeStatus)
        });
}

function fb_readAdmin(_path, _key, _data, _processData) {
    console.log('fb_readAdmin: path= ' + _path + ' key= ' + _key);
    readStatus = "Initialised";
    firebase.database().ref(_path+'/' + _key).once("value", gotData, readError)
  }

  function gotData(snapshot){
    if (snapshot.val()==null){
      readStatus = "Empty record";
      console.log("You are not an admin")
      alert("you are not an admin")
    } else {
      readStatus = "complete";
      let dbData = snapshot.val();
      console.log("admin says: ");
      console.log(snapshot.val())
      _processData()
    }
  }
  
  function readError(error){
    readStatus = "Failed"
    console.log(error)
  }

  
/**************************************************************/
// fb_readAll(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/**************************************************************/
function fb_readAll(_path, _data) {
    console.log('fb_readAll: path= ' + _path);

    readStatus = "Initialised";
    firebase.database().ref(_path).once("value", gotData, readError)

    function gotData(snapshot){
        if (snapshot.val()==null){
            readStatus = "Empty record";
        }else{
            readStatus = "complete";
            let dbData = snapshot.val();
            let dbKeys= Object.keys(dbData);
            for (i = 0 ; i < dbKeys.length;i++){
                let key = dbKeys[i];
                _data.push({
                    name: dbData[key].name,
                    score: dbData[key].score
                })
            }
        }
        console.log(_data);
    }

    function readError(error){
        readStatus = "Failed";
        console.log(error);
    }

}

/**************************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:
/**************************************************************/
function fb_readAdmin(_path, _key, _data, _processData) {
    console.log('fb_readAdmin: path= ' + _path + ' key= ' + _key);
    readStatus = "Initialised";
    firebase.database().ref(_path+'/' + _key).once("value", gotData, readError)
  
    function gotData(snapshot){
      if (snapshot.val()==null) { 
        readStatus = "Empty record";
        console.log("You are not an admin")
        alert("you are not an admin")
      } else {
        readStatus = "complete";
        let dbData = snapshot.val();
        console.log("admin says: ");
        console.log(snapshot.val())
        _processData()
      }
    }
  
    function readError(error){
      readStatus = "Failed"
      console.log(error)
    }
  }

/**************************************************************/
//    END OF MODULE
/**************************************************************/