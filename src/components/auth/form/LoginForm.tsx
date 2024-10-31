import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import {
  FlexDiv,
  StyledFormGroup,
  StyledLabel,
  StyledAsterisk,
  StyledButton,
  StyledLoginFormHeading,
  StyledLoginForm,
} from "../StyledAuth";
import { CircularProgress } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginUser, emailExists } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCurrentStock } from "@/store/stock";

interface LoginFormInput {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [secondNameError, setSecondNameError] = useState("");
  const [showError, setShowError] = useState("");
  const [showEmailError, setShowEmailError] = useState("");
  const [showFirstNameError, setShowFirstNameError] = useState("");
  const [showSecondNameError, setShowSecondNameError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { isSigningIn } = useSelector((state) => state.auth);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const onSubmit: SubmitHandler<LoginFormInput> = () => {
    if(!email){
      setEmailError("Email is required");
      setShowEmailError("email")
      return;
    }
    if(!firstName){
      setFirstNameError("First Name is required");
      setShowFirstNameError("first")
      return;
    }
    if(!lastName) {
      setSecondNameError("Last Name is required");
      setShowSecondNameError("last")
      return;
    }
    //removed setError('')
    const data = {
        'email': email,
        'firstName': firstName,
        'lastName': lastName
    }
    dispatch(emailExists(data, router));
    dispatch(setCurrentStock({}));
    // dispatch(LoginUser({ email }));
  };

  return (
    <StyledLoginForm>
      <StyledLoginFormHeading>Sign In</StyledLoginFormHeading>
      <FlexDiv marginTop="50px">
       
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        
         <FlexDiv style={{marginBottom: '20px'}}>
          
         <StyledFormGroup>
            <StyledLabel htmlFor="email" style={{ marginBottom: "20px" }}>
              First Name
            </StyledLabel>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  type="firstName"
                  onInput={handleFirstNameChange}
                  fullWidth
                  variant="filled"
                  // {...field}

                  size="small"
                  // error={!!errors.email}
                  // helperText={errors.email ? errors.email?.message : ""}
                  value={firstName}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                />
              )}
            />
            {firstNameError && showFirstNameError==='first' ? <div style={{color: 'red', fontSize: '18px'}}>{firstNameError}</div>: <></>}
          </StyledFormGroup>
          <StyledFormGroup style={{ marginLeft: "30px" }}>
            <StyledLabel htmlFor="lastName">
              Last Name
            </StyledLabel>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  type="lastName"
                  onInput={handleLastNameChange}
                  fullWidth
                  variant="filled"
                  // {...field}

                  size="small"
                  // error={!!errors.email}
                  // helperText={errors.email ? errors.email?.message : ""}
                  value={lastName}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                />
              )}
            />
                        {secondNameError && showSecondNameError==='last' ? <div style={{color: 'red', fontSize: '18px'}}>{secondNameError}</div>: <></>}

          </StyledFormGroup>
         </FlexDiv>
          <StyledFormGroup>
            <StyledLabel htmlFor="email" style={{ marginBottom: "20px" }}>
              Email
            </StyledLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  type="email"
                  onInput={handleEmailChange}
                  fullWidth
                  variant="filled"
                  // {...field}

                  size="small"
                  // error={!!errors.email}
                  // helperText={errors.email ? errors.email?.message : ""}
                  value={email}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                />
              )}
            />
                        {emailError && showEmailError==='email' ? <div style={{color: 'red', fontSize: '18px'}}>{emailError}</div>: <></>}

          </StyledFormGroup>
          <FlexDiv justifyContent="end">
            <StyledButton width={100} type="submit" onClick={onSubmit}>
              {isSigningIn ? (
                <CircularProgress color="secondary" />
              ) : (
                <>Sign In</>
              )}
            </StyledButton>
          </FlexDiv>
        </form>
      </FlexDiv>
    </StyledLoginForm>
  );
};

export default LoginForm;
