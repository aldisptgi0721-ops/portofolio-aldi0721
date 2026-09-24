/**
 * Portfolio Aldi Septiagi - Main JavaScript
 * Interactive modern features: Typewriter, Scroll Reveal, Mobile Drawer,
 * Project Modals, CV Viewer, Contact Form & WhatsApp Integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set Current Year in Footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------
  // 2. Sticky Navbar & Active NavLink Highlight on Scroll
  // -------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // ScrollSpy: Highlight active link in navbar
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // -------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // -------------------------------------------------------------
  // 4. Typewriter Effect
  // -------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriterText');
  const phrases = [
    'CopyCenter Specialist',
    'Staff Administrasi & OTKP',
    'Staff Gudang & Logistik Surat',
    'Customer Service & Printing Expert',
    'Pribadi Ulet, Tekun & Cekatan'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of sentence
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 450;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // -------------------------------------------------------------
  // 5. Scroll Reveal & Skill Progress Bar Animation
  // -------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-scale');
  const progressFills = document.querySelectorAll('.progress-fill');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Animate skill bars when Skills section comes into view
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFills.forEach(bar => {
            bar.classList.add('animated');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  // -------------------------------------------------------------
  // 6. Project Filter Tabs
  // -------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 7. Interactive Project Detail Modal
  // -------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseBtnFooter = document.getElementById('modalCloseBtnFooter');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalCompany = document.getElementById('modalCompany');
  const modalDescription = document.getElementById('modalDescription');
  const modalList = document.getElementById('modalList');
  const modalTags = document.getElementById('modalTags');

  // Detailed Project Data
  const projectsData = {
    bazic: {
      badge: 'Pengalaman Kerja Profesional',
      title: 'Staff CopyCenter & Layanan Pelanggan',
      company: 'PT Bazic Sukses Abadi',
      description: 'Menjalankan peran krusial dalam operasional harian gerai percetakan dan fotokopi. Bertanggung jawab terhadap kepuasan pelanggan, kualitas hasil produksi cetak, hingga akurasi pengawasan inventaris barang toko.',
      tasks: [
        'Memberikan pelayanan yang ramah, sopan, sabar, dan komunikatif kepada setiap customer.',
        'Mengoperasikan mesin cetak modern berkecepatan tinggi, printer warna/hitam putih, serta scanner resolusi tinggi.',
        'Mengerjakan finishing dokumen seperti jilid lakban, spiral kawat/plastik, laminating, dan pemotongan rapi.',
        'Melakukan pengawasan dan pengecekan stok fisik barang (kertas berbagai ukuran/gramatur, tinta toner, ATK toko).',
        'Menjaga kebersihan dan perawatan mesin cetak agar senantiasa beroperasi optimal.'
      ],
      tags: ['Pelayanan Ramah & Sopan', 'Print & Scan Dokumen', 'Fotokopi Cepat', 'Pengawasan Stok Barang', 'Ketelitian Kerja']
    },
    pos: {
      badge: 'Praktik Kerja Lapangan (PKL)',
      title: 'Staff Gudang, Pengarsipan Surat & Entry Pengiriman',
      company: 'PT Pos Indonesia (Persero)',
      description: 'Menjalankan program Praktik Kerja Lapangan di salah satu BUMN logistik terbesar di Indonesia. Berfokus pada penanganan sirkulasi surat kedinasan, input tarif sistem logistik, dan verifikasi fisik barang kiriman.',
      tasks: [
        'Menerima, menyortir, mencatat pada buku agenda, menyimpan, dan mengeluarkan surat kedinasan maupun surat masyarakat.',
        'Mengentri harga dan kalkulasi tarif pengiriman barang serta surat ke dalam sistem komputer Pos Indonesia dengan teliti.',
        'Memastikan barang kiriman sesuai dengan spesifikasi berat, dimensi, dan standar kemasan aman.',
        'Melakukan quality check pada label barcode dan resi pengiriman untuk menghindari salah tujuan.',
        'Mendukung operasional penataan gudang transit barang pos secara rapi dan sistematis.'
      ],
      tags: ['PT Pos Indonesia', 'Manajemen Surat', 'Entry Tarif & Resi', 'Logistik & Gudang', 'Akurasi 100%']
    },
    otkp: {
      badge: 'Proyek Kejuruan SMK',
      title: 'Sistem Pengarsipan & Tata Kelola Dokumen Kantor',
      company: 'SMK Pluit Raya — Kompetensi Keahlian OTKP',
      description: 'Menerapkan standar ilmu Otomatisasi dan Tata Kelola Perkantoran (OTKP) dalam mengelola siklus hidup dokumen perkantoran mulai dari pembuatan, pengarsipan, hingga temu kembali.',
      tasks: [
        'Menyusun sistem klasifikasi arsip berdasarkan abjad, nomor, wilayah, dan subjek perihal.',
        'Membuat format surat dinas, surat penawaran, memo internal, dan notulen rapat sesuai kaidah bahasa baku.',
        'Digitalisasi dokumen fisik menjadi format arsip digital (PDF) yang terindeks rapi di komputer.',
        'Simulasi penanganan telepon kantor dan teknik komunikasi resepsionis yang profesional.',
        'Pengelolaan agenda kerja pimpinan dan jadwal kegiatan kantor.'
      ],
      tags: ['OTKP', 'Pengarsipan Dinamis', 'Korespondensi Surat', 'Microsoft Word & Excel', 'Tata Usaha Kantor']
    },
    qc: {
      badge: 'Workflow Percetakan',
      title: 'Alur Quality Control Hasil Cetak & Layanan Cepat',
      company: 'Retail CopyCenter Service',
      description: 'Implementasi prosedur kontrol kualitas hasil cetak untuk mencegah pemborosan kertas dan tinta serta meningkatkan kepuasan pelanggan melalui alur verifikasi berkas.',
      tasks: [
        'Melakukan pengecekan format file (PDF/Doc/JPG), margin halaman, dan ketajaman teks sebelum proses print massal.',
        'Mengonfirmasi ukuran kertas dan spesifikasi cetak kepada pelanggan untuk mencegah kesalahan cetak.',
        'Pengendalian antrian pelanggan dengan sistem first-come first-served secara tertib dan cekatan.',
        'Pengecekan hasil akhir cetak bebas noda toner, tidak miring, dan warna sesuai file asli.'
      ],
      tags: ['Quality Control', 'Zero Error Strategy', 'Efisiensi Waktu', 'Kepuasan Customer', 'Standar Mutu']
    }
  };

  function openProjectModal(projectKey) {
    const data = projectsData[projectKey];
    if (!data) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalCompany.innerHTML = `<i data-lucide="building-2"></i> <span>${data.company}</span>`;
    modalDescription.textContent = data.description;

    // Populate Tasks
    modalList.innerHTML = '';
    data.tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      modalList.appendChild(li);
    });

    // Populate Tags
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    // Re-run lucide for newly added icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseBtnFooter) modalCloseBtnFooter.addEventListener('click', closeProjectModal);

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // -------------------------------------------------------------
  // 8. CV Viewer Modal
  // -------------------------------------------------------------
  const cvModal = document.getElementById('cvModal');
  const viewCvHeroBtn = document.getElementById('viewCvHeroBtn');
  const viewCvBtn = document.getElementById('viewCvBtn');
  const cvModalCloseBtn = document.getElementById('cvModalCloseBtn');
  const cvModalCloseBtnFooter = document.getElementById('cvModalCloseBtnFooter');

  function openCvModal() {
    cvModal.classList.add('active');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    cvModal.classList.remove('active');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (viewCvHeroBtn) viewCvHeroBtn.addEventListener('click', openCvModal);
  if (viewCvBtn) viewCvBtn.addEventListener('click', openCvModal);
  if (cvModalCloseBtn) cvModalCloseBtn.addEventListener('click', closeCvModal);
  if (cvModalCloseBtnFooter) cvModalCloseBtnFooter.addEventListener('click', closeCvModal);

  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      closeCvModal();
    }
  });

  // Close modals on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal.classList.contains('active')) closeProjectModal();
      if (cvModal.classList.contains('active')) closeCvModal();
      if (mobileDrawer.classList.contains('active')) closeDrawer();
    }
  });

  // Modal Contact button smooth scroll
  const modalContactBtn = document.getElementById('modalContactBtn');
  if (modalContactBtn) {
    modalContactBtn.addEventListener('click', () => {
      closeProjectModal();
    });
  }

  // -------------------------------------------------------------
  // 9. Contact Form & WhatsApp Integration
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');
  const sendViaWaBtn = document.getElementById('sendViaWaBtn');

  function getFormData() {
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const phone = document.getElementById('senderPhone').value.trim();
    const subject = document.getElementById('subjectSelect').value;
    const message = document.getElementById('messageText').value.trim();

    return { name, email, phone, subject, message };
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getFormData();

      // Show toast
      if (formToast) {
        formToast.querySelector('.toast-title').textContent = `Terima kasih, ${data.name || 'Bapak/Ibu'}!`;
        formToast.querySelector('.toast-desc').textContent = 'Pesan Anda telah berhasil disiapkan. Anda dapat meneruskannya langsung via WhatsApp untuk respon instan.';
        formToast.classList.add('active');

        // Scroll to toast
        formToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form after short delay
      setTimeout(() => {
        contactForm.reset();
      }, 4000);
    });
  }

  // Send via WhatsApp direct button
  if (sendViaWaBtn) {
    sendViaWaBtn.addEventListener('click', () => {
      const data = getFormData();
      const myNumber = '6285770441986';

      let text = `Halo Aldi Septiagi,%0A%0A`;
      text += `Saya tertarik menghubungi Anda melalui website portfolio:%0A`;
      text += `• *Nama*: ${encodeURIComponent(data.name || 'Perekrut / Klien')}%0A`;
      if (data.email) text += `• *Email*: ${encodeURIComponent(data.email)}%0A`;
      if (data.phone) text += `• *No. Telp*: ${encodeURIComponent(data.phone)}%0A`;
      if (data.subject) text += `• *Keperluan*: ${encodeURIComponent(data.subject)}%0A`;
      text += `%0A*Pesan*:%0A${encodeURIComponent(data.message || 'Halo Aldi, kami tertarik untuk mendiskusikan peluang kerja bersama Anda.')}`;

      const waUrl = `https://wa.me/${myNumber}?text=${text}`;
      window.open(waUrl, '_blank');
    });
  }
});
