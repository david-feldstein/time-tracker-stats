<script>
  import { Input } from '$lib/components/ui/input';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          dispatch('dataLoaded', { data });
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }
</script>

<div class="space-y-2">
  <h1 class="text-3xl font-bold">Time Tracker Stats</h1>
  <Input type="file" accept=".json" on:change={handleFileUpload} />
</div>