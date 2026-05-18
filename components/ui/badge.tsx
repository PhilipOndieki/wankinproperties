import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-wankin-blue text-white',
        available: 'bg-wankin-green text-white',
        'selling-fast': 'bg-wankin-red text-white',
        'sold-out': 'bg-gray-500 text-white',
        outline: 'border border-wankin-gray-200 text-wankin-gray-700 bg-white',
        secondary: 'bg-wankin-cream text-wankin-gray-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
