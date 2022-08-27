const {applyHoverer,setHovererGlobalOptions} = (function(){
    /**
     * @typedef {Object} options - options for the behavior and look of hoverer.
     * @property {number} [size] - The size of the text box.
     * @property {number} [delay] - The amount of secondes between when the mouse hovers over the element and when the text box appears.
     * @property {number} [transition] - The time it take to transition between it's visible and invisible states.
     * @property {string} [style] - A string containing css styles that will be applied to the text box.
     */
    /**
     * @type {options}
     */
    const defaultOptions = {
        size:0.7,
        delay:0.5,
        transition:0,
        style:''
    };

    /**
     * Sets the default options for hoverer.
     * @param {options} options - options for the behavior and look of hoverer.
     */
    function setHovererGlobalOptions(options){
        for (let i in options){
            if (defaultOptions[i]==null) continue;
            defaultOptions[i] = options[i];
        }
    }

    /**
     * Shows text box on hover
     * @param {HTMLElement} element - The element which has hoverer applied to it.
     * @param {string} text - The text that appears in the text box.
     * @param {defaultOptions} options - options for the behavior and look of hoverer.
     */
    function applyHoverer(
        element,
        text,
        options = defaultOptions
    ){
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
        'font-size: '+(options.size||defaultOptions.size)+'em;'+
        'transition: all '+(options.transition||defaultOptions.transition)+'s;';
        textElement.style += options.style||defaultOptions.style;
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
            }, (options.delay||defaultOptions.delay)*1000)
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
    return {applyHoverer,setHovererGlobalOptions};
 })();

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
})();