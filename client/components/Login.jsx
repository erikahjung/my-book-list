import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //it's recommended to use redirect over useNavigate in loader/actions in response to data
import { useForm } from "react-hook-form";
import { UserContext } from "./Context.jsx";

export const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  const onSubmit = ({ username, password }) => {
    setUser({
      username,
      password
    })
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
              value: 8, 
              message: "Minimum length is 8."
            } 
          })}
          placeholder="Password"
        />
        <span>{errors.password?.message}</span>
        <input className='green-background' type="Submit" defaultValue="Sign in"/>
      </form>
    </div>
  )
};