const logina = document.querySelector('.logina');
    const signupa = document.querySelector('.signupa');
    const loginPage = document.querySelector('.loginPage');
    const signupPage = document.querySelector('.signupPage');

    signupa.addEventListener('click', () =>{
        signupPage.style.display = 'block';
        loginPage.style.display = 'none';
    })

    logina.addEventListener('click', () =>{
        signupPage.style.display = 'none';
        loginPage.style.display = 'block';
    })