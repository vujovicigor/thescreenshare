<div class="dropdown" style="display: inline;">
  <button class="btn btn-lite dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <slot>
    Share
    </slot>
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" target="_blank" 
    href="https://twitter.com/intent/tweet?url={url}&text={title}">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/twitter.png" alt="Twitter">
    Twitter
    </a> 

    <a class="dropdown-item" target="_blank" 
    href="http://www.addthis.com/bookmark.php?url={url}">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/add.this.png" alt="AddThis">
    AddThis
    </a> 

    <a class="dropdown-item" target="_blank" 
    href="sms:?&body={title}: {url} ">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/sms.png" alt="SMS">
    SMS
    </a> 

    <a class="dropdown-item" target="_blank" 
    href="https://web.skype.com/share?url={url}&text={title}">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/skype.png" alt="Skype">
    Skype
    </a> 

    <a class="dropdown-item" target="_blank" 
    href="https://telegram.me/share/url?url={url}&text={title}">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/telegram.me.png" alt="Telegram">
    Telegram
    </a> 

    <a class="dropdown-item" target="_blank" 
    href="viber://forward?text={title}: {url}">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/viber.png" alt="Viber">
    Viber
    </a> 
   

    <a class="dropdown-item" target="_blank" 
    href="mailto:?subject={title}&body={url}">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/email.png" alt="Email">
    Email
    </a> 

    <a class="dropdown-item" target="_blank" 
    href="https://mail.google.com/mail/?view=cm&su={title}&body={url}">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/gmail.png" alt="Gmail">
    Gmail
    </a> 

    <a class="dropdown-item" target="_blank" 
    href="whatsapp://send?text={title}: {url}">
    <img style="height: 2rem;" src="social-share-urls/images/logo-icons-opaque-background/whatsapp.png" alt="Whatsapp">
    Whatsapp
    </a> 

  </div>
</div>
<script>
export let loc 
export let mysockid
export let title = 'My screen share url'
export let user_id 
export let hash_tags

$:url = encodeURIComponent(`${loc}${mysockid}`)

</script>
