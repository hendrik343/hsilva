import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const SAAS_URL = "https://sgas-pro.vercel.app";

export function CallToAction() {
	return (
		<div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 rounded-4xl border bg-card px-4 py-8 shadow-sm md:py-10 dark:bg-card/50">
			<div className="space-y-2">
				<h2 className="text-center font-semibold text-lg tracking-tight md:text-2xl">
					Abra a sala de evidências antes da auditoria começar.
				</h2>
				<p className="text-balance text-center text-muted-foreground text-sm md:text-base">
					Entre no SGAS Pro para organizar documentos, riscos, ESAP, reclamações, KPIs e evidências para financiadores.
				</p>
			</div>
			<div className="flex items-center justify-center gap-2">
				<Button asChild className="shadow" variant="secondary">
					<a href="mailto:contact@hsilva.com?subject=SGAS%20Pro%20-%20Pedido%20de%20Demonstra%C3%A7%C3%A3o">
						Falar com consultor
					</a>
				</Button>
				<Button asChild className="shadow">
					<a href={`${SAAS_URL}/?page=audit-room`}>
						Abrir Audit Room{" "}
						<ArrowRightIcon data-icon="inline-end" />
					</a>
				</Button>
			</div>
		</div>
	);
}
