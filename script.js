let url1 = 'https://script.google.com/macros/s/AKfycby6mJLaW7ce4FkXnGQZrcp2pOg83-d475e1DUNMBK98P6BTWyNsw8rMD-Zprt7m9DX0sA/exec'

let url2 = 'https://script.google.com/macros/s/AKfycbwvTHmXePjEt_5oMxnASHx2HFwnjW3hWpM9qv681CBgLjCSSUdu_3siki69aWK1eXd2/exec'

getGitHubProfilePic("pin4ka");
document.getElementById("logout_btn").style.display = 'none';
LoginPage();
// RemoveContent()


if (localStorage.getItem('UserName')) {
    optionsPage();
    document.getElementById("logout_btn").style.display = 'flex';
}

function user_name() {

    let inp = document.getElementById("usr").value.toLowerCase();
    console.log(inp);
    const user_names = [['mdk_debraj', "Debraj Modak"], ['pinaka', "Panaka"]];

    if (inp === '') {
        result.textContent = 'Please enter a value.';
        return;
    }

    for (let i = 0; i < user_names.length; i++) {
        if (user_names[i][0] === inp) {
            localStorage.setItem('UserName', user_names[i][0]);
            localStorage.setItem('ProfileName', user_names[i][1]);
            optionsPage();
            break; // Exit the loop if found
        }
    }
}

async function getGitHubProfilePic(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        // Get the profile picture URL
        const profilePicUrl = data.avatar_url;

        // Set the image source to the profile picture URL
        document.getElementById("profile-pic").src = profilePicUrl;
    } catch (error) {
        console.error("Error fetching GitHub profile:", error);
    }
}

function LoginPage() {
    document.getElementById("login").style.display = "flex";
    document.getElementById("options").style.display = "none";
    document.getElementById("add_content").style.display = 'none';
    document.getElementById("remove_conent").style.display = 'none';
    document.title = 'Gurukul Admin - login';
    document.body.style.backgroundColor = "#211951";
    clearAllForms();
}

function optionsPage() {
    document.getElementById("login").style.display = "none";
    document.getElementById("options").style.display = "flex";
    document.getElementById("add_content").style.display = 'none';
    document.getElementById("remove_conent").style.display = 'none';
    document.title = `Dashboard - ${localStorage.getItem('ProfileName')}`;
    document.body.style.backgroundColor = "#0B666A";
    document.getElementById("logout_btn").style.display = 'flex';
    let current_time = DateTime();

    document.getElementById("user_name").textContent = `${getGreeting(current_time[1][0])} ${localStorage.getItem('ProfileName')}`
}

function AddContent() {
    document.getElementById("login").style.display = "none";
    document.getElementById("options").style.display = "none";
    document.getElementById("add_content").style.display = 'flex';
    document.getElementById("remove_conent").style.display = 'none';

    document.body.style.backgroundColor = "#1C1427";

    const input = DateTime()[0] + DateTime()[1];
    const cleanedInput = input.replace(/[,.: ]/g, '').slice(0, -2);
    document.getElementById("content_id").value = cleanedInput;
    document.getElementById("admin_user_name").value = localStorage.getItem('ProfileName');

}

function RemoveContent() {
    document.getElementById("login").style.display = "none";
    document.getElementById("options").style.display = "none";
    document.getElementById("add_content").style.display = 'none';
    document.getElementById("remove_conent").style.display = 'flex';
    document.body.style.backgroundColor = "#40514E";

}

function LogOut() {
    localStorage.clear();
    LoginPage();
    document.getElementById("logout_btn").style.display = 'none';
}

function clearAllForms() {
    // Select all form elements on the page
    const forms = document.querySelectorAll("form");

    // Loop through each form and clear their inputs
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.value = ''; // Clear input values
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false; // Uncheck checkboxes and radio buttons
            }
        });
    });
}

function DateTime() {
    // Get current date and time
    const options = {
        timeZone: 'Asia/Kolkata',
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Use 12-hour format
    };

    // Format the date and time
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const [date] = formatter.format(new Date()).split(","); // Get date part
    const time = formatter.format(new Date()).split(", ")[1]; // Get time part

    // Format the output
    const formattedDate = date.replace(/\//g, ','); // Replace '/' with ','
    const formattedTime = time.replace(':', ':'); // Adjust time format if needed

    return [[`${formattedDate}`], [`${formattedTime}`]];
}

function getGreeting(currentTime) {
    // Split the input into time and period (AM/PM)
    const [time, period] = currentTime.trim().split(' ');

    // Split the time into hours, minutes, and seconds
    const [hours, minutes] = time.split(':').map(Number);

    // Validate the time input
    if (isNaN(hours) || isNaN(minutes) || hours < 1 || hours > 12 || minutes < 0 || minutes > 59 || !['AM', 'PM'].includes(period)) {
        return "Invalid time format. Please use HH:MM:SS AM/PM format.";
    }

    // Convert the hours to 24-hour format for comparison
    const hourIn24 = (period === 'PM' && hours < 12) ? hours + 12 : (period === 'AM' && hours === 12 ? 0 : hours);

    // Determine the greeting based on the hour
    if (hourIn24 < 12) {
        return "Good Morning";
    } else if (hourIn24 < 17) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}

function server(form_id, url,a,b,c) {
    let form = document.querySelector(`#${form_id}`)
    form.addEventListener("submit", (e) => {
        e.target.status_box.innerHTML = a;

        let form_data = new FormData(form);

        fetch(url, { method: "POST", body: form_data }).then((res) => res.text())
            .then((finalRes) => {
                e.target.status_box.innerHTML = b;
                form.reset();
                setTimeout(() => {
                    e.target.status_box.innerHTML = c;
                    optionsPage();
                }, 4000)
                // alert
                console.log(finalRes)
                // alert(finalRes)
                // window.scrollTo({
                //     top: 0,
                //     behavior: 'smooth'
                // });
                // window.location.href = "./submit.html";
            })

        e.preventDefault();

    })


}

server('content_add_form', url1,"Submitting..","Submitted","Submit");
server('content_delete_form', url2,'Deleting...',"Deleted!","Delete");