/**
 * @typedef {Object} options - options for the behavior and look of hoverer.
 * @property {number} [size] - The size of the text box.
 * @property {string} [textColor] - The color of the text of the text box.
 * @property {string} [outlineColor] - The color of the outline of the text box.
 * @property {string} [background] - The background of the text box, this is the same as the CSS background property, so you could use things like url("") and linier-gradient().
 * @property {string} [font] - The font family of the text in the text box.
 * @property {'static'|'mouse'} [positioningType] - How the text box can be positioned, it can be equal one of few strings:
 ** 'static' - Means that the text box is always at the bottom left corner of the element.
    ** 'mouse' - Means that the text box is in the position of the mouse when it enters the element.
    * @property {number} [delay] - The amount of secondes between when the mouse hovers over the element and when the text box appears.
    * @property {number} [transition] - The time it take to transition between it's visible and invisible states.
    * @property {string} [style] - A string containing css styles that will be applied to the text box, this can be used to achieve effects that are not available through the other options.
    */
/**
 * @type {options}
 */
const defaultOptions = {
    size:0.7,
    textColor:'black',
    outlineColor:'grey',
    background:'white',
    font:'sans-serif',
    positioningType:'mouse',
    delay:0.5,
    transition:0,
    style:''
};

/**
 * Sets the default options for hoverer.
 * @param {options} options - options for the behavior and look of hoverer.
 */
export function setHovererGlobalOptions(options){
    for (let i in options){
        if (defaultOptions[i]==null) continue;
        defaultOptions[i] = options[i];
    }
}

/**
 * Shows text box on hover
 * @param {HTMLElement} element - The element which has hoverer applied to it.
 * @param {string} text - The text that appears in the text box.
 * @param {options} options - options for the behavior and look of hoverer.
 */
export function applyHoverer(
    element,
    text,
    options = defaultOptions
){
    const textElement = document.createElement('span');
    textElement.ariaHidden = true;
    textElement.hidden = true;
    textElement.innerText = text;
    textElement.style = `
    position: absolute;
    opacity: 0;
    color: ${options.textColor||defaultOptions.textColor}+';'+
    background: ${options.background||defaultOptions.background};
    border: 0.1em solid ${options.outlineColor||defaultOptions.outlineColor};
    padding: 0.45em;
    font-family: sans-serif;
    font-size: ${options.size||defaultOptions.size}em;
    transition: all ${oneLineIf(
        options.transition!=undefined,
        options.transition,
        defaultOptions.transition
    )}s;
    z-index:2;
    ${options.style||defaultOptions.style}
    `;
    document.body.appendChild(textElement);

    let isMouseOver = false;
    element.addEventListener('mouseover',function(e){
        if (isMouseOver) return;
        textElement.hidden = false;
        isMouseOver = true;
        setTimeout(function(){
            if (!isMouseOver) return;
            let elementTrans;
            const positioningType = options.positioningType || defaultOptions.positioningType;
            if (positioningType == 'mouse') {
                elementTrans = getTextBoxTrans(element);
            }
            else if (positioningType == 'static') {
                elementTrans = {
                    x:e.clientX,
                    y:e.clientY
                };
            }
            else {
                throw new Error('Can not position text box with positioning type of '+"'"+positioningType+"'"+' because no such type exits');
            }
            textElement.style.left = elementTrans.x+'px';
            textElement.style.top = elementTrans.y+'px';
            textElement.style.opacity = 1;
        }, oneLineIf(
            options.delay!=undefined,
            options.delay,
            defaultOptions.delay
        )*1000);
    })
    element.addEventListener('mouseleave',function(){
        textElement.style.opacity = 0;
        setTimeout(function(){
            if (isMouseOver) return;
            textElement.hidden = true;
        }, oneLineIf(
            options.transition!=undefined,
            options.transition,
            defaultOptions.transition
        )*1000)
        isMouseOver = false;
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

    function oneLineIf(bool,x,y){
        if (bool) return x;
        return y;
    }
}

export default {applyHoverer, setHovererGlobalOptions}

window.addEventListener('load',
function(){
    const hovererGlobalOptions = document.querySelector('[data-hoverer-global-options]');
    if (hovererGlobalOptions) {
        setHovererGlobalOptions(
            JSON.parse(
                hovererGlobalOptions.getAttribute('data-hoverer-global-options')
                || '{}'
            )
        )
    }

    const hovererTextElements = document.querySelectorAll('[data-hoverer-text]');
    for (let i = 0; i < hovererTextElements.length; i++) {
        const hovererTextElement = hovererTextElements[i];
        applyHoverer(
            hovererTextElement,
            hovererTextElement.getAttribute('data-hoverer-text'),
            (
                JSON.parse(
                    hovererTextElement.getAttribute('data-hoverer-options')
                    || '{}'
                )
            )
        );
    }

    const hovererInferElements = document.querySelectorAll('[data-hoverer-infer]');
    for (let i = 0; i < hovererInferElements.length; i++) {
        const hovererInferElement = hovererInferElements[i];
        const hovererInferValue = hovererInferElement.getAttribute('data-hoverer-infer');
        const hovererOptions = JSON.parse( hovererInferElement.getAttribute('data-hoverer-options') ) || {};
        if (hovererInferValue == 'auto') {
            if (hovererInferElement.tagName == 'IMG'||hovererInferElement.tagName == 'VIDEO') {
                applyHoverer(
                    hovererInferElement,
                    hovererInferElement.alt||
                    hovererInferElement.src||
                    hovererInferElement.ariaLabel||
                    hovererInferElement.innerText,
                    hovererOptions
                );
            }
            else if (hovererInferElement.tagName == 'A') {
                applyHoverer(
                    hovererInferElement,
                    hovererInferElement.href||
                    hovererInferElement.ariaLabel||
                    hovererInferElement.innerText,
                    hovererOptions
                );
            }
            else {
                applyHoverer(
                    hovererInferElement,
                    hovererInferElement.ariaLabel||
                    hovererInferElement.innerText,
                    hovererOptions
                );
            }
        }
        else {
            applyHoverer(
                hovererInferElement,
                hovererInferElement[hovererInferValue],
                hovererOptions
            );
        }
    }
}
)