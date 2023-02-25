let GlobalSubmit = false;
let userDetails;
let changeNavLinks;

const signUp = (isSummit = false) => {
    console.log("SignUp")
    let fullName = document.getElementById("fullname").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmPassword = document.getElementById("confirmPassword").value
    let tnC = document.getElementById('t-and-c').checked
    let error = false;

    // let setFullName = localStorage.setItem('fullname', fullName)
    // let setEmail = localStorage.setItem('email', email)
    // let setPassword = localStorage.setItem('password', password)
    // let setConfirmPassword = localStorage.setItem('confirmPassword', confirmPassword)

    userDetails = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    localStorage.setItem('userDetails', JSON.stringify(userDetails))

    if (isSummit) {
        GlobalSubmit = true;
    }

    if (GlobalSubmit) {

        if (fullName.length >= 3) {
            document.getElementById("firstname-valid").style.display = "block"
            document.getElementById("firstname-invalid").style.display = "none"
        }
        else {
            document.getElementById("firstname-valid").style.display = "none"
            document.getElementById("firstname-invalid").style.display = "block"
            error = true
        }

        if (email != '' && email.includes("@") && email.includes(".") && email.indexOf("@") != 0 && email.lastIndexOf(".") >= 2) {
            document.getElementById("email-valid").style.display = "block"
            document.getElementById("email-invalid").style.display = "none"
        }
        else {
            document.getElementById("email-valid").style.display = "none"
            document.getElementById("email-invalid").style.display = "block"
            error = true
        }

        if (password === "") {
            document.getElementById("password-invalid").style.display = "block"
        }
        else if (password.length > 0 && password.length != 6) {
            document.getElementById("password-invalid").innerHTML = "Password should be 6 character"
        }
        else {
            document.getElementById("password-invalid").style.display = "none"
            error = true
        }

        if (confirmPassword == password) {
            document.getElementById("confirmPassword-invalid").style.display = "none"
        }
        else {
            document.getElementById("confirmPassword-invalid").style.display = "block"
            error = true
        }

        if (tnC) {
            document.getElementById('t-and-c-invalid').style.display = 'none'
        } else {
            document.getElementById('t-and-c-invalid').style.display = 'block'
            error = true
        }
    }

    if (isSummit && !error) {
        // USER_DETAILS.push(userDetails)
        // console.log(USER_DETAILS)

        alert('Sign Up Successfully!');
        document.getElementById("sign-up-form").reset();
        console.log(document.getElementById("log-In"),"1");
        document.getElementById("log-In").style.display = "block"
        document.getElementById("sign-Up").style.display = "none"
        document.getElementById("dashboard").style.display = "none"
    }
}

const logIn = () => {

    let enteredEmail = document.getElementById("enteredEmail").value
    let enteredPassword = document.getElementById("enteredPassword").value

    if (enteredEmail != ' ' &&
        enteredEmail.includes('@') &&
        enteredEmail.includes('.') &&
        enteredEmail.indexOf('@') != 0 &&
        (enteredEmail.length - enteredEmail.lastIndexOf('.') >= 3)) {
        document.getElementById('enteredEmail-invalid').style.display = 'none'
    }
    else {
        document.getElementById('enteredEmail-invalid').style.display = 'block'
        error = true
    }

    localStorage.getItem(userDetails)
    let requiredUser = (userDetails.email === enteredEmail && userDetails.password === enteredEmail)
    // let requiredUser = localStorage.getItem(USER_DETAILS)
    // let requiredUser = localStorage.getItem(USER_DETAILS.find(user => user.email === enteredEmail && user.password === enteredPassword))
    // let requiredUser = USER_DETAILS.find(user => user.email === enteredPassword && user.password === enteredPassword)
    // let requiredUser = (getEmail === enteredEmail && getPassword === enteredPassword)

    if (requiredUser) {
        console.log(userDetails)
        alert('Access Granted !')
        changeNavLinks(requiredUser)
        document.getElementById("dashboard").style.display = "block"
        // document.getElementById('dashboard').innerHTML = `<h5>Welcome Back, ${fullName}</h5>`
        // document.getElementById('dashboard').innerHTML = `<h6>Your Email ID :, ${email}</h6>`

        document.getElementById("log-In").style.display = "none"
        document.getElementById("sign-Up").style.display = "none"
    }
    else {
        alert("Access Denied !")
    }
    document.getElementById("log-in-form").reset()
}


const change = () => {
    let oldPassword = document.getElementById("oldpassword").value
    let newpassword = document.getElementById("newpassword").value
    let confirmNewPassword = document.getElementById("confirmNewPassword").value


    let currentPassword = USER_DETAILS.find(user => user.password === oldPassword)
    if (currentPassword) {
        document.getElementById("oldpassword-invalid").style.display = "none"
    }
    else {
        document.getElementById("oldpassword-invalid").style.display = "block"
    }

    if (newpassword === "") {
        document.getElementById("newpassword-invalid").style.display = "block"
    }
    else if (password.length > 0 && password.length != 6) {
        document.getElementById("newpassword-invalid").innerHTML = "Password should be 6 character"
    }
    else {
        document.getElementById("newpassword-invalid").style.display = "none"
        error = true
    }

    if (confirmNewPassword == newpassword) {
        document.getElementById("confirmNewPassword-invalid").style.display = "none"
    }
    else {
        document.getElementById("confirmNewPassword-invalid").style.display = "block"
        error = true
    }
}

const logout = () => {
    document.getElementById("sign-Up").style.display = "block"
    document.getElementById("log-In").style.display = "none"
    document.getElementById("dashboard").style.display = "none"
}

const goToLogin = () => {
    document.getElementById("log-In").style.display = "block"
    document.getElementById("sign-Up").style.display = "none"
    document.getElementById("dashboard").style.display = "none"
}

const goToSignOut = () => {
    document.getElementById("sign-Up").style.display = "block"
    document.getElementById("log-In").style.display = "none"
    document.getElementById("dashboard").style.display = "none"
}

changeNavLinks = (currentUser) => {
    console.log(currentUser)
    let { fullName } = currentUser
    document.getElementById('sign-up-nav-link').style.display = 'none'
    document.getElementById('log-in-nav-link').style.display = 'none'

    document.getElementById('profile-link').style.display = 'block'
    document.getElementById('log-out-nav-link').style.display = 'block'

    document.getElementById('profile-link').innerText = `Hi, ${fullName}`
}