import React from 'react';

function Login(props) {
  return (
    <React.Fragment>
      <div className='bg-light m-2 p-2'>
        <div className='container'>
          <div id='login-form'>
            <form>
              <div className='card'>
                <div className='card-header'>
                  <h2 className='text-secondary'>Login</h2>
                </div>
                <div className='card-content m-2 p-2'>
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email Address'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
                      id='password'
                      name='password'
                    />
                    <div
                      onClick={props.showForgot}
                      className='forgot text-success btn'
                    >
                      <small>Forgot password?</small>
                    </div>
                  </div>
                  <div className='form-group'>
                    <input
                      className='btn btn-success'
                      type='submit'
                      value='Login'
                    />
                  </div>
                </div>
                <div className='card-footer'>
                  <a href='#0' className='btn btn-outline-primary m-1'>
                    Facebook
                  </a>
                  <a href='#0' className='btn btn-outline-danger m-1'>
                    Google
                  </a>
                </div>
              </div>
            </form>
            <div className='text-center'>
              Do not have an account yet?{' '}
              <div className='btn text-success' onClick={props.showRegister}>
                <strong>Register now!</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
