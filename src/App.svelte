<script>
  import FileUpload from './lib/components/FileUpload.svelte';
  import DateFilter from './lib/components/DateFilter.svelte';
  import DataDisplay from './lib/components/DataDisplay.svelte';
  import { calculateDailyAverage } from './lib/utils/timeCalculations';

  let data = null;
  let fromDate = null;
  let toDate = null;
  let filteredData = [];

  function handleDataLoaded(event) {
    data = event.detail.data;
    updateData();
  }

  function handleFilterChange(event) {
    fromDate = event.detail.fromDate;
    toDate = event.detail.toDate;
    updateData();
  }

  function updateData() {
    if (!data) return;
    filteredData = calculateDailyAverage(data, fromDate, toDate);
  }
</script>

<main class="container mx-auto p-4 max-w-4xl">
  <div class="space-y-6">
    <FileUpload on:dataLoaded={handleDataLoaded} />
    <DateFilter 
      bind:fromDate 
      bind:toDate 
      on:filterChange={handleFilterChange} 
    />
    <DataDisplay data={filteredData} />
  </div>
</main>

<style>
  :global(body) {
    background-color: #f5f5f5;
  }
</style>