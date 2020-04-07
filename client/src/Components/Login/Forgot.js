import React from 'react';

function Forgot(props) {
  return (
    <React.Fragment>
      <div className='bg-light m-2 p-2'>
        <div className='container'>
          <div id='forgot-form' onSubmit={props.validateForgotPasswordUser}>
            <form>
              <div className='card'>
                <div className='card-header'>
                  <button
                    className='btn btn-outline-secondary float-left'
                    onClick={props.hideForgot}
                  >
                    Back
                  </button>
                  <h2 className='text-secondary'>Forgot Password</h2>
                </div>
                <div className='card-content m-2 p-2'>
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email Address'
                      name='username'
                      onChange={props.handleComponentChange}
                    />
                  </div>
				  
                  <div className='form-group'>
                    <input
                      className='btn btn-success float-right'
                      type='submit'
                      value='Request OTP'					  
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

export default Forgot;
