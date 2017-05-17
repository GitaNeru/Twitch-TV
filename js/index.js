$(function() {

  var follower = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/freecodecamp', //change this to test active
    headers: {
      'client-ID': '59x9ex7f5zzongzntqx0zrwleoxy12'
    },
    success: function(data) {
      console.log(data);
      if (data.stream === null) {
        $('#fcc').html(' is offline');
      } else {
        $('#fcc').html(' is ONLINE!');
      }
    },
    error: function(err) {
      alert("Error");
    }
  });

  for (var i = 0; i < follower.length; i++) {

     $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/channels/' + follower[i], //change this to test active
      headers: {
        'client-ID': '59x9ex7f5zzongzntqx0zrwleoxy12'
      },
      success: function(dataI) {
       console.log(dataI.display_name);   
                    var logo=dataI.logo;
        /*  $('#user').prepend('<img href=' + logo '>'); */
          $('#user').append( '<a target="blank" href="https://www.twitch.tv/' + dataI.name + '">' + dataI.display_name + '</a><br>')
        
                  $.ajax({
                    type: 'GET',
                    url: 'https://api.twitch.tv/kraken/streams/' + dataI.name, //change this to test active
                    headers: {
                      'client-ID': '59x9ex7f5zzongzntqx0zrwleoxy12'
                    },
                    success: function(data2) {

        
                    var name = data2._links.self.slice(37)
                    //console.log(data2);

                    if (data2.stream === null) {                      
                   //   $('#user').append(/* '<img src=' + '"' +logo +'"' + '>' + */  '<a target="blank" href="https://www.twitch.tv/' + name + '">' + name + '</a><br>')
                      $('#status').append('  Offline<br>');
                      $('#game').append('N/A<br>');
                    } else {
                      $('#status').append('  ONLINE!<br>');
                 //     $('#user').append('<a target="blank" href="https://www.twitch.tv/' + name + '">' + name + '</a><br>')
                      $('#game').append(data2.stream.game + '<br>');
                    }


                  },
                  error: function(err) {
                    alert("Error");
                  }
                });

        
        
 
         },
           /*error: function(err) {
           alert("Error: One or more users is no longer avaialble");
         }*/
       
       });
  };

})