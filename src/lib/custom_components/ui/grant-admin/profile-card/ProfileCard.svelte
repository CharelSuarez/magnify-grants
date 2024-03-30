<script lang="ts">
	import { t } from '$lib/i18n/i18n';

	export let profile;

	const initials = `${profile.firstName.substring(0, 1)}.${profile.lastName.substring(0, 1)}`;
	const dateOfBirth = profile.dateOfBirth.toISOString().split('T')[0];

	export let classNames = '';
</script>

<container class="{classNames} flex flex-col items-center">
	<div
		class="border-none border-2 px-[80px] py-[30px] space-y-5 relative items-center shadow-none md:shadow-2xl rounded-md flex flex-col"
	>
		<div class="inline object-cover ring-gray-300 ring-2 bg-gray-200 p-[80px] rounded-full">
			<span class="text-2xl text-muted-foreground">{initials}</span>
		</div>

		<div class="text-2xl pt-7 text-gray-700">{profile.firstName} {profile.lastName}</div>
		<div class="text-md text-gray-700">
			{$t('admin.user.dob')}
			{dateOfBirth}
		</div>
		<div class="max-h-[200px] flex-grow"></div>
	</div>
</container>
