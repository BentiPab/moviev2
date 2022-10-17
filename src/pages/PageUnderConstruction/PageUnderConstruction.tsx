import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { redirectLinks } from './constants';

const PageUnderConstructionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: #1976d2;
  text-decoration: underline;
  font-style: italic;
  text-transform: capitalize;

  &:hover {
    color: #3580cc;
  }
`;

const PageUnderConstruction = () => {
    const [timeToRedirect, setTimeToRedirect] = useState<number>(10);
    const navigate = useNavigate();
    useEffect(() => {
        const redirectTimer = setInterval(() => {
            setTimeToRedirect((time) => time - 1);
        }, 1000);

        return () => clearInterval(redirectTimer);
    }, []);

    useEffect(() => {
        if (timeToRedirect === 0) {
            navigate("/");
        }
    }, [navigate, timeToRedirect]);

    return (
        <PageUnderConstructionContainer>
            <h1>Oops Page under construction</h1>
            <h3>This page is still under construction</h3>
            <h3>Sorry for the inconvinient</h3>
            <div>Here are some other options you might like:</div>
            <div>
                <ul>
                    {redirectLinks.map(link => <li><StyledLink to={`/${link.value}`}>{link.label}</StyledLink></li>)}
                </ul>
            </div>
            <div>Or wait {timeToRedirect} seconds to get redirected</div>
        </PageUnderConstructionContainer>
    );
};

export default PageUnderConstruction;
