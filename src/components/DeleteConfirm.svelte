<script lang="ts">
    export let message = "Vuoi cancellare questa entry?";
    export let onConfirm: () => void;
    export let onCancel: () => void;
</script>

<div
    class="flex items-center justify-between px-4 py-3 bg-red-50 border-t border-red-200"
>
    <span class="text-sm text-gray-700">{message}</span>
    <div class="flex gap-2">
        <button
            class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            on:click={onConfirm}
        >
            Conferma
        </button>
        <button
            class="border px-3 py-1 rounded text-sm hover:bg-gray-50"
            on:click={onCancel}
        >
            Annulla
        </button>
    </div>
</div>
