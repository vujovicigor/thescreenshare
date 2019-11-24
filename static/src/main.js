import App from './App.svelte';
import io from 'socket.io-client';

let peers = {};
window.peers = peers;
//var socket = window.socket = io.connect('https://thescreenshare.com/');
var socket = window.socket = io.connect();

socket.on('connect', function (data) {
    app.$set({'mysockid':socket.id})
});

socket.on('signal', function (d) {// data, from
    console.log('signal from sock', d);
    if (peers[d.from]){
        peers[d.from].signal(d.data);
    }
    //socket.emit('my other event', { my: 'data' });
});

socket.on('initP2PWith', function (remoteSockId) {
    console.log('initP2PWith received with ', remoteSockId);
    initP2PWith(remoteSockId, true);
});


//PEERS
import Peer from '../node_modules/simple-peer/simplepeer.min.js';

window.initP2PWith = function (remoteSockId, initiator){
    var peerParams = {
        initiator: initiator,
        trickle: true,
        reconnectTimer: 4000,
        //iceTransportPolicy: 'relay',
        config: {
            //iceTransportPolicy: 'relay',
            iceServers: [
                {"urls":"turn:159.89.1.251:3478", "username":"test", "credential":"test", "credentialType": "password"},
                {"urls":"stun:stun.sipgate.net"},
                {"urls":"stun:217.10.68.152"},
                {"urls":"stun:stun.sipgate.net:10000"},
                {"urls":"stun:217.10.68.152:10000"},
                {"urls":"turn:192.155.84.88","username":"easyRTC","credential":"easyRTC@pass", "credentialType": "password"},
                {"urls":"turn:192.155.84.88?transport=tcp","username":"easyRTC","credential":"easyRTC@pass", "credentialType": "password"},
                {
                  "urls":"turn:192.155.86.24:443",
                  "credential":"easyRTC@pass",
                  "username":"easyRTC",
                  "credentialType": "password"
                },
                {
                  "urls":"turn:192.155.86.24:443?transport=tcp",
                  "credential":"easyRTC@pass",
                  "credentialType": "password",
                  "username":"easyRTC"
                },                
                {urls: 'stun:stun1.l.google.com:19302'},
                {urls: 'stun:stun2.l.google.com:19302'},                
                {
                    urls: "stun:numb.viagenie.ca",
                    username: "pasaseh@ether123.net",
                    credential: "12345678"
                },
                {
                    urls: "turn:numb.viagenie.ca",
                    username: "pasaseh@ether123.net",
                    credential: "12345678"
                }
            ]
        }
    };

    if (initiator) {
        peerParams.initiator = true; 
        console.log('initiator stream:', window.stream)
        peerParams.stream = window.stream//ractive.stream
    }
    else{
        peerParams.initiator = false ;
    }
    peers[remoteSockId] = new Peer(peerParams)
    
    var p = peers[remoteSockId];
    
    //p._debug = console.log;


    p.on('error', function (err) { 
      console.log('peer error', remoteSockId, err) 
      delete( peers[remoteSockId] )
    })
    p.on('close', () => {
      console.log('peer closed', remoteSockId)
      delete( peers[remoteSockId] )
    })
    // on webrtc discovery, send it to other peer and on other peer call p2.signal(data)
    p.on('signal', function (data) {
        console.log('emiting SIGNAL', data)
        socket.emit('signal', {data:data, to:remoteSockId})
    })
    
    p.on('connect', function () {
        console.log('peer connect')
        p.send('whatever' + Math.random())
    })
    
    p.on('data', function (data) {
        console.log('data: ' + data)
        if (data == 'broadcastEnd'){
          document.getElementById('video').pause()
          //p.destroy()
        }
    })

    p.on('stream', function (stream) {
        console.log('got remote video stream')
        // got remote video stream, now let's show it in a video tag
        document.getElementById('video').srcObject = stream;
        document.getElementById('video').play();
        //ractive.set('videoIsPlaying',true);
    })
    
}

const app = new App({
  target: document.body,
  accessors: true, 
	props: {
   // name: 'world'
     mysockid:null
	}
});
window.app = app;

export default app;