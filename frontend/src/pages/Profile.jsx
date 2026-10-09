import { useState } from 'react';

import {
  useUser
} from '@clerk/react';


function Profile() {

  const {
    user,
    isLoaded
  } = useUser();


  const [
    firstName,
    setFirstName
  ] = useState('');

  const [
    lastName,
    setLastName
  ] = useState('');

  const [
    username,
    setUsername
  ] = useState('');

  const [
    message,
    setMessage
  ] = useState('');


  if (!isLoaded) {
    return (
      <div className="loading-screen">
        Profil yuklanmoqda...
      </div>
    );
  }


  const saveProfile =
    async (event) => {

      event.preventDefault();

      setMessage('');


      try {

        await user.update({
          firstName:
            firstName ||
            user.firstName ||
            undefined,

          lastName:
            lastName ||
            user.lastName ||
            undefined,

          username:
            username ||
            user.username ||
            undefined
        });


        await user.reload();

        setMessage(
          'Profil saqlandi ✓'
        );

      } catch (error) {

        setMessage(
          error?.errors?.[0]
            ?.longMessage ||
          'Profilni saqlashda xatolik yuz berdi.'
        );

      }
    };


  return (
    <div className="page profile-page">

      <section className="profile-card">

        <div className="profile-top">

          <img
            className="avatar-large"
            src={user.imageUrl}
            alt="Profil rasmi"
          />

          <div>

            <p className="eyebrow">
              MY PROFILE
            </p>

            <h1>
              {
                user.firstName ||
                user.username ||
                'Player'
              }
            </h1>

            <p>
              {
                user.primaryEmailAddress
                  ?.emailAddress || ''
              }
            </p>

          </div>

        </div>


        <form
          onSubmit={saveProfile}
          className="profile-form"
        >

          <label>
            Ism

            <input
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
              placeholder={
                user.firstName ||
                'Ismingiz'
              }
            />
          </label>


          <label>
            Familiya

            <input
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
              placeholder={
                user.lastName ||
                'Familiyangiz'
              }
            />
          </label>


          <label>
            Username

            <input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder={
                user.username ||
                'Username'
              }
            />
          </label>


          <button
            className="primary-btn"
            type="submit"
          >
            Profilni saqlash
          </button>


          {message && (
            <p className="form-message">
              {message}
            </p>
          )}

        </form>

      </section>

    </div>
  );
}


export default Profile;