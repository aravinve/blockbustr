import React from 'react';

function Reset(props) {
  return (
    <React.Fragment>
      <div className='bg-light m-2 p-2'>
        <div className='container'>
          <div>
            <form id='reset-form'>
              <div className='card'>
                <div className='card-header'>
                  <button
                    className='btn btn-outline-secondary float-left'
                    onClick={props.hideReset}
                  >
                    Back
                  </button>
                  <h2 className='text-secondary'>Reset Password</h2>
                </div>
                <div className='card-content m-2 p-2'>
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
                      value='Reset'
					  onClick={props.performResetPassword}
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

export default Reset;
