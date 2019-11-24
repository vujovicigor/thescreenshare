<h2>Screen Share from your browser</h2>
<div style="margin-bottom:1em">
  <span class="badge badge-pill badge-primary">Free</span>
  <span class="badge badge-pill badge-primary">No Install</span>
  <span class="badge badge-pill badge-primary">No Extensions</span>
  <span class="badge badge-pill badge-primary">No Signup</span>
</div>

<div style="position:relative; height:10em;   border: solid 2px black;">
  <video muted id="video" bind:this={video_el}></video>
  {#if !videoIsPlaying}
  <button 
    class="btn btn-dark centered-element" 
    on:click={startBroadcast} 
    style="
    color: lawngreen;"
  >
    <center><img src="broadcast.svg" style="width:3em;color: lawngreen;" alt="broadcast"></center>
   
    START<br>
    SCREENSHARE<br>
    BROADCAST
  </button>  
  {/if}
</div>
<img src="stand.png" alt="stand" style="width: 10em;">
<!--
<button 
  class="btn btn-primary" 
  on:click={startBroadcast} 
  use:puf={{text:'opaa'}}
>
Start Screenshare broadcast
</button>

<button 
  class="btn btn-secondary" 
  use:puf={{text:`
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" style="background-color:white; border:solid 1px grey">
  <div class="toast-header">
    <img src="..." class="rounded mr-2" alt="...">
    <strong class="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    Hello, world! This is a toast message.
  </div>
</div>
`, duration_sec:1}}
>
puf
</button>
-->
{#if videoIsPlaying}
  <button 
    class="btn btn-secondary" 
    on:click={stopBroadcast} 
    use:puf={{text:'Broadcast stopped.'}}
  >
  Stop Screenshare
  </button>
{/if}
<!--
<button 
  class="btn" 
  on:click={()=>navigator.clipboard.readText().then(c=> console.log(c))} 
  use:puf={{text:'read'}}
>
read clipboard
</button>
-->
<label style="margin-top:1em">
  <Social mysockid={mysockid} loc={loc} >Share</Social>
  the meeting URL with the viewers
</label>




<div>
  <a href="{loc}?room={mysockid}" target="_blank">{loc}?room={mysockid}</a>

  <button class="btn btn-lite" type="button"
    on:click={cp2kb} use:puf={{text:'Copied to clipboard'}} >
      Copy link
  </button>
<!--
  <svg use:puf={{text:'Copied to clipboard'}} style="width:1em; cursor: pointer;enable-background:new 0 0 460 460;" title="Copy to clipboard" 
  on:click={cp2kb} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 460 460" xml:space="preserve">
  <g>
    <g>
      <g>
        <path d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272
          c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729
          c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z"/>
        <path d="M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272
          c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068
          c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001
          C291.206,428.715,289.92,430,288.341,430z"/>
      </g>
    </g>
  </g>
  </svg>
  -->

</div>

<style>
video{
  max-width: 100%;
  max-height: 100%;
  height: 10em;
  background-color: black;
}
.centered-element {
  position: absolute;
  left: 0;
  right:0;
  top: 0;
  bottom: 0;
  width:100%;
}
</style>
<script>
import {puf} from './puf.js'
import Social from './Social.svelte'
export let mysockid = null
export let stream = null;
window.stream=stream; // Privremeno
let video_el
let videoIsPlaying = false
let loc = document.location.href

function cp2kb(){
  var link = loc + '?room=' + mysockid
  navigator.clipboard.writeText(link)
}


function startBroadcast(){
//getScreenId(function (error, sourceId, screen_constraints) {
  //console.log('screen_constraints',screen_constraints)
  //navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
  stream = null;
  let displayMediaOptions = {video: true, audio: false};
  /*
  if (self.get('audio'))
    displayMediaOptions = {
      video: true,
      audio: true
    }
  console.log('audio', displayMediaOptions)
*/
  try {    
    navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(function(stream){
      stream=stream;
      window.stream=stream;
      video_el.srcObject = stream;
      video_el.play();
      videoIsPlaying = true;
      // za sve ortace koji su vec tu (npr broadcaster je prekinuo pa startovao stream)
      Object.keys(window.peers).forEach(function(peer) {
        window.peers[peer].addStream(stream);// add streams to peer dynamically
      });

      stream.addEventListener('inactive', e => {
        // on "stop share" from system dialog
        console.log('Capture stream inactive - stop broadcasting!');
        stopBroadcast();
      });

    });
  } catch(err) {
    console.error("stream Error: " + err);
  }                        
    //});
}
/*
self.on('cp2kb', function(){
  var link = self.get('loc') + '?id=' + self.get('mysockid')
  navigator.clipboard.writeText(link)//.then(e=>iziToast.success({ message: 'Code copied to clipboard.'}))
  self.set('puf', true);
  setTimeout(function(){
    self.set('puf', false);
  },500)
})
*/

function stopBroadcast(){
  window.stream.getTracks().forEach(function(track) {
    track.stop();
  });
  videoIsPlaying = false
  Object.keys(window.peers).forEach(function(peer) {
    window.peers[peer].send('broadcastEnd');
  });
/*
  setTimeout(function(){
    Object.keys(window.peers).forEach(function(peer) {
      window.peers[peer].destroy();
    });
  },1)
*/
}
</script>