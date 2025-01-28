import { Footer } from './footer';
import { Header } from './Header/header';
import { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <div className='mt-[var(--header-height)]'>
                {children}
            </div>
            <Footer />
        </>
    );
}
