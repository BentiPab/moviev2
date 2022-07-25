import { Paper, Button } from "@mui/material";
import { useLazyGetRequestTokenQuery } from "features/apiCalls/authEndpoints";
import { useState } from "react";
import { getLoginPath } from "utils/navbar";
import LoadingPage from "./LoadingPage";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  grid-area: main-content;
  align-items: flex-start;
  align-content: center;
  justify-content:center ;

  .MuiPaper-root {
    display: inherit;
    flex-direction: column;
  }
`;

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [fetchToken] = useLazyGetRequestTokenQuery();

    const handleGetToken = async () => {
        setLoading(true);
        await fetchToken();
        window.location.replace(getLoginPath());
    };

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <LoginContainer>
                    <Paper elevation={3}>
                        <Button>Login with TMDB</Button>
                        <Button onClick={() => handleGetToken()}>Register to TMDB</Button>
                    </Paper>
                </LoginContainer>
            )}
        </>
    );
};

export default LoginPage;
