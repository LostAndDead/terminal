<script lang="ts">
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import Ps1 from './Ps1.svelte';
  import { renderColouredOutput } from '../utils/colours';
</script>

{#each $history as { command, outputs }}
  <div style={`color: ${$theme.foreground}`}>
    <div class="flex flex-col md:flex-row">
      <Ps1 />

      <div class="flex">
        <p class="visible md:hidden">❯</p>

        <p class="px-2">{command}</p>
      </div>
    </div>

    {#each outputs as output}
      <p class="whitespace-pre ascii-art">
        {#if typeof output === 'string'}
          {output}
        {:else}
          {@html renderColouredOutput(output)}
        {/if}
      </p>
    {/each}
  </div>
{/each}
