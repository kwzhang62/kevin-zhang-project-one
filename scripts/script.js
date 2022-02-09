//app namespace object
app = {};

//set a click listener for the navbar
app.setAboutListener = () => {
    //add the listener to the entire nav class to avoid having to change the html or writing overly long css selectors
    const aboutLink = document.querySelector('.navLinks');
    aboutLink.addEventListener('click', function(event) {
        //show an alert when user clicks on the About link
        if(event.target.innerHTML == "About") {
            event.preventDefault();
            alert('The About page is currently under construction. Please check again later.');
        }
    });
}

//set a click listener for the submitting the forms
app.setFormListener = () => {
    const formButton = document.querySelector('form button');
    console.log();
    formButton.addEventListener('click', function(event) {
        event.preventDefault();
        //get the user's info
        let userName = document.getElementById('name').value;
        let userEmail = document.getElementById('email').value; //currently unused
        let userText = document.querySelector('textarea').value

        //input validation to make sure the user entered both a name and a comment
        if(!(userName && userText)) {
            alert("Please enter your name and a message.");
        } else {
            //different logic depending on which form is submitted
            if(formButton.parentElement.className == "commentsForm") {
                let postDate = app.getFormattedDate();
                const commentElement = app.createBlogComment(userName, postDate, userText);
                const commentDisplay = document.querySelector('.commentsDisplay');
                commentDisplay.appendChild(commentElement);
            }
        }
    });
}

//function for creating a blog comment element
//only used in one place at the moment, but making it its own function makes the code look neater
app.createBlogComment = (name, date, comment) => {
    //create the main container div
    const commentContainer = document.createElement("div");
    commentContainer.className = "commentContainer";

    //create the image container div
    const commentImgContainer = document.createElement("div");
    commentImgContainer.className = "imageContainer";

    //create the text container div
    const commentTextContainer = document.createElement("div");
    commentTextContainer.className = "commentTextContainer"

    //create the image and add it to its container
    const commentImg = document.createElement("img");
    commentImg.src = "./assets/comment-image2.jpg"; //use one of the existing files as a placeholder for now
    commentImg.alt = "profile image";
    commentImgContainer.appendChild(commentImg);

    //create the comment text, author, and post date and add
    const commentDate = document.createElement("p");
    commentDate.textContent = `${date.day} ${date.month} ${date.date}${date.dateSuffix}, ${date.year} by ${name}`;
    commentDate.className = "commentDate";
    const commentText = document.createElement("p");
    commentText.textContent = `${comment}`;
    commentTextContainer.appendChild(commentDate);
    commentTextContainer.appendChild(commentText);

    //append the image and text to the container
    commentContainer.appendChild(commentImgContainer);
    commentContainer.appendChild(commentTextContainer);

    return commentContainer;
}

//returns a date object for the current date
//currently hardcoded in a format that fits the blog comment dates
app.getFormattedDate = () => {
    const formattedDate = {};   //empty formatted date object to be returned
    const currentDate = new Date(); //get the current date and time
    formattedDate.day = new Intl.DateTimeFormat('en-CA', {weekday: "long"}).format(currentDate);    //get the day of the week
    formattedDate.date = currentDate.getDate(); //get the day of the month
    formattedDate.month = new Intl.DateTimeFormat('en-CA', {month: "long"}).format(currentDate);    //get the month
    formattedDate.year = currentDate.getFullYear(); //get the year

    //format the suffix for the date
    if(formattedDate.date == 1 || formattedDate.date == 21 || formattedDate.date == 31) {
        formattedDate.dateSuffix = "st";
    } else if (formattedDate.date == 2 || formattedDate.date == 22 ) {
        formattedDate.dateSuffix = "nd";
    } else {
        formattedDate.dateSuffix = "th";
    }

    return formattedDate;
}

//initialization function
app.init = () => {
    app.setAboutListener();
    app.setFormListener();
};

//call the init function
app.init();