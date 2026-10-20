const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');

const root = path.resolve(__dirname, '..');
const clone = value => structuredClone(value);
const result = (score = 20, date = '2026-10-19T10:00:00.000Z') => ({
    date, total: 10, correct: score / 2, wrong: 10 - score / 2,
    score, grade: 'A+', topic: 'Test', failedQuestions: [],
});
const row = (number, user = 'alice', extra = {}) => ({
    id: `result-${number}`, user_id: user, quiz_number: String(number),
    taken_at: '2026-10-19T10:00:00.000Z', total: 10, correct: 10,
    wrong: 0, score: '20', grade: 'A+', failed_questions: [], ...extra,
});

function state() {
    return {
        user: 'alice', storage: new Map(), rows: [], inserts: 0, reads: 0,
        readError: false, insertError: false, loseResponse: false,
        stores: { quizzes: new Map(), quizResults: new Map() }, transactions: [],
    };
}

// Run the actual database, uploader, and restoration modules with in-memory
// IndexedDB/Supabase adapters. No production accounts or network are used.
async function runtime(s = state()) {
    const store = name => ({
        get: async key => clone(s.stores[name].get(key)),
        getAll: async () => clone([...s.stores[name].values()]),
        put: async (value, key) => s.stores[name].set(key ?? value.quizNumber, clone(value)),
        delete: async key => s.stores[name].delete(key),
    });
    const db = {
        get: (name, key) => store(name).get(key),
        getAll: name => store(name).getAll(),
        put: (name, value, key) => store(name).put(value, key),
        delete: (name, key) => store(name).delete(key),
        transaction: names => {
            s.transactions.push(names);
            return { objectStore: store, done: Promise.resolve() };
        },
    };
    const supabase = {
        auth: { getSession: async () => ({ data: { session: s.user ? { user: { id: s.user } } : null } }) },
        from: table => {
            assert.equal(table, 'quiz_results');
            const filters = [];
            const orders = [];
            let start = 0, end = Infinity;
            const query = {
                select: () => query,
                eq: (key, value) => { filters.push([key, value]); return query; },
                order: (key, options) => { orders.push([key, options]); return query; },
                range: (a, b) => { start = a; end = b; return query; },
                limit: count => { end = count - 1; return query; },
                insert: async value => {
                    if (s.insertError) return { error: new Error('Upload failed') };
                    s.inserts++;
                    s.rows.push({ id: `insert-${s.inserts}`, ...clone(value) });
                    if (s.onInsert) await s.onInsert();
                    if (s.loseResponse) {
                        s.loseResponse = false;
                        return { error: new Error('Response lost') };
                    }
                    return { error: null };
                },
                then: (resolve, reject) => Promise.resolve().then(() => {
                    s.reads++;
                    if (s.readError) return { error: new Error('Offline') };
                    const rows = s.rows.filter(r => filters.every(([key, value]) => String(r[key]) === String(value)));
                    rows.sort((a, b) => {
                        for (const [key, options] of orders) {
                            const cmp = String(a[key]).localeCompare(String(b[key]));
                            if (cmp) return options.ascending ? cmp : -cmp;
                        }
                        return 0;
                    });
                    return { data: clone(rows.slice(start, end + 1)), error: null };
                }).then(resolve, reject),
            };
            return query;
        },
    };
    const context = vm.createContext({
        console, crypto: webcrypto,
        localStorage: {
            getItem: key => s.storage.get(key) ?? null,
            setItem: (key, value) => s.storage.set(key, value),
        },
    });
    const modules = new Map();
    const synthetic = (name, exports) => new vm.SyntheticModule(Object.keys(exports), function () {
        for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context, identifier: name });
    modules.set('idb', synthetic('idb', { openDB: async () => db }));
    modules.set('@/lib/supabaseClient', synthetic('supabaseClient', { getSupabaseBrowserClient: () => supabase }));
    const content = JSON.parse(await fs.readFile(path.join(root, 'database/quiz.json'), 'utf8'));
    modules.set('@/../database/quiz.json', synthetic('quizData', { default: content }));
    async function load(specifier) {
        if (modules.has(specifier)) return modules.get(specifier);
        const file = path.join(root, 'src', specifier.slice(2)) + '.js';
        const module = new vm.SourceTextModule(await fs.readFile(file, 'utf8'), { context, identifier: file });
        modules.set(specifier, module);
        await module.link(load);
        return module;
    }
    const sync = await load('@/lib/quizSync');
    await sync.evaluate();
    return {
        s, sync: sync.namespace, uploads: modules.get('@/lib/quizResults').namespace,
        db: modules.get('@/lib/db').namespace,
        quiz: number => s.stores.quizzes.get(number),
    };
}

