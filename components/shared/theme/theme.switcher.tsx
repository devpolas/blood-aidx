"use client";

import { Check, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  {
    name: "Light",
    value: "light",
    icon: Sun,
  },
  {
    name: "Dark",
    value: "dark",
    icon: Moon,
  },
  {
    name: "System",
    value: "system",
    icon: Laptop,
  },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size='icon'
            variant='outline'
            className='relative hover:bg-brand/10 border-brand/20 hover:text-brand transition-colors'
          >
            <Sun className='w-5 h-5 rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all' />
            <Moon className='absolute w-5 h-5 rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all' />
            <span className='sr-only'>Change theme</span>
          </Button>
        }
      />

      <DropdownMenuContent
        align='end'
        className='bg-brand-surface border-brand/10 w-44'
      >
        {themes.map((item) => {
          const Icon = item.icon;

          const active = theme === item.value;

          return (
            <DropdownMenuItem
              key={item.value}
              onClick={() => setTheme(item.value)}
              className='flex justify-between items-center hover:bg-brand/10 hover:text-brand cursor-pointer'
            >
              <div className='flex items-center gap-3'>
                <Icon className='w-4 h-4' />

                <span>{item.name}</span>
              </div>

              {active && <Check className='w-4 h-4 text-brand' />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
