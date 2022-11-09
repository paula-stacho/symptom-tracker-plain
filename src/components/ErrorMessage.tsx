import React, { ReactNode } from 'react';

export default function ErrorMessage({ children }: { children: ReactNode }) {
	return (<div color="red">{children}</div>);
}