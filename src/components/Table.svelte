<script lang="ts">
    import { Student } from "../models/Student";
    import { Teacher } from "../models/Teacher";
    import DeleteConfirm from "./DeleteConfirm.svelte";

    export let type: "student" | "teacher" = "teacher";
    export let data: Student[] | Teacher[] = [];
    export let onDelete: (index: number) => void;

    // Index of row selected for deletion confirmation
    let confirmIndex: number | null = null;

    function openConfirm(i: number) {
        confirmIndex = i;
    }
    function closeConfirm() {
        confirmIndex = null;
    }
</script>

<!-- Table container -->
<div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
    <table class="min-w-full divide-y divide-gray-200">
        <!-- Table header -->
        <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr class="divide-x divide-gray-200">
                <th
                    class="px-3 py-3 text-left text-sm font-semibold text-gray-700 w-14"
                    >Action</th
                >
                {#if type === "student"}
                    <th
                        class="px-4 py-3 text-left text-sm font-semibold text-indigo-700"
                        >First Name</th
                    >
                    <th
                        class="px-4 py-3 text-left text-sm font-semibold text-indigo-700"
                        >Last Name</th
                    >
                    <th
                        class="px-4 py-3 text-left text-sm font-semibold text-indigo-700"
                        >Age</th
                    >
                    <th
                        class="px-4 py-3 text-left text-sm font-semibold text-indigo-700"
                        >Class</th
                    >
                {:else}
                    <th
                        class="px-4 py-3 text-left text-sm font-semibold text-blue-700"
                        >First Name</th
                    >
                    <th
                        class="px-4 py-3 text-left text-sm font-semibold text-blue-700"
                        >Last Name</th
                    >
                    <th
                        class="px-4 py-3 text-left text-sm font-semibold text-blue-700"
                        >Subject</th
                    >
                {/if}
            </tr>
        </thead>

        <!-- Table body -->
        <tbody class="divide-y divide-gray-100 bg-white">
            {#if type === "student"}
                {#each data as student, i}
                    <!-- Each student row -->
                    <tr
                        class="group hover:bg-indigo-50 transition-colors divide-x divide-gray-200"
                    >
                        <!-- Delete button -->
                        <td class="px-2 py-2 text-center">
                            <button
                                class="bg-red-500 text-white rounded px-2 py-1 text-xs hover:bg-red-600"
                                on:click={() => openConfirm(i)}
                            >
                                ✕
                            </button>
                        </td>

                        <!-- First Name (truncated, expands on hover) -->
                        <td
                            class="px-4 py-2 text-sm text-gray-800 truncate max-w-[150px] whitespace-nowrap
               group-hover:overflow-visible group-hover:whitespace-normal group-hover:truncate-none"
                        >
                            {(student as Student).firstName}
                        </td>

                        <!-- Last Name -->
                        <td
                            class="px-4 py-2 text-sm text-gray-800 truncate max-w-[150px] whitespace-nowrap
               group-hover:overflow-visible group-hover:whitespace-normal group-hover:truncate-none"
                        >
                            {(student as Student).lastName}
                        </td>

                        <!-- Age (no truncate needed) -->
                        <td class="px-4 py-2 text-sm text-gray-800">
                            {(student as Student).age}
                        </td>

                        <!-- Class -->
                        <td
                            class="px-4 py-2 text-sm text-gray-800 truncate max-w-[100px] whitespace-nowrap
               group-hover:overflow-visible group-hover:whitespace-normal group-hover:truncate-none"
                        >
                            {(student as Student).className}
                        </td>
                    </tr>

                    <!-- Delete confirmation row -->
                    {#if confirmIndex === i}
                        <tr>
                            <td colspan="5" class="p-0">
                                <DeleteConfirm
                                    message="Do you want to delete this student?"
                                    onConfirm={() => {
                                        onDelete(i);
                                        closeConfirm();
                                    }}
                                    onCancel={closeConfirm}
                                />
                            </td>
                        </tr>
                    {/if}
                {/each}
            {:else}
                {#each data as teacher, i}
                    <!-- Each teacher row -->
                    <tr
                        class="group hover:bg-blue-50 transition-colors divide-x divide-gray-200"
                    >
                        <!-- Delete button -->
                        <td class="px-2 py-2 text-center">
                            <button
                                class="bg-red-500 text-white rounded px-2 py-1 text-xs hover:bg-red-600"
                                on:click={() => openConfirm(i)}
                            >
                                ✕
                            </button>
                        </td>

                        <!-- First Name -->
                        <td
                            class="px-4 py-2 text-sm text-gray-800 truncate max-w-[150px] whitespace-nowrap
               group-hover:overflow-visible group-hover:whitespace-normal group-hover:truncate-none"
                        >
                            {(teacher as Teacher).firstName}
                        </td>

                        <!-- Last Name -->
                        <td
                            class="px-4 py-2 text-sm text-gray-800 truncate max-w-[150px] whitespace-nowrap
               group-hover:overflow-visible group-hover:whitespace-normal group-hover:truncate-none"
                        >
                            {(teacher as Teacher).lastName}
                        </td>

                        <!-- Subject -->
                        <td
                            class="px-4 py-2 text-sm text-gray-800 truncate max-w-[200px] whitespace-nowrap
               group-hover:overflow-visible group-hover:whitespace-normal group-hover:truncate-none"
                        >
                            {(teacher as Teacher).subjectName}
                        </td>
                    </tr>

                    <!-- Delete confirmation row -->
                    {#if confirmIndex === i}
                        <tr>
                            <td colspan="4" class="p-0">
                                <DeleteConfirm
                                    message="Do you want to delete this teacher?"
                                    onConfirm={() => {
                                        onDelete(i);
                                        closeConfirm();
                                    }}
                                    onCancel={closeConfirm}
                                />
                            </td>
                        </tr>
                    {/if}
                {/each}
            {/if}
        </tbody>
    </table>
</div>
