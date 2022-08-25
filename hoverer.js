/**
 * Shows text box on hover
 * @param {HTMLElement} element - The element which has hoverer applied to it.
 * @param {string} text - The text that appears in the text box.
 */
function applyHoverer(element,text){
    /**
     * Creating the text box
     * @type {HTMLSpanElement}
     */
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

    /*
     * Showing text box when mouse hovers over element.
     */
    let isMouseOver = false;
    element.addEventListener('mouseover',function(e){
        if (isMouseOver) return;
        isMouseOver = true;
        setTimeout(function(){
            if (!isMouseOver) return;
            const elementTrans = getTextBoxTrans(element);
            textElement.style.left = elementTrans.x+'px';
            textElement.style.top = elementTrans.y+'px';
            textElement.style.opacity = 1;
        },500)
    })
    element.addEventListener('mouseleave',function(){
        isMouseOver = false;
        textElement.style.opacity = 0;
    })

    /**
     * Get element transforms
     * @param {HTMLElement} element 
     * @return {{x:number,y:number}}
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
    /*
     * Applying hoverer to all element with `data-hoverer-text` attribute
     */
    const hovererTextElements = document.querySelectorAll('[data-hoverer-text]');
    for (let i = 0; i < hovererTextElements.length; i++) {
        const hovererTextElement = hovererTextElements[i];
        applyHoverer(hovererTextElement,hovererTextElement.getAttribute('data-hoverer-text'));
    }
    /*
     * Selecting all element with `data-hoverer-infer` attribute
     */
    const hovererInferElements = document.querySelectorAll('[data-hoverer-infer]');
    for (let i = 0; i < hovererInferElements.length; i++) {
        const hovererInferElement = hovererInferElements[i];
        const hovererInferValue = hovererInferElement.getAttribute('data-hoverer-infer');
        if (hovererInferValue == 'auto') {
            /*
             * Automatically choosing property to infer and applying hoverer with it
             */
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
            /*
             * Apply hoverer with inferred property  
             */
            applyHoverer(
                hovererInferElement,
                hovererInferElement[hovererInferValue]
            );
        }
    }
})()