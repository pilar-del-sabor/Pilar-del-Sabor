const SPREADSHEET_ID = "1qf-x2dVxOgbx6wj4KVyZ2J_0Wdbqr6XKR3uw83g8vQU";
const MENU_SHEET_NAME = "Menu";
const CONFIG_SHEET_NAME = "Configuracion";

const menuData = {
  businessName: "El Pilar del Sabor",
  browserTitle: "Menu corrido de hoy",
  logoAlt: "Logo de El Pilar del Sabor",
  logoFallback: "MC",
  tagline: "Cocina casera",
  heroTitle: "Menu de hoy",
  priceLabel: "Precio",
  price: "$80",
  includes: "Incluye entrada, arroz o spaghetti, guisado, agua del dia y tortillas.",
  coursesEyebrow: "Elige por tiempo",
  coursesTitle: "Comida corrida",
  serviceEyebrow: "Servicio",
  serviceTitle: "De Lunes a Sabado de 9:00 am a 5:00 pm",
  notes:
    "El menu puede cambiar durante el dia segun disponibilidad. Pregunta por extras.",
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
          description: "Opcion cremosa para acompanar.",
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
          description: "Vaso incluido con el menu.",
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

function getSheetCsvUrl(sheetName) {
  const encodedSheet = encodeURIComponent(sheetName);
  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodedSheet}`;
}

async function loadMenuFromSheet() {
  const [menuRows, configRows] = await Promise.all([
    loadCsvSheet(MENU_SHEET_NAME),
    loadCsvSheet(CONFIG_SHEET_NAME),
  ]);

  return {
    ...menuData,
    ...buildConfig(configRows),
    courses: buildCourses(menuRows),
  };
}

async function loadCsvSheet(sheetName) {
  const response = await fetch(getSheetCsvUrl(sheetName));

  if (!response.ok) {
    throw new Error(`No se pudo cargar la hoja ${sheetName}`);
  }

  return csvToObjects(await response.text());
}

function csvToObjects(csvText) {
  const rows = parseCsv(csvText).filter((row) => row.some((cell) => cell.trim()));
  const headers = rows.shift()?.map((header) => normalizeKey(header)) ?? [];

  return rows.map((row) =>
    headers.reduce((object, header, index) => {
      object[header] = row[index]?.trim() ?? "";
      return object;
    }, {}),
  );
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let cell = "";
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);

  return rows;
}

function normalizeKey(value) {
  return value.trim().toLowerCase();
}

function buildConfig(rows) {
  return rows.reduce((config, row) => {
    if (row.campo && row.valor) {
      config[row.campo] = row.valor;
    }

    return config;
  }, {});
}

function buildCourses(rows) {
  const coursesBySection = new Map();

  rows.forEach((row, index) => {
    if (!row.seccion || !row.nombre) {
      return;
    }

    if (!coursesBySection.has(row.seccion)) {
      coursesBySection.set(row.seccion, {
        firstRow: index,
        label: row.label,
        title: row.titulo,
        items: [],
      });
    }

    coursesBySection.get(row.seccion).items.push({
      name: row.nombre,
      description: row.descripcion,
      available: parseAvailable(row.disponible),
      order: Number(row.orden) || 999,
    });
  });

  return [...coursesBySection.values()]
    .sort((a, b) => a.firstRow - b.firstRow)
    .map((course) => ({
      label: course.label,
      title: course.title,
      items: course.items
        .sort((a, b) => a.order - b.order)
        .map(({ order, ...item }) => item),
    }));
}

function parseAvailable(value) {
  const normalizedValue = String(value).trim().toLowerCase();
  return ["true", "si", "sí", "1", "disponible", "yes"].includes(normalizedValue);
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderHeader(data) {
  document.title = `${data.businessName} | ${data.browserTitle}`;
  document.querySelector(".brand-logo").alt = data.logoAlt;
  setText("logo-fallback", data.logoFallback);
  setText("brand-tagline", data.tagline);
  setText("business-name", data.businessName);
  setText("hero-title", data.heroTitle);
  setText("price-label", data.priceLabel);
  setText("menu-price", data.price);
  setText("menu-includes", data.includes);
  setText("courses-eyebrow", data.coursesEyebrow);
  setText("courses-title", data.coursesTitle);
  setText("service-eyebrow", data.serviceEyebrow);
  setText("service-title", data.serviceTitle);
  setText("service-notes", data.notes);
  setText("today-date", formatter.format(new Date()));
}

function renderCourses(data) {
  const grid = document.getElementById("course-grid");

  grid.innerHTML = data.courses
    .map(
      (course, index) => `
        <article class="course-card" style="animation-delay: ${index * 70}ms">
          <p class="course-kicker">${escapeHtml(course.label)}</p>
          <h3>${escapeHtml(course.title)}</h3>
          <ul class="items-list">
            ${course.items.map((item) => renderItem(item, data)).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderItem(item, data) {
  const status = item.available ? data.availableText : data.soldOutText;
  const className = item.available ? "menu-item" : "menu-item is-sold-out";
  const description = item.description
    ? `<p class="item-description">${escapeHtml(item.description)}</p>`
    : "";

  return `
    <li class="${className}">
      <div class="item-line">
        <span class="item-name">${escapeHtml(item.name)}</span>
        <span class="item-status">${escapeHtml(status)}</span>
      </div>
      ${description}
    </li>
  `;
}

async function initMenu() {
  try {
    const sheetData = await loadMenuFromSheet();
    renderHeader(sheetData);
    renderCourses(sheetData);
  } catch (error) {
    console.warn("Usando menu local porque Google Sheets no cargo.", error);
    renderHeader(menuData);
    renderCourses(menuData);
  }
}

initMenu();
