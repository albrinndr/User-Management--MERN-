import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {
  const { userInfo } = useSelector(state => state.auth);
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          {userInfo && (
            <>
              <div className='d-flex align-items-center'>
                {userInfo.imageUrl && <img src={userInfo.imageUrl} alt="userProfile" style={{ width: '150px', borderRadius: '50%',marginRight:'1rem' }} />}
                <h1 className='text-center  mb-4'>WELCOME {userInfo.name}</h1>
              </div>
            </>
          )}
          {!userInfo && (
            <>
              <h1 className='text-center mb-4'>MERN Authentication</h1>
              <p className='text-center mb-4'>
                This is a boilerplate for MERN authentication that stores a JWT in
                an HTTP-Only cookie. It also uses Redux Toolkit and the React
                Bootstrap library
              </p>

              <div className='d-flex'>
                <LinkContainer to='/login'>
                  <Button variant='primary' href='/login' className='me-3'>
                    Sign In
                  </Button>
                </LinkContainer>

                <LinkContainer to='/register'>
                  <Button variant='secondary' href='/register'>
                    Sign up
                  </Button>
                </LinkContainer>

              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;