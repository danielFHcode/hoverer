requirejs(['../../dist/hoverer.js'], (h) => {
    console.log(h);
    h.applyHoverer(document.querySelector('a'),'x');
})