test('fresh PWA restores quizzes 1, 2, and 3 from the same account', async () => {
    const app = await runtime();
    app.s.rows = [row(1), row(2, 'alice', { quiz_number: 2 }), row(3), row(4, 'bob')];
    await app.sync.ensureQuizOwner('alice');
    for (const number of [1, 2, 3]) assert.equal(app.quiz(number).userAnswers.score, 20);
    assert.equal(app.quiz(4).userAnswers, undefined);
    assert.equal(app.s.storage.get('quizDataOwner'), 'alice');
    assert.equal(app.s.inserts, 0);
    assert.equal(app.s.stores.quizResults.size, 0);
});

test('same owner restores history even if IndexedDB was cleared', async () => {
    const app = await runtime();
    app.s.storage.set('quizDataOwner', 'alice');
    app.s.rows = [row(2)];
    await app.sync.ensureQuizOwner('alice');
    assert.equal(app.quiz(2).userAnswers.score, 20);
});

test('offline restoration retries on the next visit for the same owner', async () => {
    const app = await runtime();
    app.s.readError = true;
    await assert.rejects(app.sync.ensureQuizOwner('alice'), /Offline/);
    app.s.readError = false;
    app.s.rows = [row(2)];
    await app.sync.ensureQuizOwner('alice');
    assert.equal(app.quiz(2).userAnswers.score, 20);
});

test('switching accounts clears local results and drafts without uploading them to the new account', async () => {
    const app = await runtime();
    app.s.storage.set('quizDataOwner', 'alice');
    await app.db.getAllQuizzes();
    await app.db.saveQuizResult(1, result(), 'alice');
    await app.db.saveQuizProgress(2, { 1: 'answer' });
    app.s.user = 'bob';
    app.s.rows = [row(3, 'bob')];
    await app.sync.ensureQuizOwner('bob');
    assert.equal(app.quiz(1).userAnswers, undefined);
    assert.equal(app.quiz(2).draftAnswers, undefined);
    assert.equal(app.quiz(3).userAnswers.score, 20);
    assert.equal(app.s.inserts, 0);
    assert.equal(app.s.stores.quizResults.size, 1);
});

test('guest and unowned results are not attributed to a signed-in account', async () => {
    for (const owner of [null, 'guest']) {
        const app = await runtime();
        if (owner) app.s.storage.set('quizDataOwner', owner);
        await app.db.saveQuizResult(1, result());
        await app.sync.ensureQuizOwner('alice');
        assert.equal(app.quiz(1).userAnswers, undefined);
        assert.equal(app.s.inserts, 0);
    }
});

test('restores the newest attempt and paginates beyond 500 results', async () => {
    const app = await runtime();
    app.s.rows = Array.from({ length: 501 }, (_, index) => row(1, 'alice', { id: `repeat-${index}` }));
    app.s.rows.push(row(2, 'alice', { taken_at: '2026-10-18T10:00:00.000Z' }));
    app.s.rows.push(row(1, 'alice', { taken_at: '2026-10-20T10:00:00.000Z', score: '18' }));
    await app.sync.ensureQuizOwner('alice');
    assert.equal(app.quiz(1).userAnswers.score, 18);
    assert.equal(app.quiz(2).userAnswers.score, 20);
    assert.equal(app.s.reads, 2);
});

