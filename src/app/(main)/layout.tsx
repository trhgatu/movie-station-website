import { MainLayout } from '#shared/layouts';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/shared/contexts/theme-provider';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider attribute="class">
            <MainLayout>{children}</MainLayout>
        </ThemeProvider>
    )
}