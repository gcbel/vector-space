/* VARIABLES */
const signInMenu = document.getElementById("sign-in-menu");
const signUpMenu = document.getElementById("sign-up-menu");
const signInSection = document.getElementById("sign-in");
const signUpSection = document.getElementById("sign-up");
const signup = document.querySelector("#sign-up-button");
const signin = document.querySelector("#sign-in-button");

const signinEmailAlert = document.querySelector("#signin-email-alert");
const signinPasswordAlert = document.querySelector("#signin-password-alert");
const signinAlert = document.querySelector("#signin-alert");

const emailAlert = document.querySelector("#signup-email-alert");
const firstAlert = document.querySelector("#signup-first-alert");
const lastAlert = document.querySelector("#signup-last-alert");
const userAlert1 = document.querySelector("#signup-user-alert-1");
const userAlert2 = document.querySelector("#signup-user-alert-2");
const passwordAlert = document.querySelector("#signup-password-alert");
const signupAlert = document.querySelector("#signin-alert");

/* FUNCTIONS */
/* Show sign in and hide sign up */
function showSignIn() {
  signInSection.classList.remove("hidden");
  signUpSection.classList.add("hidden");
}

/* Show sign up and hide sign in */
function showSignUp() {
  signUpSection.classList.remove("hidden");
  signInSection.classList.add("hidden");
}

/* Signs a user in */
const userSignIn = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#sign-in-email").value;
  const password = document.querySelector("#sign-in-password").value;

  if (!email) {
    signinEmailAlert.classList.remove("hidden");
  } else {
    signinEmailAlert.classList.add("hidden");
  }

  if (!password) {
    signinPasswordAlert.classList.remove("hidden");
  } else {
    signinPasswordAlert.classList.add("hidden");
  }

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/locations");
    } else {
      signinAlert.classList.remove("hidden");
    }
  }
};

/* Signs a user up */
const userSignUp = async (event) => {
  event.preventDefault();

  const first = document.querySelector("#sign-up-first").value;
  const last = document.querySelector("#sign-up-last").value;
  const user = document.querySelector("#sign-up-user").value;
  const email = document.querySelector("#sign-up-email").value;
  const password = document.querySelector("#sign-up-password").value;

  const validEmail = isValidEmail(email);
  const existingUser = await isExistingUsername(user);

  let createAccount = true;

  if (!email || !validEmail) {
    emailAlert.classList.remove("hidden");
    createAccount = false;
  } else {
    emailAlert.classList.add("hidden");
  }

  if (!first) {
    firstAlert.classList.remove("hidden");
    createAccount = false;
  } else {
    firstAlert.classList.add("hidden");
  }

  if (!last) {
    lastAlert.classList.remove("hidden");
    createAccount = false;
  } else {
    lastAlert.classList.add("hidden");
  }

  if (!user || user.length < 5) {
    userAlert1.classList.remove("hidden");
    createAccount = false;
  } else if (existingUser) {
    userAlert2.classList.remove("hidden");
    createAccount = false;
  } else {
    userAlert1.classList.add("hidden");
    userAlert2.classList.add("hidden");
  }

  if (!password || password.length < 8) {
    passwordAlert.classList.remove("hidden");
    createAccount = false;
  } else {
    passwordAlert.classList.add("hidden");
  }

  if (createAccount) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ first, last, user, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      signupAlert.classList.remove("hidden");
    }
  }
};

/* Check for submit key events */
function keyPress(event) {
  if (event.key === "Enter") {
    if (!signInSection.classList.contains("hidden")) {
      userSignIn(event);
    } else if (!signUpSection.classList.contains("hidden")) {
      userSignUp(event);
    }
  }
}

/* Checks for a valid email */
function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

/* Checks if username exists in database */
async function isExistingUsername(username) {
  try {
    const response = await fetch(`/api/check-user/${username}`);
    if (response.ok) {
      const { exists } = await response.json();
      return exists;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

/* EVENT LISTENERS */
signInMenu.addEventListener("click", showSignIn);
signUpMenu.addEventListener("click", showSignUp);
signin.addEventListener("click", userSignIn);
signup.addEventListener("click", userSignUp);
document.addEventListener("keydown", keyPress);
