import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Allows user to signout 
const UserSignOut = ({context}) => {
  useEffect(() =>  context.actions.signOut());
  return (
    <Redirect to="/" />
  );
}
export default UserSignOut;