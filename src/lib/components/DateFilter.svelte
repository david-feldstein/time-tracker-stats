<script>
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Input } from '$lib/components/ui/input';
  import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
  import { format } from 'date-fns';
  import { createEventDispatcher } from 'svelte';

  export let fromDate = null;
  export let toDate = null;
  
  let daysBackInput = '';
  const dispatch = createEventDispatcher();

  function handleDaysBackSubmit() {
    const days = parseInt(daysBackInput);
    if (isNaN(days)) return;

    const today = new Date();
    toDate = today;
    fromDate = new Date(today);
    fromDate.setDate(today.getDate() - days);
    
    dispatch('filterChange', { fromDate, toDate });
  }

  function handleDateChange(date, isFromDate) {
    if (isFromDate) {
      fromDate = date;
    } else {
      toDate = date;
    }
    dispatch('filterChange', { fromDate, toDate });
  }

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

<div class="bg-card rounded-lg shadow p-6 space-y-6">
  <h1 class="text-3xl font-bold mb-6">Time Tracker Stats</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
    <div>
      <label class="text-sm block mb-2">Upload JSON</label>
      <Input type="file" accept=".json" on:change={handleFileUpload} />
    </div>

    <div>
      <label class="text-sm block mb-2">From Date</label>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" class="w-full justify-start">
            {fromDate ? format(fromDate, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar selected={fromDate} onSelect={(date) => handleDateChange(date, true)} />
        </PopoverContent>
      </Popover>
    </div>

    <div>
      <label class="text-sm block mb-2">To Date</label>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" class="w-full justify-start">
            {toDate ? format(toDate, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar selected={toDate} onSelect={(date) => handleDateChange(date, false)} />
        </PopoverContent>
      </Popover>
    </div>

    <div class="flex gap-2">
      <div class="flex-1">
        <label class="text-sm block mb-2">Days Back</label>
        <Input type="number" bind:value={daysBackInput} placeholder="Days" />
      </div>
      <Button class="self-end" on:click={handleDaysBackSubmit}>Filter</Button>
    </div>
  </div>
</div>