


navigator.webkitGetUserMedia({
    video: true,
    audio: false
  }, function(stream) {
        var wrtc = require('wrtc');
        var Peer = require ('simple-peer')
        var peer = new Peer({
            initiator: location.hash==='#init',
            wrtc: wrtc,
            trickle: false,
            stream: stream
        })

    
        peer.on('signal', function(data) {
            document.getElementById('yourid').value = JSON.stringify(data)
        })

        document.getElementById('connect').addEventListener('click', function(){
            var otherid = JSON.parse(document.getElementById('clientid').value)
            peer.signal(otherid)
        })

        document.getElementById('send').addEventListener('click', function(){
            var yourmsg = document.getElementById('yourmsg').value
            peer.send(yourmsg)
        })

        peer.on('data', function(data) {
            document.getElementById('msgs').textContent += data +'\n'
        })
        

        peer.on('stream', function(stream) {
            var video = document.createElement('video')
            document.getElementById("livevideo").appendChild(video)
            video.srcObject = stream
            video.play()
            console.log(3)
                     
        })
    }, function(err) {
        console.error(err)
    })