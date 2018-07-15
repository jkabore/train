



    
      
    var config = {
        apiKey: "AIzaSyDwqhDMd0ypY1Kcft_mkOjGTr8M4UX56Ok",
        authDomain: "train-project-28947.firebaseapp.com",
        databaseURL: "https://train-project-28947.firebaseio.com",
        projectId: "train-project-28947",
        storageBucket: "",
        messagingSenderId: "1072126364372"
      };
      
     firebase.initializeApp(config);
      // Create a variable to reference the database
    var database = firebase.database();
    var name = "";
    var destination = "";
    var time = "";
    var frequency = "";
    var next = "";
    var minutes = "";
    
  $(".btn").on("click", function(){
    event.preventDefault();
      
    var newName = $("#train-name-input").val().trim();
    var newDestination = $("#destination-input").val().trim();
    var newTime = $("#time-input").val().trim();
    var newFrequency = $("#frequency-input").val().trim();

    // send new data to firebase
    database.ref().push({
        name: newName,
        destination: newDestination,
        time: newTime,
        frequency: newFrequency
    });
  });
    
    // snapshot of child_added, we will use these figures for our calculations/data manipulation
    database.ref().on("child_added", function(snapshot){
      var calcTime = snapshot.val().time
      var calcFreq = snapshot.val().frequency
      console.log(calcTime)
      console.log(calcFreq)

  //format calcTime
  var timeConverted = moment(calcTime, "HH:mm");
    console.log(timeConverted);

  //format current time
  var currentTime = moment().format("HH:mm");
    console.log("current time: " + currentTime);

  // find diff between current time and calcTime in minutes
  var timeDiff = moment().diff(moment(timeConverted), "minutes");
    console.log(time);
    console.log("Difference in Time: " + timeDiff);
  
  //find remainder of the diff calculation
  var timeRemainder = timeDiff % calcFreq;
    console.log(timeRemainder);

  // time until next train is the frequency minus the remainder 
  var minNextTrain = calcFreq - timeRemainder;

  // time next train will actually arrive
  var nextTrain = moment().add(minNextTrain, "minutes").format("hh:mm A");

    var newTable = $("<table>").addClass("table")
    var newRow = $("<tr>");
    newRow.append($("<td>").text(snapshot.val().name))
      .append($("<td>").text(snapshot.val().destination))
      .append($("<td>").text(snapshot.val().frequency))
      .append($("<td>").text(nextTrain))
      .append($("<td>").text(minNextTrain))
      .append($("<td>")
        .append("<input type='button' value='remove' class='btn btn-primary' text=remove>"))
      
      
               
    newTable.append(newRow)
    $("#tbody").append(newRow);

    $("table").on("click", "input[value='remove']", function(){
      $(this).closest("tr").remove()
      })
})










