requirejs(['../../dist/hoverer.js'], (h) => {
    console.log(h);
    h.apply(document.querySelector('a'),'x', {
        delay: 0,
        positioningType: 'mouse'
    });
})