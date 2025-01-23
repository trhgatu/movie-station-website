import { MainLayout } from '#shared/layouts';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/shared/layouts/main/theme-provider';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider attribute="class">
            <MainLayout>{children}</MainLayout>
        </ThemeProvider>
    )
}