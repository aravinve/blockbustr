import React from 'react';

function Register(props) {
  return (
    <React.Fragment>
      <div className='bg-light m-2 p-2'>
        <div className='container'>
          <div>
            <form id='register-form' onSubmit={props.registerUser}>
              <div className='card'>
                <div className='card-header'>
                  <button
                    className='btn btn-outline-secondary float-left'
                    onClick={props.hideRegister}
                  >
                    Back
                  </button>
                  <h2 className='text-secondary'>Register</h2>
                </div>
                <div className='card-content m-2 p-2'>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='First Name'
                      name='firstName'
                      onChange={props.handleComponentChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Last Name'
                      name='lastName'
                      onChange={props.handleComponentChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email Address'
                      name='email'
                      onChange={props.handleComponentChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
                      name='password'
                      onChange={props.handleComponentChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Confirm Password'
                      name='confirmPassword'
                      onChange={props.validatePassword}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='btn btn-success'
                      type='submit'
                      value='Signup'
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
