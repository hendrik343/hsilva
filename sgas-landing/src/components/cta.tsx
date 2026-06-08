import { Button } from "@/components/ui/button";
import { CreditCardIcon, ArrowRightIcon } from "lucide-react";

export function CallToAction() {
	return (
		<div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 rounded-4xl border bg-card px-4 py-8 shadow-sm md:py-10 dark:bg-card/50">
			<div className="space-y-2">
				<h2 className="text-center font-semibold text-lg tracking-tight md:text-2xl">
					Let your plans shape the future.
				</h2>
				<p className="text-balance text-center text-muted-foreground text-sm md:text-base">
					Start your free trial today. No credit card{" "}
					<CreditCardIcon className="inline-block size-4" />{" "}
					required.
				</p>
			</div>
			<div className="flex items-center justify-center gap-2">
				<Button className="shadow" variant="secondary">
					Contact Sales
				</Button>
				<Button className="shadow">
					Get Started{" "}
					<ArrowRightIcon data-icon="inline-end" />
				</Button>
			</div>
		</div>
	);
}
