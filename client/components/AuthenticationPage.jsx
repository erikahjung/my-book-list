import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //it's recommended to use redirect over useNavigate in loader/actions in response to data
import { useForm } from "react-hook-form";
import { UserContext } from "./Context.jsx";

export const AuthenticationPage = ({ newUser }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const URL = newUser ? '/api/user' : '/api/user/login';

  useEffect(() => {
    setError(null);
  }, [newUser])

  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const onSubmit = async ({ username, password }) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password
        })
      })

      //fetch() will NOT throw an error if the server returns with a bad HTTP status
      if (!response.ok) {
        if (response.status === 401) {
          setError(newUser ? "Username already exists" : "Incorrect username or password.");
        }
        throw new Error(response.status);
      }

      const user = await response.json();
      console.log(user);
      //possibly refactor this - do we need the user._id?
      setUser({
        username,
        password
      })
      setError(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true }); //replace the current entry in the history stack
    }
  }, [user])

  return (
    <div id="login">
      <h1>Welcome to My Book List!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register("username", { required: 'Username is required.' })}
          placeholder="Username"
        />
        <span>{errors.username?.message}</span>
        <input 
          {...register("password", { 
            required: 'Password is required.', 
            minLength: { 
              value: newUser ? 8 : 0, 
              message: newUser ? "Minimum length is 8." : ""
            } 
          })}
          placeholder="Password"
        />
        <span>{errors.password?.message}</span>
        <span style={{color:"red"}}>{error}</span>
        <input className={newUser ? 'blue-background' : 'green-background'} type="Submit" defaultValue={newUser ? "Sign up" : "Sign in"}/>
      </form>
      <Link to={newUser ? '/login' : '/signup'}>{newUser ? 'Already have an account? Sign in.' : 'Create an account.'}</Link>
    </div>
  )
};