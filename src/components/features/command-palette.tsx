'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Home,
  User,
  FolderKanban,
  Wrench,
  Mail,
  HelpCircle,
  Sun,
  ArrowUp,
  Search,
  Quote,
  BarChart3,
 LucideTrendingUpDown,
 Languages,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';

interface CommandAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { t, toggleLocale } = useLanguage();

  const navigateToSection = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const toggleTheme = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      const next = !isCurrentlyDark;
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');

      const applyTheme = () => {
        document.documentElement.classList.toggle('dark', next);
      };

      const notifyReact = () => {
        window.dispatchEvent(new Event('storage'));
      };

      const doc = document as unknown as {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> };
      };
      if (doc.startViewTransition) {
        doc.startViewTransition(applyTheme);
        setTimeout(notifyReact, 100);
      } else {
        document.documentElement.classList.add('theme-transitioning');
        applyTheme();
        setTimeout(notifyReact, 100);
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transitioning');
        }, 400);
      }
    }, 100);
  }, []);

  const scrollToTop = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigationItems: CommandAction[] = [
    { id: 'home',     label: t.palette.navItems[0].label, icon: <Home                 className="size-4" />, action: () => navigateToSection('home') },
    { id: 'about',    label: t.palette.navItems[1].label, icon: <User                 className="size-4" />, action: () => navigateToSection('about') },
    { id: 'skills',   label: t.palette.navItems[2].label, icon: <BarChart3            className="size-4" />, action: () => navigateToSection('skills') },
    { id: 'process',  label: t.palette.navItems[3].label, icon: <LucideTrendingUpDown className="size-4" />, action: () => navigateToSection('process') },
    { id: 'projects', label: t.palette.navItems[4].label, icon: <FolderKanban         className="size-4" />, action: () => navigateToSection('projects'), shortcut: 'P'},
    { id: 'tools',    label: t.palette.navItems[5].label, icon: <Wrench               className="size-4" />, action: () => navigateToSection('tools') },
    { id: 'quotes',   label: t.palette.navItems[6].label, icon: <Quote                className="size-4" />, action: () => navigateToSection('quotes') },
    { id: 'faq',      label: t.palette.navItems[7].label, icon: <HelpCircle           className="size-4" />, action: () => navigateToSection('faq') },
    { id: 'contact',  label: t.palette.navItems[8].label, icon: <Mail                 className="size-4" />, action: () => navigateToSection('contact'), shortcut: 'C'},
  ];

  const actionItems: CommandAction[] = [
    {
      id: 'theme',
      label: t.palette.toggleTheme,
      icon: <Sun className="size-4 dark:hidden" />,
      action: toggleTheme,
      shortcut: 'T',
    },
    {
      id: 'language',
      label: t.palette.toggleLanguage,
      icon: <Languages className="size-4" />,
      action: () => {
        setOpen(false);
        setTimeout(toggleLocale, 100);
      },
      shortcut: 'L',
    },
    {
      id: 'scroll-top',
      label: t.palette.scrollToTop,
      icon: <ArrowUp className="size-4" />,
      action: scrollToTop,
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t.palette.placeholder} />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-4">
            <Search className="size-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">{t.palette.empty}</p>
          </div>
        </CommandEmpty>
        <CommandGroup heading={t.palette.navigationHeading}>
          {navigationItems.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={item.action}
              className="gap-3 cursor-pointer data-[selected=true]:bg-[#8A00C4]/10 data-[selected=true]:text-[#8A00C4]"
            >
              <span className="text-muted-foreground data-[selected=true]:text-[#8A00C4]">
                {item.icon}
              </span>
              <span className="font-['Fira_Code'] text-sm">{item.label}</span>
              {item.shortcut && (
                <CommandShortcut className="font-['Fira_Code'] text-[10px] tracking-wider">
                  {item.shortcut}
                </CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t.palette.actionsHeading}>
          {actionItems.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={item.action}
              className="gap-3 cursor-pointer data-[selected=true]:bg-[#8A00C4]/10 data-[selected=true]:text-[#8A00C4]"
            >
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="font-['Fira_Code'] text-sm">{item.label}</span>
              {item.shortcut && (
                <CommandShortcut className="font-['Fira_Code'] text-[10px] tracking-wider">
                  {item.shortcut}
                </CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="border-t px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] font-['Fira_Code'] text-muted-foreground tracking-wider">
          {t.palette.footerNavigate}
        </span>
        <span className="text-[10px] font-['Fira_Code'] text-muted-foreground tracking-wider">
          <kbd className="inline-flex items-center gap-0.5 rounded border bg-muted px-1 font-mono text-[10px]">
            ESC
          </kbd>{' '}
          {t.palette.footerClose}
        </span>
      </div>
    </CommandDialog>
  );
}
