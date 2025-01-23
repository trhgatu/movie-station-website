import { Footer } from './footer';
import { Header } from './header';
import { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
