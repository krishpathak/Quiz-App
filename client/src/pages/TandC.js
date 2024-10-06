import React from 'react';
import StarBackground from '../components/StarBackground';

const TandC = () => {
  return (
    <>
      <StarBackground />
      <div className='flex flex-col items-center mb-4 justify-center bg-white backdrop-blur-lg bg-opacity-5 mt-4 p-16 mx-auto md:mx-52 rounded-lg border border-white'>
        <div className='text-blue-200 text-center '>
          <span className='font-extrabold text-3xl mb-5'>Welcome</span>
          <br />
          <span className='font-bold text-2xl'>to Quizzy</span>
        </div>
        <p className='text-blue-200 w-6/6 md:w-11/12 my-4'>
          1. Acceptance of Terms<br />
          By accessing and using Quizzy , you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, you must not use the App.<br /><br />

          2. Eligibility<br />
          You must be at least 4 years to use this App. By using the App, you represent that you meet this requirement.<br /><br />

          3. User Accounts<br />
          Account Creation: You are required to create an account to access certain features. You agree to provide accurate and complete information during registration.<br />
          Security: You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.<br /><br />

          4. Authentication<br />
          The App uses OTP and OAuth for secure authentication. You must ensure that your login credentials are kept secure and confidential.<br /><br />

          5. User Content<br />
          Users can create, edit, and share quizzes. You retain ownership of your content but grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content within the App.<br />
          You are responsible for the content you create and must ensure it complies with all applicable laws and regulations.<br /><br />

          6. Prohibited Activities<br />
          You agree not to engage in any of the following prohibited activities:<br />
          - Creating content that is offensive, harmful, or violates intellectual property rights.<br />
          - Attempting to gain unauthorized access to any part of the App.<br />
          - Using automated means to access the App without our permission.<br /><br />

          7. Disclaimers<br />
          The App is provided on an "as is" and "as available" basis. We do not guarantee the accuracy, reliability, or availability of the App.<br />
          We are not responsible for any third-party content or links accessed through the App.<br /><br />

          8. Limitation of Liability<br />
          To the fullest extent permitted by law, Quizzy shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.<br /><br />

          9. Modifications<br />
          We reserve the right to modify these Terms and Conditions at any time. We will notify you of any significant changes, and your continued use of the App constitutes acceptance of the updated terms.<br /><br />

          10. Governing Law<br />
          These Terms and Conditions shall be governed by and construed in accordance with the laws of India.<br /><br />

          11. Contact Information<br />
          For any questions about these Terms and Conditions, please contact us at ee23002049@gmail.com.
        </p>
      </div>
    </>
  );
};

export default TandC;
