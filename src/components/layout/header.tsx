"use client";

import React, { useRef } from 'react';
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { InvestmentPortfoliosOutput } from '@/ai/flows/generate-investment-portfolios';

type HeaderProps = {
  onImport: (portfolios: InvestmentPortfoliosOutput) => void;
};

export function Header({ onImport }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const parsedJson = JSON.parse(content);
            // Add validation here if needed
            onImport(parsedJson);
          }
        } catch (error) {
          toast({
            title: 'Import Error',
            description: 'Failed to parse JSON file. Please check the file format.',
            variant: 'destructive',
          });
        }
      };
      reader.onerror = () => {
        toast({
            title: 'Import Error',
            description: 'Failed to read the file.',
            variant: 'destructive',
          });
      }
      reader.readAsText(file);
    }
    // Reset file input to allow re-uploading the same file
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className={cn("font-bold font-headline sm:inline-block")}>
              FundForecaster
            </span>
          </a>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".json"
              onChange={handleFileChange}
            />
            <Button variant="outline" size="sm" onClick={handleImportClick}>
              <Upload className="mr-2" />
              Import Portfolios
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
