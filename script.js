/* ==========================================================================
   BANCO DE DADOS SIMULADO (ARRAY DE PETS)
   ========================================================================== */
const petsData = [
  {
    id: 1,
    nome: "Rex",
    especie: "cachorro",
    porte: "médio",
    idade: "adulto",
    imagem: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
    historia: "Rex foi resgatado de uma situação de rua. É super carinhoso, vacinado, castrado e adora brincar com bolinhas."
  },
  {
    id: 2,
    nome: "Mia",
    especie: "gato",
    porte: "pequeno",
    idade: "filhote",
    imagem: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    historia: "Mia foi encontrada com seus irmãos ainda recém-nascida. Hoje está forte, muito brincalhona e pronta para um lar seguro."
  },
  {
    id: 3,
    nome: "Thor",
    especie: "cachorro",
    porte: "grande",
    idade: "sênior",
    imagem: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80",
    historia: "Thor é um cão idoso dócil e calmo. Procura uma família tranquila que queira dar um final de vida cheio de amor."
  },
  {
    id: 4,
    nome: "Luna",
    especie: "gato",
    porte: "médio",
    idade: "adulto",
    imagem: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80",
    historia: "Luna é uma gatinha independente e dengosa. Adora tomar sol na janela e convive muito bem com outros gatos."
  },
  {
    id: 5,
    nome: "Pipoca",
    especie: "cachorro",
    porte: "pequeno",
    idade: "filhote",
    imagem: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
    historia: "Pipoca é cheia de energia! Ideal para famílias ativas. Já tomou as primeiras vacinas e está saudável."
  },
  {
    id: 6,
    nome: "Simba",
    especie: "gato",
    porte: "médio",
    idade: "sênior",
    imagem: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80",
    historia: "Simba viveu anos em um lar temporário. É um gato ronronador que adora um bom dengo e colo."
  }
];

/* ==========================================================================
   INICIALIZAÇÃO E SELETORES DO DOM
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  renderPets(petsData);
  initFilters();
  initModal();
  initFormValidation();
});

/* ==========================================================================
   1. MODO ESCURO Persistente (localStorage)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("petmatch_theme");

  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-theme");
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("petmatch_theme", isDark ? "dark" : "light");
  });
}

/* ==========================================================================
   2. MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Fechar menu ao clicar num link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   3. RENDERIZAÇÃO E FILTRAGEM DE PETS
   ========================================================================== */
function renderPets(pets) {
  const grid = document.getElementById("pets-grid");
  const noPetsMsg = document.getElementById("no-pets-message");
  grid.innerHTML = "";

  if (pets.length === 0) {
    noPetsMsg.classList.remove("hidden");
    return;
  }

  noPetsMsg.classList.add("hidden");

  pets.forEach(pet => {
    const card = document.createElement("article");
    card.className = "pet-card";
    card.innerHTML = `
      <div class="pet-card-img-container">
        <img src="${pet.imagem}" alt="Foto do pet ${pet.nome}" class="pet-card-img">
      </div>
      <div class="pet-card-body">
        <h3 class="pet-name">${pet.nome}</h3>
        <div class="pet-tags">
          <span class="badge">${pet.especie}</span>
          <span class="badge">${pet.porte}</span>
          <span class="badge">${pet.idade}</span>
        </div>
        <button class="btn btn-primary btn-sm pet-card-btn" data-id="${pet.id}" type="button">Ver Detalhes</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Atribui evento de clique para os botões "Ver Detalhes"
  document.querySelectorAll(".pet-card-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const petId = parseInt(e.target.getAttribute("data-id"));
      openPetModal(petId);
    });
  });
}

function initFilters() {
  const filterEspecie = document.getElementById("filter-especie");
  const filterPorte = document.getElementById("filter-porte");
  const filterIdade = document.getElementById("filter-idade");

  function applyFilters() {
    const especieVal = filterEspecie.value;
    const porteVal = filterPorte.value;
    const idadeVal = filterIdade.value;

    const filtered = petsData.filter(pet => {
      const matchEspecie = especieVal === "todos" || pet.especie === especieVal;
      const matchPorte = porteVal === "todos" || pet.porte === porteVal;
      const matchIdade = idadeVal === "todos" || pet.idade === idadeVal;

      return matchEspecie && matchPorte && matchIdade;
    });

    renderPets(filtered);
  }

  filterEspecie.addEventListener("change", applyFilters);
  filterPorte.addEventListener("change", applyFilters);
  filterIdade.addEventListener("change", applyFilters);
}

/* ==========================================================================
   4. MODAL DE DETALHES
   ========================================================================== */
function initModal() {
  const modal = document.getElementById("pet-modal");
  const closeBtn = document.getElementById("modal-close");

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeModal);

  // Fechar ao clicar fora do conteúdo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Fechar com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function openPetModal(petId) {
  const pet = petsData.find(p => p.id === petId);
  if (!pet) return;

  const modal = document.getElementById("pet-modal");

  document.getElementById("modal-pet-name").textContent = pet.nome;
  document.getElementById("modal-pet-especie").textContent = pet.especie;
  document.getElementById("modal-pet-porte").textContent = pet.porte;
  document.getElementById("modal-pet-idade").textContent = pet.idade;
  document.getElementById("modal-pet-historia").textContent = pet.historia;

  const modalImg = document.getElementById("modal-pet-img");
  modalImg.innerHTML = `<img src="${pet.imagem}" alt="Foto detalhada de ${pet.nome}" class="modal-pet-img-tag">`;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Trava scroll da tela
}

/* ==========================================================================
   5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   ========================================================================== */
function initFormValidation() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Campos
    const nome = document.getElementById("contact-nome");
    const email = document.getElementById("contact-email");
    const mensagem = document.getElementById("contact-mensagem");

    // Reset erros
    [nome, email, mensagem].forEach(input => {
      input.parentElement.classList.remove("invalid");
    });

    // Validação Nome
    if (!nome.value.trim()) {
      nome.parentElement.classList.add("invalid");
      isValid = false;
    }

    // Validação E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.parentElement.classList.add("invalid");
      isValid = false;
    }

    // Validação Mensagem
    if (!mensagem.value.trim()) {
      mensagem.parentElement.classList.add("invalid");
      isValid = false;
    }

    // Sucesso
    if (isValid) {
      feedback.textContent = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
      feedback.className = "form-feedback success";
      feedback.classList.remove("hidden");
      form.reset();

      setTimeout(() => {
        feedback.classList.add("hidden");
      }, 5000);
    }
  });
}