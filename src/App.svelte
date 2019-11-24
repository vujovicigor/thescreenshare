<script>
  export let mysockid
  $:console.log(`mysockid = ${mysockid}`)
  import page from 'page'
  window.page = page
  import ScreenPublish from './ScreenPublish.svelte'
  import ScreenSubscribe from './ScreenSubscribe.svelte'
  let selected_component_name = 'ScreenPublish'
  let selected_component_params = {}
  const components = {
    ScreenPublish:ScreenPublish,
    ScreenSubscribe:ScreenSubscribe
  }

/*
  page('/', index)
  page('/:broadcasterSockId', fnScreenSubscribe)
  page({hashbang:false})
*/
  var broadcasterSockId = document.location.search.split('=').pop();
  if (broadcasterSockId) fnScreenSubscribe(broadcasterSockId)
  else 
    index();

  function index(p1){
    console.log('ix',p1)
    selected_component_name = 'ScreenPublish'
    selected_component_params = {}
  }

  function fnScreenSubscribe(p1){
    //console.log('ScreenSubscribe',p1)
    selected_component_name = 'ScreenSubscribe'
//    selected_component_params = p1.params//{broadcasterSockId:'id'}
    selected_component_params = { broadcasterSockId:p1 }
  }
</script>

<main style="display:flex; flex-flow: column; align-items: center;">
<!--
  <button class="btn btn-primary" on:click={()=> page('/test/joja')} >goto test</button>
  <button class="btn btn-secondary" on:click={()=> page('/')} >goto index</button>
  <label>{selected_component_name}</label>
  ---<br>
-->
  <svelte:component this={components[selected_component_name]} {...selected_component_params} mysockid={mysockid} />
</main>

