import { fundData } from '@/lib/fund-data';
import { FundDetailsClient } from '@/components/fund/fund-details-client';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return Object.keys(fundData).map((slug) => ({
    slug,
  }));
}

export default function FundDetailPage({ params }: { params: { slug: string } }) {
  const fund = fundData[params.slug as keyof typeof fundData];

  if (!fund) {
    return (
        <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[calc(100vh-theme(height.14))]">
            <Card className="max-w-md mx-auto text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Fund Not Found</CardTitle>
                    <CardDescription>
                        The fund you are looking for does not exist in our database.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return <FundDetailsClient fund={fund} />;
}
