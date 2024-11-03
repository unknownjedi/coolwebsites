const borderColors = ["[#ff7b72]", "[#58a6ff]", "[#ffcc29]"];

// Store the data globally to reuse when filtering
let websiteData = [];

// Fetch the data and render categories and items
fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    websiteData = data; // Store the data globally
    renderCategories(data);
    renderItems(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function renderCategories(data) {
  const categoryList = document.getElementById("category");
  categoryList.innerHTML = ""; // Clear previous content

  const categories = new Set();
  data.forEach((item) => {
    item.category.split(",").forEach((category) => {
      categories.add(category.trim());
    });
  });

  const itemContainer = document.createElement("div");
  itemContainer.className = "flex flex-wrap justify-center gap-2 mb-2";

  categories.forEach((category) => {
    const randomColor =
      borderColors[Math.floor(Math.random() * borderColors.length)];
    const span = document.createElement("span");
    span.className = `px-4 py-1 rounded-full border border-${randomColor} text-white cursor-pointer hover:bg-${randomColor} hover:text-black transition-colors`;
    span.textContent = category;

    // Add click event to filter items based on category
    span.addEventListener("click", () => {
      document.querySelectorAll("#category span").forEach((span) => {
        span.classList.remove(
          ...borderColors.map((color) => `bg-${color}`),
          "!text-black"
        );
      });

      span.classList.add(`bg-${randomColor}`, "!text-black");

      filterItemsByCategory(category);
    });

    itemContainer.appendChild(span);
  });

  categoryList.appendChild(itemContainer);
}

// Function to filter items by category
function filterItemsByCategory(category) {
  const filteredData = websiteData.filter((item) =>
    item.category
      .split(",")
      .map((cat) => cat.trim())
      .includes(category)
  );
  renderItems(filteredData); // Render only the filtered items
}

// Function to render items
function renderItems(data) {
  const websitesList = document.getElementById("websites");
  websitesList.innerHTML = ""; // Clear previous content

  data.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.className = "flex justify-between items-start";

    const contentDiv = document.createElement("div");
    contentDiv.className = "space-y-2";

    const titleContainer = document.createElement("div");
    titleContainer.className = "flex items-center gap-2";

    const title = document.createElement("h2");
    title.className = "text-[#58a6ff] text-2xl font-bold";
    title.textContent = item.name;

    titleContainer.appendChild(title);

    // Check if the item is popular and add the badge
    if (item.popular) {
      const popularBadge = document.createElement("span");
      popularBadge.className =
        "px-2 py-0.5 text-xs border border-white/20 rounded-full text-white";
      popularBadge.textContent = "POPULAR";
      titleContainer.appendChild(popularBadge);
    }

    const description = document.createElement("p");
    description.className = "text-white/90 max-w-2xl";
    description.textContent = item.description;

    contentDiv.appendChild(titleContainer);
    contentDiv.appendChild(description);

    const link = document.createElement("a");
    link.href = item.url;
    link.className =
      "px-4 py-2 bg-[#58a6ff] text-black font-bold rounded-full text-sm hover:bg-[#58a6ff]/90 transition-colors";
    link.textContent = "VISIT WEBSITE";

    itemContainer.appendChild(contentDiv);
    itemContainer.appendChild(link);

    websitesList.appendChild(itemContainer);
  });
}
