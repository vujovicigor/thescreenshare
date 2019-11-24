<!--
<span>ScreenSubscribe</span>
<tag>{broadcasterSockId}</tag>
-->
<video muted controls id="video" bind:this={video_el}></video>
<!-- <button on:click={()=> window.page('/test/ccsdfsd')} >goto ccsdfsd</button> -->
<style>
video{
  max-width: 100%;
  max-height: 100vh;
  border: solid 2px black;
  background-color: black;
}
</style>

<script>
export let broadcasterSockId
export let mysockid
let video_el
//$:console.log('ScreenSubscribe broadcasterSockId', broadcasterSockId)

socket.emit('initP2PWith', broadcasterSockId);
initP2PWith(broadcasterSockId, false);

</script>
