<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";

</script>

<div class="center">
    <Card.Root>
        <Card.Header >
          <Card.Title>Grant Title</Card.Title>
        </Card.Header>
        <Card.Content >
          <Card.Title>Organization</Card.Title>
          <p>Organization Name</p>
        </Card.Content>
        <Card.Content>
          <Card.Title>Short Answer</Card.Title>
          <p>Question 1</p>
        </Card.Content>
        <Card.Content>
          <Card.Title>Paragraph</Card.Title>
          <p>Write anything</p>
        </Card.Content>
        <Card.Content>
          <Card.Title>Multiple Choice</Card.Title>
          <p>Question 1</p>
          <p>Question 2</p>
          <p>Question 3</p>
        </Card.Content>
    
        <Card.Footer class="flex justify-between">
            <Button variant="outline">Go back</Button>
            <Button>Edit</Button>
          </Card.Footer>
    </Card.Root>
</div>


<style>
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        margin: auto;
        width: 30%;
    }
</style>