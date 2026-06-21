const menuData = {
  businessName: "El Pilar del Sabor",
  browserTitle: "Menú corrido de hoy",
  logoAlt: "Logo de El Pilar del Sabor",
  logoFallback: "MC",
  tagline: "Cocina casera",
  heroTitle: "Menú de hoy",
  priceLabel: "Precio",
  price: "$80",
  includes: "Incluye entrada, arroz o spaghetti, guisado, agua del día y tortillas.",
  coursesEyebrow: "Elige por tiempo",
  coursesTitle: "Comida corrida",
  serviceEyebrow: "Servicio",
  serviceTitle: "De Lunes a Sabado de 9:00 am a 5:00 pm",
  notes:
    "El menú puede cambiar durante el día según disponibilidad. Pregunta por extras.",
  availableText: "Disponible",
  soldOutText: "Agotado",
  courses: [
    {
      label: "Primer tiempo",
      title: "Entrada",
      items: [
        {
          name: "Sopa de fideo",
          description: "Caldo casero con pasta doradita.",
          available: true,
        },
        {
          name: "Consome de pollo",
          description: "Con verduras y arroz blanco.",
          available: true,
        },
      ],
    },
    {
      label: "Segundo tiempo",
      title: "Arroz o spaghetti",
      items: [
        {
          name: "Arroz rojo",
          description: "Preparado al dia.",
          available: true,
        },
        {
          name: "Spaghetti a la crema",
          description: "Opción cremosa para acompañar.",
          available: true,
        },
      ],
    },
    {
      label: "Tercer tiempo",
      title: "Guisado",
      items: [
        {
          name: "Pollo en mole",
          description: "Servido con arroz y tortillas.",
          available: true,
        },
        {
          name: "Bistec en salsa verde",
          description: "Con papas y nopales.",
          available: true,
        },
        {
          name: "Picadillo casero",
          description: "Con verduras y caldillo de jitomate.",
          available: true,
        },
        {
          name: "Tortitas de papa",
          description: "Con caldillo de jitomate.",
          available: false,
        },
      ],
    },
    {
      label: "Incluido",
      title: "Agua del dia",
      items: [
        {
          name: "Agua de jamaica",
          description: "Vaso incluido con el menú.",
          available: true,
        },
      ],
    },
  ],
};

const formatter = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function renderHeader(data) {
  document.title = `${data.businessName} | ${data.browserTitle}`;
  document.querySelector(".brand-logo").alt = data.logoAlt;
  document.getElementById("logo-fallback").textContent = data.logoFallback;
  document.getElementById("brand-tagline").textContent = data.tagline;
  document.getElementById("business-name").textContent = data.businessName;
  document.getElementById("hero-title").textContent = data.heroTitle;
  document.getElementById("price-label").textContent = data.priceLabel;
  document.getElementById("menu-price").textContent = data.price;
  document.getElementById("menu-includes").textContent = data.includes;
  document.getElementById("courses-eyebrow").textContent = data.coursesEyebrow;
  document.getElementById("courses-title").textContent = data.coursesTitle;
  document.getElementById("service-eyebrow").textContent = data.serviceEyebrow;
  document.getElementById("service-title").textContent = data.serviceTitle;
  document.getElementById("service-notes").textContent = data.notes;
  document.getElementById("today-date").textContent = formatter.format(new Date());
}

function renderCourses(courses) {
  const grid = document.getElementById("course-grid");

  grid.innerHTML = courses
    .map(
      (course, index) => `
        <article class="course-card" style="animation-delay: ${index * 70}ms">
          <p class="course-kicker">${course.label}</p>
          <h3>${course.title}</h3>
          <ul class="items-list">
            ${course.items.map((item) => renderItem(item, menuData)).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderItem(item, data) {
  const status = item.available ? data.availableText : data.soldOutText;
  const className = item.available ? "menu-item" : "menu-item is-sold-out";

  return `
    <li class="${className}">
      <div class="item-line">
        <span class="item-name">${item.name}</span>
        <span class="item-status">${status}</span>
      </div>
      ${item.description ? `<p class="item-description">${item.description}</p>` : ""}
    </li>
  `;
}

renderHeader(menuData);
renderCourses(menuData.courses);
