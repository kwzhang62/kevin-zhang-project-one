app = {};

app.setAboutListener = () => {
    const aboutLink = document.querySelector('.navLinks');
    aboutLink.addEventListener('click', function(event) {
        if(event.target.innerHTML == "About") {
            event.preventDefault();
            alert('The About page is currently under construction. Please check again later.');
        }
    });
}

app.init = () => {
    app.setAboutListener();
};

app.init();