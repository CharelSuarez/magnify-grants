import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({
			include: ["stream", "crypto"],
		}),
	],
	optimizeDeps: {
		exclude: ["bits-ui", "lucide-svelte", "svelte-sonner"]
	},
});
