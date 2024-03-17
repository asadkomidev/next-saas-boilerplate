import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, HelpCircle, Minus } from "lucide-react";

type Props = {
  text: string;
  footnote: string;
  negative: boolean;
};

export const PlanFeature = ({ text, footnote, negative }: Props) => {
  return (
    <li className="flex space-x-3">
      <div className="flex-shrink-0">
        {negative ? (
          <Minus className="h-5 w-5 text-gray-300 dark:text-gray-600" />
        ) : (
          <Check className="h-5 w-5 text-blue-500" />
        )}
      </div>
      {footnote ? (
        <div className="flex items-center space-x-1">
          <p
            className={cn("text-muted-foreground text-sm", {
              "text-gray-400 dark:text-gray-600": negative,
            })}>
            {text}
          </p>
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="cursor-default ml-1.5">
              <HelpCircle className="h-4 w-4 text-zinc-500" />
            </TooltipTrigger>
            <TooltipContent className="w-80 p-2">{footnote}</TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <p
          className={cn("text-muted-foreground text-sm", {
            "text-gray-400 dark:text-gray-600": negative,
          })}>
          {text}
        </p>
      )}
    </li>
  );
};
