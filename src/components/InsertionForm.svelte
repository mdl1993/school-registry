<script lang="ts">
    export let type: "student" | "teacher";
    export let onSubmit: (entry: any) => void;

    let firstName = "";
    let lastName = "";
    let age: string = "";
    let className = "";
    let subjectName = "";

    let errors: Record<string, string> = {};

    function isValidLength(s: string) {
        return s.trim().length > 0 && s.trim().length <= 200;
    }
    function isAcceptableAge(s: string) {
        if (!s) return false;
        const n = Number(s);
        return Number.isInteger(n) && n > 0 && n <= 150;
    }

    function validate(): boolean {
        const next: Record<string, string> = {};

        if (!isValidLength(firstName))
            next.firstName = "First name is required, max 200 characters";
        if (!isValidLength(lastName))
            next.lastName = "Last name is required, max 200 characters";

        if (type === "student") {
            if (!isAcceptableAge(age))
                next.age = "Age must be a number between 1 and 150";
            if (!isValidLength(className))
                next.className = "Class name is required, max 200 characters";
        } else {
            if (!isValidLength(subjectName))
                next.subjectName =
                    "Subject name is required, max 200 characters";
        }

        errors = next;
        return Object.keys(errors).length === 0;
    }

    function handleSubmit() {
        if (!validate()) return;

        if (type === "student") {
            onSubmit({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                age: Number(age),
                className: className.trim(),
            });
            age = "";
            className = "";
        } else {
            onSubmit({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                subjectName: subjectName.trim(),
            });
            subjectName = "";
        }
        firstName = "";
        lastName = "";
        errors = {};
    }

    // Pulisce l'errore del campo in modo reattivo
    function clearError(field: keyof typeof errors) {
        if (errors[field]) {
            const next = { ...errors };
            delete next[field];
            errors = next; // riassegna per triggerare il DOM
        }
    }
</script>

<form class="space-y-4 mb-4" on:submit|preventDefault={handleSubmit} novalidate>
    <div class="grid grid-cols-2 gap-3">
        <div>
            <input
                class="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                placeholder="First Name"
                bind:value={firstName}
                on:input={() => clearError("firstName")}
            />
            {#if errors.firstName}
                <p class="mt-1 text-xs text-red-600">{errors.firstName}</p>
            {/if}
        </div>

        <div>
            <input
                class="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                placeholder="Last Name"
                bind:value={lastName}
                on:input={() => clearError("lastName")}
            />
            {#if errors.lastName}
                <p class="mt-1 text-xs text-red-600">{errors.lastName}</p>
            {/if}
        </div>

        {#if type === "student"}
            <div>
                <input
                    type="number"
                    min="1"
                    step="1"
                    class="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                    placeholder="Age"
                    bind:value={age}
                    on:input={() => clearError("age")}
                />
                {#if errors.age}
                    <p class="mt-1 text-xs text-red-600">{errors.age}</p>
                {/if}
            </div>

            <div>
                <input
                    class="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                    placeholder="Class (e.g., 3A)"
                    bind:value={className}
                    on:input={() => clearError("className")}
                />
                {#if errors.className}
                    <p class="mt-1 text-xs text-red-600">{errors.className}</p>
                {/if}
            </div>
        {:else}
            <div class="col-span-2">
                <input
                    class="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                    placeholder="Subject name"
                    bind:value={subjectName}
                    on:input={() => clearError("subjectName")}
                />
                {#if errors.subjectName}
                    <p class="mt-1 text-xs text-red-600">
                        {errors.subjectName}
                    </p>
                {/if}
            </div>
        {/if}
    </div>

    <div class="flex gap-2">
        <button
            class="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
        >
            Add {type}
        </button>
        <button
            type="reset"
            class="border px-3 py-2 rounded hover:bg-gray-50"
            on:click={() => {
                firstName = "";
                lastName = "";
                age = "";
                className = "";
                subjectName = "";
                errors = {};
            }}
        >
            Reset
        </button>
    </div>
</form>
