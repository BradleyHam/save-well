import elements from '../dom-elements';
import {
  startApp, hideUser, clearFields,
} from './form-controller';

const clientId = '52903164096-g27rl2a8tbbsutfeidohcj1cdgbqbj0d.apps.googleusercontent.com';

function CheckSignedIn(signedIn) {
  if (signedIn) {
    elements.logout.style.display = 'block';
    elements.login.style.display = 'none';
  } else {
    elements.login.style.display = 'block';
    elements.logout.style.display = 'none';
    hideUser();
    elements.tableBody.innerHTML = '';
    elements.total.innerText = '';
  }
}

window.gapi.load('client:auth2', () => {
  window.gapi.client.init({
    clientId,
    scope: 'email',
  }).then(() => {
    const instance = window.gapi.auth2.getAuthInstance();
    CheckSignedIn(instance.isSignedIn.get());
    elements.login.addEventListener('click', () => {
      instance.signIn()
        .then(() => {
          startApp(instance);
        })
        .catch((err) => { console.log(err); });
    });

    elements.logout.addEventListener('click', () => {
      instance.signOut();
    });

    instance.isSignedIn.listen((signedIn) => {
      clearFields();
      CheckSignedIn(signedIn);
    });

    startApp(instance);
  });
});
