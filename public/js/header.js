

const collapse = document.querySelector('.collapse');
    const slider = document.querySelector('.slider')

    collapse.addEventListener('click', () => {
        slider.classList.toggle('navbar_item_collapse');
    })


    // login button js

    const userCredit = document.querySelector('.login');
    const signupLoginSection = document.querySelector('#signup_login');
    const close = document.querySelector('#close');

    userCredit.addEventListener('click', () => {
        signupLoginSection.style.display = "flex";

        const actionLogin = document.querySelector('#action_login');
        const actionSignup = document.querySelector('#action_signup');
        const loginSide = document.querySelector('#login_side');
        const signupSide = document.querySelector('#signup_side');

        actionSignup.addEventListener('click', () => {
            loginSide.style.display = 'none';
            signupSide.style.display = 'block';
            actionSignup.style.backgroundColor = 'black';
            actionLogin.style.backgroundColor = 'rgb(34, 177, 177)';


            // Signup form inputs.

            const signupSide = document.getElementById('signup_side');
            console.log(signupSide);

            signupSide.addEventListener('submit', (event) => {
                event.preventDefault();

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const cpassword = document.getElementById('cpassword').value;
                const signupBtn = document.getElementById('signup_btn');

                signupBtn.addEventListener('click', () =>{
                    if(!email || !password || !cpassword){
                        alert('please fill all fields.');
                        return;
                    }

                    if(password !== cpassword){
                        alert("password and confirm password are not same");
                        return;
                    }

                    // signup api call.

                })
            })
        });

        actionLogin.addEventListener('click', () => {
            signupSide.style.display = 'none';
            loginSide.style.display = 'block';
            actionLogin.style.backgroundColor = 'black';
            actionSignup.style.backgroundColor = 'rgb(34, 177, 177)';
        })
    });

    close.addEventListener('click', () => {
        signupLoginSection.style.display = 'none';
    });