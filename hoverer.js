/**
 * Shows text box on hover
 * @param {HTMLElement} element - The element which has hoverer applied to it.
 * @param {string} text - The text that appears in the text box.
 * @param {object} options - options for the behavior and look of hoverer
 * @param {number} [options.delay] - The amount of secondes between when the mouse hovers over the element and when the text box appears.
 * @param {number} transition - The time it take to transition between it's visible and invisible states.
 */
function applyHoverer(
    element,
    text,
    {
        delay = 500,
        transition = 0
    }){
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
    'transition: all '+transition+'s;'
    document.body.appendChild(textElement);

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
        }, delay*1000)
    })
    element.addEventListener('mouseleave',function(){
        isMouseOver = false;
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