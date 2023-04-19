let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)



const signin = async () => {
	const username = document.querySelector('input[type="text"]').value;
	const email = document.querySelector('input[type="email"]').value;
	const password = document.querySelector('input[type="password"]').value;

	try {
		const response = await fetch('http://localhost:3000/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password
			})
		});
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.error(err);
	}
};



function signup() {
	const name = document.querySelector('input[type="text"]').value;
	const email = document.querySelector('input[type="email"]').value;
	const password = document.querySelector('input[type="password"]').value;
	const role = document.querySelector('#role').value;

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
		.then(response => {
			if (response.ok) {
				console.log('Signup successful!');
			} else {
				console.log('Signup failed.');
			}
		})
		.catch(error => console.error(error));
}