test('recovers a legacy local quiz 2 missing from Supabase', async () => {
    const app = await runtime();
    app.s.storage.set('quizDataOwner', 'alice');
    await app.db.saveQuizResult(2, result(18));
    app.s.rows = [row(1), row(3)];
    await app.sync.ensureQuizOwner('alice');
    assert.equal(app.s.rows.find(r => r.quiz_number === '2').score, 18);
    assert.equal(app.s.inserts, 1);
    assert.equal(app.s.stores.quizResults.size, 0);
});

test('saving a signed-in result stores an upload in the same transaction', async () => {
    const app = await runtime();
    await app.db.saveQuizResult(2, result(), 'alice');
    assert.equal(app.quiz(2).userAnswers.score, 20);
    assert.equal(app.s.stores.quizResults.size, 1);
    assert.deepEqual(Array.from(app.s.transactions.at(-1)), ['quizzes', 'quizResults']);
    await app.db.saveQuizResult(3, result());
    assert.equal(app.s.stores.quizResults.size, 1);
});

test('failed uploads survive app restart and retry with the original timestamp', async () => {
    const app = await runtime();
    await app.db.saveQuizResult(2, result(), 'alice');
    app.s.insertError = true;
    await assert.rejects(app.uploads.syncPendingQuizResults('alice'), /Upload failed/);
    assert.equal(app.s.stores.quizResults.size, 1);
    app.s.insertError = false;
    const reopened = await runtime(app.s);
    await reopened.uploads.syncPendingQuizResults('alice');
    assert.equal(app.s.rows[0].taken_at, result().date);
    assert.equal(app.s.stores.quizResults.size, 0);
});

test('lost insert response retries without creating a duplicate attempt', async () => {
    const app = await runtime();
    await app.db.saveQuizResult(2, result(), 'alice');
    app.s.loseResponse = true;
    await assert.rejects(app.uploads.syncPendingQuizResults('alice'), /Response lost/);
    await app.uploads.syncPendingQuizResults('alice');
    assert.equal(app.s.inserts, 1);
    assert.equal(app.s.stores.quizResults.size, 0);
});

test('overlapping retries share one upload and drain results added during upload', async () => {
    const app = await runtime();
    await app.db.saveQuizResult(1, result(), 'alice');
    app.s.onInsert = async () => {
        app.s.onInsert = null;
        await app.db.saveQuizResult(2, result(), 'alice');
    };
    await Promise.all([
        app.uploads.syncPendingQuizResults('alice'),
        app.uploads.syncPendingQuizResults('alice'),
    ]);
    assert.equal(app.s.inserts, 2);
    assert.equal(app.s.stores.quizResults.size, 0);
});

test('an auth change leaves the old account upload queued', async () => {
    const app = await runtime();
    await app.db.saveQuizResult(2, result(), 'alice');
    app.s.user = 'bob';
    const response = await app.uploads.syncPendingQuizResults('alice');
    assert.equal(response.synced, false);
    assert.equal(app.s.inserts, 0);
    assert.equal(app.s.stores.quizResults.size, 1);
});

test('downloaded history remains available when a pending upload fails', async () => {
    const app = await runtime();
    app.s.storage.set('quizDataOwner', 'alice');
    await app.db.saveQuizResult(2, result(), 'alice');
    app.s.insertError = true;
    app.s.rows = [row(1), row(3)];
    await assert.rejects(app.sync.ensureQuizOwner('alice'), /Upload failed/);
    for (const number of [1, 2, 3]) assert.equal(app.quiz(number).userAnswers.score, 20);
});

test('restoration preserves retake drafts and a newer unsent local attempt', async () => {
    const app = await runtime();
    app.s.storage.set('quizDataOwner', 'alice');
    await app.db.saveQuizProgress(1, {});
    await app.db.saveQuizResult(2, result(18, '2026-10-20T10:00:00.000Z'));
    app.s.rows = [row(1), row(2)];
    await app.sync.ensureQuizOwner('alice');
    assert.equal(app.quiz(1).userAnswers, undefined);
    assert.ok(app.quiz(1).draftAnswers);
    assert.equal(app.quiz(2).userAnswers.score, 18);
    assert.equal(app.s.inserts, 1);
});
