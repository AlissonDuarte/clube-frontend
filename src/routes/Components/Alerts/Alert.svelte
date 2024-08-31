<script>
    export let alertMessage = '';
    export let isVisible = false;
    function closeAlert() {
      isVisible = false;
    }
  </script>
  
  {#if isVisible}
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-gray-800 text-white p-4 rounded shadow-lg max-w-sm w-full">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-12.728 12.728M18.364 18.364l-12.728-12.728" />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm leading-5 font-medium">
              {alertMessage}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button class="bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" on:click={closeAlert}>
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
  