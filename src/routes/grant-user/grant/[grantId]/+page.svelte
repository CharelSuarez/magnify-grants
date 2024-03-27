<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from "$lib/components/ui/card";
	import image from '$lib/assets/branding/images/rbc-grant-template.jpg';
    import icon from '$lib/assets/branding/images/rbc-icon-template.png';
	import Badge from "$lib/components/ui/badge/badge.svelte";
	import { Head } from "$lib/components/ui/table";
	import Button from "$lib/components/ui/button/button.svelte";
	import { toShort } from "$lib/utils/url";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import Paperclip from "lucide-svelte/icons/paperclip";
    import File from "lucide-svelte/icons/file-text";
    import CircleAlert from "lucide-svelte/icons/alert-circle";
	import GrantForm from './GrantForm.svelte';
  import logo from '$lib/assets/branding/images/magnify_logo.png';
  import { t } from '$lib/i18n/i18n';
  import LocaleSelection from '$lib/custom_components/ui/locale-selection/LocaleSelection.svelte';
  import Taskbar from '$lib/custom_components/ui/taskbar/Taskbar.svelte';

    export let data: PageData;
</script>


<div class="min-h-screen flex-1 flex-col p-20 md:flex items-center">

	<div class="flex justify-start h-full items-center space-y-2 gap-10 mt-8 mb-8">
        <Card.Root class="basis-1/4">
            <Card.Content class={"h-60 w-96 p-0 rounded-inherit"}>
                <img
					class={"h-full w-full object-cover transition-all hover:scale-105 rounded-inherit"}
					src={image}
					alt={$t('grant.coverImageAlt')}
                /> <!-- TODO Grant image alt text! -->
            </Card.Content>
        </Card.Root>
		<div class="basis-3/4">
			<h2 class="text-4xl font-bold tracking-tight">{data.grant.title}</h2>
            <Badge class="mb-4">GRANT</Badge>
			<p class="text-muted-foreground">{data.grant.description} 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Similique eveniet aut, maiores velit facilis reprehenderit 
                fugiat sint quos molestiae ipsa perferendis repudiandae nam 
                necessitatibus illum ad veritatis commodi modi consectetur magnam? 
                Dolorem laboriosam tempore quis, veritatis numquam sit, et sequi 
                sunt quidem consequatur adipisci quia obcaecati nobis commodi esse dicta.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
                Similique eveniet aut, maiores velit facilis reprehenderit 
                fugiat sint quos molestiae ipsa perferendis repudiandae nam 
                necessitatibus illum ad veritatis commodi modi consectetur magnam? 
                Dolorem laboriosam tempore quis, veritatis numquam sit, et sequi 
                sunt quidem consequatur adipisci quia obcaecati nobis commodi esse dicta.
            </p>
		</div>
        <Card.Root class="basis-1/4 h-full bg-secondary">
            <Card.Header class="h-full w-full">
                <div class="flex gap-4">
                    <img
                        class={"h-10 object-cover transition-all hover:scale-105 rounded-inherit"}
                        src={icon}
                        alt={$t('grant.coverImageAlt')}
                    /> <!-- TODO Grant image alt text! -->
                    <Card.Title class="text-3xl">{data.grant.organization.name}</Card.Title>
                </div>
            </Card.Header>
            <Card.Content class="h-full w-full">
                <Card.Description class="mb-4">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Est inventore velit eius incidunt amet tempora molestiae 
                    sapiente accusantium modi repudiandae commodi rerum maiores 
                    error voluptatum, voluptatem.
                </Card.Description>
                <a href={`/grant-user/organization/${toShort(data.grant.organization.id)}`} target="_blank">
                    <Button class="w-full">{$t('grant.viewAllGrants')}</Button>
                </a>
            </Card.Content>
        </Card.Root>
	</div>
    <Separator class="mb-8" />
    <Card.Root class="bg-secondary w-min p-6 rounded-lg">
        <h2 class="text-3xl font-bold tracking-tight text-center mb-2">{$t('apply.header')}</h2>
        <p class="tracking-tight text-center mb-8 text-muted-foreground">{$t('apply.instructions')}</p>
        <div class="flex justify-center w-full gap-10 items-center">
            {#each data.forms as form}
                <GrantForm form={form}></GrantForm>
            {/each}
            <Button disabled class="gap-4">
                <p>{$t('apply.submitApplication')}</p>
                <Badge variant="destructive" class="pl-1 pr-2 gap-1">
                    <CircleAlert></CircleAlert>
                    {$t('apply.oneMoreFormRequired')}
                </Badge>
            </Button>
        </div>
    </Card.Root>
</div>