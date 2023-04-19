let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)



const signin = async () => {
	const email = document.querySelector('input[type="text"]').value;
	const password = document.querySelector('input[type="password"]').value;
  
	try {
	  const response = await fetch('http://localhost:3000/user/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
		  email: email,
		  password: password
		})
	  });
  
	  if (response.ok) {
		const data = await response.json();
		const token = data.token;
		localStorage.setItem('token', token);
		window.location.href = 'dashboard.html';
	  } else {
		throw new Error('Login failed. Please check your credentials.');
	  }
	} catch (err) {
	  console.error(err);
	  alert(err.message);
	}
  };
  
  



function signup() {
    const name = document.querySelector('input[type="user"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const role = document.querySelector('#role').value;

    // Disable the signup button and show a loading message
    const signupBtn = document.querySelector('button');
    signupBtn.disabled = true;
    signupBtn.textContent = 'Loading...';

    fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role
        })
    })
        .then(response => response.json())
        .then(data => {
            // Enable the signup button and show the response message
            signupBtn.disabled = false;
            signupBtn.textContent = 'Sign up';
            const message = data.message;
            if (data.success) {
                alert(message);
            } else {
                const errorElem = document.getElementById('error');
                errorElem.textContent = message;
            }
        })
        .catch(error => console.error(error));
}




  




