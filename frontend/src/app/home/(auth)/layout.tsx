
import React from 'react';

export const metadata = {
  title: 'Auth Layout',
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
