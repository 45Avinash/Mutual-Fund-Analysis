"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { ASSET_CLASSES } from "@/lib/types";
import type { InvestmentProfileInput } from "@/ai/flows/generate-investment-portfolios";

const formSchema = z.object({
  investmentAmount: z.coerce
    .number({ required_error: "Please enter an amount." })
    .positive({ message: "Amount must be positive." }),
  expectedReturn: z.coerce
    .number({ required_error: "Please enter a return." })
    .min(0, "Return cannot be negative.")
    .max(100, "Return cannot exceed 100%."),
  riskTolerance: z.enum(["low", "medium", "high"], {
    required_error: "You need to select a risk tolerance level.",
  }),
  investmentPeriod: z.enum(
    ["lessThanOneYear", "oneToFiveYears", "moreThanFiveYears"],
    {
      required_error: "Please select an investment period.",
    }
  ),
  assetAllocationPreferences: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one asset class.",
    }),
});

type InvestmentProfileFormProps = {
  onSubmit: (data: InvestmentProfileInput) => void;
  isLoading: boolean;
};

export function InvestmentProfileForm({
  onSubmit,
  isLoading,
}: InvestmentProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentAmount: 10000,
      expectedReturn: 12,
      riskTolerance: "medium",
      investmentPeriod: "oneToFiveYears",
      assetAllocationPreferences: ["Equity", "Debt"],
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit({
      ...values,
      assetAllocationPreferences: values.assetAllocationPreferences.join(", "),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Your Investment Profile
        </CardTitle>
        <CardDescription>
          Tell us about your investment goals to get personalized portfolio
          suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="investmentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Amount (per month)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 10000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedReturn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Annual Return (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riskTolerance"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Risk Appetite</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" />
                        </FormControl>
                        <FormLabel className="font-normal">Low</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">Medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="font-normal">High</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investmentPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Period</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an investment duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lessThanOneYear">
                        Less than 1 year
                      </SelectItem>
                      <SelectItem value="oneToFiveYears">1 - 5 years</SelectItem>
                      <SelectItem value="moreThanFiveYears">
                        More than 5 years
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assetAllocationPreferences"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Asset Allocation Preferences</FormLabel>
                    <FormDescription>
                      Select the asset classes you're interested in.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {ASSET_CLASSES.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="assetAllocationPreferences"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoading
                ? "Generating Portfolios..."
                : "Generate Portfolios"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
