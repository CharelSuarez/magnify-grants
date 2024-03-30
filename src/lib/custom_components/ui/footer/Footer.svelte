<script lang="ts">
	import { t } from '$lib/i18n/i18n';
</script>

<footer
	class="flex flex-col justify-center items-center mt-[5rem] bg-teal-800 h-[150px] text-white cursor-default font-satoshi"
>
	<div class="flex text-xl">
		{$t('footer.association')}
	</div>
	<div class="flex text-teal-950 font-bold italic text-lg">
		{$t('footer.developedBy')}
	</div>
</footer>
