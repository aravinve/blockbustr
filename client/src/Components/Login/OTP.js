import React from 'react';

function OTP(props) {
  return (
    <React.Fragment>
      <div className='bg-light m-2 p-2'>
        <div className='container'>
          <div id='otp-form' onSubmit={props.validateOTP}>
            <form>
              <div className='card'>
                <div className='card-header'>
                  <button
                    className='btn btn-outline-secondary float-left'
                    onClick={props.hideOTP}
                  >
                    Back
                  </button>
                  <h2 className='text-secondary'>Reset Password OTP</h2>
                </div>
                <div className='card-content m-2 p-2'>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='OTP'
                      name='onetimepassword'
                      onChange={props.handleComponentChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='btn btn-success float-right'
                      type='submit'
                      value='Send'					  
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

export default OTP;
