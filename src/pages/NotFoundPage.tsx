
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFoundContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
`

const StyledLink = styled(Link)`
  color: #1976d2;
  text-decoration: underline;
  font-style: italic;

  &:hover {
    color: #3580cc;
  }
`

const NotFoundPage = () => {
    const [timeToRedirect, setTimeToRedirect] = useState<number>(10)
    const navigate = useNavigate()
    useEffect(() => {
        const redirectTimer = setInterval(() => {
            setTimeToRedirect((time) => time - 1)
        }, 1000)

        return () => clearInterval(redirectTimer)
    }, [])

    useEffect(() => {
        if (timeToRedirect === 0) {
            navigate('/')
        }
    }, [navigate, timeToRedirect])

    return (
        <PageNotFoundContainer>
            <h1>Oops 404 Page Not Found</h1>
            <h3>Seems the page you are looking for doesn't exists</h3>
            <div>Click <StyledLink to='/'>here</StyledLink> to get redirected</div>
            <div>Or wait {timeToRedirect} seconds</div>
        </PageNotFoundContainer>);
}

export default NotFoundPage;