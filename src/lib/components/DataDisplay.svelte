<script>
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto';

  export let data = [];
  let chart = null;

  $: if (data) {
    updateChart();
  }

  function updateChart() {
    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById('pieChart');
    if (!ctx) return;

    const top10Data = data.slice(0, 10);
    const labels = top10Data.map(item => item.domain);
    const values = top10Data.map(item => item.totalTimeSeconds);

    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  onMount(() => {
    if (data.length > 0) {
      updateChart();
    }
  });
</script>

{#if data.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-4 rounded-lg shadow">
      <canvas id="pieChart"></canvas>
    </div>
    
    <div class="bg-white p-4 rounded-lg shadow overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="text-left p-2">Domain</th>
            <th class="text-left p-2">Total Time</th>
            <th class="text-left p-2">Daily Avg</th>
          </tr>
        </thead>
        <tbody>
          {#each data as item}
            <tr>
              <td class="p-2">{item.domain}</td>
              <td class="p-2">{item.totalTime}</td>
              <td class="p-2">{item.average}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/if}