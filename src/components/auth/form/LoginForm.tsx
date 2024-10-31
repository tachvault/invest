// these are straight from gemini (no paraphrasing done)

// Import necessary libraries
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";

// Import styled components from StyledAuth folder
import {
  FlexDiv,
  StyledFormGroup,
  StyledLabel,
  StyledAsterisk,
  StyledButton,
  StyledLoginFormHeading,
  StyledLoginForm,
} from "../StyledAuth";

// Import components from Materials UI
import { CircularProgress } from "@mui/material";

// Import Yup validation library and resolver
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Import actions and selectors from the auth slice of the Redux store
import { LoginUser, emailExists } from "@/store/authSlice";

// Import hook from React
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";

// Import action from stock slce (might need adjustment based on your store structure)
import { setCurrentStock } from "@/store/stock";

// Define the interface for from input data
interface LoginFormInput {
  email: string;
}

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const LoginForm = () => {
  // State variables for individual form fields and errors
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [secondNameError, setSecondNameError] = useState("");
  const [showEmailError, setShowEmailError] = useState("");
  const [showFirstNameError, setShowFirstNameError] = useState(false);
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
    }else {
      setEmailError("");
      setShowEmailError("")
    }
    if(!firstName){
      setFirstNameError("First Name is required");
      setShowFirstNameError(true)
    }else {
      setFirstNameError("");
      setShowFirstNameError(false)
    }
    if(!lastName) {
      setSecondNameError("Last Name is required");
      setShowSecondNameError("last")
      return;
    }
    const data = {
        'email': email,
        'firstName': firstName,
        'lastName': lastName
    }
    dispatch(emailExists(data, router));
    dispatch(setCurrentStock({}));
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

                  size="small"
                  value={firstName}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                />
              )}
            />
            {showFirstNameError ? <div style={{color: 'red', fontSize: '18px'}}>{firstNameError}</div>: <></>}
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

                  size="small"
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
