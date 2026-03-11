
'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Bot, Briefcase } from 'lucide-react';
import { Toaster } from './ui/toaster';

const navItems = [
  { href: '/', label: 'الملف الشخصي', icon: Home },
  { href: '/resume', label: 'السيرة الذاتية', icon: FileText },
  { href: '/open-to-work', label: 'محسن الذكاء الاصطناعي', icon: Bot },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="print-hidden" side="right">
        <SidebarHeader className="border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors">
            <Logo className="w-8 h-8 text-sidebar-primary" />
            <span className="group-data-[collapsible=icon]:hidden">ملفي الدلالي</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, className: "print-hidden", side: "left" }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="bg-background print-p-0 print-shadow-none print-border-none">
        <header className="flex items-center justify-between p-4 border-b print-hidden">
          <SidebarTrigger />
          <h1 className="text-lg font-headline font-semibold">الملف الدلالي الاحترافي</h1>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
