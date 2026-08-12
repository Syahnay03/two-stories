/* ==========================================================
   TWO STORIES — SCRIPT.JS (WhatsApp Integration & Full Questions)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       1. DATA STORAGE & INITIALIZATION (Silvi Preferences & Answers)
    ====================================================== */
    const silviPreferences = {
        birthday: "22 Juni",
        likes: [
            "Jalan-jalan ke alam",
            "Ngobrol"
        ],
        dislikes: [
            "Berbohong"
        ],
        favoriteColors: [
            "Ivory",
            "Coksu",
            "Soft Pastel"
        ],
        idealPartner: [
            "Pintar",
            "Tahu agama",
            "Selalu ada saat dibutuhkan",
            "Pintar melawak",
            "Menjaga kesehatan",
            "Tidak tempramental",
            "Sayang kepada pasangan",
            "Sayang kepada keluarga"
        ]
    };

    const questionsData = [
        // Bagian 1 — Mengenal dirinya
        { id: "question1", text: "“Kalau harus menggambarkan diri mbak dalam 3 kata, apa aja? Kenapa memilih tiga kata itu?”" },
        { id: "question2", text: "“Menurut mbak, apa sisi terbaik dari diri mbak yang paling jarang orang tahu?”" },
        { id: "question3", text: "“Apa kebiasaan kecil mbak yang mungkin dianggap sepele tapi sebenarnya penting?”" },
        { id: "question4", text: "“Kalau lagi punya masalah, mbak biasanya lebih suka cerita ke orang atau menyelesaikannya sendiri?”" },
        { id: "question5", text: "“Hal sederhana apa yang paling gampang bikin mbak bahagia?”" },
        
        // Bagian 2 — Keluarga
        { id: "question6", text: "“Apa pelajaran terbesar yang mbak dapat dari orang tua?”" },
        { id: "question7", text: "“Kalau suatu hari punya keluarga sendiri, hal apa dari keluarga sekarang yang ingin mbak pertahankan?”" },
        { id: "question8", text: "“Dan ada nggak hal dari pola didik orang tua yang nantinya ingin mbak lakukan dengan cara berbeda?”" },
        
        // Bagian 3 — Emosi & komunikasi
        { id: "question9", text: "“Kalau mbak lagi marah atau kecewa, mbak lebih suka diberi waktu sendiri atau ditemani dan diajak ngobrol?”" },
        { id: "question10", text: "“Kalau ada masalah dengan pasangan, menurut mbak lebih baik langsung dibicarakan atau menunggu sampai sama-sama tenang?”" },
        { id: "question11", text: "“Apa bentuk perhatian yang paling bikin mbak merasa dihargai?”" },
        { id: "question12", text: "“Hal apa yang paling bisa membuat kepercayaan mbak kepada seseorang hilang?”" },
        { id: "question13", text: "“Kalau mbak melakukan kesalahan, seperti apa cara pasangan yang mbak harapkan untuk menegur?”" },
        
        // Bagian 4 — Tentang pasangan
        { id: "question14", text: "“Menurut mbak, apa arti pasangan yang baik?”" },
        { id: "question15", text: "“Apa yang membuat mbak merasa aman dan nyaman dalam sebuah hubungan?”" },
        { id: "question16", text: "“Apa hal yang menurut mbak wajib ada dalam hubungan selain rasa suka?”" },
        { id: "question17", text: "“Kalau pasangan punya pendapat yang berbeda dengan mbak, bagaimana mbak berharap dia menyampaikannya?”" },
        { id: "question18", text: "“Apa bentuk kasih sayang yang paling mbak sukai: perhatian lewat kata-kata, tindakan, waktu bersama, atau yang lainnya?”" },
        
        // Bagian 5 — Pernikahan
        { id: "question19", text: "“Menurut mbak, apa yang paling penting dipersiapkan sebelum menikah?”" },
        { id: "question20", text: "“Seperti apa gambaran rumah tangga yang mbak impikan?”" },
        { id: "question21", text: "“Kalau nanti sudah menikah, seperti apa pembagian peran yang menurut mbak ideal?”" },
        { id: "question22", text: "“Dalam kondisi ekonomi sedang sulit, menurut mbak bagaimana pasangan seharusnya saling menghadapi keadaan tersebut?”" },
        { id: "question23", text: "“Apa yang menurut mbak tidak boleh hilang dari hubungan meskipun sudah bertahun-tahun menikah?”" },
        
        // Pertanyaan yang lebih dalam
        { id: "question24", text: "“Apa ketakutan terbesar mbak dalam sebuah hubungan?”" },
        { id: "question25", text: "“Apa hal yang paling ingin mbak rasakan dari pasangan ketika sedang berada di titik terendah?”" },
        { id: "question26", text: "“Apa satu hal tentang diri mbak yang ingin pasangan pahami tanpa harus selalu mbak jelaskan?”" },
        { id: "question27", text: "“Kalau suatu hari kita menghadapi masalah besar, menurut mbak apa yang harus membuat dua orang memilih untuk tetap memperbaikinya daripada menyerah?”" },
        { id: "question28", text: "“Menurut mbak, seperti apa rasanya ‘pulang’ kepada seseorang?”" },
        
        // Pertanyaan penutup
        { id: "question29", text: "“Setelah semua pertanyaan ini, menurut mbak apa hal yang paling penting untuk aku tahu tentang mbak?”" },
        { id: "question30", text: "“Dan kalau boleh jujur, dari proses kenalan kita sampai sekarang, apa yang paling membuat mbak penasaran tentang aku?” 👀" }
    ];

    // Load answers from localStorage if available, or initialize empty state
    let answers = {};
    const savedAnswers = localStorage.getItem("twoStoriesAnswers");
    if (savedAnswers) {
        answers = JSON.parse(savedAnswers);
    } else {
        questionsData.forEach(q => {
            answers[q.id] = "";
        });
    }

    /* ======================================================
       2. RENDER QUESTIONS DYNAMICALLY
    ====================================================== */
    const questionsContainer = document.getElementById("questionsContainer");

    function renderQuestions() {
        if (!questionsContainer) return;
        questionsContainer.innerHTML = "";

        questionsData.forEach((q, index) => {
            const userAnswer = answers[q.id];
            const hasAnswer = userAnswer && userAnswer.trim() !== "";

            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4";

            col.innerHTML = `
                <div class="card border-0 custom-card p-4 h-100 shadow-subtle d-flex flex-column justify-content-between">
                    <div>
                        <span class="small font-serif text-muted-custom">Question ${index + 1}</span>
                        <h6 class="font-serif mt-2 mb-3">${q.text}</h6>
                        <div class="answer-display small fst-italic ${hasAnswer ? 'text-accent fade-in' : 'text-muted-custom'}">
                            ${hasAnswer ? `“${userAnswer}”` : '“Jawabannya akan menjadi bagian dari cerita ini.”'}
                        </div>
                    </div>
                    <div class="mt-4 pt-2 border-top border-opacity-10 text-end">
                        <button class="btn btn-sm btn-outline-custom rounded-pill px-3 open-question-modal" data-qid="${q.id}" data-qindex="${index + 1}" data-qtext="${encodeURIComponent(q.text)}">
                            ${hasAnswer ? 'Edit Jawaban' : 'Answer'}
                        </button>
                    </div>
                </div>
            `;
            questionsContainer.appendChild(col);
        });

        // Re-attach event listeners to buttons
        document.querySelectorAll(".open-question-modal").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const qid = e.currentTarget.getAttribute("data-qid");
                const qindex = e.currentTarget.getAttribute("data-qindex");
                const qtext = decodeURIComponent(e.currentTarget.getAttribute("data-qtext"));
                openQuestionModal(qid, qindex, qtext);
            });
        });
    }

    renderQuestions();

    /* ======================================================
       3. QUESTION MODAL & WHATSAPP INTEGRATION
    ====================================================== */
    const questionModalEl = document.getElementById("questionModal");
    const questionModal = questionModalEl ? new bootstrap.Modal(questionModalEl) : null;
    const modalQuestionText = document.getElementById("modalQuestionText");
    const modalAnswerInput = document.getElementById("modalAnswerInput");
    const saveAnswerBtn = document.getElementById("saveAnswerBtn");

    let currentActiveQid = null;
    let currentActiveIndex = null;
    let currentActiveQText = null;

    function openQuestionModal(qid, qindex, qtext) {
        currentActiveQid = qid;
        currentActiveIndex = qindex;
        currentActiveQText = qtext;
        if (modalQuestionText) modalQuestionText.textContent = qtext;
        if (modalAnswerInput) modalAnswerInput.value = answers[qid] || "";
        if (questionModal) questionModal.show();
    }

    if (saveAnswerBtn) {
        saveAnswerBtn.addEventListener("click", () => {
            const answerText = modalAnswerInput ? modalAnswerInput.value.trim() : "";

            if (currentActiveQid && answerText !== "") {
                // Simpan ke local storage
                answers[currentActiveQid] = answerText;
                localStorage.setItem("twoStoriesAnswers", JSON.stringify(answers));
                renderQuestions();
                if (questionModal) questionModal.hide();

                // Format Pesan WhatsApp ke nomor 082161897465
                const phoneNumber = "6282161897465";
                const message = `Halo Aji, aku sudah mengisi jawaban untuk Two Stories:\n\n*Pertanyaan ${currentActiveIndex}:*\n${currentActiveQText}\n\n*Jawaban:* \n"${answerText}"`;
                
                // Buka WhatsApp
                const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(waUrl, "_blank");
            } else {
                alert("Mohon isi jawabannya terlebih dahulu.");
            }
        });
    }

    /* ======================================================
       4. NAVBAR SCROLL EFFECT & READING PROGRESS BAR
    ====================================================== */
    const navbar = document.getElementById("mainNav");
    const readingProgressBar = document.getElementById("readingProgress");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (readingProgressBar) {
            readingProgressBar.style.width = scrollPercent + "%";
        }

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    /* ======================================================
       5. DARK / LIGHT MODE TOGGLE
    ====================================================== */
    const themeToggleBtn = document.getElementById("themeToggle");
    const themeToggleMobile = document.getElementById("themeToggleMobile");
    const htmlElement = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem("twoStoriesTheme") || "light";
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("twoStoriesTheme", newTheme);
        updateThemeIcon(newTheme);
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

    function updateThemeIcon(theme) {
        const iconClass = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
        if (themeToggleBtn) themeToggleBtn.innerHTML = `<i class="${iconClass}"></i>`;
        if (themeToggleMobile) themeToggleMobile.innerHTML = `<i class="${iconClass}"></i>`;
    }

    /* ======================================================
       6. SMOOTH SCROLLING FOR NAVIGATION LINKS
    ====================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                // Close mobile navbar if open
                const navbarCollapse = document.getElementById("navbarNav");
                if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

});