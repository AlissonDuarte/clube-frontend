<script>
    export let size = 8;
    export let color = 'text-white';
  </script>
  
  <div class={`fixed inset-0 flex items-center justify-center`}>
    <div class={`w-${size} h-${size} border-4 border-t-transparent border-solid rounded-full animate-spin ${color}`}></div>
  </div>
  