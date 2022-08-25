/**
 * Shows text on hover
 * @param {HTMLElement} element 
 * @param {string} text
 */
function applyHoverer(element,text){
    const textElement = document.createElement('span');
    textElement.ariaHidden = true;
    textElement.innerText = text;
    textElement.style = ''+
    'position:absolute;'+
    'opacity:0;'+
    'background:white;'+
    'border: 0.1em solid grey;'+
    'padding: 0.45em;'+
    'font-family: sans-serif;'+
    'font-size: 0.8em;'

    document.body.appendChild(textElement);
    element.addEventListener('mouseover',function(e){
        const elementTrans = getTextBoxTrans(element);
        textElement.style.left = elementTrans.x+'px';
        textElement.style.top = elementTrans.y+'px';
        textElement.style.opacity = 1;
    })
    element.addEventListener('mouseleave',function(){
        textElement.style.opacity = 0;
    })

    /**
     * Get element transforms
     * @param {HTMLElement} element 
     */
    function getTextBoxTrans(element){
        const boundingClientRect = element.getBoundingClientRect();
        return {
            x:boundingClientRect.left+window.scrollX,
            y:boundingClientRect.bottom+window.scrollY+5
        }
    }
}

(function(){
    const hovererTextElements = document.querySelectorAll('[data-hoverer-text]');
    for (let i = 0; i < hovererTextElements.length; i++) {
        const hovererTextElement = hovererTextElements[i];
        applyHoverer(hovererTextElement,hovererTextElement.getAttribute('data-hoverer-text'));
    }
    const hovererInferElements = document.querySelectorAll('[data-hoverer-infer]');
    for (let i = 0; i < hovererInferElements.length; i++) {
        const hovererInferElement = hovererInferElements[i];
        const hovererInferValue = hovererInferElement.getAttribute('data-hoverer-infer');
        if (hovererInferValue == 'auto') {
            if (hovererInferElement.tagName == 'IMG'||hovererInferElement.tagName == 'VIDEO') {
                applyHoverer(
                    hovererInferElement,
                    hovererInferElement.alt||
                    hovererInferElement.src||
                    hovererInferElement.ariaLabel||
                    hovererInferElement.innerText
                );
            }
            else if (hovererInferElement.tagName == 'A') {
                applyHoverer(
                    hovererInferElement,
                    hovererInferElement.href||
                    hovererInferElement.ariaLabel||
                    hovererInferElement.innerText
                );
            }
            else {
                applyHoverer(
                    hovererInferElement,
                    hovererInferElement.ariaLabel||
                    hovererInferElement.innerText
                );
            }
        }
        else {
            applyHoverer(
                hovererInferElement,
                hovererInferElement[hovererInferValue]
            );
        }
    }
})()