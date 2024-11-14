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
</script>

<div class="space-y-6">
  <div class="flex gap-4">
    <div class="flex-1 space-y-2">
      <label class="text-sm">From Date</label>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">
            {fromDate ? format(fromDate, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar selected={fromDate} onSelect={(date) => handleDateChange(date, true)} />
        </PopoverContent>
      </Popover>
    </div>

    <div class="flex-1 space-y-2">
      <label class="text-sm">To Date</label>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">
            {toDate ? format(toDate, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar selected={toDate} onSelect={(date) => handleDateChange(date, false)} />
        </PopoverContent>
      </Popover>
    </div>
  </div>

  <div class="flex gap-4 items-end">
    <div class="flex-1">
      <label class="text-sm block mb-2">Days Back</label>
      <Input type="number" bind:value={daysBackInput} placeholder="Enter number of days" />
    </div>
    <Button on:click={handleDaysBackSubmit}>Filter</Button>
  </div>
</div>