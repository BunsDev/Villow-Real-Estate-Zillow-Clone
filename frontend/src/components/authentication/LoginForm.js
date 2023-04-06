import React, { useState, useEffect } from "react";
import { getActiveUser, loginUser } from "../../store/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@chakra-ui/react";
import FollowButtonLinks from "./FollowButtonLinks";

import "./LoginForm.scss";

const LoginForm = ({ closeModal }) => {
	const dispatch = useDispatch();

	const activeUser = useSelector(getActiveUser());

	// automatically close modal if user is logged in by
	// either clicking the demo user button or the sign in button
	if (activeUser) {
		closeModal();
	}
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	// State to keep track of whether the demo user button has been clicked
	const [demoUserClick, setDemoUserClick] = useState(false);

	// Login in the demo user when the demo user button is clicked
	useEffect(() => {
		if (demoUserClick) {
			dispatch(loginUser({ email, password }));
			closeModal();
		}
	}, [dispatch, demoUserClick]);

	// Login in the user when the sign in button is clicked
	// if credential are valid
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		dispatch(loginUser({ email, password })).catch(async (res) => {

			if (res?.message) {
				setErrors([res.message]);
			} else if (res) {
				setErrors([res]);
			} else {
				setErrors([res.statusText]);
			}
		});
	};

	// Sign in as a demo user
	const demoUserHandleOnClick = (e) => {
		setPassword("Ilmangel123!");
		setEmail("mlkz@gmail.com");
		setDemoUserClick(true);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="login_form">
				<ul className="errors">
					{errors.map((error) => (
						<li key={error}>{error}</li>
					))}
				</ul>
				<label className="login_form__label form_first_element">
					Email
					<Input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter Email"
						required
					/>
				</label>
				<label className="login_form__label">
					Password
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter Password"
						required
					/>
				</label>
				<div className="button_group">
					<Button className="sign-in-btn" type="submit">
						Sign in
					</Button>
					<Button
						className="demo-user-btn"
						type="submit"
						onClick={demoUserHandleOnClick}
					>
						Demo User
					</Button>
					<FollowButtonLinks />
				</div>
			</form>
		</>
	);
};

export default LoginForm;
