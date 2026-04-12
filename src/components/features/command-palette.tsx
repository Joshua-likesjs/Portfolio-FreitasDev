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
  Briefcase,
  Trophy,
  Wrench,
  Activity,
  GitBranch,
  Clock,
  Mail,
  HelpCircle,
  Sun,
  Moon,
  ArrowUp,
  Search,
  Quote,
  BarChart3,
} from 'lucide-react';

interface CommandAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

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
    { id: 'home', label: 'Home', icon: <Home className="size-4" />, action: () => navigateToSection('home') },
    { id: 'about', label: 'About', icon: <User className="size-4" />, action: () => navigateToSection('about') },
    { id: 'skills', label: 'Skills', icon: <BarChart3 className="size-4" />, action: () => navigateToSection('skills-radar') },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="size-4" />, shortcut: 'P', action: () => navigateToSection('projects') },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="size-4" />, action: () => navigateToSection('experience') },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="size-4" />, action: () => navigateToSection('achievements') },
    { id: 'tools', label: 'Tools', icon: <Wrench className="size-4" />, action: () => navigateToSection('tools') },
    { id: 'activity', label: 'Activity', icon: <Activity className="size-4" />, action: () => navigateToSection('contribution-graph') },
    { id: 'journey', label: 'Journey', icon: <GitBranch className="size-4" />, action: () => navigateToSection('timeline-journey') },
    { id: 'now', label: 'Now', icon: <Clock className="size-4" />, action: () => navigateToSection('now') },
    { id: 'quotes', label: 'Quotes', icon: <Quote className="size-4" />, action: () => navigateToSection('quotes') },
    { id: 'newsletter', label: 'Newsletter', icon: <Mail className="size-4" />, action: () => navigateToSection('newsletter') },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="size-4" />, action: () => navigateToSection('faq') },
    { id: 'contact', label: 'Contact', icon: <Mail className="size-4" />, shortcut: 'C', action: () => navigateToSection('contact') },
  ];

  const actionItems: CommandAction[] = [
    {
      id: 'theme',
      label: 'Toggle Theme',
      icon: <Sun className="size-4 dark:hidden" />,
      action: toggleTheme,
      shortcut: 'T',
    },
    {
      id: 'scroll-top',
      label: 'Scroll to Top',
      icon: <ArrowUp className="size-4" />,
      action: scrollToTop,
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections, actions..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-4">
            <Search className="size-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No results found.</p>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Navigation">
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
        <CommandGroup heading="Actions">
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
          NAVIGATE WITH ↑↓ ENTER
        </span>
        <span className="text-[10px] font-['Fira_Code'] text-muted-foreground tracking-wider">
          <kbd className="inline-flex items-center gap-0.5 rounded border bg-muted px-1 font-mono text-[10px]">
            ESC
          </kbd>{' '}
          CLOSE
        </span>
      </div>
    </CommandDialog>
  );
}
