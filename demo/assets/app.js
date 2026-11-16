(() => {
    const STORAGE_KEY = 'note-manager-demo-data-v1';
    const SESSION_KEY = 'note-manager-demo-active';
    const DEMO_USER_ID = 1;
    const PAGE_SIZE = 9;

    const sampleNotes = [
        { id: 101, userId: 1, author: 'کاربر نمایشی', title: 'برنامه‌ریزی هفته', body: 'مرور کارهای باقی‌مانده\nتکمیل بخش پروفایل\nبررسی باگ‌های فهرست یادداشت‌ها\nآماده‌کردن نسخهٔ نهایی برای نمایش', isPublic: false, createdAt: daysAgo(1), updatedAt: daysAgo(1) },
        { id: 102, userId: 1, author: 'کاربر نمایشی', title: 'ایده‌های طراحی رابط کاربری', body: 'استفاده از فاصله‌گذاری منظم و رنگ‌های ملایم\nنمایش وضعیت یادداشت‌ها با برچسب‌های واضح\nبهبود تجربهٔ کاربری در موبایل', isPublic: true, createdAt: daysAgo(3), updatedAt: daysAgo(2) },
        { id: 103, userId: 2, author: 'نگار', title: 'نکته‌هایی برای یادگیری PHP', body: 'تمرین کار با آرایه‌ها و توابع\nمرور شیوهٔ ارتباط با پایگاه داده از طریق PDO\nنوشتن کوئری‌های امن با prepared statement', isPublic: true, createdAt: daysAgo(5), updatedAt: daysAgo(4) },
        { id: 104, userId: 1, author: 'کاربر نمایشی', title: 'منابع مفید برنامه‌نویسی', body: 'مستندات رسمی PHP\nمستندات Bootstrap\nتمرین پروژه‌های کوچک و کاربردی', isPublic: false, createdAt: daysAgo(8), updatedAt: daysAgo(8) },
        { id: 105, userId: 3, author: 'آرمان', title: 'چک‌لیست شروع پروژه', body: 'تعریف نیازمندی‌ها\nطراحی ساختار پوشه‌ها\nساخت جداول پایگاه داده\nپیاده‌سازی و تست مرحله‌به‌مرحله', isPublic: true, createdAt: daysAgo(10), updatedAt: daysAgo(7) },
        { id: 106, userId: 1, author: 'کاربر نمایشی', title: 'کارهای مربوط به داشبورد', body: 'نمایش تعداد یادداشت‌ها\nاضافه‌کردن فیلترهای کاربردی\nنمایش پیام مناسب برای فهرست خالی', isPublic: true, createdAt: daysAgo(13), updatedAt: daysAgo(12) },
        { id: 107, userId: 2, author: 'نگار', title: 'یادداشت‌های جلسه', body: 'نسخهٔ اولیهٔ طرح بررسی شود.\nتغییرات پیشنهادی در فایل مستندات ثبت شوند.\nجلسهٔ بعدی برای پایان هفته هماهنگ شود.', isPublic: true, createdAt: daysAgo(18), updatedAt: daysAgo(18) },
        { id: 108, userId: 1, author: 'کاربر نمایشی', title: 'موضوعات برای مطالعه', body: 'مدیریت Session در PHP\nامنیت فرم‌ها و اعتبارسنجی ورودی\nساختار MVC و جداسازی مسئولیت‌ها', isPublic: false, createdAt: daysAgo(21), updatedAt: daysAgo(19) },
        { id: 109, userId: 3, author: 'آرمان', title: 'ایده برای پروژه شخصی', body: 'یک برنامهٔ سبک برای مدیریت کارهای روزانه با امکان جستجو، مرتب‌سازی و دسته‌بندی.', isPublic: true, createdAt: daysAgo(27), updatedAt: daysAgo(25) },
        { id: 110, userId: 1, author: 'کاربر نمایشی', title: 'فهرست خرید', body: 'دفتر یادداشت\nخودکار آبی\nفلش مموری', isPublic: false, createdAt: daysAgo(33), updatedAt: daysAgo(33) },
        { id: 111, userId: 2, author: 'نگار', title: 'نکات تجربهٔ کاربری', body: 'پیام‌های خطا باید نزدیک فیلد مربوط نمایش داده شوند.\nبرای هر عملیات مهم، بازخورد واضح به کاربر نشان بده.', isPublic: true, createdAt: daysAgo(40), updatedAt: daysAgo(39) },
        { id: 112, userId: 1, author: 'کاربر نمایشی', title: 'اهداف ماه آینده', body: 'تکمیل نمونه‌کارها\nمرور مفاهیم JavaScript\nتمرین ساخت رابط‌های واکنش‌گرا', isPublic: true, createdAt: daysAgo(48), updatedAt: daysAgo(45) },
        { id: 113, userId: 3, author: 'آرمان', title: 'یادداشت کوتاه', body: 'کارهای کوچک را همان روز انجام بده تا روی هم جمع نشوند.', isPublic: true, createdAt: daysAgo(60), updatedAt: daysAgo(60) },
        { id: 114, userId: 1, author: 'کاربر نمایشی', title: 'ایده‌های بعدی', body: 'اضافه کردن برچسب برای یادداشت‌ها\nافزودن حالت تاریک\nبهبود صفحهٔ پروفایل', isPublic: false, createdAt: daysAgo(72), updatedAt: daysAgo(70) }
    ];

    const state = { notes: loadNotes(), currentPage: 1, editingId: null, deletingId: null };
    const elements = {};
    let noteModal;
    let deleteModal;
    let toast;

    function daysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        date.setHours(10, 0, 0, 0);
        return date.toISOString();
    }

    function loadNotes() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : structuredClone(sampleNotes);
        } catch (error) {
            return sampleNotes.map(note => ({ ...note }));
        }
    }

    function saveNotes() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.notes));
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[character]);
    }

    function formatDate(value) {
        try {
            return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value));
        } catch (error) {
            return new Date(value).toLocaleDateString('fa-IR');
        }
    }

    function showToast(message) {
        document.getElementById('toastMessage').textContent = message;
        toast.show();
    }

    function getFilteredNotes() {
        const search = elements.searchInput.value.trim().toLocaleLowerCase('fa');
        const view = elements.viewFilter.value;
        const sort = elements.sortFilter.value;
        const fromDate = elements.fromDate.value;
        const toDate = elements.toDate.value;

        let notes = state.notes.filter(note => {
            const isMine = note.userId === DEMO_USER_ID;
            if (view === 'my' && !isMine) return false;
            if (view === 'public' && !note.isPublic) return false;
            if (view === 'all' && !isMine && !note.isPublic) return false;
            if (search && !(note.title + ' ' + note.body).toLocaleLowerCase('fa').includes(search)) return false;
            const created = new Date(note.createdAt).toISOString().slice(0, 10);
            if (fromDate && created < fromDate) return false;
            if (toDate && created > toDate) return false;
            return true;
        });

        notes.sort((left, right) => {
            const comparison = new Date(left.updatedAt) - new Date(right.updatedAt);
            return sort === 'oldest' ? comparison : -comparison;
        });
        return notes;
    }

    function renderNotes() {
        const viewTitles = { all: 'همهٔ یادداشت‌ها', my: 'یادداشت‌های من', public: 'یادداشت‌های عمومی' };
        elements.notesHeading.textContent = viewTitles[elements.viewFilter.value];
        const filteredNotes = getFilteredNotes();
        const total = filteredNotes.length;
        const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
        state.currentPage = Math.min(state.currentPage, totalPages);
        const start = (state.currentPage - 1) * PAGE_SIZE;
        const pageNotes = filteredNotes.slice(start, start + PAGE_SIZE);

        elements.notesCount.textContent = total
            ? `نمایش ${start + 1} تا ${Math.min(start + PAGE_SIZE, total)} از ${total} یادداشت`
            : '۰ یادداشت';

        elements.notesGrid.innerHTML = pageNotes.map(note => {
            const mine = note.userId === DEMO_USER_ID;
            const visibility = note.isPublic ? '<span class="badge rounded-pill badge-public">عمومی</span>' : '<span class="badge rounded-pill badge-private">شخصی</span>';
            const controls = mine ? `
                <div class="note-card-actions">
                    <button type="button" class="btn btn-outline-primary" data-action="edit" data-id="${note.id}">ویرایش</button>
                    <button type="button" class="btn btn-outline-danger" data-action="delete" data-id="${note.id}">حذف</button>
                </div>` : '';
            return `
                <article class="note-card">
                    <div class="card note-card-inner">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start gap-2 mb-3">
                                <h3 class="note-card-title">${escapeHtml(note.title)}</h3>${visibility}
                            </div>
                            <p class="note-body">${escapeHtml(note.body)}</p>
                            <div class="note-meta">
                                <span>نویسنده: ${escapeHtml(note.author)}</span>
                                <span>آخرین ویرایش: ${escapeHtml(formatDate(note.updatedAt))}</span>
                            </div>
                            ${controls}
                        </div>
                    </div>
                </article>`;
        }).join('');

        elements.emptyState.classList.toggle('d-none', total > 0);
        elements.notesGrid.classList.toggle('d-none', total === 0);
        elements.paginationWrap.classList.toggle('d-none', totalPages <= 1);
        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        if (totalPages <= 1) {
            elements.pagination.innerHTML = '';
            return;
        }
        let html = `<li class="page-item ${state.currentPage === 1 ? 'disabled' : ''}"><button class="page-link" data-page="${state.currentPage - 1}" aria-label="صفحه قبل">‹</button></li>`;
        for (let page = 1; page <= totalPages; page++) {
            html += `<li class="page-item ${page === state.currentPage ? 'active' : ''}"><button class="page-link" data-page="${page}" ${page === state.currentPage ? 'aria-current="page"' : ''}>${page.toLocaleString('fa-IR')}</button></li>`;
        }
        html += `<li class="page-item ${state.currentPage === totalPages ? 'disabled' : ''}"><button class="page-link" data-page="${state.currentPage + 1}" aria-label="صفحه بعد">›</button></li>`;
        elements.pagination.innerHTML = html;
    }

    function clearErrors() {
        elements.titleError.textContent = '';
        elements.bodyError.textContent = '';
    }

    function openCreateModal() {
        state.editingId = null;
        elements.noteForm.reset();
        elements.noteId.value = '';
        elements.noteModalTitle.textContent = 'افزودن یادداشت جدید';
        clearErrors();
    }

    function openEditModal(id) {
        const note = state.notes.find(item => item.id === id && item.userId === DEMO_USER_ID);
        if (!note) return;
        state.editingId = id;
        elements.noteId.value = id;
        elements.noteTitle.value = note.title;
        elements.noteBody.value = note.body;
        elements.notePublic.checked = note.isPublic;
        elements.noteModalTitle.textContent = 'ویرایش یادداشت';
        clearErrors();
        noteModal.show();
    }

    function handleNoteSubmit(event) {
        event.preventDefault();
        clearErrors();
        const title = elements.noteTitle.value.trim();
        const body = elements.noteBody.value.trim();
        let valid = true;
        if (!title) { elements.titleError.textContent = 'لطفاً عنوان یادداشت را وارد کنید.'; valid = false; }
        if (!body) { elements.bodyError.textContent = 'لطفاً متن یادداشت را وارد کنید.'; valid = false; }
        if (!valid) return;

        const now = new Date().toISOString();
        if (state.editingId !== null) {
            const note = state.notes.find(item => item.id === state.editingId && item.userId === DEMO_USER_ID);
            if (!note) return;
            note.title = title;
            note.body = body;
            note.isPublic = elements.notePublic.checked;
            note.updatedAt = now;
            showToast('تغییرات یادداشت ذخیره شد.');
        } else {
            state.notes.unshift({
                id: Date.now(), userId: DEMO_USER_ID, author: 'کاربر نمایشی', title, body,
                isPublic: elements.notePublic.checked, createdAt: now, updatedAt: now
            });
            showToast('یادداشت جدید ثبت شد.');
        }
        saveNotes();
        state.currentPage = 1;
        renderNotes();
        noteModal.hide();
    }

    function askDelete(id) {
        const note = state.notes.find(item => item.id === id && item.userId === DEMO_USER_ID);
        if (!note) return;
        state.deletingId = id;
        elements.deleteNoteTitle.textContent = `«${note.title}»`;
        deleteModal.show();
    }

    function confirmDelete() {
        if (state.deletingId === null) return;
        state.notes = state.notes.filter(note => note.id !== state.deletingId);
        state.deletingId = null;
        saveNotes();
        renderNotes();
        deleteModal.hide();
        showToast('یادداشت حذف شد.');
    }

    function resetDemo() {
        state.notes = sampleNotes.map(note => ({ ...note }));
        state.currentPage = 1;
        saveNotes();
        renderNotes();
        showToast('داده‌های نمونه بازگردانی شدند.');
    }

    function enterDemo() {
        sessionStorage.setItem(SESSION_KEY, '1');
        elements.welcomeScreen.classList.add('d-none');
        elements.appScreen.classList.remove('d-none');
        renderNotes();
    }

    function leaveDemo() {
        sessionStorage.removeItem(SESSION_KEY);
        elements.appScreen.classList.add('d-none');
        elements.welcomeScreen.classList.remove('d-none');
    }

    function init() {
        [
            'welcomeScreen', 'appScreen', 'startDemoButton', 'logoutButton', 'resetDemoButton', 'addNoteButton',
            'searchInput', 'viewFilter', 'sortFilter', 'fromDate', 'toDate', 'applyFiltersButton',
            'clearFiltersButton', 'notesHeading', 'notesCount', 'notesGrid', 'emptyState',
            'paginationWrap', 'pagination', 'noteForm', 'noteId', 'noteTitle', 'noteBody', 'notePublic',
            'noteModalTitle', 'titleError', 'bodyError', 'deleteNoteTitle', 'confirmDeleteButton'
        ].forEach(id => { elements[id] = document.getElementById(id); });

        noteModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('noteModal'));
        deleteModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('deleteModal'));
        toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('demoToast'), { delay: 2600 });

        elements.startDemoButton.addEventListener('click', enterDemo);
        elements.logoutButton.addEventListener('click', leaveDemo);
        elements.resetDemoButton.addEventListener('click', resetDemo);
        elements.addNoteButton.addEventListener('click', openCreateModal);
        elements.noteForm.addEventListener('submit', handleNoteSubmit);
        elements.confirmDeleteButton.addEventListener('click', confirmDelete);

        [elements.searchInput, elements.viewFilter, elements.sortFilter, elements.fromDate, elements.toDate].forEach(input => {
            input.addEventListener('input', () => { state.currentPage = 1; renderNotes(); });
            input.addEventListener('change', () => { state.currentPage = 1; renderNotes(); });
        });
        elements.applyFiltersButton.addEventListener('click', () => { state.currentPage = 1; renderNotes(); });
        elements.clearFiltersButton.addEventListener('click', () => {
            elements.searchInput.value = '';
            elements.viewFilter.value = 'all';
            elements.sortFilter.value = 'newest';
            elements.fromDate.value = '';
            elements.toDate.value = '';
            state.currentPage = 1;
            renderNotes();
        });

        elements.notesGrid.addEventListener('click', event => {
            const button = event.target.closest('button[data-action]');
            if (!button) return;
            const id = Number(button.dataset.id);
            if (button.dataset.action === 'edit') openEditModal(id);
            if (button.dataset.action === 'delete') askDelete(id);
        });
        elements.pagination.addEventListener('click', event => {
            const button = event.target.closest('button[data-page]');
            if (!button || button.closest('.disabled')) return;
            const page = Number(button.dataset.page);
            const totalPages = Math.max(1, Math.ceil(getFilteredNotes().length / PAGE_SIZE));
            if (page >= 1 && page <= totalPages) {
                state.currentPage = page;
                renderNotes();
                document.querySelector('.page-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        document.getElementById('noteModal').addEventListener('hidden.bs.modal', clearErrors);

        if (sessionStorage.getItem(SESSION_KEY) === '1') enterDemo();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
