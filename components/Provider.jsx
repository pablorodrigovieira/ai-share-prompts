"use client"
import React from 'react';
import { SessionProvider } from 'next-auth/react';

const Provider = (props) => {
  const { children, session } = props;
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;
