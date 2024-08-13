import { useEffect } from 'react';

const GoogleSignIn = () => {
  useEffect(() => {
    const initGoogleSignIn = () => {
      const meta = document.createElement('meta');
      meta.name = 'google-signin-client_id';
      meta.content = '225222493753-7imvlsvpmpt6vpjkgm657fd0b66mc1j0.apps.googleusercontent.com';
      document.getElementsByTagName('head')[0].appendChild(meta);

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: '225222493753-7imvlsvpmpt6vpjkgm657fd0b66mc1j0.apps.googleusercontent.com'
          });
        });
      };

      return () => {
        document.head.removeChild(meta);
        document.body.removeChild(script);
      };
    };

    initGoogleSignIn();
  }, []);

  window.onSignIn = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  };

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  };

  return (
    <div>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default GoogleSignIn;