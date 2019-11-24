export function puf(node, params) {
  let text = params.text;
  let duration_sec = params.duration_sec || 0.5;
//  console.log('puf', params)
//  console.log(node.style.position)
  
	function handleMousedown(event) {
		let x = event.clientX;
		let y = event.clientY;
/*
		node.dispatchEvent(new CustomEvent('panstart', {
			detail: { x, y }
    }));
*/  
    var elem = document.createElement('div');
    elem.style.cssText = `top:${y-10}px; left:${x+10}px; animation: puf-anim ${duration_sec}s both; `;
    elem.className = "puf"
    elem.innerHTML = text
    document.body.appendChild(elem);    
    setTimeout(()=>{
      elem.parentNode.removeChild(elem)
    }, duration_sec*1000)
	}

	node.addEventListener('mousedown', handleMousedown);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
		}
	};
}