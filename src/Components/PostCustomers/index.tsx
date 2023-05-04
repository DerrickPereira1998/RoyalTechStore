import { useState } from 'react'

export default function PostCustomers() {

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleOnSubmit = async (e: any) => {
		e.preventDefault();

		let result = await fetch(
		'http://localhost:5000/register', {
			method: "post",
			body: JSON.stringify({ name, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		result = await result.json();
		if (result) {
			alert("Data saved succesfully");
			setPassword("");
			setName("");
		}
	}
	return (
		<>
			<h1>This is React WebApp </h1>
			<form action="">
				<input type="text" placeholder="name"
				value={name} onChange={(e) => setName(e.target.value)} />
				<input type="password" placeholder="password"
				value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit"
				onClick={handleOnSubmit}>submit</button>
			</form>
		</>
	);
}