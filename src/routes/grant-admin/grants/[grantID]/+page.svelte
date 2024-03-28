<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { t } from '$lib/i18n/i18n';


  export let data: PageData;
</script>

<div class="center">
    <Card.Root>
        <Card.Header>
            <h2 class="text-4xl font-bold tracking-tight">{data.grant.title}</h2>
        </Card.Header>
        <Card.Content>
            <Card.Title>{$t('card.organization')}</Card.Title>
            <p>{$t('card.organizationName')}</p>
        </Card.Content>
        <Card.Content>
            <Card.Title>{$t('card.shortAnswer')}</Card.Title>
            <p>{$t('card.question1')}</p>
        </Card.Content>
        <Card.Content>
            <Card.Title>{$t('card.paragraph')}</Card.Title>
            <p>{$t('card.writeAnything')}</p>
        </Card.Content>
        <Card.Content>
            <Card.Title>{$t('card.multipleChoice')}</Card.Title>
            <p>{$t('card.question1')}</p>
            <p>{$t('card.question2')}</p>
            <p>{$t('card.question3')}</p>
        </Card.Content>

        <Card.Footer class="flex justify-between">

            <Button variant="outline" href="./">Go back</Button>
            <Button href="/grant-builder">Edit</Button>
          </Card.Footer>

    </Card.Root>
</div>


<style>
    .center {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        margin: auto;
        width: 30%;
    }
</style>