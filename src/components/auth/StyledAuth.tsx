import { styled } from "@mui/material";
import { fontWeight } from "@mui/system";

export const AuthWrapper = styled('div')(() => ({
    width: '100%',
    height: '100vh'
}));

export const StyledHeader = styled('div')(() => ({
    width: '100%',
    paddingBottom: '20px',
    borderBottom: '1.1px solid #dcdcde'
}));

export const FlexImage = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
}));

export const FlexDiv = styled('div')(({ marginBottom = "0px", justifyContent = "center", marginTop = "0px" }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: justifyContent,
    marginBottom: marginBottom,
    marginTop: marginTop
}))

export const StyledLoginForm = styled("div")(() => ({
    marginTop: "80px",
    width: "450px",
    margin: "80px auto"
}));

export const StyledLoginFormHeading = styled("h1")(() => ({
    display: "flex",
    justifyContent: "center",
    fontSize: "35px !important",
    fontWeight: 200,
    fontFamily: "Pathway Gothic One, sans-serif",
}));

export const StyledFormGroup = styled("div")`
  width: 100%;
  margin: 0px auto 20px auto;
  text-align: left;
`;

export const StyledLabel = styled("label")`
  font-weight: 700 !important;
  font-size: 18px;
  line-height: 18.4px;
  color: #2d2d2d;
  padding-bottom: 30px !important;
`;
export const StyledHeading = styled("h1")`
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;
  color: #2d2d2d;
  margin-top: 10px;
  padding-top: 30px;
`; 

export const StyledSubHeading = styled("p")(({ theme, color = "#6065D8" }) => ({
    fontWeight: 300,
    fontSize: "12px",
    marginBottom: "25px",
    lineHeight: "18px",
    color: "#2D2D2D",
}));

export const StyledAsterisk = styled("span")`
  font-size: 12px;
  color: red;
`;

export const StyledButton = styled("button")(
    ({ theme, color = "#9cb4db", width = 350, height = 45 }) => ({
        backgroundColor: color,
        width: width,
        height: height,
        borderRadius: "30px",
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "23.38px",
        color: "#FFFFFF",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
    })
);

export const StyledCancelButton = styled("button")(
    ({ theme, color = "white", width = "100%", height = 45 }) => ({
        backgroundColor: color,
        width: width,
        height: height,
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "24px",
        color: "red",
        cursor: "pointer",
        marginTop: "10px",
        border: "1px solid red",
    })
);

export const StyledSubmitBtn = styled("button")(
    ({ theme, color = "#64DCFF", width = 400 }) => ({
        backgroundColor: color,
        width: width,
        height: 50,
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#FFFFFF",
        border: "none",
        cursor: "pointer",
        marginTop: "50px",
        background: "#64DCFF",
        alignSelf: "center",
    })
);

export const StyledFormContainer = styled("div")`
  background: #ffffff;
  box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.15);
  border-radius: 18px;
  margin: 10px auto;
  width: 500px;
  height: 400px;
`;

