<script lang="ts">
    import InsertionForm from "../components/InsertionForm.svelte";
    import Table from "../components/Table.svelte";
    import { initialStudents, initialTeachers } from "../data/mockedData";
    import { Student } from "../models/Student";
    import { Teacher } from "../models/Teacher";

    let students = [...initialStudents];
    let teachers = [...initialTeachers];

    let showStudentForm = false;
    let showTeacherForm = false;

    function toggleStudentForm() {
        showStudentForm = !showStudentForm;
        if (showStudentForm) showTeacherForm = false;
    }

    function toggleTeacherForm() {
        showTeacherForm = !showTeacherForm;
        if (showTeacherForm) showStudentForm = false;
    }

    // Add a new student
    function addStudent(s: {
        firstName: string;
        lastName: string;
        age: number;
        className: string;
    }) {
        students = [
            ...students,
            new Student(s.firstName, s.lastName, s.age, s.className),
        ];
        showStudentForm = false;
    }

    // Add a new teacher
    function addTeacher(t: {
        firstName: string;
        lastName: string;
        subjectName: string;
    }) {
        teachers = [
            ...teachers,
            new Teacher(t.firstName, t.lastName, t.subjectName),
        ];
        showTeacherForm = false;
    }

    // Delete student
    function deleteStudent(index: number) {
        students = students.filter((_, i) => i !== index);
    }

    // Delete teacher
    function deleteTeacher(index: number) {
        teachers = teachers.filter((_, i) => i !== index);
    }
</script>

<div class="min-h-screen bg-slate-50 py-10 px-6">
    <!-- Main title -->
    <h1 class="text-4xl font-bold text-center text-teal-700 mb-10">
        School Registry
    </h1>

    <div class="flex flex-col md:flex-row gap-8 items-start max-w-6xl mx-auto">
        <!-- Students card -->
        <div
            class="md:w-1/2 w-full bg-white rounded-xl shadow-lg border border-gray-200"
        >
            <div
                class="flex items-center justify-between p-4 border-b bg-indigo-50 rounded-t-xl"
            >
                <h2 class="text-xl font-semibold text-indigo-700">Students</h2>
                <button
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                    on:click={toggleStudentForm}
                    aria-label={showStudentForm
                        ? "Close student form"
                        : "Add student"}
                >
                    {showStudentForm ? "−" : "+"}
                </button>
            </div>

            <!-- Card body -->
            <div class="p-6">
                <!-- Insertion form (visible only when toggled) -->
                {#if showStudentForm}
                    <InsertionForm type="student" onSubmit={addStudent} />
                {/if}
                <!-- Students table -->
                <Table
                    type="student"
                    data={students}
                    onDelete={deleteStudent}
                />
            </div>
        </div>

        <!-- Teachers card -->
        <div
            class="md:w-1/2 w-full bg-white rounded-xl shadow-lg border border-gray-200"
        >
            <div
                class="flex items-center justify-between p-4 border-b bg-blue-50 rounded-t-xl"
            >
                <h2 class="text-xl font-semibold text-blue-700">Teachers</h2>
                <button
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                    on:click={toggleTeacherForm}
                    aria-label={showTeacherForm
                        ? "Close teacher form"
                        : "Add teacher"}
                >
                    {showTeacherForm ? "−" : "+"}
                </button>
            </div>

            <!-- Card body -->
            <div class="p-6">
                <!-- Insertion form (visible only when toggled) -->
                {#if showTeacherForm}
                    <InsertionForm type="teacher" onSubmit={addTeacher} />
                {/if}
                <!-- Teachers table -->
                <Table
                    type="teacher"
                    data={teachers}
                    onDelete={deleteTeacher}
                />
            </div>
        </div>
    </div>
</div>
