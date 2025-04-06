// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBVVW1-83IlwTn_FVYKW10g9BFiLE86zac",
  authDomain: "smartlinxliving-53027.firebaseapp.com",
  databaseURL: "https://smartlinxliving-53027-default-rtdb.firebaseio.com",
  projectId: "smartlinxliving-53027",
  storageBucket: "smartlinxliving-53027.appspot.com",
  messagingSenderId: "513960475482",
  appId: "1:513960475482:web:8f95a896c0759f431a1163",
  measurementId: "G-H3W3QWS4PC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
  var database = firebase.database();
  var BedRoom_Light;
  var BedRoom_Fan;
  var Kitchen_Light;
  var Kitchen_Fan;
  var LivingRoom_Light;
  // var LivingRoom_Door;
  var Garage_Light;
  var Garden_Light;
  // var MotorRoom_Light;

  database.ref().on("value", function (snap) {
    BedRoom_Light = snap.val().BedRoom_Light;
    BedRoom_Fan = snap.val().BedRoom_Fan;
    Kitchen_Light = snap.val().Kitchen_Light;
    Kitchen_Fan = snap.val().Kitchen_Fan;
    LivingRoom_Light = snap.val().LivingRoom_Light;
    // LivingRoom_Door = snap.val().LivingRoom_Door;
    Garage_Light = snap.val().Garage_Light;
    Garden_Light = snap.val().Garden_Light;
    // MotorRoom_Light = snap.val().MotorRoom_Light;

    if (BedRoom_Light == "On") {
      document.getElementById("unact").style.display = "none";
      document.getElementById("act").style.display = "block";
    } else {
      document.getElementById("unact").style.display = "block";
      document.getElementById("act").style.display = "none";
    }
    if (BedRoom_Fan == "On") {
      document.getElementById("unact1").style.display = "none";
      document.getElementById("act1").style.display = "block";
    } else {
      document.getElementById("unact1").style.display = "block";
      document.getElementById("act1").style.display = "none";
    }
    if (Kitchen_Light == "On") {
      document.getElementById("unact2").style.display = "none";
      document.getElementById("act2").style.display = "block";
    } else {
      document.getElementById("unact2").style.display = "block";
      document.getElementById("act2").style.display = "none";
    }
    if (Kitchen_Fan == "On") {
      document.getElementById("unact8").style.display = "none";
      document.getElementById("act8").style.display = "block";
    } else {
      document.getElementById("unact8").style.display = "block";
      document.getElementById("act8").style.display = "none";
    }
    if (LivingRoom_Light == "On") {
      document.getElementById("unact3").style.display = "none";
      document.getElementById("act3").style.display = "block";
    } else {
      document.getElementById("unact3").style.display = "block";
      document.getElementById("act3").style.display = "none";
    }
    // if(LivingRoom_Door == "On"){
    // 	document.getElementById("unact4").style.display = "none";
    // 	document.getElementById("act4").style.display = "block";
    // } else {
    // 	document.getElementById("unact4").style.display = "block";
    // 	document.getElementById("act4").style.display = "none";
    // }
    if (Garage_Light == "On") {
      document.getElementById("unact4").style.display = "none";
      document.getElementById("act4").style.display = "block";
    } else {
      document.getElementById("unact4").style.display = "block";
      document.getElementById("act4").style.display = "none";
    }
    if (Garden_Light == "On") {
      document.getElementById("unact5").style.display = "none";
      document.getElementById("act5").style.display = "block";
    } else {
      document.getElementById("unact5").style.display = "block";
      document.getElementById("act5").style.display = "none";
    }
    // if(MotorRoom_Light == "On"){
    // 	document.getElementById("unact7").style.display = "none";
    // 	document.getElementById("act7").style.display = "block";
    // } else {
    // 	document.getElementById("unact7").style.display = "block";
    // 	document.getElementById("act7").style.display = "none";
    // }
  });

  $(".toggle-btn").click(function () {
    var firebaseRef = firebase.database().ref().child("BedRoom_Light");
    if (BedRoom_Light == "On") {
      firebaseRef.set("Off");
      BedRoom_Light = "Off";
    } else {
      firebaseRef.set("On");
      BedRoom_Light = "On";
    }
  });
  $(".toggle-btn1").click(function () {
    var firebaseRef = firebase.database().ref().child("BedRoom_Fan");
    if (BedRoom_Fan == "On") {
      firebaseRef.set("Off");
      BedRoom_Fan = "Off";
    } else {
      firebaseRef.set("On");
      BedRoom_Fan = "On";
    }
  });
  $(".toggle-btn2").click(function () {
    var firebaseRef = firebase.database().ref().child("Kitchen_Light");
    if (Kitchen_Light == "On") {
      firebaseRef.set("Off");
      Kitchen_Light = "Off";
    } else {
      firebaseRef.set("On");
      Kitchen_Light = "On";
    }
  });
  $(".toggle-btn8").click(function () {
    var firebaseRef = firebase.database().ref().child("Kitchen_Fan");
    if (Kitchen_Fan == "On") {
      firebaseRef.set("Off");
      Kitchen_Fan = "Off";
    } else {
      firebaseRef.set("On");
      Kitchen_Fan = "On";
    }
  });
  $(".toggle-btn3").click(function () {
    var firebaseRef = firebase.database().ref().child("LivingRoom_Light");
    if (LivingRoom_Light == "On") {
      firebaseRef.set("Off");
      LivingRoom_Light = "Off";
    } else {
      firebaseRef.set("On");
      LivingRoom_Light = "On";
    }
  });
  // $(".toggle-btn4").click(function(){
  // 	var firebaseRef = firebase.database().ref().child("LivingRoom_Door");
  // 	if(LivingRoom_Door == "On"){
  // 		firebaseRef.set("Off");
  // 		LivingRoom_Door = "Off";
  // 	} else {
  // 		firebaseRef.set("On");
  // 		LivingRoom_Door = "On";
  // 	}
  // })
  $(".toggle-btn4").click(function () {
    var firebaseRef = firebase.database().ref().child("Garage_Light");
    if (Garage_Light == "On") {
      firebaseRef.set("Off");
      Garage_Light = "Off";
    } else {
      firebaseRef.set("On");
      Garage_Light = "On";
    }
  });
  $(".toggle-btn5").click(function () {
    var firebaseRef = firebase.database().ref().child("Garden_Light");
    if (Garden_Light == "On") {
      firebaseRef.set("Off");
      Garden_Light = "Off";
    } else {
      firebaseRef.set("On");
      Garden_Light = "On";
    }
  });
  // $(".toggle-btn7").click(function(){
  // 	var firebaseRef = firebase.database().ref().child("MotorRoom_Light");
  // 	if(MotorRoom_Light == "On"){
  // 		firebaseRef.set("Off");
  // 		MotorRoom_Light = "Off";
  // 	} else {
  // 		firebaseRef.set("On");
  // 		MotorRoom_Light = "On";
  // 	}
  // })
});
